import type { Metadata } from "next";
import { Raleway, Work_Sans } from "next/font/google";
import "../styles/globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "João Doe Imóveis",
  description:
    "Landing page modelo para imobiliária com foco em imóveis residenciais de alto padrão.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${workSans.variable} ${raleway.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
