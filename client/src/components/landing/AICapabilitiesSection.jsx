import React from "react";
import {
  MessageSquare,
  ShieldCheck,
  Database,
  Share2,
  Sparkles
} from "lucide-react";

const capabilities = [
  {
    icon: MessageSquare,
    iconColor: "text-[#1677D2]",
    iconBg: "bg-blue-50",
    title: "Natural Language Understanding",
    description: "Supports multilingual text and voice input in 10+ Indian languages with semantic extraction.",
  },
  {
    icon: ShieldCheck,
    iconColor: "text-[#F59E0B]",
    iconBg: "bg-amber-50",
    title: "Authenticity Assessment",
    description: "Analyzes and verifies grievance authenticity, EXIF GPS distance, and detects deepfake/synthetic photos.",
  },
  {
    icon: Database,
    iconColor: "text-[#1677D2]",
    iconBg: "bg-blue-50",
    title: "RAG Knowledge Retrieval",
    description: "Searches government rules, schemes, citizen charters, and past municipal resolution precedents.",
  },
  {
    icon: Share2,
    iconColor: "text-[#F59E0B]",
    iconBg: "bg-amber-50",
    title: "Multi-Agent Processing",
    description: "Collaborative AI agents for automated duplicate detection, priority scoring, and department routing.",
  },
];

const AICapabilitiesSection = () => {
  return (
    <section className="bg-white py-14 lg:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-1 bg-[#F59E0B] rounded-full"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
              Core Intelligence
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17365D] tracking-tight">
            AI Capabilities
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl">
            Powered by RAG and Multi-Agent AI for accurate and context-aware grievance resolution.
          </p>
        </div>

        {/* Capabilities Grid with Highlight Banner */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          
          {/* Left: 4 Capability Cards (8 columns on desktop) */}
          <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-11 h-11 rounded-xl ${cap.iconBg} ${cap.iconColor} flex items-center justify-center mb-4 shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-[#17365D] mb-1.5 leading-snug">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Highlight Summary Card (4 columns on desktop) */}
          <div className="md:col-span-4 lg:col-span-3 bg-gradient-to-br from-[#08264A] to-[#17365D] text-white rounded-xl p-6 shadow-md flex flex-col justify-between border border-blue-900/50">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F59E0B]/20 text-[#F59E0B] text-[11px] font-bold uppercase tracking-wider mb-4 border border-[#F59E0B]/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Governance</span>
              </div>
              <h3 className="text-xl font-extrabold text-white leading-tight">
                Smart. Transparent. People-Centric.
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
                Leveraging AI to make government more responsive, accountable and accessible to every citizen.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-amber-300 font-semibold">
              <span>Zero-Spam • 100% Traceable</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AICapabilitiesSection;
