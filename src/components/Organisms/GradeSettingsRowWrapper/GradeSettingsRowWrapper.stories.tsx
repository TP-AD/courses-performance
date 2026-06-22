import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { useState } from "react";
import {
  GradeSettingsRowWrapper,
  type GradeSettingsRowType,
} from "./GradeSettingsRowWrapper";
import type { GradeSettingsRowChange } from "../../Molecules/GradeSettingsRow/GradeSettingsRow";

const meta = {
  title: "Organisms/GradeSettingsRowWrapper",
  component: GradeSettingsRowWrapper,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    gradeSettingsRowArray: { control: "object" },
    onChange: { table: { disable: true } },
  },
  args: {
    onChange: action("onChange"),
  },
} satisfies Meta<typeof GradeSettingsRowWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultRows: GradeSettingsRowType[] = [
  {
    id: "ocena-1",
    toggleData: {
      labelText: "Ocena 1",
    },
    passData: {
      labelText: "Min točke",
      inputPlaceholder: "0",
      inputValue: "",
      hasError: false,
    },
    maxData: {
      labelText: "Max točke",
      inputPlaceholder: "100",
      inputValue: "",
      hasError: false,
    },
    checked: false,
    pointsLabel: "Točke 1",
    validationText: undefined,
  },
  {
    id: "ocena-2",
    toggleData: {
      labelText: "Ocena 2",
    },
    passData: {
      labelText: "Min točke",
      inputPlaceholder: "0",
      inputValue: "",
      hasError: false,
    },
    maxData: {
      labelText: "Max točke",
      inputPlaceholder: "100",
      inputValue: "",
      hasError: false,
    },
    checked: false,
    pointsLabel: "Točke 2",
    validationText: undefined,
  },
  {
    id: "ocena-3",
    toggleData: {
      labelText: "Ocena 3",
    },
    passData: {
      labelText: "Min točke",
      inputPlaceholder: "0",
      inputValue: "",
      hasError: false,
    },
    maxData: {
      labelText: "Max točke",
      inputPlaceholder: "100",
      inputValue: "",
      hasError: false,
    },
    checked: false,
    pointsLabel: "Točke 3",
    validationText: undefined,
  },
];

export const Default: Story = {
  args: {
    gradeSettingsRowArray: defaultRows,
  },
  render: (args) => {
    const [rows, setRows] = useState<GradeSettingsRowType[]>(
      args.gradeSettingsRowArray,
    );

    const handleChange = (index: number, change: GradeSettingsRowChange) => {
      action("onChange")(index, change);
      setRows((prev) =>
        prev.map((row, i) => {
          if (i !== index) return row;
          if (change.field === "toggle")
            return { ...row, checked: change.value };
          if (change.field === "passInput")
            return { ...row, passValue: change.value };
          return { ...row, maxValue: change.value };
        }),
      );
    };

    return (
      <GradeSettingsRowWrapper
        gradeSettingsRowArray={rows}
        onChange={handleChange}
      />
    );
  },
};
