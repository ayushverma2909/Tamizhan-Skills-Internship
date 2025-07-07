from tkinter import *
from tkinter import messagebox
import random
import pyperclip
import json
# -------------------------- PASSWORD GENERATOR ----------------------------- #
letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

symbols = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~']


password = []


def random_pass():
    global copied_label
    password.clear()
    i = 0
    while i<4:
        password.append(random.choice(letters))
        password.append(random.choice(numbers))
        password.append(random.choice(symbols))
        i+=1
    random.shuffle(password)

    real = "".join(password)
    if len(real) >12:
        messagebox.showerror(title="Password", message="Cannot generate more character")
    else:
        password_input.delete(0, END)
        password_input.insert(0, real)
        pyperclip.copy(real)
        copied_label.config(text="Password Copied")
    
    



def search():

    website = website_input.get()

    try:
        with open("data.json") as file:
            data = json.load(file)
    except:
        messagebox.showerror("Oops", message="No Data file found")
    else:
        if website in data:
            messagebox.showinfo(title = website, message=f"Email: {data[website]["email"]}\nPassword: {data[website]["password"]}")
        else:
            messagebox.showerror("Oops", message="Website name doesn't exist")



def store_data():
    global copied_label
    website = website_input.get()
    username = username_input.get()
    password = password_input.get()

    json_data = {
        website :{
            "email": username,
            "password": password
        }
    }

    if len(password) <=0 or len(website) <=0:
        messagebox.showerror("Oops", message="Don't leave any filed empty")
    else:
        try:
            with open("data.json", mode="r") as file:
                data  = json.load(file)
        except:
            with open("data.json", mode="w") as file:
                json.dump(json_data, file, indent=4)
        else:
            data.update(json_data) 
            with open("data.json", mode="w") as file:
                json.dump(data, file, indent=4)
        finally:
                website_input.delete(0, END)
                password_input.delete(0, END)
                copied_label.config(text="Data Saved Successfully")
                
                


window = Tk()
window.title("Passowrd Generator")
window.config(padx=50, pady=50)


canvas = Canvas(width=200, height=200, highlightthickness=0)
lock_img = PhotoImage(file="logo.png")

canvas.create_image(100, 100, image= lock_img)
canvas.grid(row=0, column=1)


website_label = Label(text="Website: ",font=("Arial", 12, "bold"))
website_label.grid(row=1, column=0)
website_input = Entry(width=33)
website_input.grid(row=1, column=1)
website_input.focus()

search_button = Button(text="Search", width=14, command=search)
search_button.grid(row=1, column=2)

username_label = Label(text="Email/username: ",font=("Arial", 12, "bold"))
username_label.grid(row=2, column=0)
username_input = Entry(width=51)
username_input.grid(row=2, column=1, columnspan=2)
username_input.insert(0,"ayushv2909@gmail.com")


password_label = Label(text="Password:", font=("Arial", 12, "bold"))
password_label.grid(row=3, column=0)
password_input = Entry(width=33)
password_input.grid(row=3, column=1)

password_button = Button(text="Generate Password",command=random_pass)
password_button.grid(row=3, column=2)

add_button = Button(text="Add", command=store_data, width=43)
add_button.grid(row=4, column=1, columnspan=2)

copied_label = Label(text="",fg="green",font=("Arial", 8, "normal"))
copied_label.grid(row=5, column=1)


window.mainloop()