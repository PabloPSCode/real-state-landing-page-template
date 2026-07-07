export type LandingNavItem = {
  label: string;
  href: string;
  active?: boolean;
};

export type SearchField = {
  id: string;
  label: string;
  placeholder: string;
  kind: "text" | "currency";
};

export type ResidenceLabel =
  | "Pronto para morar"
  | "Oportunidade de investimento"
  | "Novo";

export type FeaturedProperty = {
  id: string;
  /** Selo de destaque exibido sobre a imagem. */
  label: ResidenceLabel;
  /** Referência do imóvel (ex.: "Ref.: 1545"). */
  reference: string;
  /** Tipo de negócio (ex.: "Venda", "Aluguel"). */
  businessType: string;
  /** Tipo do imóvel (ex.: "Apartamento", "Casa", "Cobertura"). */
  propertyType: string;
  /** Título descritivo do imóvel. */
  title: string;
  /** Bairro. */
  neighborhood: string;
  /** Cidade/UF. */
  city: string;
  /** Número de dormitórios. */
  bedrooms: number;
  /** Número de suítes. */
  suites: number;
  /** Número de banheiros. */
  bathrooms: number;
  /** Número de vagas de garagem. */
  garages: number;
  /** Área do imóvel (ex.: "112 m²"). */
  area: string;
  /** Preço formatado para exibição. */
  price: string;
  /** Preço numérico (BRL) — usado para filtros/slider. */
  priceValue: number;
  /** Valor do condomínio (mensal, BRL). */
  condoFee?: number;
  /** IPTU mensal (BRL). */
  iptu?: number;
  /** Código de origem do anúncio. */
  originCode?: string;
  /** Número de visualizações do anúncio. */
  viewsCount?: number;
  /** Galeria de imagens (carrossel + modal em tela cheia). */
  images: string[];
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  avatarPath: string;
  testimonial: string;
};

export type FooterColumn = {
  title: string;
  items: Array<{ label: string; href?: string }>;
};

export type FooterSocialItem = {
  iconName:
    | "instagram"
    | "tiktok"
    | "twitch"
    | "x"
    | "facebook"
    | "youtube"
    | "reddit"
    | "whatsapp"
    | "custom";
  href: string;
};

export const landingPageName = "Glow Imóveis";

export const imageAssets = {
  logo: "/images/real-estate/logo-bruno-repoles.png",
  heroMansion: "/images/real-estate/hero-mansao.jpg",
  bannerBackground: "/images/real-estate/banner-corretor.jpg",
  agentPhoto: "/images/real-estate/corretor-bruno.jpg",
};

export const landingNavItems: LandingNavItem[] = [
  { label: "Início", href: "/#inicio", active: true },
  { label: "Sobre", href: "/sobre" },
  { label: "Negocie seu Imóvel", href: "/negociar" },
  { label: "Financie", href: "/financie" },
];

/** Banco parceiro para simulação de financiamento imobiliário. */
export type FinancingBank = {
  id: string;
  /** Nome exibido no logo. */
  name: string;
  /** Link da simulação (abre em nova aba). */
  simulateUrl: string;
  /** Cor da marca (hex). */
  color: string;
  /** Fundo da marca (hex) — para logos com caixa colorida. */
  background?: string;
};

export const financingBanks: FinancingBank[] = [
  {
    id: "bradesco",
    name: "Bradesco",
    simulateUrl:
      "https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/encontre-seu-credito/simuladores-imoveis.shtm",
    color: "#CC092F",
  },
  {
    id: "santander",
    name: "Santander",
    simulateUrl:
      "https://www.santander.com.br/creditos-e-financiamentos/para-sua-casa/credito-imobiliario",
    color: "#EC0000",
  },
  {
    id: "itau",
    name: "Itaú",
    simulateUrl: "https://credito-imobiliario.itau.com.br/",
    color: "#003399",
    background: "#EC7000",
  },
  {
    id: "banco-do-brasil",
    name: "Banco do Brasil",
    simulateUrl:
      "https://www.bb.com.br/site/pra-voce/financiamentos/imobiliario/",
    color: "#0038A8",
    background: "#FBE128",
  },
  {
    id: "caixa",
    name: "CAIXA",
    simulateUrl:
      "https://www.caixa.gov.br/voce/habitacao/Paginas/default.aspx",
    color: "#0070AF",
  },
  {
    id: "banrisul",
    name: "Banrisul",
    simulateUrl: "https://www.banrisul.com.br/",
    color: "#0067B1",
  },
];

export const heroSearchFields: SearchField[] = [
  { id: "negocio", label: "Negócio", placeholder: "Selecione", kind: "text" },
  {
    id: "tipo-imovel",
    label: "Tipo do Imóvel",
    placeholder: "Selecione",
    kind: "text",
  },
  {
    id: "valor-minimo",
    label: "Valor mínimo",
    placeholder: "R$ 0,00",
    kind: "currency",
  },
  {
    id: "valor-maximo",
    label: "Valor máximo",
    placeholder: "R$ 0,00",
    kind: "currency",
  },
  { id: "cidade", label: "Cidade", placeholder: "Selecione", kind: "text" },
  {
    id: "condominios",
    label: "Condomínios",
    placeholder: "Selecione",
    kind: "text",
  },
];

/** Opção genérica para selects (compatível com SelectInput.Option). */
export type SelectOption = { label: string; value: string };

export const negocioOptions: SelectOption[] = [
  { label: "Comprar", value: "comprar" },
  { label: "Alugar", value: "alugar" },
  { label: "Lançamento", value: "lancamento" },
];

export const tipoImovelOptions: SelectOption[] = [
  { label: "Casa", value: "casa" },
  { label: "Apartamento", value: "apartamento" },
  { label: "Cobertura", value: "cobertura" },
  { label: "Terreno", value: "terreno" },
  { label: "Sala Comercial", value: "sala-comercial" },
  { label: "Chácara", value: "chacara" },
];

export const cidadeOptions: SelectOption[] = [
  { label: "João Monlevade - MG", value: "joao-monlevade" },
  { label: "Belo Horizonte - MG", value: "belo-horizonte" },
  { label: "Nova Era - MG", value: "nova-era" },
  { label: "Itabira - MG", value: "itabira" },
];

/** Unidades federativas (estados brasileiros). */
export const ufOptions: SelectOption[] = [
  { label: "AC", value: "AC" },
  { label: "AL", value: "AL" },
  { label: "AP", value: "AP" },
  { label: "AM", value: "AM" },
  { label: "BA", value: "BA" },
  { label: "CE", value: "CE" },
  { label: "DF", value: "DF" },
  { label: "ES", value: "ES" },
  { label: "GO", value: "GO" },
  { label: "MA", value: "MA" },
  { label: "MT", value: "MT" },
  { label: "MS", value: "MS" },
  { label: "MG", value: "MG" },
  { label: "PA", value: "PA" },
  { label: "PB", value: "PB" },
  { label: "PR", value: "PR" },
  { label: "PE", value: "PE" },
  { label: "PI", value: "PI" },
  { label: "RJ", value: "RJ" },
  { label: "RN", value: "RN" },
  { label: "RS", value: "RS" },
  { label: "RO", value: "RO" },
  { label: "RR", value: "RR" },
  { label: "SC", value: "SC" },
  { label: "SP", value: "SP" },
  { label: "SE", value: "SE" },
  { label: "TO", value: "TO" },
];

/** Bairros disponíveis por cidade (chave = value da cidade). */
export const bairrosByCidade: Record<string, SelectOption[]> = {
  "joao-monlevade": [
    { label: "Teresópolis", value: "teresopolis" },
    { label: "Novo Horizonte", value: "novo-horizonte" },
    { label: "Lourdes", value: "lourdes" },
    { label: "Lucília", value: "lucilia" },
    { label: "Planalto", value: "planalto" },
    { label: "Cruzeiro Celeste", value: "cruzeiro-celeste" },
  ],
  "belo-horizonte": [
    { label: "Savassi", value: "savassi" },
    { label: "Funcionários", value: "funcionarios" },
    { label: "Lourdes", value: "lourdes-bh" },
    { label: "Buritis", value: "buritis" },
  ],
  "nova-era": [
    { label: "Centro", value: "centro-ne" },
    { label: "Alvorada", value: "alvorada" },
  ],
  itabira: [
    { label: "Centro", value: "centro-it" },
    { label: "Areão", value: "areao" },
  ],
};

export const condominioOptions: SelectOption[] = [
  { label: "Residencial Teresópolis", value: "res-teresopolis" },
  { label: "Condomínio Vista Verde", value: "vista-verde" },
  { label: "Alphaville Monlevade", value: "alphaville" },
  { label: "Portal das Montanhas", value: "portal-montanhas" },
];

export const featuredProperties: FeaturedProperty[] = [
  {
    id: "1545",
    label: "Pronto para morar",
    reference: "Ref.: 1545",
    businessType: "Venda",
    propertyType: "Apartamento",
    title: "Apartamento aconchegante no bairro Serra",
    neighborhood: "Serra",
    city: "João Monlevade/MG",
    bedrooms: 2,
    suites: 1,
    garages: 1,
    area: "68 m²",
    price: "R$ 190.000,00",
    priceValue: 190000,
    bathrooms: 1,
    condoFee: 220,
    iptu: 45,
    originCode: "AP1545",
    viewsCount: 37,
    images: [
      "/images/house1/1.png",
      "/images/house1/2.png",
      "/images/house1/3.png",
      "/images/house1/4.png",
    ],
  },
  {
    id: "1548",
    label: "Oportunidade de investimento",
    reference: "Ref.: 1548",
    businessType: "Venda",
    propertyType: "Casa",
    title: "Casa com quintal amplo e ótima localização",
    neighborhood: "Centro",
    city: "João Monlevade/MG",
    bedrooms: 2,
    suites: 1,
    garages: 2,
    area: "120 m²",
    price: "R$ 260.000,00",
    priceValue: 260000,
    bathrooms: 2,
    condoFee: 0,
    iptu: 60,
    originCode: "CA1548",
    viewsCount: 24,
    images: [
      "/images/house2/1.png",
      "/images/house2/2.png",
      "/images/house2/3.png",
      "/images/house2/4.png",
    ],
  },
  {
    id: "180",
    label: "Novo",
    reference: "Ref.: 180",
    businessType: "Venda",
    propertyType: "Casa",
    title: "Casa de alto padrão planejada para toda a família",
    neighborhood: "Lourdes",
    city: "João Monlevade/MG",
    bedrooms: 4,
    suites: 2,
    garages: 2,
    area: "295 m²",
    price: "R$ 1.250.000,00",
    priceValue: 1250000,
    bathrooms: 3,
    condoFee: 0,
    iptu: 120,
    originCode: "CA0180",
    viewsCount: 51,
    images: [
      "/images/house3/1.png",
      "/images/house3/2.png",
      "/images/house3/3.png",
      "/images/house3/4.png",
      "/images/house3/5.png",
    ],
  },
  {
    id: "196",
    label: "Pronto para morar",
    reference: "Ref.: 196",
    businessType: "Venda",
    propertyType: "Casa",
    title: "Casa alto padrão em Lucília",
    neighborhood: "Lucília",
    city: "João Monlevade/MG",
    bedrooms: 3,
    suites: 1,
    garages: 2,
    area: "99 m²",
    price: "R$ 349.000,00",
    priceValue: 349000,
    bathrooms: 2,
    condoFee: 0,
    iptu: 55,
    originCode: "CA0196",
    viewsCount: 29,
    images: [
      "/images/house4/1.png",
      "/images/house4/2.png",
      "/images/house4/3.png",
      "/images/house4/4.png",
    ],
  },
  {
    id: "210",
    label: "Oportunidade de investimento",
    reference: "Ref.: 210",
    businessType: "Venda",
    propertyType: "Cobertura",
    title: "Cobertura com área gourmet e vista panorâmica",
    neighborhood: "Planalto",
    city: "João Monlevade/MG",
    bedrooms: 3,
    suites: 2,
    garages: 2,
    area: "188 m²",
    price: "R$ 690.000,00",
    priceValue: 690000,
    bathrooms: 3,
    condoFee: 380,
    iptu: 95,
    originCode: "CO0210",
    viewsCount: 42,
    images: [
      "/images/house5/1.png",
      "/images/house5/2.png",
      "/images/house5/3.png",
      "/images/house5/4.png",
    ],
  },
  {
    id: "221",
    label: "Novo",
    reference: "Ref.: 221",
    businessType: "Venda",
    propertyType: "Casa",
    title: "Casa térrea com quintal amplo para receber a família",
    neighborhood: "Cruzeiro Celeste",
    city: "João Monlevade/MG",
    bedrooms: 3,
    suites: 1,
    garages: 3,
    area: "174 m²",
    price: "R$ 620.000,00",
    priceValue: 620000,
    bathrooms: 2,
    condoFee: 0,
    iptu: 70,
    originCode: "CA0221",
    viewsCount: 33,
    images: [
      "/images/house6/1.png",
      "/images/house6/2.png",
    ],
  },
  {
    id: "3012",
    label: "Pronto para morar",
    reference: "Ref.: 3012",
    businessType: "Aluguel",
    propertyType: "Apartamento",
    title: "Apartamento mobiliado para locação no Centro",
    neighborhood: "Centro",
    city: "João Monlevade/MG",
    bedrooms: 2,
    suites: 1,
    garages: 1,
    area: "62 m²",
    price: "R$ 1.800,00/mês",
    priceValue: 1800,
    bathrooms: 2,
    condoFee: 150,
    iptu: 30,
    originCode: "AP3012",
    viewsCount: 53,
    images: [
      "/images/house4/1.png",
      "/images/house4/2.png",
      "/images/house4/3.png",
      "/images/house4/4.png",
    ],
  },
  {
    id: "3048",
    label: "Novo",
    reference: "Ref.: 3048",
    businessType: "Aluguel",
    propertyType: "Casa",
    title: "Casa ampla para locação com quintal",
    neighborhood: "Planalto",
    city: "João Monlevade/MG",
    bedrooms: 3,
    suites: 1,
    garages: 2,
    area: "150 m²",
    price: "R$ 2.500,00/mês",
    priceValue: 2500,
    bathrooms: 2,
    condoFee: 0,
    iptu: 40,
    originCode: "CA3048",
    viewsCount: 18,
    images: [
      "/images/house5/1.png",
      "/images/house5/2.png",
      "/images/house5/3.png",
      "/images/house5/4.png",
    ],
  },
];

/** Busca um imóvel pelo id. */
export function getResidenceById(id: string): FeaturedProperty | undefined {
  return featuredProperties.find((property) => property.id === id);
}

export const testimonials: Testimonial[] = [
  {
    id: "juliana",
    name: "Juliana",
    role: "Empresária",
    avatarPath: "/images/avatar-juliana.jpg",
    testimonial:
      "Atendimento diferenciado do início ao fim, com clareza e segurança em cada etapa da compra do nosso imóvel.",
  },
  {
    id: "pedro",
    name: "Pedro",
    role: "Engenheiro Civil",
    avatarPath: "/images/avatar-pedro.jpg",
    testimonial:
      "Equipe muito atenciosa, sempre disponível para tirar dúvidas. Todo o processo foi ágil e transparente.",
  },
  {
    id: "henrique",
    name: "Henrique",
    role: "Arquiteto",
    avatarPath: "/images/avatar-henrique.jpg",
    testimonial:
      "Encontramos uma casa com o perfil que buscávamos para a família. Recomendo pela qualidade do suporte.",
  },
];

export const agentProfile = {
  name: "Glow Imóveis",
  subtitle:
    "Procurando um imóvel?",
  creci: "CRECI: MGF 032735 | PJ 9320",
  phone: "(31) 91234-1234",
  email: "contato@brunorepolesimoveis.com.br",
  website: "www.brunorepolesimoveis.com.br",
  address:
    "Rua das flores, nº 96, Nossa Senhora da Conceição - João Monlevade - MG",
};

export const footerColumns: FooterColumn[] = [
  {
    title: "Glow",
    items: [
      {
        label:
          "Rua das flores, (31) 91234-1234 - Nossa Senhora da Conceição, João Monlevade - MG",
      },
      { label: "(31) 91234-1234", href: "tel:+5531912341234" },
    ],
  },
  {
    title: "Menu",
    items: [
      { label: "Início", href: "/#inicio" },
      { label: "Sobre", href: "/sobre" },
      { label: "Negocie seu Imóvel", href: "/negociar" },
      { label: "Financie", href: "/financie" },
      { label: "Contato", href: "/sobre#contato" },
    ],
  },
  {
    title: "Social",
    items: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "TikTok", href: "https://tiktok.com" },
      { label: "WhatsApp", href: "https://wa.me/5531912341234" },
    ],
  },
];

export const footerSocialItems: FooterSocialItem[] = [
  { iconName: "instagram", href: "https://instagram.com" },
  { iconName: "tiktok", href: "https://tiktok.com" },
  { iconName: "whatsapp", href: "https://wa.me/5531912341234" },
];
