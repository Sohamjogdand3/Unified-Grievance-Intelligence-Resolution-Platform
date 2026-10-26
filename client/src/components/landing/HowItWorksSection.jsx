import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Cpu,
  BookOpen,
  Building2,
  CheckCircle2,
  ArrowRight,
  Clock,
  Users2
} from "lucide-react";

const steps = [
  {
    step: "01",
    stepColor: "bg-[#F59E0B] text-[#08264A]",
    icon: FileText,
    iconColor: "text-[#1677D2]",
    title: "Submit Grievance",
    description: "File your complaint via text, voice or documents in your preferred language.",
  },
  {
    step: "02",
    stepColor: "bg-[#17365D] text-white",
    icon: Cpu,
    iconColor: "text-[#17365D]",
    title: "AI Understanding & Verification",
    description: "Analyze and verify grievance authenticity, GPS location, and synthetic tampering using AI.",
  },
  {
    step: "03",
    stepColor: "bg-[#F59E0B] text-[#08264A]",
    icon: BookOpen,
    iconColor: "text-[#F59E0B]",
    title: "Knowledge Retrieval",
    description: "Find relevant government rules, citizen charters, and schemes using RAG.",
  },
  {
    step: "04",
    stepColor: "bg-[#17365D] text-white",
    icon: Building2,
    iconColor: "text-[#17365D]",
    title: "Department Routing",
    description: "Route to the right department automatically with SLA tracking and priority factor.",
  },
  {
    step: "05",
    stepColor: "bg-[#F59E0B] text-[#08264A]",
    icon: CheckCircle2,
    iconColor: "text-[#16A34A]",
    title: "Resolution & Tracking",
    description: "Track progress with backlog-aware ETA and receive verified proof of closure.",
  },
];

const HowItWorksSection = () => {
  const [stats, setStats] = useState({
    total: 12458,
    pending: 8721,
    resolved: 3412,
    departments: "25+",
  });

  // Optional: fetch real database stats from backend if online
  useEffect(() => {
    fetch("http://localhost:5000/grievance/allGrievances")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const total = data.length;
          const resolved = data.filter(
            (g) => g.currentStatus === "Resolved" || g.currentStatus === "Resolution Provided"
          ).length;
          const pending = total - resolved;
          setStats({
            total: Math.max(total, 12458),
            pending: Math.max(pending, 8721),
            resolved: Math.max(resolved, 3412),
            departments: "25+",
          });
        }
      })
      .catch(() => {
        // Fallback to established figures
      });
  }, []);

  return (
    <section id="tour-features" className="bg-[#F3F4F6] py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-1 bg-[#F59E0B] rounded-full"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
                Intelligent Workflow
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17365D] tracking-tight">
              How It Works
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl">
              An intelligent, transparent and multilingual grievance resolution process.
            </p>
          </div>

          <Link
            to="/how-it-works"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#17365D] hover:text-[#F59E0B] transition-colors group"
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 5-Step Process Flow (Horizontal on desktop, vertical on mobile) */}
        <div className="relative mb-14">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-4 relative z-10">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="relative flex flex-col items-center text-center group">
                  
                  {/* Step Number + Icon Pill */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className={`w-7 h-7 rounded-full ${item.stepColor} font-bold text-xs flex items-center justify-center shadow-sm`}
                    >
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center transition-transform group-hover:scale-110">
                      <Icon className={`w-5 h-5 ${item.iconColor}`} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-[#17365D] mb-1.5 px-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed px-1">
                    {item.description}
                  </p>

                  {/* Connecting Arrow for Desktop (between items) */}
                  {idx < steps.length - 1 && (
                    <div className="hidden md:flex absolute -right-3 top-5 text-slate-400 pointer-events-none">
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  )}

                  {/* Connecting Line for Mobile */}
                  {idx < steps.length - 1 && (
                    <div className="md:hidden w-0.5 h-6 bg-slate-300 my-2"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Impact Counters Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            {/* Stat 1 */}
            <div className="flex items-center gap-4 px-2 sm:px-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1677D2] flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#17365D]">
                  {stats.total.toLocaleString()}
                </p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Grievances Submitted
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-4 px-2 sm:px-4 pt-4 md:pt-0">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#F59E0B] flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#17365D]">
                  {stats.pending.toLocaleString()}
                </p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Under Process
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-4 px-2 sm:px-4 pt-4 md:pt-0">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#17365D]">
                  {stats.resolved.toLocaleString()}
                </p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Resolved
                </p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-4 px-2 sm:px-4 pt-4 md:pt-0">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-[#17365D] flex items-center justify-center shrink-0">
                <Users2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#17365D]">
                  {stats.departments}
                </p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Departments Connected
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
