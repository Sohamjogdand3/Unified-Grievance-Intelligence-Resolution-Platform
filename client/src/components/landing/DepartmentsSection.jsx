import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Droplets,
  Construction,
  Trash2,
  Zap,
  HeartPulse,
  Mail,
  Receipt,
  ArrowRight
} from "lucide-react";

const departments = [
  {
    name: "Roads & Infrastructure",
    slug: "housing_urban",
    icon: Construction,
    iconColor: "text-[#F59E0B]",
    iconBg: "bg-amber-50",
    desc: "Potholes, damaged footpaths, traffic signals & street furniture",
    sla: "24–48h SLA",
  },
  {
    name: "Water Supply & Sewage",
    slug: "housing_urban",
    icon: Droplets,
    iconColor: "text-[#1677D2]",
    iconBg: "bg-blue-50",
    desc: "Pipeline bursts, contaminated water, low pressure & sewage overflow",
    sla: "12–24h SLA",
  },
  {
    name: "Sanitation & Waste Management",
    slug: "housing_urban",
    icon: Trash2,
    iconColor: "text-[#16A34A]",
    iconBg: "bg-emerald-50",
    desc: "Garbage collection, overflowing dumpsters & public cleanliness",
    sla: "24h SLA",
  },
  {
    name: "Electricity & Street Lighting",
    slug: "telecommunications",
    icon: Zap,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
    desc: "Streetlight outage, hanging wires & transformer hazards",
    sla: "12h SLA",
  },
  {
    name: "Public Health & Welfare",
    slug: "health_welfare",
    icon: HeartPulse,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50",
    desc: "Mosquito fogging, stray animal control & clinic hygiene",
    sla: "48h SLA",
  },
  {
    name: "Postal & Communications",
    slug: "posts",
    icon: Mail,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
    desc: "Postal delays, parcel tracking & communication infrastructure",
    sla: "72h SLA",
  },
];

const DepartmentsSection = () => {
  const navigate = useNavigate();

  return (
    <section id="departments" className="bg-[#F3F4F6] py-16 lg:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-1 bg-[#F59E0B] rounded-full"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
                Department Network
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17365D] tracking-tight">
              Civic Departments & Portals
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl">
              File directly with specific departments or let our multi-agent AI automatically classify your issue.
            </p>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#17365D] hover:text-[#F59E0B] transition-colors"
          >
            <span>All Departments (25+)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Department Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, idx) => {
            const Icon = dept.icon;
            return (
              <div
                key={idx}
                onClick={() => navigate("/login")}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${dept.iconBg} ${dept.iconColor} flex items-center justify-center shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {dept.sla}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#17365D] group-hover:text-[#08264A] transition-colors mb-1.5">
                    {dept.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {dept.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#1677D2] group-hover:text-[#F59E0B] transition-colors">
                  <span>File In This Department</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default DepartmentsSection;
