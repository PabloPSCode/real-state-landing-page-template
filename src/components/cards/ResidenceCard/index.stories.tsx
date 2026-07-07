import type { Meta, StoryObj } from "@storybook/react-vite";
import ResidenceCard from ".";

const meta: Meta<typeof ResidenceCard> = {
  title: "Cards/ResidenceCard",
  component: ResidenceCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: { onToggleFavorite: { action: "toggle-favorite" } },
};

export default meta;
type Story = StoryObj<typeof ResidenceCard>;

export const Default: Story = {
  args: {
    residence: {
      id: "1545",
      label: "Pronto para morar",
      reference: "Ref.: 1545",
      businessType: "Venda",
      propertyType: "Apartamento",
      neighborhood: "Serra",
      city: "João Monlevade/MG",
      bedrooms: 2,
      garages: 1,
      area: "68 m²",
      price: "R$ 190.000,00",
      images: [
        "/images/house1/1.png",
        "/images/house1/2.png",
        "/images/house1/3.png",
        "/images/house1/4.png",
      ],
    },
  },
};

export const InvestmentOpportunity: Story = {
  args: {
    residence: {
      id: "1548",
      label: "Oportunidade de investimento",
      reference: "Ref.: 1548",
      businessType: "Venda",
      propertyType: "Casa",
      neighborhood: "Centro",
      city: "João Monlevade/MG",
      bedrooms: 2,
      garages: 2,
      area: "120 m²",
      price: "R$ 260.000,00",
      images: ["/images/house2/1.png", "/images/house2/2.png"],
    },
  },
};
