from fastapi import APIRouter

from annotated_types import doc
from fastapi import FastAPI,Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from models.note import Note

from config.db import client
from schemas.note import noteEntity, notesEntity


note = APIRouter()
templates = Jinja2Templates(directory="templates")
# note.mount("/static", StaticFiles(directory="static"), name="static")
@note.get("/", response_class=HTMLResponse)



@note.get("/", response_class=HTMLResponse)
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

@note.post("/")
def add_note(note: Note):
    inserted_note = client.notes.notes.insert_one(dict(note))
    return noteEntity(inserted_note)