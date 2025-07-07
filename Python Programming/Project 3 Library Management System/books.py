import json
import os
from datetime import datetime
from dotenv import load_dotenv
load_dotenv()

class Books:

    def __init__(self):
        self.book_id = ""
        self.book_name = ''
        self.student_name = ""
        self.student_id = None
        self.book_cost = None
        self.book_quantity = None
        self.file_path = 'books.json'
        self.want_book = ''
        self.fine = 0

    def calculate_fine(self, issued_time_str):
        issued_time = datetime.strptime(issued_time_str, "%Y-%m-%d %H:%M:%S")
        now = datetime.now()
        free_seconds = 5 * 24 * 60 * 60
        delay_seconds = (now - issued_time).total_seconds() - free_seconds
        return max(0, int(delay_seconds // (24 * 60 * 60)) * 20)  # ₹20/day fine after 5 days

    def adding_book(self):
        if os.path.exists(self.file_path):
            with open(self.file_path, mode="r") as file:
                try:
                    data = json.load(file)
                except json.JSONDecodeError:
                    data = {}

                if data:
                    self.book_id = int(max(data.keys(), key=int)) + 1
                else:
                    self.book_id = 101
        else:
            data = {}
            self.book_id = 101

        self.book_name = input("Please Enter the book name: ").capitalize()
        self.book_cost = int(input("Enter book Cost: "))
        self.book_quantity = int(input("Enter Book quantity: "))

        new_book = {
            str(self.book_id): {
                "book_name": self.book_name,
                "cost": self.book_cost,
                "quantity": self.book_quantity
            }
        }

        data.update(new_book)
        with open(self.file_path, mode="w") as file:
            json.dump(data, file, indent=4)
        print("✅ Book added successfully!")

    def issue_books_to_students(self):
        self.student_id = int(input("Please Enter your student id: "))
        self.student_name = input("Enter your name: ")
        self.want_book = input("Enter the book name you want to issue: ").replace(" ", "").lower()

        if not os.path.exists(self.file_path):
            print("Sorry, there's currently no books available.")
            return

        with open(self.file_path, mode="r") as file:
            data = json.load(file)

        matched_id = None
        for key in data:
            if data[key]["book_name"].replace(" ", "").lower() == self.want_book:
                matched_id = key
                break

        if matched_id is None or data[matched_id]["quantity"] < 1:
            print("Book is not available or out of stock.")
            return

        try:
            with open("issued_books.json", "r") as file:
                issued_book_data = json.load(file)
        except:
            issued_book_data = []

        for student in issued_book_data:
            if student["studentId"] == self.student_id:
                if self.want_book in [b["book"] for b in student["issuedBooks"]]:
                    print("You've already issued this book.")
                    return
                student["issuedBooks"].append({"book": self.want_book, "issuedTime": datetime.now().strftime("%Y-%m-%d %H:%M:%S")})
                break
        else:
            issued_book_data.append({
                "studentName": self.student_name,
                "studentId": self.student_id,
                "issuedBooks": [{"book": self.want_book, "issuedTime": datetime.now().strftime("%Y-%m-%d %H:%M:%S")}]
            })

        data[matched_id]["quantity"] -= 1
        with open(self.file_path, "w") as file:
            json.dump(data, file, indent=4)
        with open("issued_books.json", "w") as file:
            json.dump(issued_book_data, file, indent=4)

        print("Congrats!! You have issued a new book.")

    def accept_issued_books(self):
        student_id = int(input("Enter your student ID: "))
        student_name = input("Enter your name: ")
        return_book = input("Enter the book name you want to return: ").replace(" ", "").lower()

        try:
            with open("issued_books.json", "r") as file:
                issued_book_data = json.load(file)
        except:
            print("No books have been issued yet.")
            return

        for student in issued_book_data:
            if student["studentId"] == student_id and student["studentName"].lower() == student_name.lower():
                for book in student["issuedBooks"]:
                    if book["book"] == return_book:
                        self.fine = self.calculate_fine(book["issuedTime"])
                        if self.fine > 0:
                            print(f"Please pay the fine of ₹{self.fine} before returning the book.")
                            return
                        student["issuedBooks"].remove(book)
                        if not student["issuedBooks"]:
                            issued_book_data.remove(student)

                        with open(self.file_path, "r") as book_file:
                            books_data = json.load(book_file)
                        for key in books_data:
                            if books_data[key]["book_name"].replace(" ", "").lower() == return_book:
                                books_data[key]["quantity"] += 1
                                break
                        with open(self.file_path, "w") as file:
                            json.dump(books_data, file, indent=4)
                        with open("issued_books.json", "w") as file:
                            json.dump(issued_book_data, file, indent=4)
                        print("Book returned successfully.")
                        return
                print("Book not found in your issued list.")
                return
        print("Student not found.")

    def show_books(self):
        if not os.path.exists(self.file_path):
            print("No books in the library.")
            return
        with open(self.file_path, "r") as file:
            books_data = json.load(file)
        print("\n📚 Available Books in Library")
        print("{:<5} {:<25} {:<10} {:<10}".format("ID", "Book Name", "Cost", "Qty"))
        for key, book in books_data.items():
            print("{:<5} {:<25} {:<10} {:<10}".format(key, book['book_name'], book['cost'], book['quantity']))

    def show_issued_books(self):
        try:
            with open("issued_books.json", "r") as file:
                issued_data = json.load(file)
        except:
            print("No issued books found.")
            return

        print("\n🧾 Issued Books List")
        for student in issued_data:
            print(f"\nStudent: {student['studentName']} (ID: {student['studentId']})")
            for book in student["issuedBooks"]:
                fine = self.calculate_fine(book["issuedTime"])
                issued_time = datetime.strptime(book["issuedTime"], "%Y-%m-%d %H:%M:%S")
                print(f"  📖 {book['book']} - Issued on {issued_time.strftime('%d %b %Y %H:%M:%S')} - Fine: ₹{fine}")

    def pay_fine(self):
        student_id = int(input("Enter your student ID: "))
        student_name = input("Enter your name: ")

        try:
            with open("issued_books.json", "r") as file:
                issued_data = json.load(file)
        except:
            print("No issued books found.")
            return

        for student in issued_data:
            if student["studentId"] == student_id and student["studentName"].lower() == student_name.lower():
                total_fine = 0
                for book in student["issuedBooks"]:
                    fine = self.calculate_fine(book["issuedTime"])
                    total_fine += fine

                if total_fine == 0:
                    print("✅ You have no pending fine.")
                    return

                confirm = input(f"You have a fine of ₹{total_fine}. Pay now? (yes/no): ").lower()
                if confirm == "yes":
                    for book in student["issuedBooks"]:
                        book["issuedTime"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    with open("issued_books.json", "w") as file:
                        json.dump(issued_data, file, indent=4)
                    print("✅ Fine paid successfully. Timer reset.")
                else:
                    print("Payment cancelled.")
                return
        print("❌ Student not found.")

    def show_fine(self):
        student_id = int(input("Enter your student ID: "))
        student_name = input("Enter your name: ")
        try:
            with open("issued_books.json", "r") as file:
                issued_data = json.load(file)
        except:
            print("No issued books found.")
            return

        for student in issued_data:
            if student["studentId"] == student_id and student["studentName"].lower() == student_name.lower():
                total_fine = 0
                for book in student["issuedBooks"]:
                    fine = self.calculate_fine(book["issuedTime"])
                    total_fine += fine
                if total_fine == 0:
                    print("✅ You have no pending fine.")
                else:
                    print(f"⚠️ You have a total fine of ₹{total_fine}. Please pay before returning books.")
                return
        print("❌ Student not found.")

    def remove_book(self):
        adminid = input("Please enter Admin id: ")
        password = int(input("Please enter Admin password: "))
        if adminid.replace(" ", "").lower() == os.getenv("ADMIN_ID").replace(" ", "").lower() and password.replace(" ", "") == os.getenv("ADMIN_PASSWORD").replace(" ", ""):
            book_to_remove = input("Enter the book name you want to remove: ").replace(" ", "").lower()

            try:
                with open(self.file_path, "r") as file:
                    books_data = json.load(file)
            except:
                print("No books available.")
                return

            for key in list(books_data.keys()):
                if books_data[key]["book_name"].replace(" ", "").lower() == book_to_remove:
                    confirm = input(f"Are you sure you want to remove '{books_data[key]['book_name']}'? (yes/no): ").lower()
                    if confirm == "yes":
                        del books_data[key]
                        with open(self.file_path, "w") as file:
                            json.dump(books_data, file, indent=4)
                        print("✅ Book removed from library.")
                    else:
                        print("Cancelled.")
                    return

            print("❌ Book not found in library.")
        else:
            print("Invalid Admin credentials\nCannot remove the book")