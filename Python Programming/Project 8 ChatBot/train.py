from bot.support_bot import SupportBot

bot = SupportBot("data/responses.json")
print("Chatbot is trained")
for intent in bot.responses:
    print(" -", intent)
