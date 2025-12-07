"use client"

import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="min-h-screen marketing-bg relative">
      <div className="absolute top-4 left-4 z-50">
        <Button variant="ghost" className="text-foreground hover:text-accent" asChild>
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      <LoginForm />
    </div>
  )
}
