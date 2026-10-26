import React from "react";
import { useNavigate } from "react-router-dom";
import { UserCheck, ShieldAlert, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const CitizenOfficerGateway = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navy Container Panel for Depth */}
        <div className="relative bg-gradient-to-br from-[#08264A] via-[#0d2e57] to-[#17365D] rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden border border-white/10">
          
          {/* Ambient background glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Header */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] text-xs font-bold uppercase tracking-wider mb-4 border border-[#F59E0B]/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Unified Governance Gateway</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Two Portals. <br />
                <span className="text-[#F59E0B]">One Transparent</span> Platform.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed">
                Whether you are a citizen reporting a community issue or an administrative officer managing municipal workflows, NagrikConnect AI connects you instantly.
              </p>
            </div>

            {/* Right: Two Gateway Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Citizen Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 hover:bg-white/15 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-[#F59E0B] flex items-center justify-center mb-4 border border-[#F59E0B]/30">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    For Citizens
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-200 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Voice-to-text intake in 10+ languages</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Backlog-aware dynamic ETA tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Verified photo proof & resolution slip</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => navigate("/login")}
                  className="w-full flex items-center justify-center gap-2 bg-[#F59E0B] hover:bg-[#d97706] text-[#08264A] py-3 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95"
                >
                  <span>Citizen Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Government Officer Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 hover:bg-white/15 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-400/20 text-cyan-300 flex items-center justify-center mb-4 border border-cyan-400/30">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    For Government Officers
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-200 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Automated spam & duplicate filtering</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Critical SLA countdowns & escalations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Spatio-temporal risk forecasting maps</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="http://localhost:5174/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white border border-white/40 py-3 rounded-xl font-bold text-sm transition-all active:scale-95"
                >
                  <span>Officer Command Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CitizenOfficerGateway;
