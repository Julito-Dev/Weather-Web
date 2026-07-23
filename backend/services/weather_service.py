import requests

class WheatherService:
    
    def get_latitude(self, city: str):
        params = {
            "name": city
        }

        url = "https://geocoding-api.open-meteo.com/v1/search"
        response = requests.get(url, params=params)
        
        data = response.json()
        
        if "results" not in data:
            return None
        
        latitude = data["results"][0]["latitude"]
        longitude = data["results"][0]["longitude"]
        
        return latitude, longitude
    
    def consult_weather(self, lat, lon, city):
        params = {
            "latitude": lat,
            "longitude": lon,
            "current": "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability"
        }
        
        url = "https://api.open-meteo.com/v1/forecast"
        
        response = requests.get(url, params=params)
        data = response.json()
        
        result = {
            "city": city,
            "temperature": data["current"]["temperature_2m"],
            "humidity": data["current"]["relative_humidity_2m"],
            "apparent_temperature": data["current"]["apparent_temperature"],
            "precipitation_probability": data["current"]["precipitation_probability"]
        }
         
        return result
    
        

    def search(self, city: str):
        coords = self.get_latitude(city)
        
        if coords is not None:
            lat, lon = coords
            return self.consult_weather(lat, lon, city)
            
        else: 
            print("NO city Valid") 
            return False
            

