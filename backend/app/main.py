from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.upload import router as upload_router
from app.routes.qa import router as qa_router
from app.routes.summary import router as summary_router
from app.routes.history import router as history_router
from app.routes.documents import router as document_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(qa_router)
app.include_router(summary_router)
app.include_router(history_router)
app.include_router(document_router)

@app.get("/")
def root():
    return {"message": "AI Research Assistant Backend Running "}