import requests

class WheatherService:
    
    def get_coords(self, city: str):
        params = {
            "name": city
        }

        url = "https://geocoding-api.open-meteo.com/v1/search"
        response = requests.get(url, params=params)
        
        data = response.json()
        
        results = data.get("results")
        
        if not results:
            return None
        
        latitude = data["results"][0]["latitude"]
        longitude = data["results"][0]["longitude"]
        
        return latitude, longitude
    
    def consult_weather(self, lat, lon):
        params = {
            "latitude": lat,
            "longitude": lon,
            "current": "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code"
        }
        
        url = "https://api.open-meteo.com/v1/forecast"
        
        response = requests.get(url, params=params)
        data = response.json()
        
        result = {
            "temperature": data["current"]["temperature_2m"],
            "humidity": data["current"]["relative_humidity_2m"],
            "apparent_temperature": data["current"]["apparent_temperature"],
            "precipitation_probability": data["current"]["precipitation_probability"],
            "weather_code": data["current"]["weather_code"]
        }
         
        return result
    
    
    def search(self, city: str):
        
        coords = self.get_coords(city)
        
        if coords is None:
            return None

        lat, lon = coords
        

        weather = self.consult_weather(lat, lon)
        weather["city"] = city        
        
        return weather
        
        
clima = WheatherService()

print(clima.search("Bogota"))
            

