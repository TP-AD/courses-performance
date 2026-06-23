import type { Simplify } from "type-fest";
import type { InputLabelProps } from "../../Atoms/InputLabel/InputLabel";

export type GradePointsType = {
  value: string;
  hasError?: boolean;
};

export type StudentGradeEntryRow = Simplify<
  Omit<InputLabelProps, "onChange" | "onBlur" | "inputValue" | "hasError">
> & {
  points: GradePointsType;
  grade: GradePointsType;
  inputEnabled: boolean;
};
