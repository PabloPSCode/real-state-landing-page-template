"use client";

import RevealContainer from "@/components/animations-and-loading/RevealContainer";
import ResidenceCard from "@/components/cards/ResidenceCard";
import LandingHeader from "@/components/elements/LandingHeader";
import SearchResidenceInput, {
  type SearchResidenceFilters,
} from "@/components/elements/SearchResidenceInput";
import { Section } from "@/components/elements/Section";
import SiteFooter from "@/components/elements/SiteFooter";
import Title from "@/components/typography/Title";
import {
  bairrosByCidade,
  cidadeOptions,
  condominioOptions,
  featuredProperties,
  landingNavItems,
  negocioOptions,
  tipoImovelOptions,
} from "@/mocks/realEstateHome";
import { WhatsappLogoIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const prices = featuredProperties.map((property) => property.priceValue);
  const priceMin = Math.min(...prices);
  const priceMax = Math.max(...prices);

  const handleSearch = (filters: SearchResidenceFilters) => {
    // Template: o parent decide o que fazer com os filtros de busca.
    console.info("SearchResidenceInput filters:", filters);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
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
                active={item.active}
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
                active={item.active}
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
        <section
          id="inicio"
          className="relative flex min-h-[560px] w-full items-center justify-center overflow-hidden bg-cover bg-center px-5 py-16 sm:px-8"
          style={{ backgroundImage: "url(/background.jpg)" }}
        >
          <div className="absolute inset-0 bg-black/55" />

          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <RevealContainer once className="w-full">
              <h1 className="text-3xl font-bold font-secondary leading-[1.05] text-white sm:text-5xl md:text-6xl">
                Procurando um imóvel?
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-white/90 sm:mt-4 sm:text-base md:text-lg">
                Viver bem é o seu melhor investimento!
              </p>
            </RevealContainer>

            <div className="mt-8 flex w-full justify-center">
              <SearchResidenceInput
                negocioOptions={negocioOptions}
                tipoOptions={tipoImovelOptions}
                cidadeOptions={cidadeOptions}
                bairrosByCidade={bairrosByCidade}
                condominioOptions={condominioOptions}
                priceMin={priceMin}
                priceMax={priceMax}
                onSearch={handleSearch}
              />
            </div>
          </div>
        </section>

        <Section
          size="middle"
          sectionClassName="bg-background px-5 pb-12 pt-16 sm:px-8"
        >
          <RevealContainer once className="w-full">
            <Title
              content="Imóveis em Destaque"
              className="text-center text-4xl text-foreground sm:text-5xl"
            />
          </RevealContainer>

          <div
            id="sobre"
            className="mt-10 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {featuredProperties.map((property) => (
              <ResidenceCard
                key={property.id}
                residence={property}
                href={`/imovel/${property.id}`}
              />
            ))}
          </div>
        </Section>
      </main>

      <SiteFooter />
      <a
        href="https://wa.me/5531912341234"
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
