from multiprocessing import process
from typing import Union

from fastapi import FastAPI,Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pymongo import MongoClient
app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")
URI = "mongodb+srv://muhiudin:@Allah786@cluster0.p66gpwl.mongodb.net/notes"
client = MongoClient(URI)
db = client["notes"]
collection = db["All Notes"]

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get("/", response_class=HTMLResponse)
async def read_item(request: Request):
    note = {}
    data = collection.find()
    print(data)
    return templates.TemplateResponse(
        request=request, name="index.html", context={"id": id}
    )