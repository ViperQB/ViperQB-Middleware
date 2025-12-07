"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate API call - TODO: Connect to POST /api/v1/auth/login
    setTimeout(() => {
      setLoading(false)
      if (email && password) {
        // Store auth token (in real app, get from API response)
        if (typeof window !== "undefined") {
          localStorage.setItem("auth_token", "dummy_token_" + Date.now())
          localStorage.setItem("user_email", email)
        }
        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        setError("Please enter both email and password")
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary-darker to-background">
      <Card className="w-full max-w-md border-border">
        <CardHeader>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
              <span className="text-sm font-bold text-primary-darker">VQ</span>
            </div>
          </div>
          <CardTitle>Welcome to ViperQB</CardTitle>
          <CardDescription>Sign in to your enterprise account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-error/10 border border-error/20 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                <p className="text-sm text-error">{error}</p>
              </div>
            )}

            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="admin@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 bg-background"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 bg-background"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent-dark text-primary-darker font-semibold"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Don't have an account?{" "}
              <a href="#" className="text-accent hover:underline">
                Contact sales
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
