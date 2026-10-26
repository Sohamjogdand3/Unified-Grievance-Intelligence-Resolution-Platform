import os
from typing import Optional
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
PDF_DIR = Path(os.getenv("RAG_PDF_DIR", str(BASE_DIR / "knowledge_base" / "pdfs")))
CHROMA_DIR = Path(os.getenv("RAG_CHROMA_DIR", str(BASE_DIR / "knowledge_base" / "chroma_db")))
MANIFEST_FILE = Path(os.getenv("RAG_MANIFEST_FILE", str(BASE_DIR / "knowledge_base" / "index_manifest.json")))
ENV_FILE = Path(os.getenv("RAG_ENV_FILE", str(BASE_DIR / ".env")))

# Load local .env first
if ENV_FILE.exists():
    load_dotenv(dotenv_path=ENV_FILE)

# Fallback: also load from main project backend/.env if present
PARENT_BACKEND_ENV = BASE_DIR.parent / "backend" / ".env"
if PARENT_BACKEND_ENV.exists():
    load_dotenv(dotenv_path=PARENT_BACKEND_ENV)

# Configuration settings
COLLECTION_NAME = os.getenv("RAG_COLLECTION_NAME", "grievance_knowledge_base")
DEFAULT_CHUNK_SIZE = int(os.getenv("RAG_CHUNK_SIZE", "1200"))
DEFAULT_CHUNK_OVERLAP = int(os.getenv("RAG_CHUNK_OVERLAP", "250"))
DEFAULT_TOP_K = int(os.getenv("DEFAULT_TOP_K", "5"))

class AppConfig:
    _gemini_api_key: Optional[str] = None
    _gemini_model: Optional[str] = None
    _top_k: Optional[int] = None

    @property
    def gemini_api_key(self) -> str:
        if self._gemini_api_key is not None:
            return self._gemini_api_key
        if ENV_FILE.exists():
            load_dotenv(dotenv_path=ENV_FILE, override=True)
        key = os.getenv("GEMINI_API_KEY", os.getenv("GOOGLE_API_KEY", "")).strip()
        if not key and PARENT_BACKEND_ENV.exists():
            load_dotenv(dotenv_path=PARENT_BACKEND_ENV, override=False)
            key = os.getenv("GEMINI_API_KEY", os.getenv("GOOGLE_API_KEY", "")).strip()
        return key

    @gemini_api_key.setter
    def gemini_api_key(self, val: str):
        self._gemini_api_key = val.strip()

    @property
    def gemini_model(self) -> str:
        if self._gemini_model is not None:
            return self._gemini_model
        load_dotenv(dotenv_path=ENV_FILE, override=True)
        return os.getenv("GEMINI_MODEL", "gemini-2.5-flash").strip()

    @gemini_model.setter
    def gemini_model(self, val: str):
        self._gemini_model = val.strip()

    @property
    def top_k(self) -> int:
        if self._top_k is not None:
            return self._top_k
        load_dotenv(dotenv_path=ENV_FILE, override=True)
        return int(os.getenv("DEFAULT_TOP_K", "5"))

    @top_k.setter
    def top_k(self, val: int):
        self._top_k = val

config = AppConfig()
