import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { useArgs } from "storybook/preview-api";
import { RadioLabel } from "./RadioLabel";

const meta = {
  title: "Atoms/RadioLabel",
  component: RadioLabel,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    labelText: { control: "text" },
    id: { control: "text" },
    checked: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
  args: {
    onChange: action("onChange"),
  },
} satisfies Meta<typeof RadioLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labelText: "Option A",
    id: "option-a",
    checked: false,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return (
      <RadioLabel
        {...args}
        onChange={() => {
          updateArgs({ checked: !args.checked });
          action("onChange")();
        }}
      />
    );
  },
};
