"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { AlertCircle, CheckCircle, Loader, Mail, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { GoogleSignInButton } from "@/components/ui/google-signin-button";
import { OTPNotification } from "@/components/ui/otp-notification";

export default function LoginPage() {
  const router = useRouter();
  
  // Step management: email -> password -> otp
  const [step, setStep] = useState<"email" | "password" | "otp">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const handleCheckEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Check if user exists
      const response = await fetch("/api/auth/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok || !data.exists) {
        setError("No account found with this email. Please register first.");
        setLoading(false);
        return;
      }

      setUserData(data.user);
      setSuccess("Account found! Please enter your password.");
      setStep("password");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Verify password first by attempting to send OTP with password validation
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          type: "login",
          metadata: { password }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send OTP. Check your password.");
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

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, type: "login", password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to verify OTP");
        setLoading(false);
        return;
      }

      setSuccess("Login successful!");
      localStorage.setItem("authToken", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      
      // Redirect based on user type
      setTimeout(() => {
        if (data.user?.user_type === "freelancer") {
          router.push("/freelancer");
        } else {
          router.push("/client");
        }
      }, 1000);
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
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
          <p className="text-slate-400">Login to your account</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            {[
              { key: "email", label: "Email" },
              { key: "password", label: "Password" },
              { key: "otp", label: "Verify" },
            ].map((s, i) => {
              const steps = ["email", "password", "otp"];
              const currentIndex = steps.indexOf(step);
              const isActive = i <= currentIndex;
              return (
                <div key={s.key} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                      isActive
                        ? "bg-cyan-500 text-white"
                        : "bg-slate-700 text-slate-500"
                    }`}
                  >
                    {i + 1}
                  </div>
                  {i < 2 && (
                    <div
                      className={`w-20 h-1 mx-2 transition-all ${
                        i < currentIndex ? "bg-cyan-500" : "bg-slate-700"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-slate-400">
            {step === "email" && "Step 1: Enter Email"}
            {step === "password" && "Step 2: Enter Password"}
            {step === "otp" && "Step 3: Verify OTP"}
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

          {/* Step 1: Email */}
          {step === "email" && (
            <form onSubmit={handleCheckEmail} className="space-y-4">
              <div>
                <Label className="text-slate-200 mb-2 block">Email Address</Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-500"
                />
              </div>
              <Button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>

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
            </form>
          )}

          {/* Step 2: Password */}
          {step === "password" && (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-slate-400 text-sm">
                  Logging in as <strong className="text-white">{email}</strong>
                </p>
              </div>
              
              <div>
                <Label className="text-slate-200 mb-2 block">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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
              
              <Button
                type="submit"
                disabled={loading || !password}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setStep("email");
                  setPassword("");
                  setSuccess("");
                }}
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Back
              </Button>
            </form>
          )}

          {/* Step 3: OTP */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-slate-400 text-sm">
                  Enter the 6-digit code sent to <strong className="text-white">{email}</strong>
                </p>
              </div>
              
              <div>
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
                    Verifying...
                  </>
                ) : (
                  "Verify & Login"
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setStep("password");
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
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-xs mt-8">
          © 2026 EL VERSE TECHNOLOGIES. Freelance Without Friction.
        </p>
      </div>

      {/* OTP Notification */}
      <OTPNotification
        isOpen={showOtpPopup}
        onOpenChange={setShowOtpPopup}
        otp={generatedOtp}
        email={email}
        type="login"
        showCopyButton={true}
        expiryMinutes={15}
      />
    </div>
  );
}
