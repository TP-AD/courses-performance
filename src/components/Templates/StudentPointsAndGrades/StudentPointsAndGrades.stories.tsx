import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { StudentPointsAndGrades } from "./StudentPointsAndGrades";

const meta = {
  title: "Templates/StudentPointsAndGrades",
  component: StudentPointsAndGrades,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    showValidation: { control: "boolean" },
    rowsConfig: { control: "object" },
    gradesConfig: { control: "object" },
    studentsConfig: { control: "object" },
    onRowChange: { table: { disable: true } },
    onCardChange: { table: { disable: true } },
  },
  args: {
    showValidation: true,
    onRowChange: action("onRowChange"),
    onCardChange: action("onCardChange"),
  },
} satisfies Meta<typeof StudentPointsAndGrades>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rowsConfig: [
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
        pointsLabel: "Ocena 1",
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

        pointsLabel: "Ocena 2",
        validationText: undefined,
      },
    ],
    gradesConfig: {
      "12345": [
        { points: { value: "" }, grade: { value: "" } },
        { points: { value: "" }, grade: { value: "" } },
      ],
      "67890": [
        { points: { value: "" }, grade: { value: "" } },
        { points: { value: "" }, grade: { value: "" } },
      ],
    },
    studentsConfig: [
      { studentName: "Ana Novak", studentId: "12345" },
      { studentName: "Jure Kovač", studentId: "67890" },
    ],
  },
};
