"use client"

import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export function CTASection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 animate-pulse" />
      <div className="container max-w-3xl mx-auto text-center relative">
        <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          Ready to Secure Your Enterprise?
        </h2>
        <p className={`text-lg text-muted-foreground mb-12 transition-all duration-700 delay-100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          Join enterprises worldwide using ViperQB for blockchain-verified security infrastructure. Start your free
          trial today or schedule a demo with our team.
        </p>
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <Button
            size="lg"
            className="bg-[#83ca4d] hover:bg-[#46852e] text-[#0f1a10] font-semibold group shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            asChild
          >
            <Link href="/demo">
              Start Free Trial <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[#244217] hover:border-[#83ca4d] hover:text-[#83ca4d] bg-transparent hover:scale-105 transition-all"
            asChild
          >
            <Link href="#contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
