import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLanguage } from "../context/LanguageContext";
import { getTranslation } from "../translations/translations";
import {
  Sparkles,
  Send,
  Bot,
  User,
  FileText,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  RefreshCw,
  BookOpen,
  Search,
  ExternalLink,
  ShieldCheck,
  CornerDownLeft,
  Loader2,
  Layers,
  ArrowRight
} from "lucide-react";

const FAQPage = () => {
  // Existing state for 6 FAQ categories
  const [activeTab, setActiveTab] = useState("general");
  const [openQuestion, setOpenQuestion] = useState(null);
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  // AI Knowledge Assistant state
  const [inputQuery, setInputQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [expandedCitations, setExpandedCitations] = useState({});
  const [serviceStatus, setServiceStatus] = useState("idle"); // idle | healthy | offline
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const uiLabels = {
    en: {
      badge: "NagrikConnect AI Knowledge Base",
      title: "Official Municipal Knowledge & Grievance Guidelines",
      subtitle: "Search 31 official Municipal Acts, Citizen Charters, and SLA rules using our AI assistant, or explore frequently asked questions below.",
      copilotTitle: "Municipal Intelligence AI Copilot",
      copilotSubtitle: "Backed by ChromaDB vector search across 5,158 verified municipal clauses",
      groundedBadge: "Grounded Citations",
      newSession: "New Session",
      askAIBtn: "Ask AI",
      thinking: "Thinking...",
      placeholder: "Ask any question about municipal bylaws, escalation SLAs, ward jurisdiction, RTI/RTS rights... (Press Enter to submit)",
      suggested: "Suggested Inquiries:",
      officialCitations: "Official Source Citations",
      viewExcerpt: "View Excerpt",
      hideExcerpt: "Hide Excerpt",
      standardRepo: "Standard Knowledge Repository",
      inquiryTitle: "Citizen Inquiry",
      verifiedGuidance: "Verified Resolution Guidance",
      groundedInKB: "Grounded in Knowledge Base",
      insufficientEvidence: "Insufficient Evidence in Municipal Records",
      insufficientEvidenceAlert: "The verified knowledge base does not contain sufficient statutory clauses to answer this specific question with certainty. The system will not generate unverified statements.",
      serviceOffline: "Service Offline",
      retryQuery: "Retry Query",
      browseBelow: "Browse Standard FAQs Below"
    },
    hi: {
      badge: "नागरिककनेक्ट AI ज्ञानकोश",
      title: "आधिकारिक नगरपालिका ज्ञान एवं शिकायत निवारण दिशानिर्देश",
      subtitle: "हमारे AI सहायक से 31 आधिकारिक नगरपालिका अधिनियमों, नागरिक चार्टर और SLA नियमों को खोजें, या नीचे अक्सर पूछे जाने वाले प्रश्न देखें।",
      copilotTitle: "नगरपालिका इंटेलिजेंस AI सहायक",
      copilotSubtitle: "5,158 सत्यापित नगरपालिका धाराओं में क्रोमाडीबी वेक्टर सर्च द्वारा संचालित",
      groundedBadge: "प्रमाणित संदर्भ",
      newSession: "नया सत्र",
      askAIBtn: "AI से पूछें",
      thinking: "खोज जारी है...",
      placeholder: "नगरपालिका उपनियमों, शिकायत SLA, वार्ड अधिकार क्षेत्र, RTI/RTS अधिकारों के बारे में पूछें... (Enter दबाएं)",
      suggested: "सुझाए गए प्रश्न:",
      officialCitations: "आधिकारिक स्रोत संदर्भ",
      viewExcerpt: "उद्धरण देखें",
      hideExcerpt: "उद्धरण छिपाएं",
      standardRepo: "मानक ज्ञान भंडार",
      inquiryTitle: "नागरिक पूछताछ",
      verifiedGuidance: "सत्यापित निवारण मार्गदर्शन",
      groundedInKB: "ज्ञानकोश में प्रमाणित",
      insufficientEvidence: "नगरपालिका रिकॉर्ड में अपर्याप्त साक्ष्य",
      insufficientEvidenceAlert: "सत्यापित ज्ञानकोश में इस प्रश्न का प्रामाणिक उत्तर देने के लिए पर्याप्त आधिकारिक खंड नहीं हैं। असत्यापित जानकारी उत्पन्न नहीं की जाएगी।",
      serviceOffline: "सेवा ऑफलाइन",
      retryQuery: "पुनः प्रयास करें",
      browseBelow: "नीचे मानक FAQ देखें"
    },
    mr: {
      badge: "नागरिककनेक्ट AI ज्ञानकोश",
      title: "अधिकृत महानगरपालिका ज्ञान आणि तक्रार निवारण मार्गदर्शक तत्त्वे",
      subtitle: "आमच्या AI सहाय्यकासह 31 अधिकृत महानगरपालिका कायदे, नागरिक सनद आणि SLA नियमांचा शोध घ्या किंवा खालील वारंवार विचारले जाणारे प्रश्न पाहा.",
      copilotTitle: "महानगरपालिका इंटेलिजन्स AI सहायक",
      copilotSubtitle: "5,158 सत्यापित कलमांमध्ये क्रोमाडीबी वेक्टर सर्चद्वारे समर्थित",
      groundedBadge: "प्रमाणित संदर्भ",
      newSession: "नवीन सत्र",
      askAIBtn: "AI ला विचारा",
      thinking: "शोध सुरू आहे...",
      placeholder: "महानगरपालिका कायदे, तक्रार SLA, प्रभाग कार्यक्षेत्र, RTI/RTS अधिकारांबद्दल विचारा... (Enter दाबा)",
      suggested: "सुचवलेले प्रश्न:",
      officialCitations: "अधिकृत स्रोत संदर्भ",
      viewExcerpt: "उद्धरण पाहा",
      hideExcerpt: "उद्धरण लपवा",
      standardRepo: "मानक ज्ञान भांडार",
      inquiryTitle: "नागरिक विचारणा",
      verifiedGuidance: "सत्यापित निवारण मार्गदर्शन",
      groundedInKB: "ज्ञानकोशात प्रमाणित",
      insufficientEvidence: "महानगरपालिका अभिलेखांमध्ये अपुरा पुरावा",
      insufficientEvidenceAlert: "या प्रश्नाचे अधिकृत उत्तर देण्यासाठी सत्यापित ज्ञानकोशात पुरेशी कलमे उपलब्ध नाहीत. असत्यापित विधाने निर्माण केली जात नाहीत.",
      serviceOffline: "सेवा ऑफलाइन",
      retryQuery: "पुन्हा प्रयत्न करा",
      browseBelow: "खालील मानक FAQ पाहा"
    }
  };

  const L = uiLabels[language] || uiLabels.en;

  const localizedQueries = {
    en: [
      "What is the official resolution timeframe (SLA) for water supply complaints?",
      "How do I escalate an unresolved road repair or pothole grievance?",
      "What are citizen rights under the Maharashtra Right to Services (RTS) Act?",
      "What administrative powers do Ward Executive Engineers have under the MMC Act?",
      "What types of grievances are not admissible for redressal through the portal?"
    ],
    hi: [
      "जल आपूर्ति शिकायतों के लिए आधिकारिक समाधान समय सीमा (SLA) क्या है?",
      "सड़क मरम्मत या गड्ढों की अनसुलझी शिकायत को कैसे आगे बढ़ाएं (एस्केलेट करें)?",
      "महाराष्ट्र लोक सेवा अधिकार (RTS) अधिनियम के तहत नागरिकों के क्या अधिकार हैं?",
      "MMC अधिनियम के तहत वार्ड कार्यकारी अभियंताओं के पास क्या प्रशासनिक शक्तियां हैं?",
      "पोर्टल के माध्यम से निवारण के लिए किस प्रकार की शिकायतें स्वीकार्य नहीं हैं?"
    ],
    mr: [
      "पाणीपुरवठा तक्रारींसाठी अधिकृत निवारण कालावधी (SLA) काय आहे?",
      "रस्ता दुरुस्ती किंवा खड्ड्यांची न सुटलेली तक्रार कशी वाढवावी (एस्केलेट करावी)?",
      "महाराष्ट्र लोकसेवा हक्क (RTS) कायद्यांतर्गत नागरिकांचे काय अधिकार आहेत?",
      "MMC कायद्यांतर्गत प्रभाग कार्यकारी अभियंत्यांना कोणते प्रशासकीय अधिकार आहेत?",
      "पोर्टलद्वारे निवारणासाठी कोणत्या प्रकारच्या तक्रारी ग्राह्य धरल्या जात नाहीत?"
    ]
  };

  const suggestedQueries = localizedQueries[language] || localizedQueries.en;

  // Check RAG service health on mount
  useEffect(() => {
    const checkServiceHealth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/knowledge/health", { timeout: 4000 });
        if (res.data && res.data.status === "healthy") {
          setServiceStatus("healthy");
        } else {
          setServiceStatus("idle");
        }
      } catch (err) {
        setServiceStatus("offline");
      }
    };
    checkServiceHealth();
  }, []);

  // Auto-scroll conversation smoothly
  useEffect(() => {
    if (conversation.length > 0) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation, isSubmitting]);

  const toggleCitation = (key) => {
    setExpandedCitations((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAskAI = async (queryText) => {
    const queryToSubmit = (typeof queryText === "string" ? queryText : inputQuery).trim();
    if (!queryToSubmit) return;
    if (queryToSubmit.length < 3) {
      alert("Please enter a question with at least 3 characters.");
      return;
    }

    const messageId = Date.now().toString();
    const userMessage = {
      id: messageId,
      query: queryToSubmit,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isLoading: true
    };

    setConversation((prev) => [...prev, userMessage]);
    setInputQuery("");
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/knowledge/query",
        {
          query: queryToSubmit,
          role: "citizen",
          top_k: 5
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          timeout: 60000
        }
      );

      const data = response.data;
      setConversation((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                isLoading: false,
                answer: data.answer,
                citations: data.citations || [],
                evidenceCount: data.evidence_count || 0,
                isGrounded: data.is_grounded !== false,
                llmUsed: data.llm_used || "Municipal RAG Engine",
                role: data.role || "citizen"
              }
            : msg
        )
      );
      setServiceStatus("healthy");
    } catch (error) {
      console.error("[FAQPage] Knowledge Query Error:", error);
      const isUnavailable =
        error.code === "ECONNABORTED" ||
        error.response?.status === 503 ||
        error.response?.data?.serviceUnavailable;

      const errorMessage =
        error.response?.data?.error ||
        (isUnavailable
          ? "The AI Knowledge Base service is currently offline or starting up. Please refer to our verified standard FAQs below or try again in a few moments."
          : "Unable to retrieve knowledge citations. Please try rephrasing your question.");

      setConversation((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                isLoading: false,
                error: errorMessage,
                serviceUnavailable: Boolean(isUnavailable),
                citations: [],
                isGrounded: false
              }
            : msg
        )
      );
      if (isUnavailable) {
        setServiceStatus("offline");
      }
    } finally {
      setIsSubmitting(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAskAI();
    }
  };

  const clearChat = () => {
    setConversation([]);
    setExpandedCitations({});
    inputRef.current?.focus();
  };

  // Safe markdown-like parser to render formatted text with strong tags, bullets, and citations
  const renderFormattedAnswer = (text) => {
    if (!text) return null;
    const lines = text.split("\n");

    return (
      <div className="space-y-2 text-slate-800 text-sm leading-relaxed">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-1.5" />;
          }

          // Headers
          if (trimmed.startsWith("### ")) {
            return (
              <h4 key={idx} className="text-base font-bold text-[#17365D] mt-3 mb-1 border-b border-slate-200 pb-1">
                {renderInlineTokens(trimmed.replace(/^###\s+/, ""))}
              </h4>
            );
          }
          if (trimmed.startsWith("#### ")) {
            return (
              <h5 key={idx} className="text-sm font-semibold text-[#17365D] mt-2 mb-1">
                {renderInlineTokens(trimmed.replace(/^####\s+/, ""))}
              </h5>
            );
          }

          // Bullet items
          if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="text-[#F59E0B] font-bold mt-1 text-xs">•</span>
                <span className="flex-1">{renderInlineTokens(trimmed.replace(/^[-*]\s+/, ""))}</span>
              </div>
            );
          }

          // Numbered lists
          const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
          if (numMatch) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="font-semibold text-[#17365D] text-xs mt-0.5">{numMatch[1]}.</span>
                <span className="flex-1">{renderInlineTokens(numMatch[2])}</span>
              </div>
            );
          }

          return (
            <p key={idx} className="text-slate-700">
              {renderInlineTokens(line)}
            </p>
          );
        })}
      </div>
    );
  };

  // Safe inline formatter for bold text and citation badges
  const renderInlineTokens = (text) => {
    if (!text) return "";
    // Tokenize bold **text** and citations `[Doc, Page]`
    const parts = text.split(/(\*\*.*?\*\*|`\[.*?\]`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
        return (
          <strong key={i} className="font-bold text-[#08264A]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`[") && part.endsWith("]`") && part.length >= 4) {
        return (
          <span
            key={i}
            className="inline-flex items-center px-2 py-0.5 mx-1 rounded text-xs font-semibold bg-indigo-50 text-[#17365D] border border-indigo-200"
          >
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

  // Existing 6 categories of FAQs
  const faqs = {
    general: [
      { question: t("faqQ1"), answer: t("faqA1") },
      { question: t("faqQ2"), answer: t("faqA2") }
    ],
    submission: [
      { question: t("faqQ3"), answer: t("faqA3") },
      { question: t("faqQ4"), answer: t("faqA4") }
    ],
    tracking: [
      { question: t("faqQ5"), answer: t("faqA5") },
      { question: t("faqQ6"), answer: t("faqA6") }
    ],
    redressal: [
      { question: t("faqQ7"), answer: t("faqA7") },
      { question: t("faqQ8"), answer: t("faqA8") },
      { question: t("faqQ9"), answer: t("faqA9") },
      { question: t("faqQ10"), answer: t("faqA10") }
    ],
    rolesAndTimeframes: [
      { question: t("faqQ11"), answer: t("faqA11") },
      { question: t("faqQ12"), answer: t("faqA12") },
      { question: t("faqQ13"), answer: t("faqA13") }
    ],
    escalation: [
      { question: t("faqQ14"), answer: t("faqA14") },
      { question: t("faqQ15"), answer: t("faqA15") }
    ]
  };

  const renderFAQ = (category) =>
    faqs[category].map((faq, index) => (
      <div
        key={index}
        className="mb-4 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-200 hover:border-slate-300"
      >
        <button
          onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
          className={`w-full text-left text-slate-800 text-base sm:text-lg font-semibold flex justify-between items-center px-6 py-4 transition-colors ${
            openQuestion === index ? "bg-amber-50/50 text-[#17365D]" : "bg-white hover:bg-slate-50"
          }`}
        >
          <span>{faq.question}</span>
          <span
            className={`ml-4 shrink-0 transition-transform duration-300 text-slate-500 ${
              openQuestion === index ? "rotate-180 text-[#F59E0B]" : "rotate-0"
            }`}
          >
            <ChevronDown className="w-5 h-5" />
          </span>
        </button>
        <div
          style={{
            maxHeight: openQuestion === index ? "600px" : "0px",
            overflow: "hidden"
          }}
          className={`px-6 text-slate-600 text-sm sm:text-base leading-relaxed transition-all duration-300 ${
            openQuestion === index ? "py-4 opacity-100 border-t border-slate-100 bg-slate-50/50" : "py-0 opacity-0"
          }`}
        >
          {faq.answer}
        </div>
      </div>
    ));

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* ======================================================== */}
        {/* HEADER SECTION                                           */}
        {/* ======================================================== */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/70 border border-amber-200 text-[#B45309] text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            {L.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17365D] tracking-tight">
            {L.title}
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto">
            {L.subtitle}
          </p>
        </div>

        {/* ======================================================== */}
        {/* SECTION 1: AI ASSISTANT & RAG SEARCH                     */}
        {/* ======================================================== */}
        <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Card Top Banner */}
          <div className="bg-gradient-to-r from-[#17365D] to-[#08264A] px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  {L.copilotTitle}
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                    <ShieldCheck className="w-3 h-3" /> {L.groundedBadge}
                  </span>
                </h2>
                <p className="text-xs text-slate-300">
                  {L.copilotSubtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {conversation.length > 0 && (
                <button
                  onClick={clearChat}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors flex items-center gap-1.5"
                  title="Start a new question session"
                >
                  <RefreshCw className="w-3 h-3" />
                  {L.newSession}
                </button>
              )}
              {serviceStatus === "offline" && (
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-red-500/20 text-red-300 border border-red-400/30">
                  {L.serviceOffline}
                </span>
              )}
            </div>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Conversation Log (Questions & Answers) */}
            {conversation.length > 0 && (
              <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 pb-2">
                {conversation.map((msg) => (
                  <div key={msg.id} className="space-y-4">
                    
                    {/* User Question Bubble */}
                    <div className="flex justify-end">
                      <div className="max-w-[85%] bg-slate-100 border border-slate-200 rounded-2xl rounded-tr-sm px-5 py-3.5 shadow-sm">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#17365D] mb-1">
                          <User className="w-3.5 h-3.5" />
                          <span>Citizen Inquiry</span>
                          <span className="text-slate-400 font-normal ml-auto">{msg.timestamp}</span>
                        </div>
                        <p className="text-slate-800 text-sm font-medium">{msg.query}</p>
                      </div>
                    </div>

                    {/* AI Response Bubble */}
                    <div className="flex justify-start">
                      <div className="w-full bg-[#F8FAFC] border border-slate-200 rounded-2xl rounded-tl-sm p-5 shadow-sm space-y-4">
                        
                        {/* Status Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center">
                              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                            </div>
                            <span className="text-xs font-bold text-[#17365D]">Verified Resolution Guidance</span>
                            {msg.llmUsed && (
                              <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                                {msg.llmUsed}
                              </span>
                            )}
                          </div>

                          {msg.isGrounded !== undefined && (
                            <span
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                                msg.isGrounded
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-amber-50 text-amber-700 border border-amber-200"
                              }`}
                            >
                              {msg.isGrounded ? (
                                <>
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Grounded in Knowledge Base
                                </>
                              ) : (
                                <>
                                  <AlertCircle className="w-3 h-3 text-amber-600" /> Insufficient Evidence
                                </>
                              )}
                            </span>
                          )}
                        </div>

                        {/* Content / Loading / Error State */}
                        {msg.isLoading ? (
                          <div className="py-6 flex flex-col items-center justify-center gap-3 text-slate-500">
                            <Loader2 className="w-6 h-6 animate-spin text-[#F59E0B]" />
                            <p className="text-xs font-medium animate-pulse">
                              Retrieving clauses from 31 municipal documents & synthesizing grounded response...
                            </p>
                          </div>
                        ) : msg.error ? (
                          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm space-y-2">
                            <div className="flex items-center gap-2 font-bold text-red-900">
                              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                              <span>Service Notice</span>
                            </div>
                            <p>{msg.error}</p>
                            {msg.serviceUnavailable && (
                              <div className="pt-2 flex items-center gap-3">
                                <button
                                  onClick={() => handleAskAI(msg.query)}
                                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-xs transition-colors flex items-center gap-1"
                                >
                                  <RefreshCw className="w-3 h-3" /> Retry Query
                                </button>
                                <a
                                  href="#standard-faqs"
                                  className="text-xs text-[#17365D] hover:underline font-semibold flex items-center gap-1"
                                >
                                  Browse Standard FAQs Below <ArrowRight className="w-3 h-3" />
                                </a>
                              </div>
                            )}
                          </div>
                        ) : (
                          <>
                            {/* Insufficient Evidence Guardrail Banner */}
                            {!msg.isGrounded && (
                              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                                <div className="flex items-center gap-2 font-bold">
                                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                                  <span>Guardrail Activated: Insufficient Evidence in Municipal Records</span>
                                </div>
                                <p className="text-amber-800">
                                  The verified knowledge base does not contain sufficient statutory clauses to answer this specific question with certainty. The system will not generate unverified statements.
                                </p>
                              </div>
                            )}

                            {/* Rendered Answer */}
                            <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200">
                              {renderFormattedAnswer(msg.answer)}
                            </div>

                            {/* Retrieved Citations Grid */}
                            {msg.citations && msg.citations.length > 0 && (
                              <div className="space-y-3 pt-2">
                                <div className="flex items-center justify-between">
                                  <h5 className="text-xs font-bold text-[#17365D] uppercase tracking-wider flex items-center gap-1.5">
                                    <BookOpen className="w-3.5 h-3.5 text-[#F59E0B]" />
                                    {L.officialCitations} ({msg.citations.length})
                                  </h5>
                                  <span className="text-[11px] text-slate-500">
                                    Click any citation to inspect the retrieved excerpt
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 gap-2.5">
                                  {msg.citations.map((cite, cIdx) => {
                                    const citeKey = `${msg.id}-${cIdx}`;
                                    const isExpanded = Boolean(expandedCitations[citeKey]);

                                    return (
                                      <div
                                        key={cIdx}
                                        className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-colors"
                                      >
                                        <button
                                          type="button"
                                          onClick={() => toggleCitation(citeKey)}
                                          className="w-full text-left p-3.5 flex items-start sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors"
                                        >
                                          <div className="flex items-start sm:items-center gap-2.5 flex-1 min-w-0">
                                            <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                                              <FileText className="w-3.5 h-3.5 text-[#17365D]" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                              <div className="flex flex-wrap items-center gap-1.5">
                                                <span className="text-xs font-bold text-[#17365D] truncate max-w-sm">
                                                  {cite.doc_name}
                                                </span>
                                                <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.2 rounded">
                                                  Page {cite.page_num}
                                                </span>
                                                {cite.section && cite.section !== "General" && (
                                                  <span className="text-[11px] text-slate-500 bg-slate-50 px-1.5 py-0.2 rounded border border-slate-200">
                                                    {cite.section}
                                                  </span>
                                                )}
                                              </div>
                                              <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                                                  Retrieval Score:{" "}
                                                  <strong className="text-emerald-700 font-semibold">
                                                    {cite.relevance_score}%
                                                  </strong>
                                                  <span className="text-[10px] text-slate-400">
                                                    (vector match similarity)
                                                  </span>
                                                </span>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="flex items-center gap-1 text-xs font-semibold text-[#17365D] shrink-0">
                                            <span className="hidden sm:inline">
                                              {isExpanded ? L.hideExcerpt : L.viewExcerpt}
                                            </span>
                                            {isExpanded ? (
                                              <ChevronUp className="w-4 h-4 text-slate-500" />
                                            ) : (
                                              <ChevronDown className="w-4 h-4 text-slate-500" />
                                            )}
                                          </div>
                                        </button>

                                        {isExpanded && (
                                          <div className="px-4 py-3 bg-slate-50/80 border-t border-slate-100 text-xs text-slate-700 space-y-2">
                                            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase">
                                              <span>Exact Text Excerpt from Official Document:</span>
                                              {cite.chunk_id && (
                                                <span className="font-mono text-[10px] text-slate-400">
                                                  ID: {cite.chunk_id.slice(0, 16)}...
                                                </span>
                                              )}
                                            </div>
                                            <blockquote className="p-3 bg-white rounded-lg border-l-3 border-[#F59E0B] text-slate-700 font-mono text-[11px] leading-relaxed whitespace-pre-wrap shadow-2xs">
                                              {cite.snippet}
                                            </blockquote>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            )}

            {/* Input Box for Asking Question */}
            <div className="space-y-3">
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={2}
                  placeholder={L.placeholder}
                  className="w-full pl-4 pr-32 py-3 bg-slate-50 hover:bg-white focus:bg-white text-slate-800 text-sm rounded-xl border border-slate-300 focus:border-[#17365D] focus:ring-2 focus:ring-[#17365D]/20 outline-none transition-all resize-none shadow-inner"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => handleAskAI()}
                  disabled={isSubmitting || !inputQuery.trim()}
                  className="absolute right-2.5 bottom-3.5 px-4 py-2 bg-[#17365D] hover:bg-[#08264A] disabled:bg-slate-300 text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{L.thinking}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>{L.askAIBtn}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Suggested Questions Pills */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Search className="w-3 h-3 text-[#F59E0B]" />
                  {L.suggested}
                </span>
                <div className="flex flex-wrap gap-2">
                  {suggestedQueries.map((suggested, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => handleAskAI(suggested)}
                      disabled={isSubmitting}
                      className="text-left text-xs bg-slate-100 hover:bg-amber-50 hover:text-[#17365D] hover:border-amber-300 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition-all duration-150 cursor-pointer disabled:opacity-50"
                    >
                      {suggested}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 2: STANDARD FAQS BY CATEGORY                     */}
        {/* ======================================================== */}
        <section id="standard-faqs" className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2 border-b border-slate-200 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wide">
              <Layers className="w-3.5 h-3.5 text-[#17365D]" />
              {L.standardRepo}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17365D]">
              {t("faqTitle")}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
              {t("faqSubtitle")}
            </p>
          </div>

          {/* Category Tabs (All 6 Preserved) */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {Object.keys(faqs).map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 sm:px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border cursor-pointer ${
                  activeTab === category
                    ? "bg-[#17365D] border-[#17365D] text-white shadow-md"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                {t(`faq${category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, "$1")}`)}
              </button>
            ))}
          </div>

          {/* Accordion Questions for Active Category */}
          <div className="pt-2">{renderFAQ(activeTab)}</div>
        </section>

      </div>
    </div>
  );
};

export default FAQPage;
