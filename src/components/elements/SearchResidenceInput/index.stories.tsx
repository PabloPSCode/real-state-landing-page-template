import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  bairrosByCidade,
  cidadeOptions,
  condominioOptions,
  negocioOptions,
  tipoImovelOptions,
} from "@/mocks/realEstateHome";
import SearchResidenceInput from ".";

const meta: Meta<typeof SearchResidenceInput> = {
  title: "Elements/SearchResidenceInput",
  component: SearchResidenceInput,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    title: "Encontre o seu imóvel ideal",
    referenceLabel: "Referência",
    referenceHref: "#",
    negocioOptions,
    tipoOptions: tipoImovelOptions,
    cidadeOptions,
    bairrosByCidade,
    condominioOptions,
    priceMin: 1800,
    priceMax: 1250000,
  },
  argTypes: {
    onSearch: { action: "search" },
  },
};

export default meta;
type Story = StoryObj<typeof SearchResidenceInput>;

export const Default: Story = {};

export const OnDarkBackground: Story = {
  decorators: [
    (Story) => (
      <div className="flex justify-center bg-[#14110f] p-8">
        <Story />
      </div>
    ),
  ],
};
