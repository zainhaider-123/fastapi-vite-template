from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

ROOT_DIR = Path(__file__).resolve().parent.parent

app = FastAPI()

templates = Jinja2Templates(directory=ROOT_DIR / "template")


@app.get("/")
async def index(request: Request):
    return templates.TemplateResponse(request, "pages/index.html")


app.mount("/static", StaticFiles(directory=ROOT_DIR / "static"), name="static")
