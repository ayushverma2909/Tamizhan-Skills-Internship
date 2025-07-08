import json
from bot.intent_matcher import match_intent

class SupportBot:
    def __init__(self, response_file):
        with open(response_file, 'r', encoding='utf-8') as f:
            self.responses = json.load(f)

    def get_response(self, user_message):
        intent = match_intent(user_message)
        return self.responses.get(intent, "Sorry, I didn't understand that.")
