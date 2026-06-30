import type { Simplify } from "type-fest";
import type { InputLabelProps } from "../../Atoms/InputLabel/InputLabel";
import type { GradeValueType } from "../../../functions/validation";
import type { StudentGradeValue } from "../../Templates/StudentPointsAndGrades/StudentPointsAndGrades.types";

export type GradeType = {
  value: GradeValueType;
  hasError?: boolean;
};

export type StudentGradeEntryRow = Simplify<
  Omit<InputLabelProps, "onChange" | "onBlur" | "inputValue" | "hasError">
> &
  StudentGradeValue & {
    inputEnabled: boolean;
  };
