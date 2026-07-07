"use client";

import Button from "@/components/buttons/Button";
import { getResidenceById } from "@/mocks/realEstateHome";
import {
    ArrowLeftIcon,
    BedIcon,
    CaretRightIcon,
    CarIcon,
    EyeIcon,
    HeartIcon,
    ImagesIcon,
    MapPinIcon,
    MapTrifoldIcon,
    RulerIcon,
    ShareNetworkIcon,
    ShowerIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, type ReactNode } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

function SpecItem({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-primary-600">{icon}</span>
      <span className="text-sm text-foreground sm:text-base">{label}</span>
    </div>
  );
}

function PriceRow({
  label,
  value,
  emphasis,
  hint,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
  hint?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span
        className={clsx(
          "text-foreground/70",
          emphasis ? "text-base font-semibold text-foreground" : "text-sm",
        )}
      >
        {label}
      </span>
      <span
        className={clsx(
          emphasis
            ? "text-lg font-bold text-primary-500 sm:text-xl"
            : hint
              ? "text-sm text-foreground/70"
              : "text-base font-semibold text-primary-500",
        )}
      >
        {value}
      </span>
    </div>
  );
}

export default function ResidenceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const residence = getResidenceById(id);

  const [view, setView] = useState<"fotos" | "mapa">("fotos");
  const [favorited, setFavorited] = useState(false);

  if (!residence) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center text-foreground">
        <h1 className="text-2xl font-bold">Imóvel não encontrado</h1>
        <p className="text-foreground/70">
          O imóvel que você procura não está mais disponível.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
        >
          <ArrowLeftIcon size={18} /> Voltar para o início
        </Link>
      </div>
    );
  }

  const {
    label,
    businessType,
    propertyType,
    neighborhood,
    city,
    bedrooms,
    suites,
    bathrooms,
    garages,
    area,
    price,
    priceValue,
    condoFee = 0,
    iptu = 0,
    originCode,
    viewsCount,
    images,
  } = residence;

  const isRent = businessType.toLowerCase().includes("alug");
  const total = priceValue + condoFee + iptu;

  const heroImages = images.slice(0, 5);
  const extraCount = images.length - heroImages.length;

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: propertyType, url });
      } catch {
        /* usuário cancelou */
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
  };

  const description = [
    `${bedrooms} quartos amplos, sendo ${suites} suíte${suites === 1 ? "" : "s"}.`,
    `${bathrooms} banheiro${bathrooms === 1 ? "" : "s"}.`,
    `${garages} vaga${garages === 1 ? "" : "s"} de garagem.`,
    `Área útil de ${area}.`,
    `Localizado no bairro ${neighborhood}, em ${city}.`,
  ];

  const breadcrumb = [
    { label: "Início", href: "/" },
    { label: city },
    { label: neighborhood },
    { label: propertyType },
    { label: originCode ?? id },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 w-full border-b border-foreground/10 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Glow Imóveis"
              width={120}
              height={36}
              className="h-7 w-auto sm:h-8"
            />
          </Link>
          <Link
            href="/#sobre"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground"
          >
            <ArrowLeftIcon size={16} /> Voltar aos imóveis
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-5 py-6 sm:px-8">
        {/* Mídia: galeria ou mapa */}
        {view === "fotos" ? (
          <PhotoProvider maskOpacity={0.9} loop>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 overflow-hidden rounded-xl sm:grid-cols-4">
              {heroImages.map((src, i) => {
                const showOverlay = i === heroImages.length - 1 && extraCount > 0;
                return (
                  <PhotoView key={src} src={src}>
                    <button
                      type="button"
                      className={clsx(
                        "group relative block h-full w-full overflow-hidden bg-foreground/5",
                        i === 0
                          ? "col-span-2 row-span-2 aspect-square sm:aspect-auto"
                          : "aspect-[4/3]",
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`${propertyType} — foto ${i + 1}`}
                        className="h-full w-full cursor-zoom-in object-cover transition group-hover:brightness-95"
                        loading={i === 0 ? "eager" : "lazy"}
                      />
                      {showOverlay && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-lg font-semibold text-white">
                          +{extraCount} Fotos
                        </span>
                      )}
                    </button>
                  </PhotoView>
                );
              })}
              {/* Registra as demais imagens no lightbox sem exibir tiles */}
              {images.slice(5).map((src) => (
                <PhotoView key={src} src={src} />
              ))}
            </div>
          </PhotoProvider>
        ) : (
          <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-xl border border-border-card bg-secondary-100 p-8 text-center sm:min-h-[360px]">
            <MapPinIcon size={40} weight="fill" className="text-primary-600" />
            <p className="text-base font-semibold text-foreground">
              {neighborhood} — {city}
            </p>
            <p className="max-w-md text-sm text-foreground/70">
              Localização aproximada. Entre em contato com o corretor para
              agendar uma visita e conhecer o entorno do imóvel.
            </p>
          </div>
        )}

        {/* Breadcrumb + ações */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <nav aria-label="breadcrumb" className="min-w-0">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-foreground/60 sm:text-sm">
              {breadcrumb.map((item, i) => (
                <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
                  {item.href ? (
                    <Link href={item.href} className="hover:text-primary-500">
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className={clsx(
                        i === breadcrumb.length - 1 && "text-foreground/80",
                      )}
                    >
                      {item.label}
                    </span>
                  )}
                  {i < breadcrumb.length - 1 && (
                    <CaretRightIcon size={12} className="text-foreground/40" />
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFavorited((v) => !v)}
              aria-pressed={favorited}
              aria-label="Favoritar"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-card text-destructive-500 transition hover:bg-destructive-50"
            >
              <HeartIcon size={18} weight={favorited ? "fill" : "regular"} />
            </button>
            <button
              type="button"
              onClick={share}
              aria-label="Compartilhar"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-card text-foreground/70 transition hover:bg-foreground/5"
            >
              <ShareNetworkIcon size={18} />
            </button>
          </div>
        </div>

        {/* Toggle Fotos / Mapa */}
        <div className="mt-4 grid max-w-md grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setView("fotos")}
            className={clsx(
              "inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition",
              view === "fotos"
                ? "border-primary-500 bg-primary-500 text-white"
                : "border-border-card bg-background text-foreground hover:bg-foreground/5",
            )}
          >
            <ImagesIcon size={18} /> Fotos
          </button>
          <button
            type="button"
            onClick={() => setView("mapa")}
            className={clsx(
              "inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition",
              view === "mapa"
                ? "border-primary-500 bg-primary-500 text-white"
                : "border-border-card bg-background text-foreground hover:bg-foreground/5",
            )}
          >
            <MapTrifoldIcon size={18} /> Mapa
          </button>
        </div>

        {/* Conteúdo + sidebar */}
        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          {/* Coluna principal */}
          <div className="lg:col-span-2">
            {label && (
              <span className="mb-3 inline-block rounded-md bg-secondary-300 px-3 py-1 text-xs font-semibold text-secondary-950">
                {label}
              </span>
            )}
            <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
              {propertyType} com {bedrooms} dormitórios para{" "}
              {isRent ? "alugar" : "comprar"}, {area} por {price} – {neighborhood}{" "}
              – {city}
            </h1>

            <h2 className="mt-4 text-lg font-bold text-foreground">
              {neighborhood}
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-foreground/70">
              <MapPinIcon size={16} weight="fill" className="text-primary-600" />
              {neighborhood} – {city}
            </p>
            {originCode && (
              <p className="mt-1 text-sm text-foreground/50">
                Código de origem: {originCode}
              </p>
            )}

            {/* Características */}
            <div className="mt-6 grid grid-cols-2 gap-4 border-y border-border-card py-6 sm:grid-cols-4">
              <SpecItem
                icon={<BedIcon size={22} />}
                label={`${bedrooms} quartos`}
              />
              <SpecItem
                icon={<ShowerIcon size={22} />}
                label={`${bathrooms} banheiros`}
              />
              <SpecItem
                icon={<RulerIcon size={22} />}
                label={`${area} útil`}
              />
              <SpecItem
                icon={<CarIcon size={22} />}
                label={`${garages} vaga${garages === 1 ? "" : "s"}`}
              />
            </div>

            {/* Descrição */}
            <section className="mt-8">
              <h3 className="text-xl font-bold text-foreground">Descrição</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-foreground/80 sm:text-base">
                {description.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-primary-600">–</span>
                    {line}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar de preços */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-xl border border-border-card bg-bg-card p-5 shadow-md">
                <div className="flex flex-col gap-3">
                  <PriceRow
                    label={isRent ? "Aluguel" : "Valor"}
                    value={price}
                    emphasis
                  />
                  {condoFee > 0 && (
                    <PriceRow label="Condomínio" value={formatBRL(condoFee)} />
                  )}
                  {iptu > 0 && (
                    <PriceRow label="IPTU mensal" value={formatBRL(iptu)} />
                  )}
                  {isRent && (condoFee > 0 || iptu > 0) && (
                    <>
                      <hr className="border-border-card" />
                      <PriceRow
                        label="Total"
                        value={`${formatBRL(total)}/mês`}
                        emphasis
                      />
                    </>
                  )}
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  <Button
                    label="Solicitar contato"
                    variant="filled"
                    className="w-full justify-center bg-primary-500 text-white hover:bg-primary-600"
                  />
                  <Button
                    label="Quero visitar"
                    variant="outlined"
                    className="w-full justify-center border-primary-500 text-primary-500 hover:bg-primary-50"
                  />
                </div>

                {typeof viewsCount === "number" && (
                  <p className="mt-4 flex items-center gap-2 text-sm text-foreground/60">
                    <EyeIcon size={18} />
                    {viewsCount} pessoas visualizaram este anúncio
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
