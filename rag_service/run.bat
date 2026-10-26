@echo off
title NagrikConnect AI - Municipal Grievance RAG Service
echo =====================================================================
echo       NAGRIKCONNECT AI - MUNICIPAL GRIEVANCE RAG SERVICE
echo =====================================================================
echo [INFO] Service Port: 8001
echo [INFO] Knowledge Base: 31 Official Municipal Documents (5,158 Chunks)
echo.

if exist "venv\Scripts\python.exe" (
    echo [INFO] Using isolated virtual environment (rag_service\venv)...
    venv\Scripts\python.exe -m uvicorn backend.app:app --host 127.0.0.1 --port 8001 --reload
) else (
    echo [INFO] Using system Python environment...
    python -m uvicorn backend.app:app --host 127.0.0.1 --port 8001 --reload
)

pause
