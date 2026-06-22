import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { InputLabel } from "./InputLabel";

const meta = {
  title: "Atoms/InputLabel",
  component: InputLabel,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    hasError: { control: "boolean" },
    enabled: { control: "boolean" },
    required: { control: "boolean" },
    inputValue: { control: "text" },
    inputPlaceholder: { control: "text" },
    labelText: { control: "text" },
    validationText: { control: "object" },
    id: { control: "text" },
    onBlur: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
  args: {
    onBlur: action("onBlur"),
    onChange: action("onChange"),
  },
} satisfies Meta<typeof InputLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "inputLabel",
    labelText: "Enter value",
    inputValue: "hellp",
    inputPlaceholder: "Some value",
    hasError: false,
    enabled: true,
    required: false,
    validationText: undefined,
  },
};
