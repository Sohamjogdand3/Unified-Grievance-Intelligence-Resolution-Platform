import React, { useEffect, useRef, useState } from "react";
import { useTour } from "../context/TourContext";
import { useLocation } from "react-router-dom";
import AIgirl from "../assets/AIgirl.png";
import { Sparkles, X, Volume2, VolumeX } from "lucide-react";

const AIAvatar = () => {
  const {
    isTourActive,
    currentStep,
    setIsSpeaking,
    TOUR_STEPS,
    nextStep,
    endTour,
    startTour,
    startDashboardTour,
    language
  } = useTour();

  const location = useLocation();
  const utterancesRef = useRef([]);
  const lastSpokenStep = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    // Pause if login required
    if (isTourActive && currentStep >= 4 && location.pathname === "/login") {
      setIsSpeaking(false);
      return;
    }

    // Prevent repeat speech for same step
    if (lastSpokenStep.current === currentStep) return;
    lastSpokenStep.current = currentStep;

    if (isTourActive && currentStep >= 0 && soundEnabled) {
      const timer = setTimeout(() => speakStep(currentStep), 500);

      return () => {
        clearTimeout(timer);
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, [isTourActive, currentStep, location.pathname, soundEnabled]);

  const speakStep = (index) => {
    if (!soundEnabled || !window.speechSynthesis) return;

    const step = TOUR_STEPS[index];
    if (!step) return;

    setIsSpeaking(true);

    const textToSpeak = language === "hi" ? step.textHi : step.textEn;
    const langCode = language === "hi" ? "hi-IN" : "en-US";

    const utter = new SpeechSynthesisUtterance(textToSpeak);
    utter.lang = langCode;
    utter.rate = 1.0;

    utter.onend = () => {
      setIsSpeaking(false);
      // Pause at login step
      if (index === 3) return;
    };

    utter.onerror = () => {
      setIsSpeaking(false);
    };

    utterancesRef.current = [utter];
    window.speechSynthesis.speak(utter);
  };

  const handleStartTourClick = () => {
    if (location.pathname.startsWith("/homepage")) {
      localStorage.removeItem("nagrik_dash_tour_completed");
      startDashboardTour();
    } else {
      localStorage.removeItem("nagrik_tour_completed");
      startTour(language || "en");
    }
  };

  // ================= 1. ACTIVE TOUR VIEW (Visible across all steps) =================
  if (isTourActive && currentStep >= 0) {
    const isLoginStep = location.pathname === "/login";
    const currentStepData = TOUR_STEPS[currentStep];

    return (
      <div className="fixed inset-x-0 bottom-0 z-[2500] flex flex-col items-center pointer-events-none pb-2 sm:pb-4 transition-all">
        
        {/* Floating Speech Box */}
        <div className="mb-3 max-w-lg w-full bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-2xl border-2 border-[#F59E0B] text-center pointer-events-auto mx-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Header Bar inside Bubble */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs font-bold text-slate-500">
            <div className="flex items-center gap-1.5 text-[#17365D]">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Nagrik Saathi • Tour Guide</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                  if (soundEnabled && window.speechSynthesis) {
                    window.speechSynthesis.cancel();
                  }
                }}
                className="p-1 rounded hover:bg-slate-100 text-slate-500"
                title={soundEnabled ? "Mute Voice" : "Unmute Voice"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-[#1677D2]" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              </button>

              <button
                onClick={endTour}
                className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                title="Exit Tour"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Spoken Text */}
          <p className="text-slate-800 font-bold text-base sm:text-lg leading-snug">
            {language === "hi"
              ? currentStepData?.textHi
              : currentStepData?.textEn}
          </p>

          {/* Login Wait Indicator if applicable */}
          {isLoginStep && (
            <p className="text-amber-600 font-bold text-xs mt-2 animate-pulse bg-amber-50 py-1 px-3 rounded-full inline-block">
              Please log in to continue to your dashboard walkthrough...
            </p>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={endTour}
              className="px-4 py-2 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
            >
              Skip Tour
            </button>

            <button
              onClick={nextStep}
              className="bg-[#17365D] hover:bg-[#08264A] text-white px-6 py-2 rounded-full font-bold text-sm shadow-md active:scale-95 transition"
            >
              {currentStep === TOUR_STEPS.length - 1 ? "Finish ✓" : "Continue ➔"}
            </button>
          </div>
        </div>

        {/* 🤖 Tour Navigation Girl Avatar (Visible across ALL active tour steps) */}
        <div className="relative flex flex-col items-center pointer-events-auto">
          <img
            src={AIgirl}
            alt="Nagrik Saathi AI Guide"
            className="h-44 sm:h-52 w-auto object-contain drop-shadow-2xl animate-bounce-subtle select-none pointer-events-none"
          />
        </div>

      </div>
    );
  }

  // ================= 2. PERMANENT FLOATING ASSISTANT WIDGET (When tour is idle) =================
  return (
    <div className="fixed bottom-5 right-5 z-[2000] flex items-end gap-2 pointer-events-auto">
      
      {!minimized ? (
        <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md border-2 border-[#F59E0B] p-2 pr-4 rounded-full shadow-2xl animate-in fade-in slide-in-from-right-4 duration-300">
          
          {/* Avatar button */}
          <button
            onClick={handleStartTourClick}
            className="relative w-12 h-12 rounded-full overflow-hidden bg-amber-50 border border-[#F59E0B]/40 shrink-0 shadow-inner group hover:scale-105 transition-transform"
            title="Start Interactive Portal Tour"
          >
            <img
              src={AIgirl}
              alt="Nagrik Saathi"
              className="w-full h-full object-cover object-top"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
          </button>

          {/* Label & Start CTA */}
          <div
            onClick={handleStartTourClick}
            className="flex flex-col text-left cursor-pointer select-none"
          >
            <span className="text-[11px] font-bold text-[#17365D] flex items-center gap-1">
              <span>Nagrik Saathi</span>
              <Sparkles className="w-3 h-3 text-[#F59E0B]" />
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              Take Interactive Tour
            </span>
          </div>

          {/* Minimize button */}
          <button
            onClick={() => setMinimized(true)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition"
            title="Minimize"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        /* Minimized Round Avatar Icon */
        <button
          onClick={() => {
            setMinimized(false);
            handleStartTourClick();
          }}
          className="relative w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-[#F59E0B] shadow-2xl hover:scale-110 active:scale-95 transition-all group"
          title="Open Nagrik Saathi Tour Guide"
        >
          <img
            src={AIgirl}
            alt="Nagrik Saathi"
            className="w-full h-full object-cover object-top"
          />
          <span className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/10 transition-colors"></span>
        </button>
      )}

    </div>
  );
};

export default AIAvatar;