import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { useState } from "react";
import { StudentCardWrapper } from "./StudentCardWrapper";
import type { StudentCardProps } from "../StudentCard/StudentCard";

const meta = {
  title: "Organisms/StudentCardWrapper",
  component: StudentCardWrapper,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    studentsArray: { control: "object" },
    onChange: { table: { disable: true } },
  },
  args: {
    onChange: action("onChange"),
  },
} satisfies Meta<typeof StudentCardWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultStudents: Omit<StudentCardProps, "onChange">[] = [
  {
    studentName: "Ana Novak",
    studentId: "12345",
    gradesArray: [
      {
        id: "ocena-1",
        points: { value: "" },
        grade: { value: "" },
        labelText: "Točke 0",
        hasError: false,
        inputEnabled: true,
      },
    ],
  },
  {
    studentName: "Jure Kovač",
    studentId: "67890",
    gradesArray: [
      {
        id: "ocena-2",
        points: { value: "" },
        grade: { value: "" },
        labelText: "Točke 0",
        hasError: false,
        inputEnabled: true,
      },
    ],
  },
];

export const Default: Story = {
  args: {
    studentsArray: defaultStudents,
  },
  render: (args) => {
    const [studentsArray, setStudentsArray] = useState(args.studentsArray);

    return (
      <StudentCardWrapper
        {...args}
        studentsArray={studentsArray}
        onChange={(studentId, index, { value, type }) => {
          action("onChange")(studentId, index, value, type);
          setStudentsArray((prev) =>
            prev.map((student) => {
              if (student.studentId !== studentId) return student;
              return {
                ...student,
                gradesArray: student.gradesArray.map((grade, i) => {
                  if (i !== index) return grade;
                  return type === "radio"
                    ? { ...grade, grade: { ...grade.grade, value } }
                    : { ...grade, points: { ...grade.points, value } };
                }),
              };
            }),
          );
        }}
      />
    );
  },
};
