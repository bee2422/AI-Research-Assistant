from fastapi import APIRouter
from pydantic import BaseModel
from app.services.vector_db import search_text
from app.services.summarizer import client
from app.routes.history import add_chat

router = APIRouter()

class Question(BaseModel):
    question: str

@router.post("/ask")
async def ask_question(data: Question):
    question = data.question
    context = search_text(question)

    prompt = f"""
You are an AI Research Assistant.

Instructions:
- First, try to answer using the provided context.
- If the answer is NOT present in the context, then use your own general knowledge to answer.
- Clearly indicate:
   • "From Document:" (if answer is from context)
   • "From General Knowledge:" (if not in context)
- If user asks for "points" or "list", ALWAYS use numbered points like 1. 2. 3.
- Keep the answer concise and well detailed (max 200 lines).
- Do not repeat information.

Context:
{context}

Question:
{question}

Concise Answer:
"""

    response = client.chat.completions.create(
        model="google/gemma-3n-e4b-it",  # ✅ fix
        messages=[{"role": "user", "content": prompt}]
    )

    answer = response.choices[0].message.content
    add_chat(question, answer)

    return {"answer": answer}