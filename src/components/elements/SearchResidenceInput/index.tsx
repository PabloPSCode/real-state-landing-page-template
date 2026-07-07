"use client";

import Button from "@/components/buttons/Button";
import IntervalSliderInput from "@/components/inputs/IntervalSliderInput";
import SelectInput, { type Option } from "@/components/inputs/SelectInput";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { type FormEvent, useMemo, useState } from "react";

/** Filtros emitidos pelo formulário de busca de imóveis. */
export type SearchResidenceFilters = {
  negocio: Option | null;
  tipo: Option | null;
  /** Faixa de preço selecionada [mínimo, máximo]. */
  priceRange: [number, number];
  cidade: Option | null;
  bairro: Option | null;
  condominio: Option | null;
};

export interface SearchResidenceInputProps {
  /** Título exibido no topo do painel. */
  title?: string;
  /** Rótulo do link de referência (canto superior direito). */
  referenceLabel?: string;
  /** Destino do link de referência. */
  referenceHref?: string;
  /** Opções do campo "Negócio". */
  negocioOptions: Option[];
  /** Opções do campo "Tipo do Imóvel". */
  tipoOptions: Option[];
  /** Opções do campo "Cidade". */
  cidadeOptions: Option[];
  /** Mapa de bairros por cidade (chave = value da cidade). */
  bairrosByCidade: Record<string, Option[]>;
  /** Opções do campo "Condomínios". */
  condominioOptions: Option[];
  /** Menor preço disponível (limite inferior do slider). */
  priceMin: number;
  /** Maior preço disponível (limite superior do slider). */
  priceMax: number;
  /** Callback disparado ao enviar o formulário. */
  onSearch?: (filters: SearchResidenceFilters) => void;
  /** Classe adicional do painel. */
  className?: string;
}

const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

/**
 * Painel de busca de imóveis para a seção hero.
 * Compõe SelectInput + IntervalSliderInput + Button seguindo o design system.
 * O campo "Bairros" só é habilitado após a seleção de uma cidade.
 */
export default function SearchResidenceInput({
  title = "Encontre o seu imóvel ideal",
  referenceLabel = "Referência",
  referenceHref = "#",
  negocioOptions,
  tipoOptions,
  cidadeOptions,
  bairrosByCidade,
  condominioOptions,
  priceMin,
  priceMax,
  onSearch,
  className,
}: SearchResidenceInputProps) {
  const [filters, setFilters] = useState<SearchResidenceFilters>(() => ({
    negocio: null,
    tipo: null,
    priceRange: [priceMin, priceMax],
    cidade: null,
    bairro: null,
    condominio: null,
  }));

  const bairroOptions = useMemo<Option[]>(() => {
    const cityValue = filters.cidade?.value;
    if (cityValue == null) return [];
    return bairrosByCidade[String(cityValue)] ?? [];
  }, [filters.cidade, bairrosByCidade]);

  const isBairroDisabled = !filters.cidade;

  const update = <K extends keyof SearchResidenceFilters>(
    key: K,
    value: SearchResidenceFilters[K],
  ) => setFilters((prev) => ({ ...prev, [key]: value }));

  // Trocar de cidade limpa o bairro selecionado.
  const handleCidadeChange = (option: Option | null) =>
    setFilters((prev) => ({ ...prev, cidade: option, bairro: null }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch?.(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        "w-full max-w-5xl text-left",
        "rounded-xl border border-border-card bg-background",
        "p-4 shadow-lg sm:p-6",
        className,
      )}
    >
      {/* Cabeçalho: título + link de referência */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-foreground sm:text-lg">
          {title}
        </h3>
        <a
          href={referenceHref}
          className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-foreground/80 underline-offset-4 hover:text-primary-600 hover:underline sm:text-sm"
        >
          <MagnifyingGlassIcon size={16} weight="bold" />
          {referenceLabel}
        </a>
      </div>

      {/* Linha 1: Negócio, Tipo, Faixa de preço (slider) */}
      <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SelectInput
          label="Negócio"
          placeholder="Selecione"
          isSearchable={false}
          options={negocioOptions}
          value={filters.negocio}
          onSelectOption={(opt) => update("negocio", opt)}
        />
        <SelectInput
          label="Tipo do Imóvel"
          placeholder="Selecione"
          isSearchable={false}
          options={tipoOptions}
          value={filters.tipo}
          onSelectOption={(opt) => update("tipo", opt)}
        />
        <IntervalSliderInput
          containerClassName="sm:col-span-2"
          label="Faixa de preço"
          minValue={priceMin}
          maxValue={priceMax}
          stepValue={1000}
          values={filters.priceRange}
          onChange={(range) => update("priceRange", range)}
          formatValue={formatBRL}
        />
      </div>

      {/* Linha 2: Cidade, Bairros (dependente), Condomínios */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SelectInput
          label="Cidade"
          placeholder="Selecione"
          options={cidadeOptions}
          value={filters.cidade}
          onSelectOption={handleCidadeChange}
        />
        <SelectInput
          label="Bairros"
          placeholder={
            isBairroDisabled ? "Selecione uma cidade" : "Selecione"
          }
          isDisabled={isBairroDisabled}
          options={bairroOptions}
          value={filters.bairro}
          onSelectOption={(opt) => update("bairro", opt)}
          labelClassName={clsx(isBairroDisabled && "text-foreground/50")}
        />
        <SelectInput
          label="Condomínios"
          placeholder="Selecione"
          options={condominioOptions}
          value={filters.condominio}
          onSelectOption={(opt) => update("condominio", opt)}
        />
      </div>

      {/* Ação */}
      <div className="mt-5">
        <Button
          type="submit"
          label="Pesquisar"
          variant="filled"
          className="bg-primary-500 px-6 text-white hover:bg-primary-600 w-full"
        />
      </div>
    </form>
  );
}
