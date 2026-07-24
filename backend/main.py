from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from services.weather_service import WheatherService
import random

app = FastAPI()

templates = Jinja2Templates(directory="../templates")
app.mount("/static", StaticFiles(directory="../static"), name="static")

service = WheatherService()



CITIES = ["Bogota", "Buenos Aires", "London", "Paris", "Madrid", "Sydney", "Washington", "New York", "Lima", "Sao Paulo", "Monaco", "Cairo", "Santiago", "Tokyo"]

@app.get("/")
def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.HTML"
    )

@app.get("/weather")
async def weather(city: str):
    return service.search(city)


@app.get("/feature")
async def randomSearch():
    cities = random.sample(CITIES, 4)
    
    weather_cities = []
    
    for city in cities:
        weather_cities.append(service.search(city))
        
    return weather_cities

