import React from "react";
import {
  FileText,
  Search,
  BookOpen,
  Scale,
  MessageSquare
} from "lucide-react";

const servicesList = [
  {
    id: "register",
    title: "Register Grievance",
    description: "Submit a new complaint with details and documents",
    icon: FileText,
    iconBg: "bg-blue-50 text-[#1677D2]",
  },
  {
    id: "track",
    title: "Track Grievance",
    description: "Check the status of your existing complaint",
    icon: Search,
    iconBg: "bg-amber-50 text-[#F59E0B]",
  },
  {
    id: "knowledge",
    title: "Knowledge Base",
    description: "Explore government schemes, policies and FAQs",
    icon: BookOpen,
    iconBg: "bg-emerald-50 text-[#16A34A]",
  },
  {
    id: "appeal",
    title: "File an Appeal",
    description: "Appeal if you are not satisfied with the resolution",
    icon: Scale,
    iconBg: "bg-rose-50 text-rose-500",
  },
  {
    id: "feedback",
    title: "Give Feedback",
    description: "Share your suggestions and feedback",
    icon: MessageSquare,
    iconBg: "bg-purple-50 text-purple-600",
  },
];

const InformationServices = () => {
  return (
    <section id="tour-services" className="bg-white py-14 lg:py-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 pb-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-1 bg-[#F59E0B] rounded-full"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
              Citizen Portal
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17365D] tracking-tight">
            Information & Services
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl">
            Access a range of grievance and information services designed for a more responsive government.
          </p>
        </div>

        {/* 5-Card Service Grid (Non-clickable Informational Display) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {servicesList.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm flex flex-col justify-between select-none"
              >
                <div>
                  {/* Icon Circle */}
                  <div
                    className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center mb-5 shadow-sm`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-[#17365D] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default InformationServices;
