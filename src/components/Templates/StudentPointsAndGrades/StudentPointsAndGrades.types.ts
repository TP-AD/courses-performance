import type { GradePointsType } from "../../Organisms/StudentCard/StudentCard";

export type ErrorKey = "passHasError" | "maxHasError";
export type StudentGradeValue = {
  points: GradePointsType;
  grade: GradePointsType;
  validationText?: string[];
};

export type StudentConfigType = {
  studentName: string;
  studentId: string;
};
