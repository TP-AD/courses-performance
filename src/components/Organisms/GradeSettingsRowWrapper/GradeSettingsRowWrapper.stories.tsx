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
    toggleLabel: "Ocena 1",
    passLabel: "Min točke",
    passPlaceholder: "0",
    maxLabel: "Max točke",
    maxPlaceholder: "100",
    checked: false,
    passValue: "",
    maxValue: "",
    pointsLabel: "Točke 1",
    validationText: "",
  },
  {
    id: "ocena-2",
    toggleLabel: "Ocena 2",
    passLabel: "Min točke",
    passPlaceholder: "0",
    maxLabel: "Max točke",
    maxPlaceholder: "50",
    checked: false,
    passValue: "",
    maxValue: "",
    pointsLabel: "Točke 2",
    validationText: "",
  },
  {
    id: "ocena-3",
    toggleLabel: "Ocena 3",
    passLabel: "Min točke",
    passPlaceholder: "0",
    maxLabel: "Max točke",
    maxPlaceholder: "200",
    checked: false,
    passValue: "",
    maxValue: "",
    pointsLabel: "Točke 3",
    validationText: "",
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
