"use client";

import RevealContainer from "@/components/animations-and-loading/RevealContainer";
import ZoomContainer from "@/components/animations-and-loading/ZoomContainer";
import LandingHeader from "@/components/elements/LandingHeader";
import { Section } from "@/components/elements/Section";
import SiteFooter from "@/components/elements/SiteFooter";
import Paragraph from "@/components/typography/Paragraph";
import {
    financingBanks,
    landingNavItems,
    type FinancingBank,
} from "@/mocks/realEstateHome";
import { ArrowRightIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { useState } from "react";

function BankLogo({ bank }: { bank: FinancingBank }) {
  if (bank.background) {
    return (
      <span
        className="inline-flex items-center justify-center rounded px-6 py-3 text-lg font-extrabold tracking-tight"
        style={{ backgroundColor: bank.background, color: bank.color }}
      >
        {bank.name}
      </span>
    );
  }
  return (
    <span
      className="text-2xl font-extrabold tracking-tight"
      style={{ color: bank.color }}
    >
      {bank.name}
    </span>
  );
}

export default function FinanciePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const whatsappHref = "https://wa.me/5531912341234";

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Header */}
      <LandingHeader.Root
        size="sm"
        sticky
        bordered
        className="bg-background/95 backdrop-blur-sm"
      >
        <LandingHeader.Left>
          <LandingHeader.Logo src="/logo.png" alt="Glow Imóveis" />
        </LandingHeader.Left>

        <LandingHeader.Center>
          <LandingHeader.Nav>
            {landingNavItems.map((item) => (
              <LandingHeader.Nav.Item
                key={item.href}
                href={item.href}
                active={item.href === "/financie"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </LandingHeader.Nav.Item>
            ))}
          </LandingHeader.Nav>
        </LandingHeader.Center>

        <LandingHeader.Right>
          <LandingHeader.MobileMenuToggle
            open={isMobileMenuOpen}
            onToggle={setIsMobileMenuOpen as never}
          />

          <LandingHeader.MobileMenuPanel open={isMobileMenuOpen}>
            {landingNavItems.map((item) => (
              <LandingHeader.Nav.Item
                key={`mobile-${item.href}`}
                href={item.href}
                active={item.href === "/financie"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </LandingHeader.Nav.Item>
            ))}
          </LandingHeader.MobileMenuPanel>

          <LandingHeader.CTA
            label="Fale com o corretor"
            className="hidden bg-primary-500 text-white hover:bg-primary-600 sm:inline-flex"
          />
        </LandingHeader.Right>
      </LandingHeader.Root>

      <main>
        {/* Hero */}
        <section
          className="relative flex min-h-[300px] w-full items-center justify-center overflow-hidden bg-cover bg-center px-5 py-16 sm:px-8 sm:py-20"
          style={{ backgroundImage: "url(/background.jpg)" }}
        >
          <div className="absolute inset-0 bg-black/65" />
          <RevealContainer
            once
            className="relative z-10 mx-auto w-full max-w-5xl text-center"
          >
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl">
              Financie seu imóvel
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/90 sm:text-lg">
              Simule o financiamento do imóvel no seu banco de preferência.
            </p>
          </RevealContainer>
        </section>

        {/* Grade de bancos */}
        <Section size="middle" sectionClassName="px-5 py-16 sm:px-8">
          <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {financingBanks.map((bank, index) => (
              <ZoomContainer
                key={bank.id}
                once
                delay={index + 1}
                className="h-full"
              >
                <a
                  href={bank.simulateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Simular financiamento no ${bank.name}`}
                  className="group flex h-full flex-col items-center justify-between gap-6 rounded-2xl border border-border-card bg-bg-card p-8 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="flex min-h-[72px] flex-1 items-center justify-center">
                    <BankLogo bank={bank} />
                  </span>
                  <span className="inline-flex items-center gap-2 font-semibold text-primary-500 transition group-hover:gap-3">
                    Simular agora
                    <ArrowRightIcon size={18} weight="bold" />
                  </span>
                </a>
              </ZoomContainer>
            ))}
          </div>

          <Paragraph
            content="* Você será redirecionado ao site oficial do banco para realizar a simulação. Consulte as condições diretamente com a instituição financeira."
            className="mx-auto mt-10 max-w-3xl text-center text-xs text-foreground/60"
          />
        </Section>
      </main>

      {/* Footer */}
      <SiteFooter />

      {/* WhatsApp flutuante */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Conversar no WhatsApp"
        className="fixed bottom-6 right-6 z-40 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#25d366] text-white shadow-xl transition hover:scale-105"
      >
        <WhatsappLogoIcon className="h-9 w-9" weight="thin" />
      </a>
    </div>
  );
}
