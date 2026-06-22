import type { Meta, StoryObj } from "@storybook/react-vite";
import { ValidationText } from "./ValidationText";

const meta = {
  title: "Atoms/ValidationText",
  component: ValidationText,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    text: { control: "text" },
  },
} satisfies Meta<typeof ValidationText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: ["This field is required."],
  },
};
