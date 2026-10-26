import os
import threading
from typing import Optional
from fastapi import FastAPI, BackgroundTasks, HTTPException, Query, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from backend.config import config, PDF_DIR, CHROMA_DIR, COLLECTION_NAME
from backend.models import (
    QueryRequest,
    QueryResponse,
    IngestionReport,
    SettingsUpdateRequest,
)
from backend.ingestion import (
    run_ingestion_pipeline,
    get_current_ingestion_report,
    get_collection,
    ingestion_state,
)
from backend.rag_engine import execute_rag_pipeline

app = FastAPI(
    title="Municipal Grievance RAG Portal API",
    description="Enterprise Knowledge-Base Retrieval-Augmented Generation for Municipal Grievances",
    version="1.0.0"
)

# Approved CORS origins for security
cors_origins_env = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:5174,http://localhost:5000,http://127.0.0.1:5173,http://127.0.0.1:5174,http://127.0.0.1:5000"
)
approved_origins = [o.strip() for o in cors_origins_env.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=approved_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

RAG_ADMIN_KEY = os.getenv("RAG_ADMIN_KEY", "").strip()

def verify_admin_access(x_admin_key: Optional[str] = Header(None)):
    if RAG_ADMIN_KEY and x_admin_key != RAG_ADMIN_KEY:
        raise HTTPException(status_code=403, detail="Unauthorized: Administrative endpoint protected.")

@app.on_event("startup")
def startup_event():
    try:
        col = get_collection()
        if col.count() == 0:
            print("[INFO] ChromaDB collection is empty. Starting background document ingestion...")
            thread = threading.Thread(target=run_ingestion_pipeline, kwargs={"force": False}, daemon=True)
            thread.start()
    except Exception as e:
        print(f"[WARN] Error in startup check: {e}")

@app.get("/api/health")
def health_check():
    try:
        col = get_collection()
        total_chunks = col.count()
    except Exception:
        total_chunks = 0
        
    return {
        "status": "healthy",
        "service": "Municipal Grievance RAG Engine",
        "total_chunks": total_chunks,
        "gemini_configured": bool(config.gemini_api_key),
        "model": config.gemini_model,
        "default_top_k": config.top_k
    }

@app.post("/api/query", response_model=QueryResponse)
def query_rag(request: QueryRequest):
    if not request.query or not request.query.strip():
        raise HTTPException(status_code=400, detail="Query text cannot be empty.")
    response = execute_rag_pipeline(request)
    return response

@app.post("/api/ingest", response_model=IngestionReport)
def trigger_ingestion(background_tasks: BackgroundTasks, force: bool = False, x_admin_key: Optional[str] = Header(None)):
    verify_admin_access(x_admin_key)
    if ingestion_state["is_indexing"]:
        return get_current_ingestion_report()
        
    background_tasks.add_task(run_ingestion_pipeline, force=force)
    return get_current_ingestion_report()

@app.get("/api/ingest/status", response_model=IngestionReport)
def get_ingest_status():
    return get_current_ingestion_report()

@app.get("/api/documents")
def list_documents():
    report = get_current_ingestion_report()
    return {
        "total_documents": report.total_files,
        "total_chunks": report.total_chunks,
        "documents": report.documents
    }

@app.get("/api/settings")
def get_settings():
    return {
        "gemini_api_key_configured": bool(config.gemini_api_key),
        "gemini_api_key_masked": f"{config.gemini_api_key[:4]}...{config.gemini_api_key[-4:]}" if len(config.gemini_api_key) > 8 else ("Configured" if config.gemini_api_key else "Not set"),
        "gemini_model": config.gemini_model,
        "top_k": config.top_k,
        "supported_models": [
            "gemini-2.5-flash",
            "gemini-3.5-flash",
            "gemini-3.8-flash",
            "gemini-3.8-flash-lite",
            "gemini-flash-latest"
        ]
    }

@app.post("/api/settings")
def update_settings(update: SettingsUpdateRequest, x_admin_key: Optional[str] = Header(None)):
    verify_admin_access(x_admin_key)
    if update.gemini_api_key is not None:
        config.gemini_api_key = update.gemini_api_key.strip()
        os.environ["GEMINI_API_KEY"] = config.gemini_api_key
        # Also persist to .env
        try:
            env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
            with open(env_path, "a", encoding="utf-8") as f:
                f.write(f"\nGEMINI_API_KEY={config.gemini_api_key}\n")
        except Exception:
            pass

    if update.gemini_model:
        config.gemini_model = update.gemini_model.strip()

    if update.top_k:
        config.top_k = update.top_k

    return {
        "message": "Settings updated successfully",
        "gemini_api_key_configured": bool(config.gemini_api_key),
        "gemini_model": config.gemini_model,
        "top_k": config.top_k
    }

# Mount static files if frontend/dist exists
from pathlib import Path
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

frontend_dist = Path(__file__).resolve().parent.parent / "frontend" / "dist"
if frontend_dist.exists():
    app.mount("/assets", StaticFiles(directory=str(frontend_dist / "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        file_path = frontend_dist / full_path
        if file_path.exists() and file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(frontend_dist / "index.html")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("RAG_PORT", "8001"))
    uvicorn.run("backend.app:app", host="127.0.0.1", port=port, reload=True)
