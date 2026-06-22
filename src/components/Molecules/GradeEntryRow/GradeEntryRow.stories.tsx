import type { ArgTypes, Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { useState } from "react";
import { GradeEntryRow } from "./GradeEntryRow";

const gradeOptions = [
  { id: "ni-pristopil", value: "ni-pristopil", labelText: "Ni pristopil" },
  { id: "grade-5", value: "grade-5", labelText: "5" },
  { id: "grade-6", value: "grade-6", labelText: "6" },
  { id: "grade-7", value: "grade-7", labelText: "7" },
  { id: "grade-8", value: "grade-8", labelText: "8" },
  { id: "grade-9", value: "grade-9", labelText: "9" },
  { id: "grade-10", value: "grade-10", labelText: "10" },
];

const meta = {
  title: "Molecules/GradeEntryRow",
  component: GradeEntryRow,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    pointsHasError: { control: "boolean" },
    gradeHasError: { control: "boolean" },
    inputEnabled: { control: "boolean" },
    studentGradeRow: { control: "object" },
    onChange: { table: { disable: true } },
  } as ArgTypes,
} satisfies Meta<typeof GradeEntryRow>;

export default meta;
type Story = StoryObj<typeof meta>;
type StoryWithExtraControls = Omit<Story, "args"> & {
  args: NonNullable<Story["args"]> & {
    pointsHasError?: boolean;
    gradeHasError?: boolean;
    inputEnabled?: boolean;
  };
};

export const Default: StoryWithExtraControls = {
  args: {
    groupName: "grade-entry",
    gradeOptions,
    studentGradeRow: {
      id: "ocena",
      labelText: "Točke",
      inputPlaceholder: "0",
      inputEnabled: true,
      points: { value: "" },
      grade: { value: "" },
    },
    pointsHasError: false,
    gradeHasError: false,
    inputEnabled: true,
    onChange: action("onChange"),
  },
  render: (args) => {
    const { pointsHasError, gradeHasError, inputEnabled } = args as typeof args & {
      pointsHasError: boolean;
      gradeHasError: boolean;
      inputEnabled: boolean;
    };
    const [studentGradeRow, setStudentGradeRow] = useState(
      args.studentGradeRow,
    );

    return (
      <GradeEntryRow
        {...args}
        studentGradeRow={{
          ...studentGradeRow,
          inputEnabled,
          points: { ...studentGradeRow.points, hasError: pointsHasError },
          grade: { ...studentGradeRow.grade, hasError: gradeHasError },
        }}
        onChange={(value, type) => {
          action("onChange")(value, type);
          if (type === "input") {
            setStudentGradeRow((prev) => ({
              ...prev,
              points: { ...prev.points, value },
            }));
          } else {
            setStudentGradeRow((prev) => ({
              ...prev,
              grade: { ...prev.grade, value },
            }));
          }
        }}
      />
    );
  },
};
