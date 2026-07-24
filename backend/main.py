from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from services.weather_service import WheatherService


app = FastAPI()

templates = Jinja2Templates(directory="../templates")
app.mount("/static", StaticFiles(directory="../static"), name="static")

service = WheatherService()

@app.get("/")
def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.HTML"
    )

@app.get("/weather")
async def weather(city: str):
    return service.search(city)
