from fastapi import APIRouter, UploadFile, File
from app.services.vector_db import store_text
from app.services.history_db import add_to_history
import uuid
import io
import asyncio
import datetime
from concurrent.futures import ThreadPoolExecutor
import pypdf

router = APIRouter()
current_pdf_text = ""

_executor = ThreadPoolExecutor(max_workers=2)


def _parse_pdf_sync(file_bytes: bytes) -> str:
    reader = pypdf.PdfReader(io.BytesIO(file_bytes))
    pages = []
    for page in reader.pages:
        text = page.extract_text()
        if text:
            pages.append(text)
    return "\n".join(pages)


def _store_sync(text: str, doc_id: str, filename: str):
    store_text(text, doc_id, filename)


@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    global current_pdf_text

    try:
        doc_id = str(uuid.uuid4())

        content = await file.read()

        loop = asyncio.get_running_loop()

        current_pdf_text = await loop.run_in_executor(
            _executor, _parse_pdf_sync, content
        )

        if not current_pdf_text or len(current_pdf_text.strip()) < 50:
            return {"error": "PDF me text nahi mila ya file empty hai"}

        await loop.run_in_executor(
            _executor, _store_sync, current_pdf_text, doc_id, file.filename
        )

        # ✅ History mein naya entry add (yeh part missing tha)
        add_to_history({
            "name": file.filename,
            "doc_id": doc_id,
            "date": datetime.datetime.now().strftime("%d %b %Y, %I:%M %p"),
            "favorite": False,
            "chat_history": []
        })

        return {
            "message": "File uploaded successfully",
            "filename": file.filename,
            "doc_id": doc_id
        }

    except Exception as e:
        return {"error": str(e)}