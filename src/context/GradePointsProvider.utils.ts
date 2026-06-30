import type { StudentGradeValue } from "../components/Templates/StudentPointsAndGrades/StudentPointsAndGrades.types";
import type { ValidationResult } from "../functions/validation";

export const defaultStudentEntry: StudentGradeValue = {
  points: "",
  grade: "",
  validationText: undefined,
  valsWithError: [],
};

export const applyNewEntryValidation = (
  newEntry: StudentGradeValue,
  validation: ValidationResult,
) => {
  newEntry.validationText = validation.message ?? [];
  newEntry.valsWithError = validation.issues ?? [];
};
