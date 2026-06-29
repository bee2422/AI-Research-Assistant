from fastapi import APIRouter
from app.services.vector_db import delete_document

router = APIRouter()

@router.delete("/delete/{doc_id}")
def delete_pdf(doc_id: str):
    delete_document(doc_id)
    return {"message": "Document deleted successfully"}