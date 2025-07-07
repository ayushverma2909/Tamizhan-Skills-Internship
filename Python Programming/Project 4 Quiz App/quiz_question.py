import requests

class QuizData:
    def quizdata(self):
        parameters = {
            "amount": 10,
            "type": "multiple"
        }

        response = requests.get(url="https://opentdb.com/api.php", params=parameters )
        return response.json()
