# 📖 Chat with PDF

> An AI-powered module that lets teachers upload educational PDFs and instantly interact with them — extracting knowledge, asking questions, and generating custom material using semantic search and Gemini LLM.

---

## 🧠 Overview

Traditional PDF reading is slow and manual. **Chat with PDF** solves this by converting any uploaded PDF into a searchable, conversational knowledge base — powered by vector embeddings and Google's Gemini API.

Teachers can ask natural language questions like:
- *"Summarize Chapter 3 in simple terms"*
- *"List all key formulas from this document"*
- *"Create 5 MCQs based on this topic"*

And get contextual, intelligent answers in seconds.

---

## 🔄 How It Works

```
Teacher Uploads PDF
        │
        ▼
 Multiple PDFs accepted as input
        │
        ▼
  Messaging Queue (async processing)
        │
        ▼
  Worker (Node.js) — picks one PDF at a time
        │
        ▼
  PDF → Chunks (LangChain document loaders + text splitters)
        │
        ▼
  Vector Embedding (each chunk embedded)
        │
        ▼
  Stored in VectorDB (Qdrant)
        
        
── At Query Time ──────────────────────

  Teacher asks a Question
        │
        ▼
  Query → Vector Embedding
        │
        ▼
  Semantic Search → Qdrant fetches relevant chunks
        │
        ▼
  Relevant chunks + Original Query → Gemini LLM
        │
        ▼
  Contextual Answer → Output to Teacher
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| LLM | Google Gemini API |
| Embedding & Chunking | LangChain (PDFLoader + RecursiveTextSplitter) |
| Vector Database | Qdrant |
| Queue / Worker | Node.js + Messaging Queue |
| Auth & File Storage | Firebase (optional) |
| Backend | Node.js / Express |

---

## 🚀 Features

- **Multi-PDF support** — upload multiple PDFs; each is processed independently via a queue-based worker
- **Smart chunking** — LangChain splits PDFs into overlapping chunks to preserve context across boundaries
- **Semantic search** — vector similarity search ensures only the most relevant content is sent to the LLM
- **Gemini-powered answers** — responses are personalized, contextual, and grounded in the actual PDF content
- **Async processing** — messaging queue prevents blocking; large PDFs are handled gracefully in the background
- **Scalable storage** — Qdrant stores embeddings persistently, so PDFs don't need re-processing on every query

---

## 🧩 Key Design Decisions

**Why a message queue?**
Large PDFs can take time to chunk and embed. A queue ensures the API stays responsive and each PDF is processed reliably without dropping requests.

**Why Qdrant over other vector DBs?**
Qdrant offers high-performance approximate nearest neighbor (ANN) search, a clean REST API, and easy Docker setup — ideal for self-hosted deployments.

**Why LangChain for chunking?**
LangChain's `RecursiveCharacterTextSplitter` handles edge cases like tables, headers, and large paragraphs gracefully, with configurable chunk size and overlap to preserve semantic context.

---

## 📌 Future Improvements

- [ ] Support for DOCX and image-based PDFs (OCR)
- [ ] Multi-user session management with Firebase Auth
- [ ] Streaming responses for large answers
- [ ] Teacher dashboard to manage uploaded PDFs
- [ ] Auto-generate quizzes and summaries from uploaded material

---

## 👤 Author

Built by **[Mohsinali]** · [GitHub](https://github.com/mohsin7046)

---

## 📄 License

MIT License — feel free to use, modify, and distribute.
