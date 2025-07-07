import requests
import os
from dotenv import load_dotenv
load_dotenv()


class WeatherFetcher:
    def get_weather(self, city):
        API_KEY = os.getenv("API_ID")
        BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

        params = {
            "q": city,
            "appid": API_KEY,
            "units": "metric"
        }

        try:
            response = requests.get(BASE_URL, params=params)
            return response.json()
        except Exception as e:
            return {"error": str(e)}
        
# weather = WeatherFetcher()
# print(weather.get_weather("varanasi"))

# {'coord': {'lon': 83, 'lat': 25.3333}, 'weather': [{'id': 804, 'main': 'Clouds', 'description': 'overcast clouds', 'icon': '04d'}], 'base': 'stations', 'main': {'temp': 35.74, 'feels_like': 40.82, 'temp_min': 35.74, 'temp_max': 35.74, 'pressure': 997, 'humidity': 46, 'sea_level': 997, 'grnd_level': 989}, 'visibility': 10000, 'wind': {'speed': 5.24, 'deg': 94, 'gust': 5.78}, 'clouds': {'all': 98}, 'dt': 1751530204, 'sys': {'country': 'IN', 'sunrise': 1751499700, 'sunset': 
# 1751548944}, 'timezone': 19800, 'id': 1253405, 'name': 'Varanasi', 'cod': 200}
