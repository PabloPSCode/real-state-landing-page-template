"use client";

import {
  BedIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CarIcon,
  HeartIcon,
  MapPinIcon,
  RulerIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export type ResidenceLabel =
  | "Pronto para morar"
  | "Oportunidade de investimento"
  | "Novo";

export interface Residence {
  id: string;
  /** Selo de destaque sobre a imagem. */
  label?: ResidenceLabel;
  /** Referência (ex.: "Ref.: 1545"). */
  reference: string;
  /** Tipo de negócio (ex.: "Venda"). */
  businessType: string;
  /** Tipo do imóvel (ex.: "Apartamento", "Casa"). */
  propertyType: string;
  /** Bairro. */
  neighborhood?: string;
  /** Cidade/UF. */
  city: string;
  /** Número de dormitórios. */
  bedrooms: number;
  /** Número de vagas de garagem. */
  garages: number;
  /** Área (ex.: "112 m²"). */
  area: string;
  /** Preço formatado. */
  price: string;
  /** Galeria de imagens. */
  images: string[];
}

export interface ResidenceCardProps {
  residence: Residence;
  /** Link para a página de detalhes (torna o corpo do card clicável). */
  href?: string;
  /** Callback ao favoritar/desfavoritar. */
  onToggleFavorite?: (id: string, favorited: boolean) => void;
  className?: string;
}

/** Cores do selo por tipo, usando tokens do design system. */
const LABEL_CLASSES: Record<ResidenceLabel, string> = {
  "Pronto para morar": "bg-secondary-300 text-secondary-950",
  "Oportunidade de investimento": "bg-alert-300 text-alert-950",
  Novo: "bg-primary-600 text-white",
};

/**
 * ResidenceCard — cartão de imóvel com carrossel de imagens (modal em tela
 * cheia via react-photo-view), selo de destaque e características técnicas
 * com ícones. Segue os tokens do design system.
 */
export default function ResidenceCard({
  residence,
  href,
  onToggleFavorite,
  className,
}: ResidenceCardProps) {
  const {
    id,
    label,
    reference,
    businessType,
    propertyType,
    neighborhood,
    city,
    bedrooms,
    garages,
    area,
    price,
    images,
  } = residence;

  const [index, setIndex] = useState(0);
  const [favorited, setFavorited] = useState(false);
  const count = images.length;

  const go = (dir: number) =>
    setIndex((current) => (current + dir + count) % count);

  const toggleFavorite = () => {
    setFavorited((prev) => {
      const next = !prev;
      onToggleFavorite?.(id, next);
      return next;
    });
  };

  const location = [neighborhood, city].filter(Boolean).join(" - ");

  return (
    <article
      className={clsx(
        "flex h-full flex-col overflow-hidden rounded-xl border border-border-card bg-bg-card shadow-md",
        className,
      )}
    >
      {/* Carrossel + modal */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-foreground/5">
        <PhotoProvider maskOpacity={0.9} loop>
          {images.map((src, i) => (
            <PhotoView key={src} src={src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${propertyType} — ${reference} (foto ${i + 1})`}
                loading="lazy"
                className={clsx(
                  "absolute inset-0 h-full w-full cursor-zoom-in object-cover transition-opacity duration-300",
                  i === index ? "opacity-100" : "opacity-0",
                )}
                style={{ pointerEvents: i === index ? "auto" : "none" }}
              />
            </PhotoView>
          ))}
        </PhotoProvider>

        {/* Selo de destaque — fixo no topo do card */}
        {label && (
          <span
            className={clsx(
              "absolute left-0 top-0 z-10 rounded-br-lg px-3 py-1.5 text-xs font-semibold shadow-sm sm:text-sm",
              LABEL_CLASSES[label],
            )}
          >
            {label}
          </span>
        )}

        {/* Navegação do carrossel */}
        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Imagem anterior"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/65"
            >
              <CaretLeftIcon size={18} weight="bold" />
            </button>
            <button
              type="button"
              aria-label="Próxima imagem"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/65"
            >
              <CaretRightIcon size={18} weight="bold" />
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`Ir para imagem ${i + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndex(i);
                  }}
                  className={clsx(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-4 bg-white" : "w-1.5 bg-white/60",
                  )}
                />
              ))}
            </div>
          </>
        )}

        {/* Pílulas: referência + negócio */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
          <span className="rounded-md bg-black/70 px-2.5 py-1 text-xs font-medium text-white sm:text-sm">
            {reference}
          </span>
          <span className="rounded-md bg-success-600 px-2.5 py-1 text-xs font-semibold uppercase text-white sm:text-sm">
            {businessType}
          </span>
        </div>
      </div>

      {/* Corpo: localização + tipo + características (clicável quando há href) */}
      {(() => {
        const body = (
          <>
            <div className="flex items-center gap-1.5 text-sm text-foreground/70">
              <MapPinIcon size={16} weight="fill" className="text-primary-600" />
              <span className="truncate">{location}</span>
            </div>

            <h3 className="mt-1 text-lg font-bold text-foreground sm:text-xl">
              {propertyType}
            </h3>

            <ul className="mt-3 flex flex-col gap-2 text-sm text-foreground/80">
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <BedIcon size={18} className="text-primary-600" />
                  Dormitórios
                </span>
                <span className="font-bold text-foreground">{bedrooms}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CarIcon size={18} className="text-primary-600" />
                  Garagens
                </span>
                <span className="font-bold text-foreground">{garages}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <RulerIcon size={18} className="text-primary-600" />
                  Área
                </span>
                <span className="font-bold text-foreground">{area}</span>
              </li>
            </ul>
          </>
        );

        return href ? (
          <Link
            href={href}
            className="flex flex-1 flex-col p-4 transition hover:bg-foreground/3"
          >
            {body}
          </Link>
        ) : (
          <div className="flex flex-1 flex-col p-4">{body}</div>
        );
      })()}

      {/* Rodapé: preço + favoritar */}
      <div className="flex items-center justify-between border-t border-border-card p-4">
        <span className="text-xl font-bold text-foreground">{price}</span>
        <button
          type="button"
          onClick={toggleFavorite}
          aria-pressed={favorited}
          aria-label={
            favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
          className="rounded-full p-1.5 text-destructive-500 transition hover:bg-destructive-50"
        >
          <HeartIcon size={26} weight={favorited ? "fill" : "regular"} />
        </button>
      </div>
    </article>
  );
}
