"use client";

import RevealContainer from "@/components/animations-and-loading/RevealContainer";
import ZoomContainer from "@/components/animations-and-loading/ZoomContainer";
import Button from "@/components/buttons/Button";
import InfoCard from "@/components/cards/InfoCard";
import LandingHeader from "@/components/elements/LandingHeader";
import { Section } from "@/components/elements/Section";
import SiteFooter from "@/components/elements/SiteFooter";
import Paragraph from "@/components/typography/Paragraph";
import Title from "@/components/typography/Title";
import { agentProfile, landingNavItems } from "@/mocks/realEstateHome";
import {
    EnvelopeSimpleIcon,
    HandshakeIcon,
    IdentificationBadgeIcon,
    MapPinIcon,
    MedalIcon,
    PhoneIcon,
    UsersThreeIcon,
    WhatsappLogoIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";

const stats = [
  { value: "+12", label: "anos de experiência" },
  { value: "+500", label: "imóveis negociados" },
  { value: "+1.200", label: "famílias atendidas" },
  { value: "98%", label: "clientes satisfeitos" },
];

const values = [
  {
    title: "Transparência",
    text: "Cada etapa da negociação é conduzida com clareza total, sem surpresas ou letras miúdas.",
    icon: <HandshakeIcon size={34} weight="bold" className="text-primary-600" />,
  },
  {
    title: "Atendimento humano",
    text: "Ouvimos a sua história para encontrar o imóvel que realmente combina com o seu momento.",
    icon: <UsersThreeIcon size={34} weight="bold" className="text-primary-600" />,
  },
  {
    title: "Experiência local",
    text: "Conhecemos cada bairro de João Monlevade e região para orientar a melhor decisão.",
    icon: <MedalIcon size={34} weight="bold" className="text-primary-600" />,
  },
];

export default function SobrePage() {
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
                active={item.href === "/sobre"}
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
                active={item.href === "/sobre"}
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
          className="relative flex min-h-[360px] w-full items-center justify-center overflow-hidden bg-cover bg-center px-5 py-20 sm:px-8 sm:py-24"
          style={{ backgroundImage: "url(/background.jpg)" }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <RevealContainer
            once
            className="relative z-10 mx-auto w-full max-w-5xl text-center"
          >
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl">
              Sobre a Glow Imóveis
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/90 sm:text-lg">
              Mais do que vender imóveis, ajudamos pessoas a escreverem novos
              capítulos das suas histórias em João Monlevade e região.
            </p>
          </RevealContainer>
        </section>

        {/* Nossa história */}
        <Section size="middle" sectionClassName="px-5 py-16 sm:px-8">
          <div className="grid w-full items-center gap-10 lg:grid-cols-2">
            <RevealContainer once>
              <Image
                src="/images/house3/1.png"
                alt="Imóvel de alto padrão"
                width={800}
                height={600}
                className="h-full w-full rounded-2xl object-cover shadow-md"
              />
            </RevealContainer>

            <RevealContainer once className="w-full">
              <Title
                content="Nossa história"
                className="text-left text-3xl sm:text-4xl"
              />
              <Paragraph
                content="A Glow Imóveis nasceu do desejo de tornar a compra, venda e locação de imóveis uma experiência simples, segura e humana. Desde o início, acreditamos que cada imóvel carrega uma história — e que o nosso papel é conectar essas histórias às pessoas certas."
                className="mt-4 text-foreground/80"
              />
              <Paragraph
                content="Ao longo dos anos, construímos uma reputação sólida baseada em confiança, conhecimento local e um atendimento que coloca o cliente sempre em primeiro lugar. Seja para investir, morar ou alugar, estamos ao seu lado em cada decisão."
                className="mt-3 text-foreground/80"
              />
            </RevealContainer>
          </div>
        </Section>

        {/* Estatísticas */}
        <Section
          size="full"
          sectionClassName="bg-secondary-200 px-5 py-14 sm:px-8"
        >
          <div className="grid w-full max-w-5xl grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <ZoomContainer key={stat.label} once delay={index + 1}>
                <div className="flex flex-col items-center text-center">
                  <span className="text-3xl font-bold text-primary-500 sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-sm text-foreground/70 sm:text-base">
                    {stat.label}
                  </span>
                </div>
              </ZoomContainer>
            ))}
          </div>
        </Section>

        {/* Valores */}
        <Section size="middle" sectionClassName="px-5 py-16 sm:px-8">
          <RevealContainer once className="w-full">
            <Title
              content="Nossos valores"
              className="text-center text-3xl sm:text-4xl"
            />
            <Paragraph
              content="Princípios que guiam cada atendimento e cada negociação."
              className="mx-auto mt-3 max-w-2xl text-center text-foreground/70"
            />
          </RevealContainer>

          <div className="mt-10 grid w-full gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <ZoomContainer key={value.title} once delay={index + 1}>
                <InfoCard
                  title={value.title}
                  text={value.text}
                  icon={value.icon}
                  itemsPosition="center"
                />
              </ZoomContainer>
            ))}
          </div>
        </Section>

        {/* Contato */}
        <Section
          size="full"
          sectionClassName="bg-secondary-50 px-5 py-16 text-foreground sm:px-8"
        >
          <div
            id="contato"
            className="grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2"
          >
            <RevealContainer once className="w-full">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Fale com o corretor
              </h2>
              <p className="mt-3 text-foreground/70">
                {agentProfile.subtitle} Conte com a nossa equipe para encontrar
                o imóvel ideal ou anunciar o seu.
              </p>

              <ul className="mt-6 flex flex-col gap-3 text-foreground/80">
                <li className="flex items-center gap-3">
                  <IdentificationBadgeIcon
                    size={22}
                    className="text-primary-500"
                  />
                  {agentProfile.creci}
                </li>
                <li className="flex items-center gap-3">
                  <PhoneIcon size={22} className="text-primary-500" />
                  {agentProfile.phone}
                </li>
                <li className="flex items-center gap-3">
                  <EnvelopeSimpleIcon size={22} className="text-primary-500" />
                  {agentProfile.email}
                </li>
                <li className="flex items-start gap-3">
                  <MapPinIcon
                    size={22}
                    className="mt-0.5 shrink-0 text-primary-500"
                  />
                  {agentProfile.address}
                </li>
              </ul>
            </RevealContainer>

            <RevealContainer
              once
              className="w-full rounded-2xl border border-border-card bg-bg-card p-6 shadow-sm sm:p-8"
            >
              <h3 className="text-xl font-bold">{agentProfile.name}</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Atendimento personalizado por WhatsApp, telefone ou e-mail.
                Responderemos o mais breve possível.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  <Button
                    label="Chamar no WhatsApp"
                    variant="filled"
                    className="w-full justify-center gap-2 bg-[#25d366] text-white hover:opacity-90"
                    iconVariant="clip"
                  />
                </a>
                <a href={`mailto:${agentProfile.email}`}>
                  <Button
                    label="Enviar e-mail"
                    variant="outlined"
                    className="w-full justify-center border-foreground text-foreground hover:bg-secondary-50"
                  />
                </a>
              </div>
            </RevealContainer>
          </div>
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
