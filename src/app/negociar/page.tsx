"use client";

import Button from "@/components/buttons/Button";
import LandingHeader from "@/components/elements/LandingHeader";
import { Section } from "@/components/elements/Section";
import SiteFooter from "@/components/elements/SiteFooter";
import CurrencyInput from "@/components/inputs/CurrencyInput";
import InternationalPhoneInput from "@/components/inputs/InternationalPhoneInput";
import MaskedTextInput from "@/components/inputs/MaskedTextInput";
import SelectInput, { type Option } from "@/components/inputs/SelectInput";
import TextInput from "@/components/inputs/TextInput";
import Paragraph from "@/components/typography/Paragraph";
import {
    bairrosByCidade,
    cidadeOptions,
    landingNavItems,
    tipoImovelOptions,
    ufOptions,
} from "@/mocks/realEstateHome";
import { showToastSuccess } from "@/utils/toasts";
import { WhatsappLogoIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";

type NegociarForm = {
  nome: string;
  telefone: string;
  email: string;
  intencao: "vender" | "alugar";
  finalidade: "residencial" | "comercial";
  tipoImovel: string;
  cep: string;
  uf: string;
  cidade: string;
  bairro: string;
  endereco: string;
  numero: string;
  complemento: string;
  preco: string;
  condominio: string;
  iptu: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Controle segmentado (ex.: Vender / Alugar). */
function Segmented({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div className="inline-flex rounded-lg border border-border-card bg-bg-card p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          className={clsx(
            "rounded-md px-6 py-2 text-sm font-semibold transition",
            value === opt.value
              ? "bg-primary-500 text-white"
              : "text-foreground/70 hover:text-foreground",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 mt-2 text-base font-bold text-foreground sm:text-lg">
      {children}
    </h3>
  );
}

export default function NegociarPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cepUnknown, setCepUnknown] = useState(false);
  const whatsappHref = "https://wa.me/5531912341234";

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NegociarForm>({
    mode: "onBlur",
    defaultValues: {
      nome: "",
      telefone: "",
      email: "",
      intencao: "vender",
      finalidade: "residencial",
      tipoImovel: "",
      cep: "",
      uf: "",
      cidade: "",
      bairro: "",
      endereco: "",
      numero: "",
      complemento: "",
      preco: "",
      condominio: "",
      iptu: "",
    },
  });

  const selectedCidade = watch("cidade");
  const bairroOptions: Option[] = selectedCidade
    ? (bairrosByCidade[selectedCidade] ?? [])
    : [];

  const onSubmit = () => {
    showToastSuccess("Imóvel enviado com sucesso!");
    reset();
    setCepUnknown(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Toaster position="top-right" />

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
                active={item.href === "/negociar"}
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
                active={item.href === "/negociar"}
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
        <Section size="middle" sectionClassName="px-5 py-12 sm:px-8 sm:py-16">
          <div className="w-full">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Negocie seu Imóvel
            </h1>
            <Paragraph
              content="Preencha os dados do seu imóvel e nossa equipe entrará em contato."
              className="mt-2 text-foreground/70"
            />

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="mt-8 flex flex-col gap-8"
            >
              {/* Seus dados */}
              <fieldset>
                <SectionHeading>Seus dados:</SectionHeading>
                <div className="grid gap-4 md:grid-cols-3">
                  <TextInput
                    label="Nome"
                    placeholder="Seu nome"
                    errorMessage={errors.nome?.message}
                    {...register("nome", { required: "Informe seu nome" })}
                  />

                  <Controller
                    control={control}
                    name="telefone"
                    rules={{
                      validate: (v) =>
                        v.replace(/\D/g, "").length >= 12 ||
                        "Informe um telefone válido",
                    }}
                    render={({ field, fieldState }) => (
                      <InternationalPhoneInput
                        label="Telefone"
                        placeholder="Seu telefone"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        errorMessage={fieldState.error?.message}
                        inputClassName="border border-red-300"
                      />
                    )}
                  />

                  <TextInput
                    label="E-mail"
                    type="email"
                    placeholder="Seu email"
                    errorMessage={errors.email?.message}
                    {...register("email", {
                      required: "Informe seu e-mail",
                      pattern: {
                        value: EMAIL_REGEX,
                        message: "E-mail inválido",
                      },
                    })}
                  />
                </div>
              </fieldset>

              {/* Intenção */}
              <fieldset>
                <SectionHeading>Você gostaria de:</SectionHeading>
                <Controller
                  control={control}
                  name="intencao"
                  render={({ field }) => (
                    <Segmented
                      value={field.value}
                      onChange={field.onChange}
                      options={[
                        { label: "Vender", value: "vender" },
                        { label: "Alugar", value: "alugar" },
                      ]}
                    />
                  )}
                />
              </fieldset>

              {/* Finalidade + tipo */}
              <fieldset>
                <SectionHeading>Seu imóvel é:</SectionHeading>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <Controller
                    control={control}
                    name="finalidade"
                    render={({ field }) => (
                      <Segmented
                        value={field.value}
                        onChange={field.onChange}
                        options={[
                          { label: "Residencial", value: "residencial" },
                          { label: "Comercial", value: "comercial" },
                        ]}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="tipoImovel"
                    rules={{ required: "Selecione o tipo do imóvel" }}
                    render={({ field, fieldState }) => (
                      <SelectInput
                        label=""
                        placeholder="Tipo do imóvel"
                        isSearchable={false}
                        options={tipoImovelOptions}
                        value={
                          tipoImovelOptions.find(
                            (o) => o.value === field.value,
                          ) ?? null
                        }
                        onSelectOption={(opt) => field.onChange(opt?.value ?? "")}
                        onBlur={field.onBlur}
                        errorMessage={fieldState.error?.message}
                        containerClassName="sm:max-w-md"
                      />
                    )}
                  />
                </div>
              </fieldset>

              {/* Endereço */}
              <fieldset>
                <SectionHeading>Onde fica o imóvel?</SectionHeading>

                <div className="flex flex-wrap items-end gap-3">
                  <Controller
                    control={control}
                    name="cep"
                    rules={
                      cepUnknown
                        ? {}
                        : {
                            required: "Informe o CEP",
                            pattern: {
                              value: /^\d{5}-\d{3}$/,
                              message: "CEP inválido",
                            },
                          }
                    }
                    render={({ field, fieldState }) => (
                      <MaskedTextInput
                        label="CEP"
                        mask="00000-000"
                        placeholder="00000-000"
                        value={field.value}
                        onAcceptValue={field.onChange}
                        onBlur={field.onBlur}
                        disabled={cepUnknown}
                        errorMessage={fieldState.error?.message}
                        containerClassName="max-w-[220px]"
                      />
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setCepUnknown((prev) => !prev);
                      setValue("cep", "");
                    }}
                    className="mb-3 text-sm font-medium text-primary-500 underline underline-offset-4 hover:text-primary-600"
                  >
                    {cepUnknown ? "Informar meu CEP" : "Não sei meu CEP"}
                  </button>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Controller
                    control={control}
                    name="uf"
                    rules={{ required: "UF" }}
                    render={({ field, fieldState }) => (
                      <SelectInput
                        label="UF"
                        placeholder="UF"
                        options={ufOptions}
                        value={
                          ufOptions.find((o) => o.value === field.value) ?? null
                        }
                        onSelectOption={(opt) => field.onChange(opt?.value ?? "")}
                        onBlur={field.onBlur}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="cidade"
                    rules={{ required: "Selecione a cidade" }}
                    render={({ field, fieldState }) => (
                      <SelectInput
                        label="Cidade"
                        placeholder="Cidade"
                        options={cidadeOptions}
                        value={
                          cidadeOptions.find((o) => o.value === field.value) ??
                          null
                        }
                        onSelectOption={(opt) => {
                          field.onChange(opt?.value ?? "");
                          setValue("bairro", "");
                        }}
                        onBlur={field.onBlur}
                        errorMessage={fieldState.error?.message}
                        containerClassName="lg:col-span-1"
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="bairro"
                    rules={{ required: "Selecione o bairro" }}
                    render={({ field, fieldState }) => (
                      <SelectInput
                        label="Bairro"
                        placeholder={
                          selectedCidade
                            ? "Bairro"
                            : "Selecione uma cidade"
                        }
                        isDisabled={!selectedCidade}
                        options={bairroOptions}
                        value={
                          bairroOptions.find((o) => o.value === field.value) ??
                          null
                        }
                        onSelectOption={(opt) => field.onChange(opt?.value ?? "")}
                        onBlur={field.onBlur}
                        errorMessage={fieldState.error?.message}
                        containerClassName="lg:col-span-2"
                      />
                    )}
                  />
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <TextInput
                    label="Endereço"
                    placeholder="Endereço"
                    containerClassName="lg:col-span-2"
                    errorMessage={errors.endereco?.message}
                    {...register("endereco", {
                      required: "Informe o endereço",
                    })}
                  />
                  <TextInput
                    label="Número"
                    type="number"
                    min={0}
                    placeholder="0"
                    errorMessage={errors.numero?.message}
                    {...register("numero", { required: "Nº" })}
                  />
                  <TextInput
                    label="Complemento"
                    placeholder="Complemento"
                    {...register("complemento")}
                  />
                </div>
              </fieldset>

              {/* Dados financeiros */}
              <fieldset>
                <SectionHeading>Dados financeiros</SectionHeading>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Controller
                    control={control}
                    name="preco"
                    rules={{ required: "Informe o preço" }}
                    render={({ field, fieldState }) => (
                      <CurrencyInput
                        id="preco"
                        label="Preço do imóvel"
                        placeholder="R$ 0,00"
                        value={field.value}
                        onValueChange={(v) => field.onChange(v.value)}
                        onBlur={field.onBlur}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="condominio"
                    render={({ field }) => (
                      <CurrencyInput
                        id="condominio"
                        label="Condomínio (R$/mês)"
                        placeholder="R$ 0,00"
                        value={field.value}
                        onValueChange={(v) => field.onChange(v.value)}
                        onBlur={field.onBlur}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="iptu"
                    render={({ field }) => (
                      <CurrencyInput
                        id="iptu"
                        label="IPTU (R$/ano)"
                        placeholder="R$ 0,00"
                        value={field.value}
                        onValueChange={(v) => field.onChange(v.value)}
                        onBlur={field.onBlur}
                      />
                    )}
                  />
                </div>
              </fieldset>

              <div>
                <Button
                  type="submit"
                  label="Enviar imóvel"
                  variant="filled"
                  className="bg-primary-500 px-8 text-white hover:bg-primary-600"
                />
              </div>
            </form>
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
