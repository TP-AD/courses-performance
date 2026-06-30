import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { useState } from "react";
import { StudentCard } from "./StudentCard";

const meta = {
  title: "Organisms/StudentCard",
  component: StudentCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    studentName: { control: "text" },
    studentId: { control: "text" },
    gradesArray: { control: "object" },
    onChange: { table: { disable: true } },
  },
  args: {
    onChange: action("onChange"),
  },
} satisfies Meta<typeof StudentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    studentName: "Ana Novak",
    studentId: "12345",
    gradesArray: [
      {
        id: "ocena",
        points: {
          value: "",
        },
        grade: {
          value: "",
        },
        inputPlaceholder: "0",
        labelText: "Točke 0",
        inputEnabled: true,
      },
    ],
  },
  render: (args) => {
    const [gradesArray, setGradesArray] = useState(args.gradesArray);

    return (
      <StudentCard
        {...args}
        gradesArray={gradesArray}
        onChange={(index, value, type) => {
          action("onChange")(index, value, type);
          if (type === "input") {
            setGradesArray((prev) =>
              prev.map((grade, i) =>
                i === index
                  ? { ...grade, points: { ...grade.points, value } }
                  : grade,
              ),
            );
          } else {
            setGradesArray((prev) =>
              prev.map((grade, i) =>
                i === index
                  ? { ...grade, grade: { ...grade.grade, value } }
                  : grade,
              ),
            );
          }
        }}
      />
    );
  },
};

export const MultipleGrades: Story = {
  args: {
    studentName: "Ana Novak",
    studentId: "12345",
    gradesArray: [
      {
        id: "ocena-1",
        points: { value: "" },
        grade: { value: "" },
        inputPlaceholder: "0",
        labelText: "Točke 0",
        inputEnabled: true,
      },
      {
        id: "ocena-2",
        points: { value: "" },
        grade: { value: "" },
        inputPlaceholder: "0",
        labelText: "Točke 1",
        inputEnabled: true,
      },
    ],
  },
  render: (args) => {
    const [gradesArray, setGradesArray] = useState(args.gradesArray);

    return (
      <StudentCard
        {...args}
        gradesArray={gradesArray}
        onChange={(index, value, type) => {
          action("onChange")(index, value, type);
          if (type === "input") {
            setGradesArray((prev) =>
              prev.map((grade, i) =>
                i === index
                  ? { ...grade, points: { ...grade.points, value } }
                  : grade,
              ),
            );
          } else {
            setGradesArray((prev) =>
              prev.map((grade, i) =>
                i === index
                  ? { ...grade, grade: { ...grade.grade, value } }
                  : grade,
              ),
            );
          }
        }}
      />
    );
  },
};
