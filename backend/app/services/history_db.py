import json
import os


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FILE_NAME = os.path.join(BASE_DIR, "history.json")

def load_history():
    if not os.path.exists(FILE_NAME):
        return []
    with open(FILE_NAME, "r", encoding="utf-8") as file:
        return json.load(file)

def save_history(data):
    with open(FILE_NAME, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4)

def add_to_history(item):
    history = load_history()
    history.insert(0, item)
    save_history(history)
