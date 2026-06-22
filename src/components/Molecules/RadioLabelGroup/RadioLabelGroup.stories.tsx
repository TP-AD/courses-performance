import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { useArgs } from "storybook/preview-api";
import { RadioLabelGroup } from "./RadioLabelGroup";

const meta = {
  title: "Molecules/RadioLabelGroup",
  component: RadioLabelGroup,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    gradeOptions: { control: "object" },
    activeRadioId: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
  args: {
    onChange: action("onChange"),
  },
} satisfies Meta<typeof RadioLabelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gradeOptions: [
      { id: "option-a", labelText: "Option A" },
      { id: "option-b", labelText: "Option B" },
      { id: "option-c", labelText: "Option C" },
    ],
    activeRadioId: "option-a",
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return (
      <RadioLabelGroup
        {...args}
        onChange={(selectedRadioId) => {
          updateArgs({ activeRadioId: selectedRadioId });
          action("onChange")(selectedRadioId);
        }}
      />
    );
  },
};
