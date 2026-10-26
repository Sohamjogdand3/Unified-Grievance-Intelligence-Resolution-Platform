import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import StateEmblem from "../components/common/StateEmblem";
import Footer from "../components/Footer";
import {
  Brain,
  ShieldCheck,
  Cpu,
  Layers,
  Database,
  Compass,
  Eye,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users2,
  FileText,
  Lock,
  Globe2,
  TrendingUp,
  Activity
} from "lucide-react";

const pillars = [
  {
    icon: Brain,
    iconColor: "text-[#1677D2]",
    iconBg: "bg-blue-50",
    badge: "Core AI",
    title: "Multi-Agent Triage & Classification",
    description:
      "Collaborative AI agents automatically inspect complaint text, categorize urgency, filter spam, and route each ticket to the exact municipal division without manual triage bottlenecks.",
  },
  {
    icon: Database,
    iconColor: "text-[#F59E0B]",
    iconBg: "bg-amber-50",
    badge: "RAG Engine",
    title: "RAG Knowledge Intelligence",
    description:
      "Retrieval-Augmented Generation searches state policies, municipal circulars, citizen charters, and past resolution precedents to assist citizens with instantaneous, legally accurate guidance.",
  },
  {
    icon: ShieldCheck,
    iconColor: "text-[#16A34A]",
    iconBg: "bg-emerald-50",
    badge: "Forensics",
    title: "Visual Evidence & Deepfake Shield",
    description:
      "Multimodal Gemini Vision and EXIF metadata analysis verify photo authenticity, calculate GPS distance to the claimed site, and block synthetic or duplicate complaint submissions.",
  },
  {
    icon: Clock,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
    badge: "Analytics",
    title: "Backlog-Aware Dynamic ETA",
    description:
      "A mathematical resolution engine calculates transparent completion deadlines factoring in current department backlog, daily officer bandwidth, and issue severity rather than canned estimates.",
  },
  {
    icon: Globe2,
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-50",
    badge: "Inclusivity",
    title: "Multilingual Voice-to-Text Intake",
    description:
      "Enables all citizens, regardless of literacy or language preference, to speak their grievance in 10+ regional Indian languages and receive automated transcription and assistance.",
  },
  {
    icon: TrendingUp,
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50",
    badge: "Proactive",
    title: "Predictive Risk & Bottleneck Forecasting",
    description:
      "Spatio-temporal machine learning identifies recurring failure clusters across municipal wards 24–48 hours in advance, allowing preventive maintenance before civic crises happen.",
  },
];

const stats = [
  { value: "10+", label: "Indian Languages Supported" },
  { value: "25+", label: "Government Departments" },
  { value: "98.4%", label: "Visual Verification Accuracy" },
  { value: "100%", label: "Tamper-Proof Audit Trail" },
];

const values = [
  {
    icon: Eye,
    title: "Radical Transparency",
    desc: "Every grievance is assigned a unique reference code with real-time status tracking, milestone progression, and before/after photo proof of work upon closure.",
  },
  {
    icon: Lock,
    title: "Forensic Integrity",
    desc: "Zero tolerance for fake or staged complaints. Our automated EXIF and AI vision pipeline guarantees that public resources are dispatched only to authentic civic problems.",
  },
  {
    icon: Users2,
    title: "Citizen-Centric Empathy",
    desc: "Designed to remove red-tape barriers. Whether submitting via microphone, mobile phone, or desktop, every resident has an equal voice in civic governance.",
  },
  {
    icon: Activity,
    title: "Proactive Governance",
    desc: "Moving municipal administration from reactive firefighting to data-driven, predictive planning that fixes infrastructure before widespread failure occurs.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-gradient-to-b from-[#08264A] via-[#0d2e57] to-[#17365D] text-white py-16 lg:py-24 overflow-hidden border-b border-slate-800">
        {/* Ambient background blur */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 -right-32 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Emblem & Tag */}
          <div className="flex flex-col items-center justify-center mb-6">
            <StateEmblem className="h-16 w-auto mb-3" color="#F59E0B" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F59E0B] text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Generation Public Governance</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            About <span className="text-white">NagrikConnect</span>{" "}
            <span className="text-[#F59E0B]">AI</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            A RAG-driven, multi-agent civic intelligence platform bridging the gap between 1.4 billion citizens and municipal authorities for faster, transparent, and predictive governance.
          </p>

          {/* Stat Ribbon */}
          <div className="mt-12 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
            {stats.map((s, idx) => (
              <div key={idx} className="text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#F59E0B]">{s.value}</p>
                <p className="text-xs text-slate-200 mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Mission Card */}
            <div className="bg-gradient-to-br from-slate-50 to-amber-50/40 p-8 sm:p-10 rounded-3xl border border-amber-200/60 shadow-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#F59E0B] flex items-center justify-center mb-6 shadow-sm">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
                Our Purpose
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17365D] mt-1 mb-4">
                Our Mission
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                To transform citizen grievance management from slow, bureaucratic, and reactive complaint handling into an intelligent, transparent, and automated public service. We empower every resident to have their concerns verified, prioritized, and permanently resolved with measurable accountability.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 p-8 sm:p-10 rounded-3xl border border-blue-200/60 shadow-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#1677D2] flex items-center justify-center mb-6 shadow-sm">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1677D2]">
                Future Governance
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17365D] mt-1 mb-4">
                Our Vision
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                A digitally inclusive nation where civic problems are detected and forecasted before they cause distress. By harmonizing Large Language Models, Multi-Agent coordination, and computer vision, we envision government departments operating with seamless agility and citizen trust.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= THE PROBLEM & SOLUTION ================= */}
      <section className="py-16 lg:py-20 bg-[#F3F4F6] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
              The Innovation Shift
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17365D] tracking-tight mt-1">
              From Reactive Red Tape to Intelligent Resolution
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Legacy municipal systems are burdened by bottlenecks. NagrikConnect AI replaces manual delays with modern intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* The Old Way */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm mb-4">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <span>The Legacy Challenge</span>
              </div>
              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span><strong>Manual Triage Backlogs:</strong> Thousands of unstructured complaints sit unread for weeks before being routed.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span><strong>Duplicate Clutter & Spam:</strong> Identical issues reported by dozens of neighbors waste administrative resources.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span><strong>Language & Literacy Exclusion:</strong> English-only bureaucratic web forms exclude non-literate and regional speakers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span><strong>Ghost Closures:</strong> Complaints marked "Resolved" without verifiable photo proof or citizen confirmation.</span>
                </li>
              </ul>
            </div>

            {/* The NagrikConnect Solution */}
            <div className="bg-gradient-to-br from-[#08264A] to-[#17365D] text-white rounded-2xl p-8 border border-blue-900 shadow-lg">
              <div className="flex items-center gap-2 text-[#F59E0B] font-bold text-sm mb-4">
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]"></span>
                <span>The NagrikConnect AI Advantage</span>
              </div>
              <ul className="space-y-4 text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Instant AI Triaging:</strong> Real-time classification and routing to 25+ specialized departments in under 2 minutes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Semantic Deduplication:</strong> Identifies nearby complaints within 100m and clusters them into single actionable tickets.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>10+ Language Voice Intake:</strong> Spoken grievance filing via browser Web Speech API with regional translation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Forensic Verification:</strong> Before-and-after photo verification, GPS distance checking, and downloadable PDF resolution receipts.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ================= 6 CORE TECHNOLOGICAL PILLARS ================= */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
              Platform Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17365D] tracking-tight mt-1">
              Six Pillars of Civic Intelligence
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500">
              Built on modern full-stack web standards, distributed ML microservices, and multimodal artificial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${p.iconBg} ${p.iconColor} flex items-center justify-center shadow-sm`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-[#17365D] border border-slate-200">
                        {p.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#17365D] mb-2 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="py-16 lg:py-20 bg-[#F3F4F6] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
              Our Foundation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17365D] tracking-tight mt-1">
              Principles That Guide Us
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              We design every algorithm and interaction with public accountability and citizen safety in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#F59E0B] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-[#17365D] mb-2">{val.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-[#08264A] via-[#0d2e57] to-[#17365D] rounded-3xl p-10 sm:p-14 text-white shadow-2xl relative overflow-hidden border border-white/10">
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Experience the Future of Citizen Redressal
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-200 max-w-2xl mx-auto">
                Have a local issue in your ward or neighborhood? Report it in seconds or check how our intelligent resolution engine works.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/login"
                  className="bg-[#F59E0B] hover:bg-[#d97706] text-[#08264A] font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2"
                >
                  <span>Submit a Grievance</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/how-it-works"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold text-sm sm:text-base px-7 py-3.5 rounded-xl transition-all"
                >
                  Explore How It Works
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Footer */}
      <Footer />

    </div>
  );
}
