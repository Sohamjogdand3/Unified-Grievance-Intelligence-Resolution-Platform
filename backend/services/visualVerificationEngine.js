const exifr = require("exifr");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * Fallback list of models in order of preference (higher RPM limits first on Free Tier)
 */
const MODEL_FALLBACK_LIST = [
  "gemini-1.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-flash-8b",
  "gemini-2.5-flash",
];

/**
 * Clean user-facing error message from raw API dumps
 */
function sanitizeAiErrorMessage(err) {
  if (!err) return "AI service temporarily unavailable";
  const msg = err.message || String(err);
  if (
    msg.includes("429") ||
    msg.includes("quota") ||
    msg.includes("RESOURCE_EXHAUSTED") ||
    msg.includes("rate-limit") ||
    msg.includes("Too Many Requests")
  ) {
    return "AI Verification busy (API Free Tier Rate Limit - 15 RPM). Queued for officer review.";
  }
  if (msg.includes("API key not valid") || msg.includes("API_KEY_INVALID")) {
    return "Invalid GEMINI_API_KEY. Please verify backend/.env configuration.";
  }
  // Remove verbose stack traces or raw URLs
  const firstLine = msg.split("\n")[0].replace(/https?:\/\/[^\s]+/g, "");
  return firstLine.length > 80 ? firstLine.slice(0, 80) + "..." : firstLine;
}

/**
 * Execute Gemini prompt with automatic model fallback on 429 quota limits
 */
async function generateWithFallback(genAI, contents) {
  let lastError = null;

  for (const modelName of MODEL_FALLBACK_LIST) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(contents);
      const text = result.response.text();
      if (text && text.trim()) {
        return { text, modelUsed: modelName };
      }
    } catch (err) {
      lastError = err;
      const isQuota =
        err.message?.includes("429") ||
        err.message?.includes("quota") ||
        err.message?.includes("RESOURCE_EXHAUSTED") ||
        err.message?.includes("rate-limit") ||
        err.message?.includes("Too Many Requests");

      if (isQuota) {
        console.warn(`⚠️ Rate limit on ${modelName}, failing over to next model...`);
      } else {
        console.warn(`⚠️ Error on ${modelName}: ${err.message?.slice(0, 80)}, trying fallback...`);
      }
    }
  }

  throw lastError || new Error("All Gemini models temporarily unavailable.");
}

/**
 * Calculate geographical distance in kilometers using the Haversine formula
 */
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  if (
    lat1 === undefined ||
    lat1 === null ||
    lon1 === undefined ||
    lon1 === null ||
    lat2 === undefined ||
    lat2 === null ||
    lon2 === undefined ||
    lon2 === null
  ) {
    return null;
  }

  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 100) / 100;
}

/**
 * Extract EXIF metadata from an image buffer
 */
async function extractExifMetadata(imageBuffer) {
  try {
    if (!imageBuffer || !Buffer.isBuffer(imageBuffer)) {
      return { hasExif: false, hasGps: false };
    }

    const parsed = await exifr.parse(imageBuffer, {
      gps: true,
      tiff: true,
      xmp: true,
      iptc: true,
    });

    if (!parsed) {
      return { hasExif: false, hasGps: false };
    }

    const hasGps =
      typeof parsed.latitude === "number" &&
      typeof parsed.longitude === "number";

    return {
      hasExif: true,
      hasGps,
      latitude: hasGps ? parsed.latitude : null,
      longitude: hasGps ? parsed.longitude : null,
      altitude: parsed.altitude || null,
      timestamp: parsed.DateTimeOriginal || parsed.CreateDate || null,
      device: parsed.Make && parsed.Model ? `${parsed.Make} ${parsed.Model}`.trim() : (parsed.Model || parsed.Make || null),
      software: parsed.Software || parsed.CreatorTool || null,
    };
  } catch (err) {
    console.warn("⚠️ EXIF parsing warning:", err.message);
    return { hasExif: false, hasGps: false };
  }
}

/**
 * Analyze image with Gemini Multimodal Vision for AI generation & content matching
 */
async function analyzeImageWithGeminiVision({
  imageBuffer,
  mimeType = "image/jpeg",
  category = "",
  subcategory = "",
  description = "",
  department = "",
}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    return {
      usedAi: false,
      isAiGenerated: false,
      isManipulated: false,
      matchesCategory: true,
      detectedIssue: "AI Vision check skipped (GEMINI_API_KEY missing in backend/.env)",
      confidence: 50,
      summary: "⚠️ AI Vision inspection was not performed because GEMINI_API_KEY is not set in backend/.env.",
      flags: ["GEMINI_API_KEY not configured in backend/.env: AI synthetic check was bypassed."],
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey.trim());
    const base64Data = imageBuffer.toString("base64");
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: mimeType || "image/jpeg",
      },
    };

    const prompt = `You are a strict forensic visual evidence verification AI for a Government Grievance Redressal System.
Your job is to detect:
1. AI-GENERATED / SYNTHETIC / DEEPFAKE IMAGES:
   - Look for: Midjourney/DALL-E/Flux/Stable Diffusion textures, artificial plastic/glossy sheen, over-smoothed asphalt/soil/surfaces, unnatural geometry, impossible lighting/reflections, lack of natural camera sensor optical grain/noise, or CGI rendering patterns.
   - If the image is AI-generated, synthetic, 3D rendered, or a digital artwork, set "isAiGenerated": true and "aiConfidence" high (75-100).
2. DIGITAL MANIPULATION:
   - Check for spliced objects, Photoshop edits, copy-paste artifacts.
3. GRIEVANCE CONTEXT MATCH:
   - Department: "${department || "Not specified"}"
   - Category: "${category || "Not specified"}"
   - Subcategory: "${subcategory || "Not specified"}"
   - Citizen Description: "${description || "Not specified"}"
   - Check if the visual evidence actually shows this civic problem.

Return ONLY a valid JSON object without markdown code fences:
{
  "isAiGenerated": true or false,
  "aiConfidence": 0 to 100,
  "isRealWorldPhoto": true or false,
  "isManipulated": true or false,
  "detectedVisualElements": ["list of detected objects/scene elements"],
  "matchesCategory": true or false,
  "categoryMatchScore": 0 to 100,
  "detectedIssue": "concise description of what is visually in the image",
  "authenticitySummary": "concise forensic explanation of whether this is real or AI/fake",
  "flags": ["list of any red flags detected"]
}`;

    const { text: responseText } = await generateWithFallback(genAI, [imagePart, prompt]);
    const cleaned = responseText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);
    const isAi = parsed.isAiGenerated === true || (parsed.aiConfidence || 0) >= 60 || parsed.isRealWorldPhoto === false;

    return {
      usedAi: true,
      isAiGenerated: isAi,
      aiConfidence: parsed.aiConfidence || (isAi ? 85 : 10),
      isRealWorldPhoto: !isAi,
      isManipulated: parsed.isManipulated === true,
      matchesCategory: parsed.matchesCategory !== false,
      categoryMatchScore: parsed.categoryMatchScore || 85,
      detectedVisualElements: parsed.detectedVisualElements || [],
      detectedIssue: parsed.detectedIssue || "Visual evidence inspection",
      summary: parsed.authenticitySummary || (isAi ? "Flagged: AI-generated synthetic image detected." : "Authentic physical camera capture verified."),
      flags: parsed.flags || [],
    };
  } catch (err) {
    console.error("❌ Gemini Vision analysis error:", err.message);
    const sanitizedMsg = sanitizeAiErrorMessage(err);
    return {
      usedAi: false,
      isAiGenerated: false,
      isManipulated: false,
      matchesCategory: true,
      detectedIssue: "AI Vision check queued",
      confidence: 50,
      summary: `Image attached. (${sanitizedMsg})`,
      flags: [sanitizedMsg],
    };
  }
}

/**
 * Analyze PDF document with Gemini Multimodal Document AI & pdf-parse
 */
async function analyzePdfWithGeminiVision({
  pdfBuffer,
  category = "",
  subcategory = "",
  description = "",
  department = "",
}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    return {
      usedAi: false,
      isAuthenticDocument: true,
      matchesCategory: true,
      documentType: "PDF Document Attachment",
      issuingAuthority: "Public Record",
      extractedDetails: {},
      detectedIssue: "PDF Document Attachment",
      confidence: 50,
      summary: "⚠️ PDF document received. AI document analysis was skipped because GEMINI_API_KEY is missing in backend/.env.",
      flags: ["GEMINI_API_KEY not configured in backend/.env: PDF document verification was bypassed."],
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey.trim());

    // 1. Try local fast text extraction first (saves massive tokens & prevents rate limits)
    let extractedText = "";
    try {
      const parsedPdf = await pdfParse(pdfBuffer);
      extractedText = parsedPdf.text ? parsedPdf.text.trim() : "";
    } catch (parseErr) {
      console.warn("pdf-parse notice:", parseErr.message);
    }

    const prompt = `You are a forensic government document intelligence and verification AI.
Analyze this submitted PDF document evidence and evaluate:
1. DOCUMENT TYPE & ISSUING AUTHORITY:
   - What kind of document is this? (e.g. "Electricity Utility Bill", "Water Supply Receipt", "Police FIR Copy", "Property Tax Assessment", "Government Official Letter", "Bank Statement", "Medical Certificate", "Salary Slip", or "Unrelated / Spam Document").
   - Who issued this document? (e.g. MSEDCL, Municipal Corporation, Bank name, Police Station, Department name).
2. CONTEXT & GRIEVANCE ALIGNMENT:
   - Claimed Department: "${department || "Not specified"}"
   - Claimed Category: "${category || "Not specified"}"
   - Claimed Subcategory: "${subcategory || "Not specified"}"
   - Citizen Description: "${description || "Not specified"}"
   - Does the content in this PDF actually support or relate to the citizen's reported issue?
3. AUTHENTICITY & TAMPERING:
   - Is this an authentic government/utility/legal record, or does it look fake, generated, blank, corrupted, or an irrelevant/spam file (e.g. restaurant menu, movie ticket, memes)?
4. KEY DETAILS EXTRACTION:
   - Extract reference numbers, consumer IDs, dates, and amounts if present.

Return ONLY a valid JSON object without markdown code fences:
{
  "documentType": "e.g. Electricity Bill (MSEDCL)",
  "issuingAuthority": "e.g. Maharashtra State Electricity Distribution Co.",
  "isAuthenticDocument": true or false,
  "matchesGrievance": true or false,
  "relevanceScore": 0 to 100,
  "extractedDetails": {
    "referenceOrConsumerNo": "extracted account/bill/FIR/reference ID or 'N/A'",
    "documentDate": "extracted date or 'N/A'",
    "amountOrKeyMetric": "extracted amount or relevant metric if any, e.g. '₹ 3,450' or 'N/A'"
  },
  "summary": "concise explanation of what the document contains and how it relates to the grievance",
  "flags": ["list of any red flags, e.g. 'Irrelevant document', 'Forged/Edited text', 'Blank PDF'"]
}`;

    let contents;
    if (extractedText.length > 50) {
      // Send text directly (fast, token-efficient)
      contents = [
        `EXTRACTED DOCUMENT TEXT CONTENT:\n${extractedText.slice(0, 10000)}\n\n${prompt}`,
      ];
    } else {
      // Scanned image PDF -> send base64 inlineData
      const base64Data = pdfBuffer.toString("base64");
      const pdfPart = {
        inlineData: {
          data: base64Data,
          mimeType: "application/pdf",
        },
      };
      contents = [pdfPart, prompt];
    }

    const { text: responseText } = await generateWithFallback(genAI, contents);
    const cleaned = responseText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);
    const matches = parsed.matchesGrievance !== false && (parsed.relevanceScore || 80) >= 45;
    const isAuthentic = parsed.isAuthenticDocument !== false;

    return {
      usedAi: true,
      documentType: parsed.documentType || "Official PDF Document",
      issuingAuthority: parsed.issuingAuthority || "Public Authority",
      isAuthenticDocument: isAuthentic,
      matchesCategory: matches,
      relevanceScore: parsed.relevanceScore || 85,
      extractedDetails: parsed.extractedDetails || {},
      detectedIssue: `${parsed.documentType || "PDF Document"} (${parsed.issuingAuthority || "Official Record"})`,
      summary: parsed.summary || "PDF document intelligence verified.",
      flags: parsed.flags || [],
    };
  } catch (err) {
    console.error("❌ Gemini PDF analysis error:", err.message);
    const sanitizedMsg = sanitizeAiErrorMessage(err);
    return {
      usedAi: false,
      documentType: "PDF Document Attachment",
      issuingAuthority: "Public Record",
      isAuthenticDocument: true,
      matchesCategory: true,
      extractedDetails: {},
      detectedIssue: "PDF Document attached",
      relevanceScore: 70,
      summary: `PDF received as evidence attachment. (${sanitizedMsg})`,
      flags: [sanitizedMsg],
    };
  }
}

/**
 * Main Visual Evidence & Location Verification Pipeline
 */
async function verifyVisualEvidence({
  imageBuffer,
  mimeType,
  claimedLocation,
  category,
  subcategory,
  description,
  department,
}) {
  if (!imageBuffer || !Buffer.isBuffer(imageBuffer) || imageBuffer.length === 0) {
    return {
      status: "NO_MEDIA",
      trustScore: 100,
      isAiGenerated: false,
      isManipulated: false,
      matchesCategory: true,
      detectedIssue: "No media attached",
      documentType: null,
      issuingAuthority: null,
      extractedDetails: {},
      exifData: { hasGps: false },
      locationDistanceKm: null,
      flags: [],
      summary: "Text-only complaint filed without visual evidence.",
    };
  }

  // Handle PDF Document Evidence
  if (mimeType === "application/pdf" || (mimeType && mimeType.includes("pdf"))) {
    const pdfAnalysis = await analyzePdfWithGeminiVision({
      pdfBuffer: imageBuffer,
      category,
      subcategory,
      description,
      department,
    });

    let trustScore = pdfAnalysis.usedAi ? 90 : 50;
    const flags = [...(pdfAnalysis.flags || [])];

    if (!pdfAnalysis.isAuthenticDocument) {
      trustScore -= 50;
      flags.push("Document flagged as unauthentic, blank, or placeholder");
    }

    if (!pdfAnalysis.matchesCategory) {
      trustScore -= 40;
      flags.push("Document contents do not match the reported grievance issue");
    }

    trustScore = Math.max(0, Math.min(100, trustScore));

    let status = "VERIFIED";
    if (trustScore < 45 || !pdfAnalysis.isAuthenticDocument || (!pdfAnalysis.matchesCategory && trustScore < 60)) {
      status = "FLAGGED";
    } else if (trustScore < 75 || flags.length > 0) {
      status = "SUSPICIOUS";
    }

    return {
      status,
      trustScore,
      isAiGenerated: false,
      isManipulated: !pdfAnalysis.isAuthenticDocument,
      matchesCategory: pdfAnalysis.matchesCategory,
      detectedIssue: pdfAnalysis.detectedIssue,
      documentType: pdfAnalysis.documentType,
      issuingAuthority: pdfAnalysis.issuingAuthority,
      extractedDetails: pdfAnalysis.extractedDetails,
      exifData: { hasGps: false },
      locationDistanceKm: null,
      flags: Array.from(new Set(flags)),
      summary: pdfAnalysis.summary,
    };
  }

  // 1. Extract EXIF metadata (for Images)
  const exifData = await extractExifMetadata(imageBuffer);

  // 2. Check geolocation mismatch if EXIF GPS and Claimed GPS are both available
  let locationDistanceKm = null;
  const flags = [];

  if (
    exifData.hasGps &&
    claimedLocation &&
    claimedLocation.latitude &&
    claimedLocation.longitude
  ) {
    locationDistanceKm = calculateHaversineDistance(
      exifData.latitude,
      exifData.longitude,
      claimedLocation.latitude,
      claimedLocation.longitude
    );

    if (locationDistanceKm > 10) {
      flags.push(`Major location mismatch: photo taken ${locationDistanceKm} km away from claimed location`);
    } else if (locationDistanceKm > 3) {
      flags.push(`Moderate location offset: photo taken ${locationDistanceKm} km away`);
    }
  }

  // Check editing software tag traces
  if (exifData.software) {
    const sw = exifData.software.toLowerCase();
    if (
      sw.includes("photoshop") ||
      sw.includes("canva") ||
      sw.includes("gimp") ||
      sw.includes("midjourney") ||
      sw.includes("dall-e") ||
      sw.includes("stable diffusion")
    ) {
      flags.push(`Digital editing software detected in metadata: ${exifData.software}`);
    }
  }

  // 3. AI Multimodal Vision Analysis
  const aiAnalysis = await analyzeImageWithGeminiVision({
    imageBuffer,
    mimeType,
    category,
    subcategory,
    description,
    department,
  });

  if (aiAnalysis.flags && Array.isArray(aiAnalysis.flags)) {
    flags.push(...aiAnalysis.flags);
  }

  // 4. Calculate Weighted Trust Score (0 - 100)
  let trustScore = aiAnalysis.usedAi ? 90 : 50;

  if (aiAnalysis.isAiGenerated) {
    trustScore = Math.max(10, 100 - (aiAnalysis.aiConfidence || 85));
    flags.push("AI-Generated or synthetic visual patterns detected");
  } else if (aiAnalysis.usedAi && !aiAnalysis.isAiGenerated) {
    trustScore = Math.min(100, trustScore + 10);
  }

  if (aiAnalysis.isManipulated) {
    trustScore -= 25;
    flags.push("Image digital manipulation detected");
  }

  if (!aiAnalysis.matchesCategory) {
    trustScore -= 35;
    flags.push("Visual content does not match reported category");
  }

  if (locationDistanceKm !== null) {
    if (locationDistanceKm <= 1.0) {
      trustScore = Math.min(100, trustScore + 5);
    } else if (locationDistanceKm > 10.0) {
      trustScore -= 35;
    } else if (locationDistanceKm > 3.0) {
      trustScore -= 15;
    }
  }

  // Bound trust score between 0 and 100
  trustScore = Math.max(0, Math.min(100, trustScore));

  // Determine Verification Status
  let status = "VERIFIED";
  if (trustScore < 45 || aiAnalysis.isAiGenerated || (!aiAnalysis.matchesCategory && trustScore < 60)) {
    status = "FLAGGED";
  } else if (trustScore < 75 || flags.length > 0) {
    status = "SUSPICIOUS";
  }

  return {
    status,
    trustScore,
    isAiGenerated: aiAnalysis.isAiGenerated || false,
    isManipulated: aiAnalysis.isManipulated || false,
    matchesCategory: aiAnalysis.matchesCategory !== false,
    detectedIssue: aiAnalysis.detectedIssue || "Visual evidence attached",
    documentType: null,
    issuingAuthority: null,
    extractedDetails: {},
    exifData: {
      hasGps: exifData.hasGps || false,
      latitude: exifData.latitude || null,
      longitude: exifData.longitude || null,
      altitude: exifData.altitude || null,
      timestamp: exifData.timestamp || null,
      device: exifData.device || null,
      software: exifData.software || null,
    },
    locationDistanceKm,
    flags: Array.from(new Set(flags)),
    summary: aiAnalysis.summary || "Visual verification completed.",
  };
}

module.exports = {
  verifyVisualEvidence,
  extractExifMetadata,
  calculateHaversineDistance,
};
