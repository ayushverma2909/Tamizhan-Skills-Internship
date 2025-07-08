import os
from menu import Menu
from books import Books

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

main_menu = Menu()
books = Books()

app_is_running = True
while app_is_running:
    clear_screen()
    main_menu.mainMenu()
    try:
        choice = int(input("\nPlease Enter your choice: "))
        clear_screen()
        if choice == 1:
            books.adding_book()
        elif choice == 2:
            books.issue_books_to_students()
        elif choice == 3:
            books.accept_issued_books()
        elif choice == 4:
            books.show_issued_books()
        elif choice == 5:
            books.show_books()
        elif choice == 6:
            books.show_fine()
        elif choice == 7:
            books.pay_fine()
        elif choice == 8:
            books.remove_book()
        elif choice == 9:
            print("Goodbye!")
            app_is_running = False
        else:
            print("Please select a valid option (1-9).")
    except ValueError:
        print("Invalid input. Please enter a number.")
    input("\nPress Enter to continue...")