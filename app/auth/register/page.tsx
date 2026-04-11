"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "@/components/ui/phone-input";
import { INDUSTRIES, TECH_STACKS, COMPANY_SIZES, BUSINESS_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { AlertCircle, CheckCircle, Loader, Mail, Upload, Eye, EyeOff, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { OTPNotification } from '@/components/ui/otp-notification';
import { GoogleSignInButton } from '@/components/ui/google-signin-button';

export default function RegisterPage() {
  const router = useRouter();
  
  // Step management: info -> details -> otp -> complete
  const [step, setStep] = useState<"info" | "details" | "otp">("info");
  
  // Common fields
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState<"" | "client" | "freelancer">("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Client fields
  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [companyLogoPreview, setCompanyLogoPreview] = useState<string>("");
  
  // Freelancer fields
  const [techStack, setTechStack] = useState<string[]>([]);
  const [techStackSearch, setTechStackSearch] = useState("");
  const [aboutYou, setAboutYou] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string>("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  
  // Phone
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  
  // OTP
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  
  // State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          type: "register",
          metadata: { name, userType }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send OTP");
        setLoading(false);
        return;
      }

      if (data.otp) {
        setGeneratedOtp(data.otp);
        setShowOtpPopup(true);
      }

      setSuccess("OTP sent to your email!");
      setStep("otp");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Verify OTP
      const verifyResponse = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, type: "register" }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        setError(verifyData.message || "Failed to verify OTP");
        setLoading(false);
        return;
      }

      // Prepare registration data
      const registerData: any = {
        email,
        name,
        userType,
        password,
        phoneNumber,
        countryCode,
      };

      // Add client-specific fields
      if (userType === "client") {
        registerData.companyName = companyName || name;
        registerData.businessType = businessType;
        registerData.industry = industry;
        registerData.companySize = companySize;
        if (companyLogoPreview) {
          registerData.companyLogo = companyLogoPreview;
        }
      }

      // Add freelancer-specific fields
      if (userType === "freelancer") {
        registerData.techStack = techStack;
        registerData.aboutYou = aboutYou;
        if (profilePicturePreview) {
          registerData.profilePicture = profilePicturePreview;
        }
        if (cvFile) {
          // In production, upload to storage and get URL
          registerData.cvUrl = URL.createObjectURL(cvFile);
        }
      }

      // Register user
      const registerResponse = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      const registerData_response = await registerResponse.json();

      if (!registerResponse.ok) {
        setError(registerData_response.error || "Failed to register");
        setLoading(false);
        return;
      }

      // Store auth
      localStorage.setItem("authToken", verifyData.token);
      localStorage.setItem("user", JSON.stringify({
        ...registerData_response.user,
        userType: registerData_response.userType,
      }));

      setSuccess("Registration successful! Redirecting to dashboard...");
      
      // Redirect based on user type
      setTimeout(() => {
        if (userType === "freelancer") {
          router.push("/freelancer");
        } else {
          router.push("/client");
        }
      }, 1500);
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>,
    previewSetter: React.Dispatch<React.SetStateAction<string>>,
    accept: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match(accept) && accept === "image/*") {
        toast.error("Please upload an image file");
        return;
      }
      setter(file);
      const reader = new FileReader();
      reader.onload = () => {
        previewSetter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleTechStack = (tech: string) => {
    if (techStack.includes(tech)) {
      setTechStack(techStack.filter((t) => t !== tech));
    } else if (techStack.length < 15) {
      setTechStack([...techStack, tech]);
    } else {
      toast.error("Maximum 15 tech stacks allowed");
    }
  };

  const filteredTechStacks = TECH_STACKS.filter((tech) =>
    tech.toLowerCase().includes(techStackSearch.toLowerCase())
  ).slice(0, 20);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative h-12 w-48 mb-2">
            <Image
              src="/logo.png"
              alt="EL SPACE"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p className="text-slate-400">Create your account</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            {["info", "details", "otp"].map((s, i) => {
              const steps = ["info", "details", "otp"];
              const currentIndex = steps.indexOf(step);
              const isActive = i <= currentIndex;
              return (
                <div key={s} className="flex items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all",
                      isActive
                        ? "bg-cyan-500 text-white"
                        : "bg-slate-700 text-slate-500"
                    )}
                  >
                    {i + 1}
                  </div>
                  {i < 2 && (
                    <div
                      className={cn(
                        "w-20 h-1 mx-2 transition-all",
                        i < currentIndex ? "bg-cyan-500" : "bg-slate-700"
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-slate-400">
            {step === "info" && "Step 1: Basic Information"}
            {step === "details" && `Step 2: ${userType === "client" ? "Company" : "Professional"} Details`}
            {step === "otp" && "Step 3: Verify Email"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-8">
          {/* Error */}
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-green-200 text-sm">{success}</p>
            </div>
          )}

          {/* Step 1: Basic Info */}
          {step === "info" && (
            <div className="space-y-4">
              <div>
                <Label className="text-slate-200 mb-2 block">Full Name *</Label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-500"
                />
              </div>

              <div>
                <Label className="text-slate-200 mb-2 block">Email Address *</Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-500"
                />
              </div>

              <div>
                <Label className="text-slate-200 mb-2 block">Password *</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label className="text-slate-200 mb-2 block">Confirm Password *</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-500"
                />
                {password && confirmPassword && password !== confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
                )}
              </div>

              <div>
                <Label className="text-slate-200 mb-2 block">I am a... *</Label>
                <Select value={userType} onValueChange={(val: any) => setUserType(val)}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white h-10">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600 text-white">
                    <SelectItem value="client" className="text-white focus:bg-slate-700 focus:text-white">
                      <div className="flex flex-col">
                        <span className="font-medium">Client</span>
                        <span className="text-xs text-slate-400">I want to hire talent</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="freelancer" className="text-white focus:bg-slate-700 focus:text-white">
                      <div className="flex flex-col">
                        <span className="font-medium">Freelancer</span>
                        <span className="text-xs text-slate-400">I want to find work</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-800/50 text-slate-400">or</span>
                </div>
              </div>

              {/* Google Sign-In */}
              <GoogleSignInButton
                fullWidth
                variant="outline"
                text="Continue with Google"
              />

              <Button
                type="button"
                onClick={() => {
                  if (!name || !email || !userType || !password) {
                    setError("Please fill in all required fields");
                    return;
                  }
                  if (password !== confirmPassword) {
                    setError("Passwords do not match");
                    return;
                  }
                  if (password.length < 8) {
                    setError("Password must be at least 8 characters");
                    return;
                  }
                  setError("");
                  setStep("details");
                }}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Next: {userType === "client" ? "Company" : "Professional"} Details
              </Button>

              <p className="text-xs text-slate-400 text-center">
                By registering, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          )}

          {/* Step 2: Details */}
          {step === "details" && (
            <div className="space-y-4">
              {/* Phone Number (Common) */}
              <div>
                <Label className="text-slate-200 mb-2 block">Phone Number</Label>
                <PhoneInput
                  value={phoneNumber}
                  countryCode={countryCode}
                  onPhoneChange={setPhoneNumber}
                  onCountryCodeChange={setCountryCode}
                />
              </div>

              {/* Client Fields */}
              {userType === "client" && (
                <>
                  <div>
                    <Label className="text-slate-200 mb-2 block">Company Name *</Label>
                    <Input
                      type="text"
                      placeholder="Acme Corp"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-200 mb-2 block">Business Type</Label>
                    <Select value={businessType} onValueChange={setBusinessType}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white h-10">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600 text-white">
                        {BUSINESS_TYPES.map((type) => (
                          <SelectItem key={type} value={type} className="text-white focus:bg-slate-700">
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-slate-200 mb-2 block">Industry *</Label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white h-10">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600 text-white max-h-[300px]">
                        {INDUSTRIES.map((ind) => (
                          <SelectItem key={ind} value={ind} className="text-white focus:bg-slate-700">
                            {ind}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-slate-200 mb-2 block">Company Size</Label>
                    <Select value={companySize} onValueChange={setCompanySize}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white h-10">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600 text-white">
                        {COMPANY_SIZES.map((size) => (
                          <SelectItem key={size} value={size} className="text-white focus:bg-slate-700">
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-slate-200 mb-2 block">Company Logo (Optional)</Label>
                    <div className="flex items-center gap-4">
                      {companyLogoPreview && (
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-600">
                          <Image src={companyLogoPreview} alt="Logo preview" fill className="object-cover" />
                        </div>
                      )}
                      <label className="flex-1 cursor-pointer">
                        <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-slate-500 transition-colors">
                          <Upload className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                          <p className="text-xs text-slate-400">Click to upload logo</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, setCompanyLogo, setCompanyLogoPreview, "image/*")}
                            className="hidden"
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* Freelancer Fields */}
              {userType === "freelancer" && (
                <>
                  <div>
                    <Label className="text-slate-200 mb-2 block">Tech Stack * (Select up to 15)</Label>
                    <Input
                      type="text"
                      placeholder="Search tech stacks..."
                      value={techStackSearch}
                      onChange={(e) => setTechStackSearch(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-500 mb-2"
                    />
                    <div className="max-h-[200px] overflow-y-auto space-y-1 bg-slate-700/30 rounded-lg p-2">
                      {filteredTechStacks.map((tech) => (
                        <button
                          key={tech}
                          type="button"
                          onClick={() => toggleTechStack(tech)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                            techStack.includes(tech)
                              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                              : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span>{tech}</span>
                            {techStack.includes(tech) && <CheckCircle className="w-4 h-4" />}
                          </div>
                        </button>
                      ))}
                    </div>
                    {techStack.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full border border-cyan-500/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-slate-400 mt-1">{techStack.length}/15 selected</p>
                  </div>

                  <div>
                    <Label className="text-slate-200 mb-2 block">About You *</Label>
                    <Textarea
                      placeholder="Tell clients about your experience, skills, and what makes you stand out..."
                      value={aboutYou}
                      onChange={(e) => setAboutYou(e.target.value)}
                      rows={4}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-200 mb-2 block">Profile Picture (Optional)</Label>
                    <div className="flex items-center gap-4">
                      {profilePicturePreview && (
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-slate-600">
                          <Image src={profilePicturePreview} alt="Profile preview" fill className="object-cover" />
                        </div>
                      )}
                      <label className="flex-1 cursor-pointer">
                        <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-slate-500 transition-colors">
                          <Upload className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                          <p className="text-xs text-slate-400">Click to upload photo</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, setProfilePicture, setProfilePicturePreview, "image/*")}
                            className="hidden"
                          />
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label className="text-slate-200 mb-2 block">CV/Resume Upload (Optional)</Label>
                    <label className="cursor-pointer block">
                      <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-slate-500 transition-colors">
                        <Upload className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                        <p className="text-sm text-slate-300">
                          {cvFile ? cvFile.name : "Click to upload CV/Resume"}
                        </p>
                        <p className="text-xs text-slate-400">PDF, DOC, DOCX (Max 5MB)</p>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 5 * 1024 * 1024) {
                                toast.error("File size must be less than 5MB");
                                return;
                              }
                              setCvFile(file);
                            }
                          }}
                          className="hidden"
                        />
                      </div>
                    </label>
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("info")}
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    // Validate required fields
                    if (userType === "client" && !industry) {
                      setError("Please select your industry");
                      return;
                    }
                    if (userType === "freelancer" && (!techStack.length || !aboutYou)) {
                      setError("Please select tech stack and write about yourself");
                      return;
                    }
                    setError("");
                    setStep("otp");
                  }}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
                >
                  Next: Verify Email
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: OTP Verification */}
          {step === "otp" && (
            <form onSubmit={handleVerifyAndRegister} className="space-y-4">
              <div>
                <p className="text-sm text-slate-400 mb-4">
                  Enter the 6-digit code sent to <strong>{email}</strong>
                </p>
                <Label className="text-slate-200 mb-2 block">Verification Code</Label>
                <Input
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                  required
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-500 text-center text-2xl tracking-widest font-mono"
                />
              </div>

              <Button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setStep("details");
                  setOtp("");
                  setSuccess("");
                }}
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Back
              </Button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-center text-slate-400 text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-xs mt-8">
          © 2026 EL VERSE TECHNOLOGIES. Freelance Without Friction.
        </p>
      </div>

      {/* OTP Notification - Only shows on registration step */}
      <OTPNotification
        isOpen={showOtpPopup}
        onOpenChange={setShowOtpPopup}
        otp={generatedOtp}
        email={email}
        type="register"
        showCopyButton={true}
        expiryMinutes={15}
      />
    </div>
  );
}
