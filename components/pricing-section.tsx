"use client"

import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Check } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const plans = [
  {
    name: "Bronze",
    price: "$499",
    period: "/month",
    description: "Perfect for startups and small teams",
    features: [
      "10 GB storage per month",
      "KYC - 500 verifications/month",
      "File Transfer module",
      "Basic audit logs (30 days)",
      "3 admin users",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Silver",
    price: "$1,499",
    period: "/month",
    description: "For growing enterprises",
    features: [
      "250 GB storage per month",
      "KYC - 5,000 verifications/month",
      "All modules included",
      "Full audit logs (1 year)",
      "20 admin users",
      "IoT Access Control",
      "Workflow Automation",
      "Priority support 24/7",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Gold",
    price: "Custom",
    period: "Contact sales",
    description: "Enterprise-grade, fully customized",
    features: [
      "Unlimited storage",
      "Unlimited KYC verifications",
      "All modules + custom integrations",
      "Unlimited audit logs + forensics",
      "Unlimited users",
      "Dedicated account manager",
      "Custom SLA & 99.99% uptime",
      "White-label option",
    ],
    cta: "Schedule Call",
    highlighted: false,
  },
]

export function PricingSection() {
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
    <section ref={sectionRef} id="pricing" className="py-20 md:py-32 px-4">
      <div className="container">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-4 animate-fade-in">
            <span className="text-sm font-medium text-accent">Transparent Pricing</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold animate-fade-in-up">Plans That Scale With You</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up stagger-1">
            Start free, scale as you grow. No hidden fees.{" "}
            <span className="text-accent font-semibold">80% cheaper</span> than legacy solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => {
            const isVisible = visibleItems.has(i)
            return (
              <Card
                key={i}
                data-index={i}
                className={`p-8 flex flex-col transition-all duration-500 hover:scale-105 hover:shadow-2xl transform ${
                  plan.highlighted
                    ? "border-[#83ca4d]/50 bg-[#83ca4d]/5 ring-2 ring-[#83ca4d]/20 shadow-xl shadow-[#83ca4d]/10"
                    : "border-border hover:border-[#83ca4d]/30 bg-card"
                } ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
              {plan.highlighted && (
                <div className="mb-4 inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#83ca4d]/20 text-[#83ca4d] w-fit">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground ml-2">{plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-8">{plan.description}</p>

              <Button
                asChild
                className={`mb-8 font-semibold ${
                  plan.highlighted
                    ? "bg-[#83ca4d] hover:bg-[#46852e] text-[#0f1a10] shadow-lg"
                    : "bg-secondary hover:bg-secondary/90 text-foreground border border-border"
                }`}
              >
                <Link href="/demo">{plan.cta}</Link>
              </Button>

              <ul className="space-y-4 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlighted ? "text-[#83ca4d]" : "text-muted-foreground"}`}
                    />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
