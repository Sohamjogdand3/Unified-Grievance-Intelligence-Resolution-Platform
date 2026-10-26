const express = require("express");
const axios = require("axios");
const router = express.Router();
const { getUser } = require("../authservice");

// Base URL for the separate RAG FastAPI service
const RAG_SERVICE_URL = (process.env.RAG_SERVICE_URL || "http://127.0.0.1:8001").replace(/\/+$/, "");

/**
 * Health check endpoint for Knowledge Base RAG service
 * GET /query/health or GET /health
 */
router.get("/health", async (req, res) => {
    try {
        const response = await axios.get(`${RAG_SERVICE_URL}/api/health`, {
            timeout: 5000
        });
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(503).json({
            status: "unavailable",
            message: "RAG Knowledge Base service is currently offline.",
            serviceUrl: RAG_SERVICE_URL
        });
    }
});

/**
 * POST /api/knowledge/query
 * Main query endpoint for citizens & officers
 */
router.post("/query", async (req, res) => {
    try {
        const { query, role, top_k, filter_doc } = req.body || {};

        // 1. Validation & Input Length limits
        if (!query || typeof query !== "string") {
            return res.status(400).json({
                error: "Invalid request. A text 'query' is required."
            });
        }

        const trimmedQuery = query.trim();
        if (trimmedQuery.length < 3) {
            return res.status(400).json({
                error: "Query is too short. Please enter at least 3 characters."
            });
        }

        if (trimmedQuery.length > 1000) {
            return res.status(400).json({
                error: "Query exceeds the maximum allowed length of 1000 characters."
            });
        }

        // 2. Role Security Enforcement
        // Public knowledge base queries default to 'citizen'.
        // If 'officer' is requested, verify officer/admin JWT from cookie.
        let verifiedRole = "citizen";
        if (role === "officer") {
            const token = req.cookies?.token;
            const decoded = getUser(token);
            if (decoded && (decoded.user?.role === "officer" || decoded.user?.role === "admin" || decoded.user?.role === "superadmin")) {
                verifiedRole = "officer";
            } else {
                // Deny privilege escalation; fallback safely to citizen role
                verifiedRole = "citizen";
            }
        }

        // 3. Clamped top_k parameter
        let validatedTopK = 5;
        if (typeof top_k === "number" && !isNaN(top_k)) {
            validatedTopK = Math.max(1, Math.min(10, Math.floor(top_k)));
        }

        // 4. Forward to RAG FastAPI service
        const ragPayload = {
            query: trimmedQuery,
            role: verifiedRole,
            top_k: validatedTopK,
            filter_doc: typeof filter_doc === "string" && filter_doc.trim() ? filter_doc.trim() : null
        };

        const response = await axios.post(`${RAG_SERVICE_URL}/api/query`, ragPayload, {
            headers: {
                "Content-Type": "application/json"
            },
            timeout: 60000 // 60-second timeout for RAG retrieval + LLM synthesis
        });

        // 5. Return standardized RAG response schema to frontend
        return res.status(200).json(response.data);

    } catch (error) {
        // Handle timeout & upstream service failures gracefully
        if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND" || error.code === "ECONNABORTED") {
            console.error(`[Knowledge Router] RAG service unavailable at ${RAG_SERVICE_URL}:`, error.message);
            return res.status(503).json({
                error: "The AI Knowledge Base service is currently starting up or unreachable. Please consult the FAQ list below or try again shortly.",
                is_grounded: false,
                serviceUnavailable: true
            });
        }

        if (error.response) {
            // Upstream returned HTTP error
            console.error(`[Knowledge Router] Upstream RAG error (${error.response.status}):`, error.response.data);
            return res.status(error.response.status).json({
                error: error.response.data?.detail || "Error processing knowledge query from upstream service.",
                is_grounded: false
            });
        }

        console.error("[Knowledge Router] Unexpected error:", error.message);
        return res.status(500).json({
            error: "An unexpected error occurred while querying the knowledge base.",
            is_grounded: false
        });
    }
});

module.exports = router;
