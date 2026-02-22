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

export type FeaturedProperty = {
  id: string;
  status: string;
  imagePath: string;
  reference: string;
  businessType: string;
  neighborhood: string;
  city: string;
  title: string;
  bedrooms: number;
  suites: number;
  garages: number;
  builtArea: string;
  privateArea?: string;
  price: string;
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

export const landingPageName = "João Doe Imóveis";

export const imageAssets = {
  logo: "/images/real-estate/logo-bruno-repoles.png",
  heroMansion: "/images/real-estate/hero-mansao.jpg",
  bannerBackground: "/images/real-estate/banner-corretor.jpg",
  agentPhoto: "/images/real-estate/corretor-bruno.jpg",
};

export const landingNavItems: LandingNavItem[] = [
  { label: "Início", href: "#inicio", active: true },
  { label: "Sobre", href: "#sobre" },
  { label: "Negocie seu imóvel", href: "#negocie" },
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

export const featuredProperties: FeaturedProperty[] = [
  {
    id: "160",
    status: "Pronto para morar",
    imagePath: "/images/house1.jpg",
    reference: "Ref.: 160",
    businessType: "Venda",
    neighborhood: "Teresópolis",
    city: "João Monlevade - MG",
    title: "Casa em Teresópolis, João Monlevade/MG",
    bedrooms: 4,
    suites: 1,
    garages: 6,
    builtArea: "211 m²",
    privateArea: "180 m²",
    price: "R$ 750.000,00",
  },
  {
    id: "198",
    status: "Pronto para morar",
    imagePath: "/images/house2.jpg",
    reference: "Ref.: 198",
    businessType: "Venda",
    neighborhood: "Novo Horizonte",
    city: "João Monlevade - MG",
    title: "Casa com piscina e área de lazer completa",
    bedrooms: 3,
    suites: 1,
    garages: 1,
    builtArea: "112,33 m²",
    privateArea: "94 m²",
    price: "R$ 530.000,00",
  },
  {
    id: "180",
    status: "Pronto para morar",
    imagePath: "/images/house3.jpg",
    reference: "Ref.: 180",
    businessType: "Venda",
    neighborhood: "Lourdes",
    city: "João Monlevade - MG",
    title: "Casa de alto padrão planejada para toda a família",
    bedrooms: 4,
    suites: 2,
    garages: 2,
    builtArea: "295 m²",
    privateArea: "250 m²",
    price: "R$ 1.250.000,00",
  },
  {
    id: "196",
    status: "Pronto para morar",
    imagePath: "/images/house4.jpg",
    reference: "Ref.: 196",
    businessType: "Venda",
    neighborhood: "Lucília",
    city: "João Monlevade - MG",
    title: "Casa alto padrão em Lucília, João Monlevade/MG",
    bedrooms: 3,
    suites: 1,
    garages: 2,
    builtArea: "99 m²",
    privateArea: "89 m²",
    price: "R$ 349.000,00",
  },
  {
    id: "210",
    status: "Pronto para morar",
    imagePath: "/images/house5.jpg",
    reference: "Ref.: 210",
    businessType: "Venda",
    neighborhood: "Planalto",
    city: "João Monlevade - MG",
    title: "Cobertura com área gourmet e vista panorâmica",
    bedrooms: 3,
    suites: 2,
    garages: 2,
    builtArea: "188 m²",
    privateArea: "162 m²",
    price: "R$ 690.000,00",
  },
  {
    id: "221",
    status: "Pronto para morar",
    imagePath: "/images/house6.jpg",
    reference: "Ref.: 221",
    businessType: "Venda",
    neighborhood: "Cruzeiro Celeste",
    city: "João Monlevade - MG",
    title: "Casa térrea com quintal amplo para receber a família",
    bedrooms: 3,
    suites: 1,
    garages: 3,
    builtArea: "174 m²",
    privateArea: "150 m²",
    price: "R$ 620.000,00",
  },
];

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
  name: "João Doe Imóveis",
  subtitle:
    "Cada imóvel tem uma história. Aqui, ajudamos você a escrever a sua.",
  creci: "CRECI: MGF 032735 | PJ 9320",
  phone: "(31) 91234-1234",
  email: "contato@brunorepolesimoveis.com.br",
  website: "www.brunorepolesimoveis.com.br",
  address:
    "Rua das flores, nº 96, Nossa Senhora da Conceição - João Monlevade - MG",
};

export const footerColumns: FooterColumn[] = [
  {
    title: "João Doe",
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
      { label: "Início", href: "#inicio" },
      { label: "Sobre", href: "#sobre" },
      { label: "Contato", href: "#contato" },
      { label: "Negocie seu imóvel", href: "#negocie" },
      { label: "Negocie seu Imóvel", href: "#negocie" },
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
