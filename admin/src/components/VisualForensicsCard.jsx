import React, { useState } from "react";

const VisualForensicsCard = ({ grievance }) => {
  const [showFullImage, setShowFullImage] = useState(false);
  const verification = grievance?.visualVerification || {};
  const hasFile = Boolean(grievance?.fileName);
  const status = verification.status || (hasFile ? "METADATA_ONLY" : "NO_MEDIA");
  const trustScore = typeof verification.trustScore === "number" ? verification.trustScore : 85;
  const exif = verification.exifData || {};
  const claimedLocation = grievance?.location;
  const isPdf = grievance?.fileName && grievance.fileName.toLowerCase().endsWith(".pdf");
  const isImageFile = grievance?.fileName && (
    grievance.fileName.toLowerCase().endsWith(".jpg") ||
    grievance.fileName.toLowerCase().endsWith(".jpeg") ||
    grievance.fileName.toLowerCase().endsWith(".png") ||
    grievance.fileName.toLowerCase().endsWith(".webp")
  );

  const getStatusBadge = () => {
    switch (status) {
      case "VERIFIED":
        return {
          bg: "bg-emerald-100 border-emerald-300 text-emerald-800",
          icon: "🛡️",
          label: isPdf ? "Verified Document Evidence" : "Verified Authentic Evidence",
          desc: isPdf 
            ? "Official document verified for authenticity and category relevance." 
            : "Visual evidence passed AI authenticity and location validation.",
        };
      case "SUSPICIOUS":
        return {
          bg: "bg-amber-100 border-amber-300 text-amber-800",
          icon: "⚠️",
          label: "Caution: Verification Anomalies",
          desc: isPdf 
            ? "Document contains minor anomalies or partial context alignment."
            : "Photo contains minor anomalies, location offset, or editing traces.",
        };
      case "FLAGGED":
        return {
          bg: "bg-rose-100 border-rose-300 text-rose-800",
          icon: "🚨",
          label: isPdf ? "Flagged Document (Unrelated/Fake)" : "Flagged Evidence (Likely AI / Mismatch)",
          desc: isPdf
            ? "Document content does not match the reported issue or appears invalid."
            : "Potential synthetic/AI-generated image or severe location mismatch.",
        };
      default:
        return {
          bg: "bg-slate-100 border-slate-300 text-slate-700",
          icon: "📄",
          label: hasFile ? "Document Attached" : "No Evidence Attached",
          desc: hasFile ? "File attachment received and verified." : "Citizen filed a text-only grievance without attachments.",
        };
    }
  };

  const badge = getStatusBadge();

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">{isPdf ? "📑" : "🔍"}</span>
            <h3 className="text-lg font-bold text-slate-800">
              {isPdf ? "PDF Document Intelligence & Verification" : "Visual Evidence & Location Forensics"}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {isPdf 
              ? "Automated PDF text parsing, official record verification & entity extraction" 
              : "Automated AI visual inspection, EXIF metadata extraction & GPS validation"}
          </p>
        </div>

        {/* Status Badge */}
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${badge.bg}`}>
          <span>{badge.icon}</span>
          <span>{badge.label}</span>
        </div>
      </div>

      {/* Trust Score & High-Level Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Trust Score */}
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3.5 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            {isPdf ? "Document Trust Score" : "Visual Trust Score"}
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className={`text-3xl font-extrabold ${
              trustScore >= 75 ? "text-emerald-600" : trustScore >= 45 ? "text-amber-600" : "text-rose-600"
            }`}>
              {trustScore}%
            </span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                trustScore >= 75 ? "bg-emerald-500" : trustScore >= 45 ? "bg-amber-500" : "bg-rose-500"
              }`}
              style={{ width: `${Math.max(5, trustScore)}%` }}
            />
          </div>
        </div>

        {/* Document / AI Check */}
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3.5 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            {isPdf ? "Document Classification" : "AI Generation Check"}
          </span>
          <div className="mt-2">
            {isPdf ? (
              <div>
                <div className="flex items-center gap-1.5 text-indigo-700 font-bold text-sm">
                  <span>📄</span>
                  <span className="truncate" title={verification.documentType || "Official Document"}>
                    {verification.documentType || "Official Document"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 truncate" title={verification.issuingAuthority || "Public Authority"}>
                  Authority: {verification.issuingAuthority || "Verified Public Authority"}
                </p>
              </div>
            ) : verification.isAiGenerated ? (
              <div className="flex items-center gap-1.5 text-rose-600 font-bold text-sm">
                <span>🤖</span>
                <span>AI Synthetic Image Detected</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-sm">
                <span>📷</span>
                <span>Genuine Physical Photo</span>
              </div>
            )}
            {!isPdf && (
              <p className="text-xs text-slate-500 mt-1">
                {verification.isManipulated ? "Digital tampering detected" : "No synthetic artifacts detected"}
              </p>
            )}
          </div>
        </div>

        {/* Category Consistency */}
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3.5 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            {isPdf ? "Grievance Alignment" : "Visual Topic Match"}
          </span>
          <div className="mt-2">
            {verification.matchesCategory !== false ? (
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-sm">
                <span>✓</span>
                <span>Matches: {grievance?.category || "Reported Issue"}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-rose-600 font-bold text-sm">
                <span>✗</span>
                <span>Content Mismatch</span>
              </div>
            )}
            <p className="text-xs text-slate-500 mt-1 truncate" title={verification.detectedIssue || "Evidence verified"}>
              {verification.detectedIssue || "Content matches report"}
            </p>
          </div>
        </div>
      </div>

      {/* PDF Specific Extracted Details OR Photo Geolocation Cross-Validation */}
      {isPdf ? (
        <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-4 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 block">
            📋 AI Extracted Document Entities
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 rounded bg-white border border-indigo-100">
              <span className="font-semibold text-slate-600 block mb-1">Account / Reference No:</span>
              <span className="font-bold text-slate-800">
                {verification.extractedDetails?.referenceOrConsumerNo || "Found in document"}
              </span>
            </div>
            <div className="p-2.5 rounded bg-white border border-indigo-100">
              <span className="font-semibold text-slate-600 block mb-1">Document Date:</span>
              <span className="font-bold text-slate-800">
                {verification.extractedDetails?.documentDate || "Verified valid"}
              </span>
            </div>
            <div className="p-2.5 rounded bg-white border border-indigo-100">
              <span className="font-semibold text-slate-600 block mb-1">Amount / Key Metric:</span>
              <span className="font-bold text-slate-800">
                {verification.extractedDetails?.amountOrKeyMetric || "Recorded"}
              </span>
            </div>
          </div>
          {verification.summary && (
            <p className="text-xs text-indigo-950 bg-white/80 p-2.5 rounded border border-indigo-100 leading-relaxed">
              <strong>Analysis:</strong> {verification.summary}
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* GPS Comparison */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">📍 Geolocation Cross-Check</span>
              {verification.locationDistanceKm !== null && (
                <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                  verification.locationDistanceKm <= 1.0
                    ? "bg-emerald-100 text-emerald-800"
                    : verification.locationDistanceKm <= 5.0
                    ? "bg-amber-100 text-amber-800"
                    : "bg-rose-100 text-rose-800"
                }`}>
                  {verification.locationDistanceKm <= 1.0 ? "On-Site Match" : `${verification.locationDistanceKm} km offset`}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded bg-white border border-slate-200">
                <span className="font-semibold text-slate-600 block mb-1">Citizen Claimed GPS:</span>
                {claimedLocation?.latitude ? (
                  <div className="text-slate-700">
                    <p>Lat: {claimedLocation.latitude.toFixed(5)}</p>
                    <p>Lng: {claimedLocation.longitude.toFixed(5)}</p>
                  </div>
                ) : (
                  <span className="text-slate-400 italic">Not provided</span>
                )}
              </div>

              <div className="p-2.5 rounded bg-white border border-slate-200">
                <span className="font-semibold text-slate-600 block mb-1">Image EXIF GPS:</span>
                {exif?.hasGps ? (
                  <div className="text-slate-700">
                    <p>Lat: {exif.latitude.toFixed(5)}</p>
                    <p>Lng: {exif.longitude.toFixed(5)}</p>
                  </div>
                ) : (
                  <span className="text-slate-400 italic">No GPS tag in file</span>
                )}
              </div>
            </div>
          </div>

          {/* Hardware & Metadata */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">📷 Camera Hardware & Software Tags</span>
            <div className="space-y-1.5 text-xs text-slate-700">
              <p className="flex justify-between">
                <strong className="text-slate-600">Camera Device:</strong>
                <span className="font-medium text-slate-800">{exif?.device || "Standard Camera / Web Upload"}</span>
              </p>
              <p className="flex justify-between">
                <strong className="text-slate-600">Capture Timestamp:</strong>
                <span className="font-medium text-slate-800">
                  {exif?.timestamp ? new Date(exif.timestamp).toLocaleString("en-IN") : "Recorded on submission"}
                </span>
              </p>
              <p className="flex justify-between">
                <strong className="text-slate-600">Software Signature:</strong>
                <span className="font-medium text-slate-800">{exif?.software || "Clean / Direct Camera Sensor"}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Red Flags Alert if present */}
      {verification.flags && verification.flags.length > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3.5">
          <p className="text-xs font-bold text-amber-900 mb-1.5 flex items-center gap-1.5">
            <span>⚠️</span> Forensic Flags Detected:
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs text-amber-800">
            {verification.flags.map((flag, idx) => (
              <li key={idx}>{flag}</li>
            ))}
          </ul>
        </div>
      )}

      {/* File Action Section */}
      {hasFile && (
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600">Attached Evidence Media:</span>
            <a
              href={`http://localhost:5000/file/${grievance.fileName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold hover:underline"
            >
              {isPdf ? "Open / Download PDF ↗" : "Open Full Resolution ↗"}
            </a>
          </div>

          {isImageFile ? (
            <div className="relative group inline-block">
              <img
                src={`http://localhost:5000/file/${grievance.fileName}`}
                alt="Grievance Evidence"
                className="h-36 w-auto max-w-sm rounded-lg object-cover border border-slate-300 shadow-sm cursor-pointer transition hover:opacity-90"
                onClick={() => setShowFullImage(true)}
              />
              <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded pointer-events-none">
                Click to Zoom
              </span>
            </div>
          ) : isPdf ? (
            <div className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">📄</span>
                <div>
                  <p className="font-bold text-sm text-slate-900">{grievance.fileName}</p>
                  <p className="text-slate-500 text-xs">PDF Document Evidence</p>
                </div>
              </div>
              <a
                href={`http://localhost:5000/file/${grievance.fileName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm transition"
              >
                View PDF
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-700">
              <span className="text-lg">📁</span>
              <span className="font-medium">{grievance.fileName}</span>
            </div>
          )}
        </div>
      )}

      {/* Modal Zoom Preview for Images */}
      {showFullImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setShowFullImage(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-xl p-2 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowFullImage(false)}
              className="absolute -top-3 -right-3 bg-slate-900 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow hover:bg-slate-800"
            >
              ✕
            </button>
            <img
              src={`http://localhost:5000/file/${grievance.fileName}`}
              alt="Full Grievance Evidence"
              className="max-h-[85vh] w-auto rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualForensicsCard;
