"use client"

import { Button } from "./ui/button"
import Link from "next/link"
import { ArrowRight, Shield, Zap, Lock } from "lucide-react"
import { useEffect, useState } from "react"

export function ViperHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 overflow-hidden">
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse" />

      <div className="container max-w-6xl mx-auto relative">
        <div className="text-center space-y-8">
          <div className={`inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}>
            <span className="text-sm font-medium text-accent flex items-center gap-2">
              <Zap className="w-3 h-3 animate-pulse" />
              Enterprise Blockchain Middleware
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tighter">
            <span className={`block transition-all duration-700 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              Enterprise Trust
            </span>
            <span className={`block transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              Infrastructure{" "}
            </span>
            <span className={`block bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent transition-all duration-700 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              Built on Blockchain
            </span>
          </h1>

          <p className={`text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-400 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            ViperQB unifies 10 critical security modules—file transfer, KYC verification, access control, audit
            logging—into one modular platform. <span className="text-accent font-semibold">80% cheaper</span>,
            auditable, and production-ready.
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center pt-8 transition-all duration-700 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <Button
              size="lg"
              className="bg-[#83ca4d] hover:bg-[#46852e] text-[#0f1a10] font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105 group"
              asChild
            >
              <Link href="/demo" className="flex items-center gap-2">
                Start Free Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#244217] hover:border-[#83ca4d] hover:text-[#83ca4d] transition-all hover:scale-105 bg-transparent"
              asChild
            >
              <Link href="#features">Explore Features</Link>
            </Button>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 max-w-3xl mx-auto transition-all duration-700 delay-600 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <div className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-accent/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/20 backdrop-blur-sm">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 group-hover:rotate-6">
                <Shield className="w-6 h-6" />
              </div>
              <p className="font-bold text-3xl text-accent mb-2 group-hover:scale-110 transition-transform">10</p>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Security Modules</p>
            </div>
            <div className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-accent/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/20 backdrop-blur-sm">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 group-hover:rotate-6">
                <Zap className="w-6 h-6" />
              </div>
              <p className="font-bold text-3xl text-accent mb-2 group-hover:scale-110 transition-transform">80%</p>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Cost Savings</p>
            </div>
            <div className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-accent/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/20 backdrop-blur-sm">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 group-hover:rotate-6">
                <Lock className="w-6 h-6" />
              </div>
              <p className="font-bold text-3xl text-accent mb-2 group-hover:scale-110 transition-transform">100%</p>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">On-Chain Verified</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
