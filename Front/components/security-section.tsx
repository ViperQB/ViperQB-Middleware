"use client"

import { Shield, Lock, Eye, Zap } from "lucide-react"
import { Card } from "./ui/card"
import { useEffect, useRef, useState } from "react"

const securityFeatures = [
  {
    icon: Lock,
    title: "AES-256 Encryption",
    description: "Military-grade encryption for all data in transit and at rest",
  },
  {
    icon: Eye,
    title: "Full Audit Trail",
    description: "Every action logged and verifiable on blockchain forever",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description: "Granular permissions with policy enforcement at every layer",
  },
  {
    icon: Zap,
    title: "Real-Time Monitoring",
    description: "Alerting, forensics, and incident response in milliseconds",
  },
]

export function SecuritySection() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleItems((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.2 }
    )

    const cards = sectionRef.current?.querySelectorAll("[data-index]")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="security"
      className="py-20 md:py-32 px-4 bg-gradient-to-b from-background via-primary-darker/5 to-background"
    >
      <div className="container">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold animate-fade-in-up">Enterprise-Grade Security</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in-up stagger-1">
            Built for compliance, audited, and verified on blockchain
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((feature, i) => {
            const Icon = feature.icon
            const isVisible = visibleItems.has(i)
            return (
              <Card
                key={i}
                data-index={i}
                className={`p-8 border-primary-darker/30 text-center group hover:border-accent/50 hover:bg-accent/5 transition-all duration-500 transform ${
                  isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="mx-auto mb-4 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-6 h-6 text-accent group-hover:rotate-12 transition-transform" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">{feature.title}</h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
