import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useTour } from "../context/TourContext";
import { useAuth } from "../context/AuthContext";
import StateEmblem from "./common/StateEmblem";
import { ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";

export default function LoginForm() {
  const [securityCode, setSecurityCode] = useState("");
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);

  // Tour
  const { resumeAfterLogin, isPausedForAuth } = useTour();

  // Auth Context
  const { login } = useAuth();

  async function handleLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const success = await login(email, password);

      if (success) {
        localStorage.setItem("showLoginToast", "true");
        navigate("/homepage");

        if (isPausedForAuth) {
          setTimeout(() => {
            resumeAfterLogin();
          }, 500);
        }
      } else {
        setStatus("Invalid credentials or user not found");
      }
    } catch (error) {
      console.error("Login error:", error);
      setStatus("Connection error. Please check if backend is running.");
    }
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-white flex items-center justify-center p-4 sm:p-8">
      
      {/* Login Box with Saffron Border */}
      <div className="bg-white p-8 sm:p-10 rounded-2xl sm:rounded-3xl shadow-xl border-2 border-[#F59E0B] w-full max-w-md sm:max-w-lg flex flex-col justify-center my-6">
        
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center mb-6">
          <StateEmblem className="h-12 w-auto mb-2" color="#17365D" />
          <div className="flex items-center gap-1.5">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#17365D]">
              NagrikConnect
            </span>
            <span className="text-xl sm:text-2xl font-black text-[#F59E0B]">
              AI
            </span>
          </div>
          <p className="text-[11px] font-semibold text-slate-500 tracking-wide uppercase mt-0.5">
            Government Grievance Management
          </p>
          <h2 className="text-2xl font-extrabold text-[#17365D] mt-3">
            User Login
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Welcome back! Please enter your credentials.
          </p>
        </div>

        {/* Email / Mobile */}
        <div className="mt-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Email / Mobile No
          </label>
          <div className="flex items-center border border-slate-300 rounded-xl p-3 mt-1.5 bg-slate-50 focus-within:bg-white focus-within:border-[#17365D] focus-within:ring-2 focus-within:ring-[#17365D]/15 transition-all">
            <Mail className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your details"
              className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Password
          </label>
          <div className="flex items-center border border-slate-300 rounded-xl p-3 mt-1.5 bg-slate-50 focus-within:bg-white focus-within:border-[#17365D] focus-within:ring-2 focus-within:ring-[#17365D]/15 transition-all">
            <Lock className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Status Error Message */}
        {status && (
          <p className="text-rose-600 text-xs font-semibold mt-3 text-center bg-rose-50 border border-rose-200 py-2 px-3 rounded-lg">
            {status}
          </p>
        )}

        {/* Saffron Action Button */}
        <button
          className="w-full mt-6 bg-[#F59E0B] hover:bg-[#d97706] text-[#08264A] py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
          onClick={handleLogin}
        >
          <span>Login</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <ToastContainer />

        {/* Links */}
        <div className="text-center mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center justify-center gap-3">
            <a href="#" className="hover:text-[#17365D] transition">
              Forgot Password
            </a>
            <span className="text-slate-300">•</span>
            <a href="#" className="hover:text-[#17365D] transition">
              Forgot Username
            </a>
          </div>

          <p className="mt-3 text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-bold text-[#1677D2] hover:text-[#17365D] hover:underline transition"
            >
              Click here to Sign Up
            </Link>
          </p>
        </div>

      </div>

    </div>
  );
}