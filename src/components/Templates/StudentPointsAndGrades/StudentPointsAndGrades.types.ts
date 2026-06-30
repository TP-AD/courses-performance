import type { GradeValueType, PathType } from "../../../functions/validation";

export type StudentGradeValue = {
  points: string;
  grade: GradeValueType;
  validationText?: string[];
  valsWithError: PathType[];
};

export type StudentConfigType = {
  studentName: string;
  studentId: string;
};
