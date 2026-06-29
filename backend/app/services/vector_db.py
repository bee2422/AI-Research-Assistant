import chromadb
from chromadb.utils import embedding_functions

# Persistent DB
client = chromadb.PersistentClient(path="./chroma_db")

# Load model once
embedding_function = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)

collection = client.get_or_create_collection(
    name="research_papers",
    embedding_function=embedding_function
)

print("✅ Vector DB ready — embedding model loaded")


def clear_collection():
    """
    Purana saara data hata deta hai collection se.
    Har naye PDF upload se pehle ye call hoga taaki
    collection mein sirf CURRENT PDF ka data rahe.
    Isse upsert/query speed fast rehti hai aur
    purane PDFs ke chunks search results mein nahi aate.
    """
    global collection
    try:
        client.delete_collection("research_papers")
    except Exception:
        pass  # collection already absent — ignore
    collection = client.get_or_create_collection(
        name="research_papers",
        embedding_function=embedding_function
    )


def store_text(text, doc_id, filename):
    # ✅ Naya PDF aaya -> purana data clear karo pehle
    clear_collection()

    chunk_size = 1000
    overlap = 100

    chunks = []
    i = 0
    while i < len(text):
        chunks.append(text[i:i + chunk_size])
        i += chunk_size - overlap

    ids = [f"{doc_id}_chunk_{i}" for i in range(len(chunks))]
    metadatas = [{"doc_id": doc_id, "filename": filename} for _ in chunks]

    collection.upsert(
        documents=chunks,
        ids=ids,
        metadatas=metadatas
    )


def search_text(query):
    results = collection.query(
        query_texts=[query],
        n_results=3
    )
    documents = results["documents"][0]
    return "\n".join(documents)


def delete_document(doc_id):
    collection.delete(where={"doc_id": doc_id})


def get_all_documents():
    results = collection.get()
    docs = {}
    for meta in results.get("metadatas", []):
        docs[meta["doc_id"]] = meta["filename"]
    return docs
