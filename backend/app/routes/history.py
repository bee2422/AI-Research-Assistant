from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.history_db import load_history, save_history

router = APIRouter()


class FavoriteRequest(BaseModel):
    favorite: bool


@router.get("/history")
def get_history():
    return load_history()


@router.delete("/history/clear")
def clear_history():
    save_history([])
    return {
        "message": "History cleared successfully"
    }


@router.delete("/history/{paper_index}")
def delete_paper(paper_index: int):
    history = load_history()

    if paper_index >= len(history):
        raise HTTPException(
            status_code=404,
            detail="Paper not found"
        )

    history.pop(paper_index)
    save_history(history)

    return {
        "message": "Paper deleted successfully"
    }


@router.delete("/history/{paper_index}/chat/{chat_index}")
def delete_chat(
    paper_index: int,
    chat_index: int
):
    history = load_history()

    if paper_index >= len(history):
        raise HTTPException(
            status_code=404,
            detail="Paper not found"
        )

    if chat_index >= len(
        history[paper_index]["chat_history"]
    ):
        raise HTTPException(
            status_code=404,
            detail="Chat not found"
        )

    history[paper_index]["chat_history"].pop(
        chat_index
    )

    save_history(history)

    return {
        "message": "Chat deleted successfully"
    }


@router.put("/history/{paper_index}/favorite")
def toggle_favorite(
    paper_index: int,
    data: FavoriteRequest
):
    history = load_history()

    if paper_index >= len(history):
        raise HTTPException(
            status_code=404,
            detail="Paper not found"
        )

    history[paper_index]["favorite"] = data.favorite

    save_history(history)

    return {
        "message": "Favorite updated"
    }


def add_chat(question, answer):
    history = load_history()

    if len(history) > 0:
        history[0]["chat_history"].append({
            "question": question,
            "answer": answer
        })

        save_history(history)