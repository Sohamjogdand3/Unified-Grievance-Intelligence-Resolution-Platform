import { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useTour } from "../context/TourContext";
import { getTranslation } from "../translations/translations";
import StateEmblem from "./common/StateEmblem";
import { Globe, User, ChevronDown, Menu, X, Shield, FileText, Search, BookOpen, Phone, Layers } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, changeLanguage } = useLanguage();
  const { startTour, hasCompletedTour, isTourActive } = useTour();
  const t = (key) => getTranslation(language, key);

  const [servicesOpen, setServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const servicesRef = useRef(null);
  const langRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languageLabels = {
    en: "English",
    hi: "हिंदी (Hindi)",
    mr: "मराठी (Marathi)",
  };

  const isHomeActive = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#D1D5DB] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Government Emblem & NagrikConnect AI Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <StateEmblem className="h-12 w-auto shrink-0 transition-transform group-hover:scale-105" color="#17365D" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#17365D]">
                  NagrikConnect
                </span>
                <span className="text-xl sm:text-2xl font-black text-[#F59E0B]">
                  AI
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-slate-500 tracking-wide">
                Government Grievance Management
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* How It Works */}
            <Link
              to="/how-it-works"
              className={`px-3.5 py-2 rounded-md font-medium text-sm transition-colors ${
                location.pathname === "/how-it-works"
                  ? "text-[#F59E0B] font-semibold"
                  : "text-[#17365D] hover:text-[#08264A] hover:bg-slate-50"
              }`}
            >
              How It Works
            </Link>

            {/* Knowledge Base */}
            <Link
              to="/faqs"
              className={`px-3.5 py-2 rounded-md font-medium text-sm transition-colors ${
                location.pathname === "/faqs"
                  ? "text-[#F59E0B] font-semibold"
                  : "text-[#17365D] hover:text-[#08264A] hover:bg-slate-50"
              }`}
            >
              Knowledge Base
            </Link>

            {/* About Us */}
            <Link
              to="/about"
              className={`px-3.5 py-2 rounded-md font-medium text-sm transition-colors ${
                location.pathname === "/about"
                  ? "text-[#F59E0B] font-semibold"
                  : "text-[#17365D] hover:text-[#08264A] hover:bg-slate-50"
              }`}
            >
              About Us
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              className={`px-3.5 py-2 rounded-md font-medium text-sm transition-colors ${
                location.pathname === "/contact"
                  ? "text-[#F59E0B] font-semibold"
                  : "text-[#17365D] hover:text-[#08264A] hover:bg-slate-50"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right: Language Selector & Login */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#D1D5DB] hover:border-[#17365D] hover:bg-slate-50 text-xs font-semibold text-[#17365D] transition-colors"
                title="Select Preferred Language"
              >
                <Globe className="w-4 h-4 text-[#1677D2]" />
                <span>{languageLabels[language] || "English"}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                  {Object.entries(languageLabels).map(([code, label]) => (
                    <button
                      key={code}
                      onClick={() => {
                        changeLanguage(code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center justify-between transition-colors ${
                        language === code
                          ? "bg-amber-50 text-[#F59E0B] font-bold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{label}</span>
                      {language === code && <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Interactive Tour Trigger Button (if needed) */}
            {hasCompletedTour && !isTourActive && (
              <button
                onClick={() => {
                  localStorage.removeItem("nagrik_tour_completed");
                  window.location.reload();
                }}
                className="text-[11px] font-semibold text-[#1677D2] hover:underline px-2 py-1"
                title="Restart interactive portal tour"
              >
                Guided Tour
              </button>
            )}

            {/* Login Button - Exact Navy #17365D */}
            <button
              id="login-btn"
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 bg-[#17365D] hover:bg-[#08264A] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:shadow transition-all active:scale-95"
            >
              <User className="w-4 h-4 text-white" />
              <span>{t("login") || "Login"}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#17365D] hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-sm text-[#17365D] hover:bg-slate-50"
          >
            How It Works
          </Link>
          <Link
            to="/faqs"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-sm text-[#17365D] hover:bg-slate-50"
          >
            Knowledge Base
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-sm text-[#17365D] hover:bg-slate-50"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-sm text-[#17365D] hover:bg-slate-50"
          >
            Contact
          </Link>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Language:</span>
              <div className="flex gap-1.5">
                {Object.entries(languageLabels).map(([code, label]) => (
                  <button
                    key={code}
                    onClick={() => changeLanguage(code)}
                    className={`px-2 py-1 text-xs rounded font-medium ${
                      language === code ? "bg-[#17365D] text-white" : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/login");
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#17365D] text-white py-2.5 rounded-lg text-sm font-semibold shadow"
            >
              <User className="w-4 h-4" />
              <span>Login to Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;