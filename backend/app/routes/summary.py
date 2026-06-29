from fastapi import APIRouter
import app.routes.upload as upload
from app.services.summarizer import generate_summary

router = APIRouter()


@router.post("/generate-summary")
async def generate_pdf_summary():

    # Check if a PDF has been uploaded
    if not upload.current_pdf_text:
        return {
            "summary": "No PDF uploaded."
        }

    try:
        summary = generate_summary(
            upload.current_pdf_text[:12000]
        )

        return {
            "summary": summary
        }

    except Exception as e:
        return {
            "summary": f"Error generating summary: {str(e)}"
        }