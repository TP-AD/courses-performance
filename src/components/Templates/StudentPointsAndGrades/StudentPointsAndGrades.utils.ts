import type { PathType } from "../../../functions/validation";
import type { GradeSettingsRowType } from "../../Organisms/GradeSettingsRowWrapper/GradeSettingsRowWrapper";
import type {
  StudentConfigType,
  StudentGradeValue,
} from "./StudentPointsAndGrades.types";

//typeguard fn
export const assertIssueKey = (issue: PathType): issue is "pass" | "max" => {
  return !["settings", "entry"].includes(issue);
};

export const buildStudentVals = (
  studentsConfig: StudentConfigType[],
  rowValues: GradeSettingsRowType[],
  gradeValues: Record<string, StudentGradeValue[]>,
) => {
  return studentsConfig.map((student) => ({
    ...student,
    gradesArray: rowValues.map((row, i) => ({
      id: row.id, // same id everywhere - problem
      value: "",
      points: {
        value: gradeValues[student.studentId]?.[i].points.value ?? "",
        hasError: gradeValues[student.studentId]?.[i].points.hasError ?? false,
      },
      grade: {
        value: gradeValues[student.studentId]?.[i].grade.value ?? "",
        hasError: gradeValues[student.studentId]?.[i].grade.hasError ?? false,
      },
      labelText: row.pointsLabel,
      hasError: false,
      inputEnabled: row.checked,
      validationText:
        gradeValues[student.studentId]?.[i].validationText ?? undefined,
    })),
  }));
};
