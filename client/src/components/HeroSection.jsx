import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getTranslation } from "../translations/translations";
import {
  Mic,
  Languages,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Search,
  ChevronLeft,
  ChevronRight,
  Edit3,
  X
} from "lucide-react";

const carouselSlides = [
  {
    id: 1,
    image: "/images/carousel/citizen_empowerment.jpg",
    category: "Citizen Empowerment",
    title: "Report Civic Issues Effortlessly",
    description: "Submit complaints in your regional language via voice, text, or mobile with automatic location tagging.",
    alt: "Citizen reporting municipal issues through smartphone"
  },
  {
    id: 2,
    image: "/images/carousel/ai_verification.jpg",
    category: "AI-Powered Verification",
    title: "Instant Forensic & Evidence Check",
    description: "Advanced AI verifies image authenticity, checks GPS coordinates, and prevents duplicate filings.",
    alt: "AI verification engine inspecting photo evidence and detecting authenticity"
  },
  {
    id: 3,
    image: "/images/carousel/rag_intelligence.jpg",
    category: "RAG Knowledge Intelligence",
    title: "Government Schemes & Guidelines",
    description: "Instant context-aware answers retrieved from municipal circulars, citizen charters, and state policies.",
    alt: "RAG intelligence connecting government knowledge base to conversational AI"
  },
  {
    id: 4,
    image: "/images/carousel/transparent_resolution.jpg",
    category: "Transparent Grievance Resolution",
    title: "Accountable Field Action to Closure",
    description: "Track automated department dispatch, on-ground repairs, and official before/after resolution proof.",
    alt: "End-to-end resolution tracking from field team action to verified closure"
  }
];

const HeroSection = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [searchCode, setSearchCode] = useState("");

  const timeoutRef = useRef(null);

  // Auto transition every 5.5 seconds (5500ms)
  useEffect(() => {
    if (isPaused) return;

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselSlides.length);
    }, 5500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, isPaused]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselSlides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % carouselSlides.length
    );
  };

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!searchCode.trim()) return;
    navigate(`/grievance/${encodeURIComponent(searchCode.trim())}`);
  };

  return (
    <section
      id="tour-hero"
      className="relative bg-gradient-to-b from-[#08264A] via-[#0d2e57] to-[#17365D] text-white py-12 lg:py-20 overflow-hidden"
    >
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            
            {/* Top Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#F59E0B]">
                AI-Powered Government Grievance Management
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.12]"
            >
              Your Voice. <br />
              Our <span className="text-[#F59E0B]">Intelligent</span> Resolution.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-base sm:text-lg text-slate-200 max-w-xl leading-relaxed"
            >
              Submit grievances in your preferred language, get AI-powered assistance, access government knowledge, and track resolution with complete transparency.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              {/* Primary Button - Saffron #F59E0B */}
              <button
                onClick={() => navigate("/login")}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#F59E0B] hover:bg-[#d97706] text-[#08264A] font-bold text-base px-7 py-3.5 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <Edit3 className="w-5 h-5" />
                <span>Submit Grievance</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </button>

              {/* Secondary Button - Deep Navy with White Border */}
              <button
                onClick={() => setTrackModalOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/15 text-white border border-white/40 font-semibold text-base px-6 py-3.5 rounded-lg backdrop-blur-sm transition-all duration-200"
              >
                <Search className="w-5 h-5 text-slate-200" />
                <span>Track Grievance</span>
              </button>
            </motion.div>

            {/* Feature Badges Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 pt-6 border-t border-white/15 w-full grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white">
                  <Mic className="w-4 h-4 text-amber-300" />
                </div>
                <span className="text-xs font-medium text-slate-200">
                  Voice<br />Submission
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white">
                  <Languages className="w-4 h-4 text-cyan-300" />
                </div>
                <span className="text-xs font-medium text-slate-200">
                  10+ Indian<br />Languages
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                </div>
                <span className="text-xs font-medium text-slate-200">
                  AI<br />Verification
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white">
                  <BookOpen className="w-4 h-4 text-blue-300" />
                </div>
                <span className="text-xs font-medium text-slate-200">
                  Government<br />Knowledge Base
                </span>
              </div>
            </motion.div>

          </div>

          {/* ================= RIGHT COLUMN (CAROUSEL) ================= */}
          <div
            className="lg:col-span-6 relative flex flex-col items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Carousel Container Card */}
            <div className="relative w-full max-w-xl aspect-[16/10] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900/60 backdrop-blur-sm group">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselSlides[currentIndex].id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.65, ease: "easeInOut" }}
                  className="relative w-full h-full"
                >
                  <img
                    src={carouselSlides[currentIndex].image}
                    alt={carouselSlides[currentIndex].alt}
                    className="w-full h-full object-cover object-center select-none"
                    loading="eager"
                  />

                  {/* Gradient shadow overlay for readable bottom text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent"></div>

                  {/* Slide Content Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-left">
                    <span className="inline-block px-2.5 py-1 mb-2 rounded bg-[#F59E0B] text-[#08264A] text-[11px] font-bold uppercase tracking-wider">
                      {carouselSlides[currentIndex].category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                      {carouselSlides[currentIndex].title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-200 max-w-md line-clamp-2 drop-shadow">
                      {carouselSlides[currentIndex].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Controls */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg transition-transform active:scale-90 opacity-90 hover:opacity-100 z-20"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-slate-900" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg transition-transform active:scale-90 opacity-90 hover:opacity-100 z-20"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 text-slate-900" />
              </button>
            </div>

            {/* 4 Slide Indicators */}
            <div className="flex items-center gap-2.5 mt-5">
              {carouselSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-8 bg-[#F59E0B]"
                      : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.category}`}
                  aria-current={currentIndex === idx ? "true" : "false"}
                />
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Quick Track Modal Overlay */}
      {trackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setTrackModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-[#F59E0B]">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#17365D]">Track Your Grievance</h3>
                <p className="text-xs text-slate-500">Enter your official Grievance Reference Code</p>
              </div>
            </div>

            <form onSubmit={handleTrackSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Grievance Code (e.g. GRV-2026-XXXX)
                </label>
                <input
                  type="text"
                  placeholder="Enter Grievance Code..."
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#17365D] text-sm uppercase font-mono tracking-wider"
                  autoFocus
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTrackModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-300 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!searchCode.trim()}
                  className="flex-1 py-2.5 bg-[#17365D] hover:bg-[#08264A] disabled:bg-slate-300 text-white rounded-lg text-sm font-semibold transition"
                >
                  Lookup Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};

export default HeroSection;