import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getTranslation } from "../translations/translations";
import StateEmblem from "./common/StateEmblem";

const Header = () => {
  const location = useLocation();
  const [active, setActive] = useState("");
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const navLinks = [
    { name: t("home") || "Home", path: "/homepage" },
    { name: t("contactUs") || "Contact Us", path: "/homepage/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#D1D5DB] bg-white px-6 py-3.5 text-slate-900 shadow-sm">
      {/* Brand & Citizen Portal Tag */}
      <div className="flex items-center gap-3">
        <Link to="/homepage" className="flex items-center gap-3 group">
          <StateEmblem className="h-10 w-auto shrink-0 transition-transform group-hover:scale-105" color="#17365D" />
          <div>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#F59E0B]">
              Citizen Portal
            </p>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-[#17365D] leading-tight">
              <span>NagrikConnect</span>{" "}
              <span className="text-[#F59E0B]">AI</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation: Home & Contact Us */}
      <nav className="relative">
        <ul className="flex items-center gap-2 sm:gap-4">
          {navLinks.map((item, index) => {
            const isActive = location.pathname === item.path || active === item.name;
            return (
              <li
                key={index}
                onClick={() => setActive(item.name)}
                className="relative"
              >
                <Link
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 inline-block ${
                    isActive
                      ? "bg-amber-50 text-[#F59E0B] border border-[#F59E0B]/30 shadow-sm"
                      : "text-[#17365D] hover:text-[#08264A] hover:bg-slate-100/80"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
