from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)


def generate_summary(text):
    try:
        response = client.chat.completions.create(
            model="google/gemma-3n-e4b-it",
            messages=[
                {
                    "role": "system",
                    "content": "You are a research paper summarizer. Give concise bullet points only."
                },
                {
                    "role": "user",
                    "content": f"""
Summarize this research paper.

Rules:
- Give only important points
- Maximum 6 bullet points
- Use simple language
- No extra explanation

{text[:12000]}
"""
                }
            ],
            temperature=0.3,
            max_tokens=400
        )

        return response.choices[0].message.content or "Could not generate summary."

    except Exception as e:
        print("Summary Error:", e)
        return f"Error: {str(e)}"