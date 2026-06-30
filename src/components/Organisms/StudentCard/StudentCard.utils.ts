import type { GradeValueType } from "../../../functions/validation";

export type gradeOptionsType = {
  value: GradeValueType;
  labelText: string;
};

export const defaultGradeOptions: gradeOptionsType[] = [
  {
    value: `ni-pristopil`,
    labelText: "Ni pristopil",
  },
  {
    value: `grade-5`,
    labelText: "5",
  },
  { value: `grade-6`, labelText: "6" },
  { value: `grade-7`, labelText: "7" },
  { value: `grade-8`, labelText: "8" },
  { value: `grade-9`, labelText: "9" },
  { value: `grade-10`, labelText: "10" },
];
