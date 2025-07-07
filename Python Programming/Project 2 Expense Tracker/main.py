import pandas
import os
import datetime
import matplotlib.pyplot as plt
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from tabulate import tabulate

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def add_expenses():
    try:
        amount = float(input("Enter your amount: "))
        category = input("Enter the expense category: ").strip().capitalize()
        if not category:
            print("Category cannot be empty.")
            return

        data = {
            "amount": [amount],
            "category": [category],
            "Time": [datetime.datetime.now().strftime("%B %d, %Y at %I:%M %p")]
        }

        df = pandas.DataFrame(data)
        script_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(script_dir, "expense_tracker.csv")
        write_header = not os.path.isfile(file_path)
        df.to_csv(file_path, mode='a', header=write_header, index=False)
        print(f"Expense of ₹{amount} for '{category}' added.")
    except Exception as e:
        print("Something went wrong while adding expense:", e)

def main_menu():
    print("\n+------------------------+")
    print("|     Expense Tracker    |")
    print("+------------------------+")
    print("1. Add Expenses")
    print("2. View Report")
    print("3. View Graph")
    print("4. View Total")
    print("5. Save Report as PDF")
    print("6. Exit")

def show_report():
    try:
        df = pandas.read_csv("expense_tracker.csv")
        
        if df.empty:
            print("No expenses found yet.")
            return

        table = tabulate(df, headers='keys', tablefmt='grid', showindex=False)
        print("\nExpense Report:\n")
        print(table)
    except FileNotFoundError:
        print("No expenses found yet.")
    except Exception as e:
        print("Error loading report:", e)

def show_graph():
    try:
        df = pandas.read_csv("expense_tracker.csv")
        if df.empty:
            print("No data to show.")
            return

        category_sums = df.groupby('category')['amount'].sum()
        categories = category_sums.index
        amounts = category_sums.values

        plt.figure(figsize=(7, 7))
        plt.pie(amounts, labels=categories, autopct='%1.1f%%', startangle=140)
        plt.title("Expense Distribution by Category")
        plt.axis('equal')
        plt.tight_layout()
        plt.show()
    except FileNotFoundError:
        print("No expenses found to plot.")
    except Exception as e:
        print("Error showing graph:", e)

def show_total_expenses():
    try:
        df = pandas.read_csv("expense_tracker.csv")
        if df.empty:
            print("No expenses found.")
            return

        total = df["amount"].sum()
        print(f"\nYour total expenses: ₹{total:.2f}")
        category_sums = df.groupby("category")["amount"].sum()

        for cat, amt in category_sums.items():
            percent = (amt / total) * 100
            print(f"{cat:<15}: ₹{amt:.2f} ({percent:.1f}%)")
    except FileNotFoundError:
        print("No expenses found.")
    except Exception as e:
        print("Error calculating total:", e)

def save_report_as_pdf():
    try:
        df = pandas.read_csv("expense_tracker.csv")
        if df.empty:
            print("No data available to save.")
            return

        data_str = tabulate(df, headers='keys', tablefmt='plain', showindex=False)

        filename = "Expense_Report.pdf"
        c = canvas.Canvas(filename, pagesize=A4)
        width, height = A4

        lines = data_str.split('\n')
        x = 40
        y = height - 50

        c.setFont("Helvetica", 10)
        c.drawString(x, y + 20, "Expense Report")
        for line in lines:
            if y < 40:
                c.showPage()
                y = height - 50
                c.setFont("Helvetica", 10)
            c.drawString(x, y, line)
            y -= 15

        c.save()
        print(f"Report saved as {filename}")
    except Exception as e:
        print("Error saving report:", e)

app_is_running = True
while app_is_running:
    clear_screen()
    main_menu()
    try:
        choice = int(input("\nPlease Enter your choice: "))
        if choice == 1:
            clear_screen()
            add_expenses()
        elif choice == 2:
            clear_screen()
            show_report()
        elif choice == 3:
            clear_screen()
            show_graph()
        elif choice == 4:
            clear_screen()
            show_total_expenses()
        elif choice == 5:
            clear_screen()
            save_report_as_pdf()
        elif choice == 6:
            print("Thank you for using Expense Tracker. Goodbye!")
            app_is_running = False
        else:
            print("Please select a valid option (1-5).")
    except ValueError:
        print("Invalid input. Please enter a number.")
    input("\nPress Enter to continue...")
