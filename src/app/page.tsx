"use client";

import FadeContainer from "@/components/animations-and-loading/FadeContainer";
import RevealContainer from "@/components/animations-and-loading/RevealContainer";
import ZoomContainer from "@/components/animations-and-loading/ZoomContainer";
import Button from "@/components/buttons/Button";
import ImageCard from "@/components/cards/ImageCard";
import InfoCard from "@/components/cards/InfoCard";
import Footer from "@/components/elements/Footer";
import { HeroSection } from "@/components/elements/HeroSection";
import LandingHeader from "@/components/elements/LandingHeader";
import { Section } from "@/components/elements/Section";
import Paragraph from "@/components/typography/Paragraph";
import Subtitle from "@/components/typography/Subtitle";
import Title from "@/components/typography/Title";
import {
  featuredProperties,
  footerColumns,
  footerSocialItems,
  landingNavItems,
  testimonials,
  type Testimonial,
} from "@/mocks/realEstateHome";
import {
  CheckIcon,
  HouseIcon,
  MapPinIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";

const financingCards = [
  {
    title: "Análise de Crédito",
    text: "Avaliamos sua documentação e simulamos as melhores taxas para João Monlevade - MG.",
    icon: <CheckIcon size={34} weight="bold" className="text-primary-600" />,
  },
  {
    title: "Escolha do Imóvel",
    text: "Selecionamos imóveis com perfil para arquitetos e designers de casas com foco em elegância.",
    icon: <HouseIcon size={34} weight="bold" className="text-primary-600" />,
  },
  {
    title: "Assinatura Segura",
    text: "Conduzimos toda a negociação com transparência até a assinatura final e entrega das chaves.",
    icon: <MapPinIcon size={34} weight="bold" className="text-primary-600" />,
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex h-full flex-col items-center rounded-xl border border-primary-100 bg-bg-card p-6 text-center shadow-sm">
      <Paragraph
        content={`“${testimonial.testimonial}”`}
        className="text-base leading-relaxed text-foreground/80"
      />

      <Image
        src={testimonial.avatarPath}
        alt={`Foto de ${testimonial.name}`}
        width={86}
        height={86}
        className="mt-6 h-[86px] w-[86px] rounded-full object-cover"
      />

      <Subtitle
        content={testimonial.name}
        element="h4"
        className="mt-4 text-xl font-bold text-foreground"
      />
      <Paragraph
        content={testimonial.role}
        className="text-sm text-foreground/70"
      />
    </div>
  );
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <LandingHeader.Root
        size="sm"
        sticky
        bordered
        className="bg-background/95 backdrop-blur-sm"
      >
        <LandingHeader.Left>
          <LandingHeader.Logo src="/logo.png" alt="João Doe Imóveis" />
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
            className="hidden bg-primary-700 text-white hover:bg-primary-800 sm:inline-flex"
          />
        </LandingHeader.Right>
      </LandingHeader.Root>

      <main>
        <HeroSection
          size="full"
          backgroundImageLocalPath="/images/hero_bg.jpg"
          sectionClassName="relative min-h-[700px] items-stretch justify-start px-0 pb-20 pt-24"
        >
          <div className="absolute inset-0 bg-black/60" />

          <div
            id="inicio"
            className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 flex items-center"
          >
            <RevealContainer once className="max-w-4xl m-auto">
              <h1 className="text-4xl text-white sm:text-6xl font-bold">
                Cada imóvel tem uma história. Aqui, ajudamos você a escrever a
                sua.
              </h1>
              <h2 className="text-xl text-white sm:text-3xl mt-4">
                Modelo de landing page para imobiliárias, arquitetos e designers
                de casas com foco em sofisticação e acolhimento.
              </h2>
            </RevealContainer>
          </div>
        </HeroSection>

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
            className="mt-10 grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4"
          >
            {featuredProperties.map((property, index) => (
              <ZoomContainer
                key={property.id}
                once
                delay={index + 1}
                className="h-full"
              >
                <ImageCard
                  title={property.title}
                  imgUrl={property.imagePath}
                  description={`${property.reference} -${property.city}`}
                />
              </ZoomContainer>
            ))}
          </div>
        </Section>

        <Section
          size="full"
          sectionClassName="px-5 pb-10 pt-16 sm:px-8  bg-secondary-200"
        >
          <div className="w-full max-w-7xl ">
            <RevealContainer once className="w-full ">
              <Title
                content="O que nossos clientes dizem"
                className="text-center text-4xl sm:text-5xl"
              />
            </RevealContainer>

            <div className="mt-10 grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((item, index) => (
                <RevealContainer
                  key={item.id}
                  once
                  delay={index + 1}
                  className="h-full"
                >
                  <TestimonialCard testimonial={item} />
                </RevealContainer>
              ))}
            </div>
          </div>

          <ZoomContainer once className="mt-10">
            <Button
              label="Ver todos os depoimentos"
              variant="filled"
              className="mx-auto bg-primary-700 px-6 py-3 text-white font-semibold hover:bg-primary-600"
            />
          </ZoomContainer>
        </Section>

        <Section size="middle" sectionClassName="px-5 pb-16 pt-14 sm:px-8">
          <div id="negocie" className="w-full">
            <FadeContainer once className="w-full">
              <Title
                content="Negocie seu imóvel com segurança"
                className="text-center text-4xl sm:text-5xl"
              />
              <Paragraph
                content="Acompanhamos todas as etapas para facilitar sua aprovação e garantir uma negociação tranquila em João Monlevade - MG."
                className="mx-auto mt-3 max-w-3xl text-center text-base text-foreground/75"
              />
            </FadeContainer>

            <div className="mt-10 grid w-full gap-4 md:grid-cols-3">
              {financingCards.map((card, index) => (
                <ZoomContainer key={card.title} once delay={index + 1}>
                  <InfoCard
                    title={card.title}
                    text={card.text}
                    icon={card.icon}
                    itemsPosition="center"
                  />
                </ZoomContainer>
              ))}
            </div>
          </div>
        </Section>
      </main>

      <Footer.Root
        className="w-full border-0 bg-[#14110f] text-[#f6eee3]"
        bordered={false}
      >
        <div className="w-full bg-[#14110f]">
          <Footer.Top
            columns={4}
            bordered
            className="border-b border-white/10 [--color-foreground:#f6eee3]"
          >
            <Footer.Column>
              <Image
                src="/logo.png"
                alt="Logo no rodapé"
                width={220}
                height={100}
                className="h-auto w-44 object-contain"
              />
            </Footer.Column>

            {footerColumns.map((column) => (
              <Footer.Column
                key={column.title}
                title={column.title}
                items={column.items}
              />
            ))}
          </Footer.Top>
        </div>

        <Footer.SocialRow
          items={footerSocialItems}
          title="Acompanhe"
          bordered
          iconsClassName="text-[#f6eee3] hover:text-secondary-300"
          className="bg-[#1b1714] [--color-foreground:#f6eee3]"
        />

        <Footer.Bottom className="border-t border-white/10 bg-[#14110f] [--color-foreground:#f6eee3]">
          <div className="flex w-full flex-col items-center justify-between gap-3 sm:flex-row">
            <Paragraph
              content="© Copyright 2026 - João Doe - Todos os direitos reservados"
              className="text-sm text-[#f6eee3]"
            />
            <Paragraph
              content="Desenvolvido por PLS Sistemas"
              className="text-sm text-[#d9ccbb]"
            />
          </div>
        </Footer.Bottom>
      </Footer.Root>
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
