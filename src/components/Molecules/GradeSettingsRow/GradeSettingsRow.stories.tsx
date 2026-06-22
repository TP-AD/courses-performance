import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { useState } from "react";
import {
  GradeSettingsRow,
  type GradeSettingsRowChange,
} from "./GradeSettingsRow";

const meta = {
  title: "Molecules/GradeSettingsRow",
  component: GradeSettingsRow,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    validationText: { control: "text" },
    toggle: { control: "object" },
    passInput: { control: "object" },
    maxInput: { control: "object" },
    onChange: { table: { disable: true } },
  },
} satisfies Meta<typeof GradeSettingsRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    toggle: { labelText: "Enable", checked: false },
    passInput: {
      labelText: "Min points",
      inputValue: "",
      inputPlaceholder: "0",
      hasError: false,
    },
    maxInput: {
      labelText: "Max points",
      inputValue: "",
      inputPlaceholder: "100",
      hasError: false,
    },
    validationText: "",
    onChange: action("onChange"),
  },
  render: (args) => {
    const [toggle, setToggle] = useState(args.toggle);
    const [passInput, setPassInput] = useState(args.passInput);
    const [maxInput, setMaxInput] = useState(args.maxInput);

    const handleChange = (change: GradeSettingsRowChange) => {
      action("onChange")(change);
      if (change.field === "toggle")
        setToggle({ ...toggle, checked: change.value });
      if (change.field === "passInput")
        setPassInput({ ...passInput, inputValue: change.value });
      if (change.field === "maxInput")
        setMaxInput({ ...maxInput, inputValue: change.value });
    };

    return (
      <GradeSettingsRow
        {...args}
        toggle={toggle}
        passInput={passInput}
        maxInput={maxInput}
        onChange={handleChange}
      />
    );
  },
};
