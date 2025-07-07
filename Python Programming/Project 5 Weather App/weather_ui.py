import tkinter as tk
from tkinter import PhotoImage
from weather_data import WeatherFetcher

class WeatherApp:
    def __init__(self, root):
        self.root = root
        self.root.title("🌤️ Weather App")
        self.root.geometry("500x600")
        self.root.configure(bg="#e6f0ff")
        self.root.resizable(False, False)

        self.fetcher = WeatherFetcher()
        self.city_var = tk.StringVar()

        tk.Label(root, text="Weather Forecast", font=("Helvetica", 20, "bold"), bg="#e6f0ff", fg="#003366").pack(pady=10)

        entry_frame = tk.Frame(root, bg="#e6f0ff")
        entry_frame.pack(pady=10)

        self.city_entry = tk.Entry(entry_frame, textvariable=self.city_var, font=("Helvetica", 14), width=25, bd=2, relief="groove")
        self.city_entry.pack(side=tk.LEFT, padx=10)

        self.search_btn = tk.Button(entry_frame, text="Search", command=self.search_weather, bg="#3399ff", fg="white", font=("Helvetica", 12), relief="flat")
        self.search_btn.pack(side=tk.LEFT)

        # Icon
        self.icon_label = tk.Label(root, bg="#e6f0ff")
        self.icon_label.pack(pady=10)

        # Info
        self.info_frame = tk.Frame(root, bg="#e6f0ff")
        self.info_frame.pack(pady=5)

        self.location_label = tk.Label(self.info_frame, text="", font=("Helvetica", 16, "bold"), bg="#e6f0ff", fg="#003366")
        self.location_label.pack()

        self.temp_label = tk.Label(self.info_frame, text="", font=("Helvetica", 26, "bold"), bg="#e6f0ff", fg="#333333")
        self.temp_label.pack(pady=5)

        self.desc_label = tk.Label(self.info_frame, text="", font=("Helvetica", 14, "italic"), bg="#e6f0ff")
        self.desc_label.pack()

        self.details_label = tk.Label(root, text="", font=("Helvetica", 12), bg="#e6f0ff")
        self.details_label.pack(pady=10)

        self.status_label = tk.Label(root, text="", font=("Helvetica", 10), fg="red", bg="#e6f0ff")
        self.status_label.pack(pady=5)

    def search_weather(self):
        city = self.city_var.get().strip()
        if not city:
            self.status_label.config(text="Enter a city name.")
            return

        data = self.fetcher.get_weather(city)
        if "error" in data or data.get("cod") != 200:
            self.status_label.config(text="Unable to fetch weather data.")
            return

        name = data['name']
        country = data['sys']['country']
        temp = data['main']['temp']
        feels = data['main']['feels_like']
        humidity = data['main']['humidity']
        wind = data['wind']['speed']
        clouds = data['clouds']['all']
        desc = data['weather'][0]['description'].capitalize()
        icon_code = data['weather'][0]['icon']

        self.location_label.config(text=f"{name}, {country}")
        self.temp_label.config(text=f"{temp:.1f}°C")
        self.desc_label.config(text=desc)
        self.details_label.config(
            text=f"Feels like: {feels:.1f}°C\nHumidity: {humidity}%\nWind: {wind} m/s\nClouds: {clouds}%"
        )
        self.status_label.config(text="")

        try:
            icon_path = f"icons/{icon_code}.png"
            self.icon = PhotoImage(file=icon_path)
            self.icon_label.config(image=self.icon)
        except:
            self.icon_label.config(image="", text="[Icon Missing]")
