from tkinter import *
from tkinter import messagebox
from tkcalendar import DateEntry
import json
import os

DATA_FILE = 'tasks.json'

class ToDoApp:
    
    def __init__(self, root):
        self.root = root
        self.root.title("To-Do List")

        window_width = 600
        window_height = 500
        screen_width = root.winfo_screenwidth()
        screen_height = root.winfo_screenheight()
        x = (screen_width - window_width) // 2
        y = (screen_height - window_height) // 2
        self.root.geometry(f"{window_width}x{window_height}+{x}+{y}")
        self.root.config(bg="#223441")
        self.root.resizable(0, 0)

        self.tasks = []
        self.check_vars = []
        self.editing_index = None
        self.selected_index = None

        self.frame = Frame(self.root, bg="#223441")
        self.frame.pack(pady=(10, 10), fill=BOTH, expand=True)

        self.canvas = Canvas(self.frame, bg="#223441", highlightthickness=0)
        self.scrollbar_y = Scrollbar(self.frame, orient=VERTICAL, command=self.canvas.yview)
        self.scrollable_frame = Frame(self.canvas, bg="#223441")

        self.scrollable_frame.bind("<Configure>", lambda e: self.canvas.configure(scrollregion=self.canvas.bbox("all")))
        self.canvas.create_window((0, 0), window=self.scrollable_frame, anchor="nw")
        self.canvas.configure(yscrollcommand=self.scrollbar_y.set)

        self.canvas.pack(side=LEFT, fill=BOTH, expand=True)
        self.scrollbar_y.pack(side=RIGHT, fill=Y)

        self.entry_frame = Frame(self.root, bg="#223441")
        self.entry_frame.pack(pady=5)

        self.task_entry = Entry(self.entry_frame, font=("Times", 16), width=32)
        self.task_entry.grid(row=0, column=0, padx=5)

        self.date_entry = DateEntry(self.entry_frame, font=("Times", 10), width=12, background="darkblue", foreground="white")
        self.date_entry.grid(row=0, column=1, padx=5)

        self.button_frame = Frame(self.root, bg="#223441")
        self.button_frame.pack(pady=5)

        Button(self.button_frame, text="Add", font=("Times", 12), bg="#c5f776", command=self.add_or_update_task).pack(side=LEFT, padx=5)
        Button(self.button_frame, text="Delete Selected", font=("Times", 12), bg="#ff8b61", command=self.delete_selected_task).pack(side=LEFT, padx=5)

        self.load_tasks()
        self.canvas.bind("<Button-1>", self.clear_selection)

    def load_tasks(self):
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, 'r') as file:
                self.tasks = json.load(file)
            self.refresh_tasks()

    def save_tasks(self):
        with open(DATA_FILE, 'w') as file:
            json.dump(self.tasks, file, indent=4)

    def refresh_tasks(self):
        for widget in self.scrollable_frame.winfo_children():
            widget.destroy()

        self.check_vars.clear()
        self.tasks.sort(key=lambda x: x['completed'])

        header = Frame(self.scrollable_frame, bg="#16252f", pady=5)
        header.grid(row=0, column=0, sticky="ew", padx=5)
        header.grid_columnconfigure(0, weight=3)
        header.grid_columnconfigure(1, weight=1)
        header.grid_columnconfigure(2, weight=0)

        Label(header, text="Task", font=("Times", 12, "bold"), bg="#16252f", fg="#fff", anchor="w", width=32).grid(row=0, column=0, sticky="w", padx=(5, 10))
        Label(header, text="Due Date", font=("Times", 12, "bold"), bg="#16252f", fg="#fff", width=12).grid(row=0, column=1, padx=5)
        Label(header, text="Edit", font=("Times", 12, "bold"), bg="#16252f", fg="#fff", width=8).grid(row=0, column=2, padx=5)

        for index, task in enumerate(self.tasks):
            var = BooleanVar(value=task['completed'])

            row = Frame(self.scrollable_frame, bg="#223441", pady=2)
            row.grid(row=index + 1, column=0, sticky="ew", padx=5)
            row.grid_columnconfigure(0, weight=3)
            row.grid_columnconfigure(1, weight=1)
            row.grid_columnconfigure(2, weight=0)

            def on_enter(e, f=row, i=index):
                if self.selected_index != i:
                    f.config(bg="#2a4b5e")
                    for c in f.winfo_children():
                        c.config(bg="#2a4b5e")

            def on_leave(e, f=row, i=index):
                if self.selected_index != i:
                    f.config(bg="#223441")
                    for c in f.winfo_children():
                        c.config(bg="#223441")

            def on_click(e, i=index):
                self.selected_index = i
                self.refresh_tasks()

            row.bind("<Enter>", on_enter)
            row.bind("<Leave>", on_leave)
            row.bind("<Button-1>", on_click)

            if self.selected_index == index:
                row.config(bg="#365f77")
                for c in row.winfo_children():
                    c.config(bg="#365f77")

            task_col = Frame(row, bg=row["bg"])
            task_col.grid(row=0, column=0, sticky="w", padx=(5, 10))

            cb = Checkbutton(
                task_col,
                variable=var,
                bg=row["bg"],
                activebackground=row["bg"],
                selectcolor=row["bg"],
                command=lambda i=index, v=var: self.toggle_task(i, v)
            )
            cb.pack(side=LEFT)

            task_lbl = Label(
                task_col,
                text=task['text'],
                font=("Times", 13, "bold"),
                fg="#aaa" if task['completed'] else "#fff",
                bg=row["bg"],
                justify=LEFT,
                wraplength=360,
                anchor="w"
            )
            task_lbl.pack(side=LEFT, fill=X)
            task_lbl.bind("<Enter>", on_enter)
            task_lbl.bind("<Leave>", on_leave)
            task_lbl.bind("<Button-1>", on_click)

            due = "✓ Completed" if task['completed'] else task['due_date']
            due_lbl = Label(
                row,
                text=due,
                font=("Times", 10, "italic"),
                fg="white",
                bg=row["bg"],
                width=12,
                anchor="center"
            )
            due_lbl.grid(row=0, column=1, padx=5, sticky="nsew")

            edit_btn = Button(
                row,
                text="Edit",
                font=("Times", 10),
                bg="#add8e6",
                command=lambda i=index: self.load_task_for_edit(i),
                width=8
            )
            edit_btn.grid(row=0, column=2, padx=5, sticky="e")

            self.check_vars.append(var)

    def add_or_update_task(self):
        text = self.task_entry.get().strip()
        date = self.date_entry.get_date().strftime("%d-%m-%Y")

        if not text:
            messagebox.showwarning("Warning", "Please enter a task.")
            return

        if self.editing_index is not None:
            task = self.tasks[self.editing_index]
            task['text'] = text
            if not task['completed']:
                task['due_date'] = date
            task['original_due_date'] = date
            self.editing_index = None
        else:
            self.tasks.append({
                "text": text,
                "due_date": date,
                "original_due_date": date,
                "completed": False
            })

        self.task_entry.delete(0, END)
        self.save_tasks()
        self.refresh_tasks()

    def delete_selected_task(self):
        if self.selected_index is not None and 0 <= self.selected_index < len(self.tasks):
            del self.tasks[self.selected_index]
            self.selected_index = None
            self.save_tasks()
            self.refresh_tasks()
        else:
            messagebox.showinfo("Info", "No task selected.")

    def toggle_task(self, index, var):
        task = self.tasks[index]
        task['completed'] = var.get()
        task['due_date'] = "" if task['completed'] else task.get('original_due_date', '')
        self.save_tasks()
        self.refresh_tasks()

    def load_task_for_edit(self, index):
        task = self.tasks[index]
        self.task_entry.delete(0, END)
        self.task_entry.insert(0, task['text'])
        self.date_entry.set_date(task.get('original_due_date'))
        self.editing_index = index

    def clear_selection(self, event):
        self.selected_index = None
        self.refresh_tasks()

if __name__ == "__main__":
    root = Tk()
    app = ToDoApp(root)
    root.mainloop()
