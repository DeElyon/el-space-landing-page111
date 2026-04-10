"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import Image from "next/image";
import { AlertCircle, CheckCircle, Loader, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "login" }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send OTP");
        setLoading(false);
        return;
      }

      // Show OTP in popup modal
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
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to verify OTP");
        return;
      }

      setSuccess("Login successful!");
      localStorage.setItem("authToken", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
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

          {step === "email" ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Email Address
                </label>
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
                    Sending...
                  </>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <p className="text-sm text-slate-400 mb-4">
                  Enter the 6-digit code sent to <strong>{email}</strong>
                </p>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Verification Code
                </label>
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
                  setStep("email");
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

      {/* OTP Popup Dialog */}
      <Dialog open={showOtpPopup} onOpenChange={setShowOtpPopup}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Mail className="w-6 h-6 text-cyan-500" />
              Your Login Code
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              We've sent this code to <strong className="text-white">{email}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="bg-slate-700/50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold tracking-widest text-cyan-400 font-mono">
                {generatedOtp}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-300">
                📧 This code has been sent to your email
              </p>
              <p className="text-xs text-slate-400">
                ⏰ This code expires in 15 minutes
              </p>
            </div>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(generatedOtp);
                setSuccess("OTP copied to clipboard!");
                setTimeout(() => setSuccess(""), 3000);
              }}
              variant="outline"
              className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
            >
              Copy OTP
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
