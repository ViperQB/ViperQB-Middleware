"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Mail, ArrowLeft } from "lucide-react"

export default function DemoPage() {
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

      <div className="flex flex-col items-center justify-center px-4 pt-20 pb-12 min-h-screen">
        <Card className="w-full max-w-md border-border bg-card">
          <CardHeader>
            <CardTitle>Schedule Your Demo</CardTitle>
            <CardDescription>See ViperQB in action with our team</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <Input placeholder="John Doe" className="mt-1.5 bg-background text-foreground" />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Company Email</label>
                <Input type="email" placeholder="john@company.com" className="mt-1.5 bg-background text-foreground" />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Company</label>
                <Input placeholder="Acme Corporation" className="mt-1.5 bg-background text-foreground" />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Preferred Time</label>
                <Input type="datetime-local" className="mt-1.5 bg-background text-foreground" />
              </div>

              <Button className="w-full bg-accent hover:bg-accent/90 text-white font-semibold gap-2 shadow-lg shadow-accent/20">
                <Mail className="w-4 h-4" />
                Request Demo
              </Button>

              <p className="text-xs text-muted-foreground text-center">We'll confirm your time within 24 hours</p>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 text-center max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">What You'll See</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground mb-1">Live File Transfer</p>
              <p>See AES-256 encryption and blockchain verification in real-time</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">KYC Verification</p>
              <p>Watch automated liveness detection and face matching work</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Full Dashboard</p>
              <p>Explore all 10 modules and plugin management</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
