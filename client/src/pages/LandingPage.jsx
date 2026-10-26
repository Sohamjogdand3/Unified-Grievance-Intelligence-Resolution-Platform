import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HeroSection from "../components/HeroSection";
import InformationServices from "../components/landing/InformationServices";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import AICapabilitiesSection from "../components/landing/AICapabilitiesSection";
import DepartmentsSection from "../components/landing/DepartmentsSection";
import CitizenOfficerGateway from "../components/landing/CitizenOfficerGateway";
import Footer from "../components/Footer";

const LandingPage = () => {
  useEffect(() => {
    const showToast = localStorage.getItem("showLoginToast");
    if (showToast === "true") {
      toast.success("Signed Out Successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      setTimeout(() => {
        localStorage.removeItem("showLoginToast");
      }, 3000);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);

  return (
    <div className="overflow-x-hidden w-full bg-white text-slate-900 font-sans">
      <ToastContainer autoClose={3000} position="top-center" />

      {/* 1. Hero Section (Deep Navy background with Left Message & Right 4-Image Carousel) */}
      <HeroSection />

      {/* 2. Information & Services (White background with 5 Service Cards) */}
      <InformationServices />

      {/* 3. How It Works (Light Gray background with 5-Step Stepper & Live Impact Metrics) */}
      <HowItWorksSection />

      {/* 4. AI Capabilities (White background with 4 Intelligence Cards + Highlight Panel) */}
      <AICapabilitiesSection />

      {/* 5. Civic Departments Network (Light Gray background with Direct Filing CTAs) */}
      <DepartmentsSection />

      {/* 6. Citizen & Officer Dual Gateway (Deep Navy Panel for Visual Depth) */}
      <CitizenOfficerGateway />

      {/* 7. Institutional Footer (Compliance, Helplines & Legal Links) */}
      <Footer />
    </div>
  );
};

export default LandingPage;