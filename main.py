from multiprocessing import process
from typing import Union
import os
from annotated_types import doc
from fastapi import FastAPI,Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pymongo import MongoClient
app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")
client = MongoClient("mongodb+srv://muhiudin:%40Allah786@cluster0.p66gpwl.mongodb.net/?retryWrites=true&w=majority")

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get("/", response_class=HTMLResponse)
async def read_item(request: Request):
    docs = client.notes.notes.find({})
    newDocs = []
    for doc in docs:
        newDocs.append({
            "id": doc["_id"],
            "title": doc["title"],
            "content": doc["content"]
        })
        print(newDocs)
    

    return templates.TemplateResponse(
        "index.html",
        {"request": request,
         "newDocs": newDocs}  # make sure key is 'notes'
    )

