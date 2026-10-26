import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import StateEmblem from "./common/StateEmblem";
import { ArrowRight } from "lucide-react";

const stateLists = {
  choose: ["choose"],
  "Andhra Pradesh": ["choose", "Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Rajahmundry", "Kakinada", "Anantapur", "Nellore", "Kadapa", "Chittoor"],
  "Arunachal Pradesh": ["choose", "Itanagar", "Tawang", "Ziro", "Pasighat", "Bomdila", "Roing", "Tezu", "Along", "Seppa", "Changlang"],
  Assam: ["choose", "Guwahati", "Dibrugarh", "Jorhat", "Silchar", "Tezpur", "Tinsukia", "Nagaon", "Diphu", "Bongaigaon", "Sivasagar"],
  Bihar: ["choose", "Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Begusarai", "Purnia", "Samastipur", "Ara", "Chhapra"],
  Chhattisgarh: ["choose", "Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Jagdalpur", "Rajnandgaon", "Raigarh", "Ambikapur", "Dhamtari"],
  Goa: ["choose", "Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Calangute", "Bicholim", "Canacona", "Curchorem", "Sanguem"],
  Gujarat: ["choose", "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Jamnagar", "Bhavnagar", "Anand", "Junagadh", "Bhuj"],
  Haryana: ["choose", "Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal", "Rohtak", "Hisar", "Yamunanagar", "Sonipat", "Panchkula"],
  "Himachal Pradesh": ["choose", "Shimla", "Manali", "Dharamshala", "Kullu", "Solan", "Mandi", "Chamba", "Bilaspur", "Hamirpur", "Una"],
  Jharkhand: ["choose", "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar", "Giridih", "Ramgarh", "Palamu", "Dumka"],
  Karnataka: ["choose", "Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi", "Shivamogga", "Davanagere", "Ballari", "Tumakuru", "Udupi"],
  Kerala: ["choose", "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Alappuzha", "Palakkad", "Kollam", "Kannur", "Kottayam", "Malappuram"],
  "Madhya Pradesh": ["choose", "Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Ratlam", "Rewa", "Sagar", "Satna", "Chhindwara"],
  Maharashtra: ["choose", "Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane", "Solapur", "Kolhapur", "Amravati", "Navi Mumbai"],
  Manipur: ["choose", "Imphal", "Bishnupur", "Thoubal", "Churachandpur", "Ukhrul", "Tamenglong", "Senapati", "Kakching", "Jiribam", "Moreh"],
  Meghalaya: ["choose", "Shillong", "Tura", "Nongpoh", "Baghmara", "Jowai", "Williamnagar", "Resubelpara", "Mairang", "Nongstoin", "Khliehriat"],
  Mizoram: ["choose", "Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib", "Lawngtlai", "Saiha", "Mamit", "Bairabi", "Saitual"],
  Nagaland: ["choose", "Kohima", "Dimapur", "Mokokchung", "Tuensang", "Mon", "Wokha", "Zunheboto", "Phek", "Kiphire", "Longleng"],
  Odisha: ["choose", "Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Berhampur", "Puri", "Balasore", "Bhadrak", "Angul", "Jeypore"],
  Punjab: ["choose", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot", "Hoshiarpur", "Moga", "Ferozepur"],
  Rajasthan: ["choose", "Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Alwar", "Bharatpur", "Sikar", "Chittorgarh"],
  Sikkim: ["choose", "Gangtok", "Namchi", "Mangan", "Gyalshing", "Pelling", "Rangpo", "Jorethang", "Ravangla", "Lachen", "Lachung"],
  "Tamil Nadu": ["choose", "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Vellore", "Tirunelveli", "Erode", "Thoothukudi", "Dindigul"],
  Telangana: ["choose", "Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Mahbubnagar", "Siddipet", "Ramagundam", "Mancherial", "Adilabad"],
  Tripura: ["choose", "Agartala", "Udaipur", "Kailashahar", "Dharmanagar", "Ambassa", "Belonia", "Kamalpur", "Sonamura", "Khowai", "Bishalgarh"],
  "Uttar Pradesh": ["choose", "Lucknow", "Kanpur", "Agra", "Varanasi", "Prayagraj", "Meerut", "Ghaziabad", "Gorakhpur", "Bareilly", "Aligarh"],
  Uttarakhand: ["choose", "Dehradun", "Haridwar", "Nainital", "Almora", "Rishikesh", "Mussoorie", "Pithoragarh", "Rudrapur", "Haldwani", "Tehri"],
  "West Bengal": ["choose", "Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Malda", "Kharagpur", "Bardhaman", "Midnapore", "Berhampore"],
  Delhi: ["choose", "New Delhi", "Connaught Place", "Chandni Chowk", "Saket", "Karol Bagh", "Rohini", "Dwarka", "Lajpat Nagar", "Hauz Khas", "Janakpuri"]
};
const States = Object.keys(stateLists);

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    address: "",
    state: Object.keys(stateLists)[0],
    city: stateLists[Object.keys(stateLists)[0]][0],
    phone: "",
    email: "",
    password: "",
    pincode: ""
  });
  const [selectedState, setSelectedState] = useState(States[0]);
  const [list, setList] = useState(stateLists[selectedState]);

  const handleStateChange = (event) => {
    const newState = event.target.value;
    setSelectedState(newState);
    setList(stateLists[newState]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  async function handleSignup() {
    console.log(formData);
    const response = await fetch("http://localhost:5000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log(data);

      setShowSuccess(true);
      toast.success("Registration Successful! Please login.");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else if (response.status === 400) {
      setStatus("User already exists");
      toast.error("User already exists with this email.");
    } else {
      toast.error("Registration failed. Please try again.");
    }
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-white flex items-center justify-center p-4 sm:p-8">
      
      {/* Success Animation Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 shadow-2xl animate-scaleIn text-center flex flex-col items-center">
            <svg className="w-20 h-20 text-emerald-500 animate-checkmark mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" className="animate-circle" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" className="animate-check" />
            </svg>
            <h3 className="text-xl font-bold text-[#17365D]">Registration Successful!</h3>
            <p className="text-xs text-slate-500 mt-1">Redirecting to login portal...</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes circle {
          0% { stroke-dasharray: 0 100; }
          100% { stroke-dasharray: 100 100; }
        }
        @keyframes check {
          0% { stroke-dasharray: 0 100; }
          100% { stroke-dasharray: 100 100; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-circle {
          stroke-dasharray: 0 100;
          animation: circle 0.6s ease-out 0.2s forwards;
        }
        .animate-check {
          stroke-dasharray: 0 100;
          animation: check 0.4s ease-out 0.6s forwards;
        }
      `}</style>

      {/* Signup Box with Saffron Border */}
      <div className="bg-white p-8 sm:p-10 rounded-2xl sm:rounded-3xl shadow-xl border-2 border-[#F59E0B] w-full max-w-2xl my-6">
        
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
            Registration / Sign-up Form
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Fill in your details to create an account.
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          
          {/* Full Name & Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Full Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded-xl bg-slate-50 text-sm text-slate-800 focus:bg-white focus:border-[#17365D] focus:ring-2 focus:ring-[#17365D]/15 outline-none transition-all mt-1"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Password *</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded-xl bg-slate-50 text-sm text-slate-800 focus:bg-white focus:border-[#17365D] focus:ring-2 focus:ring-[#17365D]/15 outline-none transition-all mt-1"
                required
              />
            </div>
          </div>

          {/* Gender & Pincode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Gender *</label>
              <div className="flex space-x-4 mt-2">
                {["Male", "Female", "Transgender"].map((gender) => (
                  <label key={gender} className="flex items-center space-x-1.5 text-xs text-slate-700 font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleChange}
                      className="text-[#17365D] focus:ring-[#17365D]"
                    />
                    <span>{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Pincode *</label>
              <input
                type="text"
                name="pincode"
                placeholder="6-digit pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded-xl bg-slate-50 text-sm text-slate-800 focus:bg-white focus:border-[#17365D] focus:ring-2 focus:ring-[#17365D]/15 outline-none transition-all mt-1"
                pattern="[0-9]{6}"
                maxLength="6"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Address *</label>
            <input
              type="text"
              name="address"
              placeholder="Enter complete address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-xl bg-slate-50 text-sm text-slate-800 focus:bg-white focus:border-[#17365D] focus:ring-2 focus:ring-[#17365D]/15 outline-none transition-all mt-1"
              required
            />
          </div>

          {/* State & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">State *</label>
              <select
                name="state"
                value={formData.state}
                onChange={(e) => { handleChange(e); handleStateChange(e); }}
                className="w-full p-3 border border-slate-300 rounded-xl bg-slate-50 text-sm text-slate-800 focus:bg-white focus:border-[#17365D] focus:ring-2 focus:ring-[#17365D]/15 outline-none transition-all mt-1 cursor-pointer"
                required
              >
                {States.map((state, index) => (
                  <option key={index} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">City *</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded-xl bg-slate-50 text-sm text-slate-800 focus:bg-white focus:border-[#17365D] focus:ring-2 focus:ring-[#17365D]/15 outline-none transition-all mt-1 cursor-pointer"
                required
              >
                {list.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Phone *</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded-xl bg-slate-50 text-sm text-slate-800 focus:bg-white focus:border-[#17365D] focus:ring-2 focus:ring-[#17365D]/15 outline-none transition-all mt-1"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Email *</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded-xl bg-slate-50 text-sm text-slate-800 focus:bg-white focus:border-[#17365D] focus:ring-2 focus:ring-[#17365D]/15 outline-none transition-all mt-1"
                required
              />
            </div>
          </div>

          {/* Status error */}
          {status && (
            <p className="text-rose-600 text-xs font-semibold text-center bg-rose-50 border border-rose-200 py-2 px-3 rounded-lg">
              {status}
            </p>
          )}

          {/* Register Button - Saffron #F59E0B */}
          <button
            type="submit"
            className="w-full mt-6 bg-[#F59E0B] hover:bg-[#d97706] text-[#08264A] py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
            onClick={handleSignup}
          >
            <span>Register</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        {/* Footer link to login */}
        <div className="text-center mt-6 pt-4 border-t border-slate-100 text-xs text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-[#1677D2] hover:text-[#17365D] hover:underline transition"
          >
            Click here to Login
          </Link>
        </div>

      </div>

    </div>
  );
};

export default SignupForm;
