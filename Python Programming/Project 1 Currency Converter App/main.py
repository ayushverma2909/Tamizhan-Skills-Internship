import tkinter as tk
from tkinter import ttk
import requests
from dotenv import load_dotenv
import os

load_dotenv()


currency_options = ['USD', 'INR', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY']


def convert_currency():
    from_curr = from_currency.get()
    to_curr = to_currency.get()
    amount = amount_entry.get()

    if not amount:
        result_label.config(text="Enter amount.")
        return

    try:
        amount = float(amount)
    except ValueError:
        result_label.config(text="Enter valid number.")
        return

    params = {
        "apikey": os.getenv("API_KEY"),
        "base_currency": from_curr,
        "currencies": to_curr
    }

    try:
        response = requests.get(os.getenv("URL"), params=params)
        data = response.json()

        if response.status_code == 200:
            rate = data['data'][to_curr]['value']
            converted = round(amount * rate, 2)
            result_label.config(text=f"{amount} {from_curr} = {converted} {to_curr}")
        else:
            result_label.config(text="API Error. Try again.")
    except Exception as e:
        result_label.config(text="Network Error.")


window = tk.Tk()
window.title("Currency Converter App")
window.geometry("500x300")
window.config(bg="#1e1e1e")

title = tk.Label(window, text="Currency Converter", font=("Arial", 16, "bold"), fg="white", bg="#1e1e1e")
title.pack(pady=10)

frame = tk.Frame(window, bg="#1e1e1e")
frame.pack(pady=10)


amount_entry = tk.Entry(frame, width=10, font=("Arial", 12))
amount_entry.grid(row=0, column=0, padx=5)


from_currency = ttk.Combobox(frame, values=currency_options, width=5, font=("Arial", 12))
from_currency.set("USD")
from_currency.grid(row=0, column=1, padx=5)


to_currency = ttk.Combobox(frame, values=currency_options, width=5, font=("Arial", 12))
to_currency.set("INR")
to_currency.grid(row=0, column=2, padx=5)

convert_btn = tk.Button(window, text="Convert", command=convert_currency, font=("Arial", 12), bg="#4caf50", fg="white", padx=10)
convert_btn.pack(pady=15)

result_label = tk.Label(window, text="", font=("Arial", 14), fg="white", bg="#1e1e1e")
result_label.pack(pady=10)

window.mainloop()
