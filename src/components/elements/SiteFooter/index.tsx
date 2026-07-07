"use client";

import Footer from "@/components/elements/Footer";
import Paragraph from "@/components/typography/Paragraph";
import { footerColumns, footerSocialItems } from "@/mocks/realEstateHome";
import Image from "next/image";

/**
 * Rodapé do site no estilo Airbnb: canvas branco, texto "ink", divisórias
 * hairline e um único acento Rausch no hover dos ícones sociais.
 */
export default function SiteFooter() {
  return (
    <Footer.Root className="w-full" bordered>
      <Footer.Top columns={4} className="border-b border-border-card">
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

      <Footer.SocialRow
        items={footerSocialItems}
        title="Acompanhe"
        className="border-t border-border-card"
        iconsClassName="text-foreground hover:text-primary-500"
      />

      <Footer.Bottom className="border-t border-border-card">
        <div className="flex w-full flex-col items-center justify-between gap-3 sm:flex-row">
          <Paragraph
            content="© Copyright 2026 - Glow - Todos os direitos reservados"
            className="text-sm text-secondary-600"
          />
          <Paragraph
            content="Desenvolvido por PLS Sistemas"
            className="text-sm text-secondary-500"
          />
        </div>
      </Footer.Bottom>
    </Footer.Root>
  );
}
