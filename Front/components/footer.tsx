"use client"

import Link from "next/link"
import { Mail, Github, Linkedin, Twitter } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className="border-t border-primary-darker/20 bg-primary-darker/20 py-16 px-4">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#features" className="hover:text-accent transition-colors inline-block hover:translate-x-1">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-accent transition-colors inline-block hover:translate-x-1">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-accent transition-colors inline-block hover:translate-x-1">
                  Demo
                </Link>
              </li>
            </ul>
          </div>
          <div className={`transition-all duration-500 delay-100 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-accent transition-colors inline-block hover:translate-x-1">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors inline-block hover:translate-x-1">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors inline-block hover:translate-x-1">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div className={`transition-all duration-500 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-accent transition-colors inline-block hover:translate-x-1">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors inline-block hover:translate-x-1">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-accent transition-colors inline-block hover:translate-x-1">
                  Security
                </Link>
              </li>
            </ul>
          </div>
          <div className={`transition-all duration-500 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4 text-muted-foreground">
              <Link href="#" className="hover:text-accent transition-all hover:scale-110">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-accent transition-all hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-accent transition-all hover:scale-110">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-accent transition-all hover:scale-110">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className={`border-t border-primary-darker/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground transition-all duration-500 delay-400 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <p>&copy; 2025 ViperQB. All rights reserved.</p>
          <p>Built on Qubic blockchain. Enterprise-grade security infrastructure.</p>
        </div>
      </div>
    </footer>
  )
}
