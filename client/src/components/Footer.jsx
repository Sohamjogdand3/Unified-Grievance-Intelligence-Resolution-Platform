import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getTranslation } from "../translations/translations";
import StateEmblem from "./common/StateEmblem";
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck } from "lucide-react";

export default function Footer() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  return (
    <footer className="bg-[#08264A] text-white border-t border-slate-800">
      {/* Upper Footer: Branding & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Emblem (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <StateEmblem className="h-12 w-auto shrink-0" color="#F59E0B" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-white">
                    NagrikConnect
                  </span>
                  <span className="text-xl font-bold text-[#F59E0B]">AI</span>
                </div>
                <p className="text-xs text-slate-300 font-medium">
                  National Grievance Intelligence & Resolution Platform
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              Transforming public grievance redressal through intelligent multi-agent AI, RAG knowledge retrieval, and forensic evidence verification.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-amber-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Compliant with National Data Governance Framework</span>
            </div>
          </div>

          {/* Citizen Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] mb-4">
              Citizen Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li>
                <Link to="/homepage" className="hover:text-white transition">
                  Lodge Public Grievance
                </Link>
              </li>
              <li>
                <Link to="/status" className="hover:text-white transition">
                  Track Resolution Status
                </Link>
              </li>
              <li>
                <Link to="/complaints" className="hover:text-white transition">
                  Grievance History & Slips
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-white transition">
                  Knowledge Base & FAQs
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition">
                  Citizen Charter & SLAs
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About NagrikConnect AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Key Departments */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] mb-4">
              Key Departments
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li>
                <Link to="/grievance-form/housing_urban" className="hover:text-white transition">
                  Housing & Urban Affairs
                </Link>
              </li>
              <li>
                <Link to="/grievance-form/telecommunications" className="hover:text-white transition">
                  Electricity & Utilities
                </Link>
              </li>
              <li>
                <Link to="/grievance-form/health_welfare" className="hover:text-white transition">
                  Health & Sanitation
                </Link>
              </li>
              <li>
                <Link to="/grievance-form/posts" className="hover:text-white transition">
                  Posts & Communications
                </Link>
              </li>
              <li>
                <Link to="/grievance-form/income_tax" className="hover:text-white transition">
                  Central Taxes & Revenue
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Helplines */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] mb-4">
              Helpline & Support
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Toll-Free: 1800-11-4000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>support@nagrikconnect.gov.in</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Civic Redressal Authority, Central Secretariat</span>
              </li>
              <li>
                <Link to="/contact" className="inline-block mt-2 text-xs font-bold text-amber-400 hover:underline">
                  View Full Ward Directory →
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Compliance & Technical Metadata Bar (Preserves original translation hooks) */}
      <div className="bg-[#051c38] border-t border-slate-800/80 px-4 py-4 text-center text-xs text-slate-400 space-y-1.5">
        <p className="text-slate-300 font-medium">
          {t("footerDesignedBy") || "Designed, Developed and Hosted by National Informatics Centre (NIC)"}
        </p>
        <p className="text-[11px] text-slate-400">
          {t("footerCompatibility") || "Portal is best viewed in modern browsers (Chrome, Edge, Firefox, Safari) at 1024x768 resolution or above."}
        </p>
        <p className="text-[11px] text-slate-400 pt-1">
          <span className="hover:text-white cursor-pointer">{t("disclaimer") || "Disclaimer"}</span> | 
          <span className="mx-2 hover:text-white cursor-pointer">{t("websitePolicies") || "Website Policies"}</span> | 
          <span className="mx-2 hover:text-white cursor-pointer">{t("webInfoManager") || "Web Information Manager"}</span> | 
          <span className="mx-2">{t("version") || "Version 2.5.0"}</span>
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 text-[11px] text-slate-500">
          <span>{t("copyright") || "© Content Owned and Maintained by Municipal Redressal Authority"}</span>
          <span className="hidden sm:inline">•</span>
          <span>{t("totalVisitors") || "Total Unique Visitors: 2,419,820"}</span>
        </div>
      </div>
    </footer>
  );
}