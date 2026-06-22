import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { useArgs } from "storybook/preview-api";
import { ToggleLabel } from "./ToggleLabel";

const meta = {
  title: "Atoms/ToggleLabel",
  component: ToggleLabel,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    labelText: { control: "text" },
    validationText: { control: "text" },
    checked: { table: { disable: true } },
    id: { control: "text" },
    onChange: { table: { disable: true } },
  },
  args: {
    onChange: action("onChange"),
  },
} satisfies Meta<typeof ToggleLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labelText: "Enable feature",
    checked: false,
    validationText: "",
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return (
      <ToggleLabel
        {...args}
        onChange={() => {
          updateArgs({ checked: !args.checked });
          action("onChange")(args.checked);
        }}
      />
    );
  },
};
