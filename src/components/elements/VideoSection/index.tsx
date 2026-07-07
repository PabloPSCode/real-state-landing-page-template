"use client";

import Button from "@/components/buttons/Button";
import Paragraph from "@/components/typography/Paragraph";
import Title from "@/components/typography/Title";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { type ReactNode, useEffect, useRef, useState } from "react";

export interface VideoSource {
  /** URL do arquivo de vídeo */
  src: string;
  /** MIME type, ex.: "video/webm" ou "video/mp4" */
  type: string;
}

export interface VideoSectionProps {
  /** Largura da seção */
  size: "midle" | "full";
  /** Título principal */
  title: string;
  /** Texto descritivo */
  description: string;
  /**
   * URL única do vídeo (fallback). Prefira `sources` para múltiplos formatos.
   */
  videoUrl?: string;
  /**
   * Lista de fontes de vídeo (ex.: WebM + MP4). O navegador escolhe a primeira
   * compatível — coloque o formato mais eficiente primeiro.
   */
  sources?: VideoSource[];
  /** Imagem de pôster exibida antes do vídeo carregar (AVIF/WebP). */
  posterUrl?: string;
  /** Exibir botão de play/pause */
  showPlayPauseButton?: boolean;
  /** Título do botão primário */
  primaryButtonTitle: string;
  /** Título do botão secundário */
  secondaryButtonTitle?: string;
  /** Callback do botão primário */
  onPrimaryClick?: () => void;
  /** Callback do botão secundário */
  onSecondaryClick?: () => void;
  /** Classe adicional do botão primário */
  primaryButtonClassName?: string;
  /** Classe adicional do botão secundário */
  secondaryButtonClassName?: string;
  /** Classe adicional do título */
  titleClassName?: string;
  /** Classe adicional da descrição */
  descriptionClassName?: string;
  /** Classe adicional do container */
  containerClassName?: string;
  /** Conteúdo extra sobreposto ao vídeo (substitui título/descrição padrão). */
  children?: ReactNode;
}

export default function VideoSection({
  size,
  title,
  description,
  videoUrl,
  sources,
  posterUrl,
  showPlayPauseButton = false,
  primaryButtonTitle,
  secondaryButtonTitle,
  onPrimaryClick,
  onSecondaryClick,
  primaryButtonClassName,
  secondaryButtonClassName,
  titleClassName,
  descriptionClassName,
  containerClassName,
  children,
}: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Normaliza as fontes: usa `sources` quando disponível, senão `videoUrl`.
  const resolvedSources: VideoSource[] =
    sources && sources.length > 0
      ? sources
      : videoUrl
        ? [
            {
              src: videoUrl,
              type: videoUrl.endsWith(".webm") ? "video/webm" : "video/mp4",
            },
          ]
        : [];

  // Autoplay condicional: só reproduz se o usuário não pediu movimento
  // reduzido e não está em modo de economia de dados (Save-Data).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const saveData = Boolean(connection?.saveData);

    if (prefersReducedMotion || saveData) {
      // Respeita a preferência do usuário: mantém apenas o pôster.
      setIsPlaying(false);
      return;
    }

    video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Mostra o controle quando solicitado ou sempre que o vídeo estiver pausado
  // (ex.: autoplay bloqueado pela guarda de acessibilidade/dados).
  const showToggle = showPlayPauseButton || !isPlaying;

  return (
    <section
      className={clsx(size === "full" ? "w-full" : "w-full max-w-5xl mx-auto")}
    >
      <div
        className={clsx(
          "relative flex overflow-hidden min-h-[300px] sm:min-h-[420px] lg:min-h-[540px] w-full",
          containerClassName,
        )}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={posterUrl}
          preload="none"
          muted
          loop
          playsInline
          aria-hidden="true"
          tabIndex={-1}
        >
          {resolvedSources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-black/25 to-black/30" />

        {showToggle && (
          <button
            type="button"
            aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
            onClick={togglePlay}
            className="absolute top-3 right-3 flex items-center justify-center sm:top-4 sm:right-4 z-30 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white/65 text-secondary-900 hover:bg-white/85 transition"
          >
            {isPlaying ? (
              <PauseIcon size={18} weight="fill" className="mx-auto" />
            ) : (
              <PlayIcon size={18} weight="fill" className="mx-auto" />
            )}
          </button>
        )}

        <div className="relative z-20 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 py-16 text-center sm:px-8">
          {title && (
            <Title
              content={title}
              element="h2"
              className={clsx(
                "text-white text-3xl sm:text-5xl md:text-6xl leading-[1.05]",
                titleClassName,
              )}
            />
          )}
          {description && (
            <Paragraph
              content={description}
              className={clsx(
                "mt-3 sm:mt-4 max-w-2xl text-white/90 text-sm sm:text-base md:text-lg",
                descriptionClassName,
              )}
            />
          )}

          {children ? (
            <div className="mt-8 flex w-full justify-center">{children}</div>
          ) : (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                label={primaryButtonTitle}
                variant="filled"
                onClick={onPrimaryClick}
                className={clsx(
                  "whitespace-nowrap rounded-md px-6 py-3 bg-white text-secondary-900 hover:bg-white/85",
                  primaryButtonClassName,
                )}
              />
              {secondaryButtonTitle && (
                <Button
                  label={secondaryButtonTitle}
                  variant="outlined"
                  onClick={onSecondaryClick}
                  className={clsx(
                    "whitespace-nowrap rounded-md px-6 py-3 border-white text-white hover:bg-white/15",
                    secondaryButtonClassName,
                  )}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
