"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Loader2, Mail } from "lucide-react";
import { authApi } from "@/lib/api/auth";

export default function VerifyEmailContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const token = searchParams.get("token");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const verifyEmail = useCallback(async (verificationToken: string) => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    try {
      await authApi.verifyEmail(verificationToken);
      setSuccess("Email verified successfully! You can now login to your account.");
      
      setTimeout(() => {
        router.push("/login?message=Email verified successfully! You can now login.");
      }, 3000);
    } catch {
      setError("Invalid or expired verification token. Please try registering again.");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (token && isMounted) {
      verifyEmail(token);
    }
  }, [token, verifyEmail, isMounted]);

  // Không render gì cho đến khi đã mount
  if (!isMounted) {
    return (
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center text-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            <h1 className="text-2xl font-bold">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <AlertCircle className="h-12 w-12 text-red-500" />
                <h1 className="text-2xl font-bold">Invalid Verification Link</h1>
                <p className="text-muted-foreground">
                  The verification link is invalid or missing. Please check your email for the correct link.
                </p>
                <Button onClick={() => router.push("/login")}>
                  Go to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center gap-4">
              {isLoading ? (
                <>
                  <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                  <h1 className="text-2xl font-bold">Verifying Email</h1>
                  <p className="text-muted-foreground">
                    Please wait while we verify your email address...
                  </p>
                </>
              ) : error ? (
                <>
                  <AlertCircle className="h-12 w-12 text-red-500" />
                  <h1 className="text-2xl font-bold">Verification Failed</h1>
                  <p className="text-muted-foreground">{error}</p>
                  <Button onClick={() => router.push("/register")}>
                    Register Again
                  </Button>
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                  <h1 className="text-2xl font-bold">Email Verified!</h1>
                  <p className="text-muted-foreground">{success}</p>
                  <Button onClick={() => router.push("/login")}>
                    Go to Login
                  </Button>
                </>
              ) : (
                <>
                  <Mail className="h-12 w-12 text-blue-500" />
                  <h1 className="text-2xl font-bold">Email Verification</h1>
                  <p className="text-muted-foreground">
                    Processing your email verification...
                  </p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 