"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import LoadingSpinner from "@/components/loading-spinner"
import { ArrowLeft } from "lucide-react"

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")
  const { verifyOtp, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Get the email from session storage
    const storedEmail = sessionStorage.getItem("pendingAuthEmail")
    if (!storedEmail) {
      // Redirect to login if no email is found
      router.push("/login")
      return
    }
    setEmail(storedEmail)
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      await verifyOtp(email, otp)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <Card className="w-full max-w-md">
        <CardHeader>
          <Link href="/login" className="flex items-center text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
          <CardTitle className="text-2xl">Verify OTP</CardTitle>
          <CardDescription>Enter the 6-digit code sent to your email</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="otp" className="text-sm font-medium">
                Verification Code
              </label>
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                maxLength={6}
                pattern="[0-9]{6}"
                inputMode="numeric"
                disabled={isLoading}
                required
              />
              <p className="text-xs text-muted-foreground">For demo purposes, enter any 6-digit code</p>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
              {isLoading ? <LoadingSpinner /> : "Verify & Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-sm text-center">
            Didn&apos;t receive a code?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Try again
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

