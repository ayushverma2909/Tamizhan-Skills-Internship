from bot.support_bot import SupportBot
import os

bot = SupportBot("data/responses.json")

os.system("clear")
print("Welcome!!\n")
while True:
    msg = input("You: ")
    if msg.lower() in ["exit", "quit", "bye"]:
        print("Bot:", bot.get_response("exit"))
        break
    print("Bot:", bot.get_response(msg))
