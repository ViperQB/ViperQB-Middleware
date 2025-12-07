import { ViperHeader } from "@/components/viper-header"
import { ViperHero } from "@/components/viper-hero"
import { FeaturesSection } from "@/components/features-section"
import { SecuritySection } from "@/components/security-section"
import { PricingSection } from "@/components/pricing-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen marketing-bg">
      <ViperHeader />
      <main>
        <ViperHero />
        <FeaturesSection />
        <SecuritySection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
