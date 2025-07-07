import tkinter as tk
from tkinter import StringVar
from quiz_question import QuizData
import html

class QuizApp:

    def __init__(self, root):
        self.root = root
        self.root.title("Quiz App")
        root.minsize(height=300, width=600)

        self.quiz_fetcher = QuizData()
        self.data = self.quiz_fetcher.quizdata()

        self.score = 0
        self.question_index = 0
        self.selected_option = StringVar(value="__none__")

        self.main_frame = tk.Frame(root, padx=20, pady=20)
        self.main_frame.grid(row=0, column=0, sticky="nsew")

        root.grid_columnconfigure(0, weight=1)
        self.main_frame.grid_columnconfigure(0, weight=1)
        self.main_frame.grid_columnconfigure(1, weight=1)

        self.score_label = tk.Label(self.main_frame, text=f"Score: {self.score}", justify="right")
        self.score_label.grid(row=0, column=1, sticky="e")

        self.question_label = tk.Label(
            self.main_frame, text="", wraplength=500, font=("Arial", 14), justify="left", anchor="w"
        )
        self.question_label.grid(row=1, column=0, columnspan=2, pady=(0, 20), sticky="ew")

        self.options = []
        for i in range(4):
            rb = tk.Radiobutton(
                self.main_frame,
                text="",
                variable=self.selected_option,
                value=f"opt_{i}",
                font=("Arial", 12),
                anchor="w",
                justify="left"
            )
            rb.grid(row=i + 2, column=0, columnspan=2, sticky="w", pady=5)
            self.options.append(rb)

        self.feedback_label = tk.Label(self.main_frame, text="", font=("Arial", 12))
        self.feedback_label.grid(row=7, column=0, columnspan=2, pady=(10, 0))

        self.submit_button = tk.Button(self.main_frame, text="Submit", command=self.submit_button)
        self.submit_button.grid(row=6, column=0, pady=20, sticky="w")

        self.finish_button = tk.Button(self.main_frame, text="Finish", command=self.finish_button)
        self.finish_button.grid(row=6, column=1, pady=20, sticky="e")

        self.load_question()

    def load_question(self):
        if "results" not in self.data or not self.data["results"]:
            print("Error: No results from API")
            return

        question_data = self.data["results"][self.question_index]
        self.question_label.config(text=f"Q.{self.question_index + 1} {html.unescape(question_data['question'])}")

        all_answers = question_data["incorrect_answers"] + [question_data["correct_answer"]]
        shuffled_answers = sorted(all_answers)

        for i, option in enumerate(self.options):
            option.config(text=shuffled_answers[i], value=shuffled_answers[i])

        self.selected_option.set("__none__")

    def give_feedback(self, is_correct):
        color = "green" if is_correct else "red"
        text = "✅ Correct!" if is_correct else "❌ Wrong!"
        self.feedback_label.config(text=text, fg=color)

        self.root.after(500, lambda: self.question_label.config(bg="SystemButtonFace"))
        self.root.after(1000, lambda: self.feedback_label.config(text=""))

    def submit_button(self):
        if "results" not in self.data or not self.data["results"]:
            print("Error: No results from API")
            return

        selected = self.selected_option.get()

        if selected == "__none__":
            self.feedback_label.config(text="Please select an option!", fg="black")
            return

        correct = self.data["results"][self.question_index]["correct_answer"]
        is_correct = selected == correct
        self.give_feedback(is_correct)

        if is_correct:
            self.score += 1
        else:
            self.score -= 1

        self.score_label.config(text=f"Score: {self.score}")

        if self.question_index + 1 < len(self.data["results"]):
            self.question_index += 1
            self.root.after(200, self.load_question)
        else:
            self.data = self.quiz_fetcher.quizdata()
            self.question_index = 0
            self.root.after(200, self.load_question)

    def finish_button(self):
        self.question_label.config(text=f"Quiz Finished! Your final score: {self.score}")
        for rb in self.options:
            rb.grid_remove()
        self.submit_button.grid_remove()
        self.finish_button.grid_remove()
        self.feedback_label.grid_remove()
