import type { PathType } from "../../../functions/validation";
import type { GradeSettingsRowType } from "../../Organisms/GradeSettingsRowWrapper/GradeSettingsRowWrapper.types";
import type { StudentCardProps } from "../../Organisms/StudentCard/StudentCard";

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
): Omit<StudentCardProps, "onChange">[] => {
  return studentsConfig.map((student) => ({
    ...student,
    gradesArray: rowValues.map((row, i) => ({
      id: row.id, // same id everywhere - problem
      points: gradeValues[student.studentId]?.[i].points ?? "",
      grade: gradeValues[student.studentId]?.[i].grade ?? "",
      labelText: row.pointsLabel,
      inputEnabled: row.checked,
      validationText:
        gradeValues[student.studentId]?.[i].validationText ?? undefined,
      valsWithError: gradeValues[student.studentId]?.[i].valsWithError ?? [],
    })),
  }));
};
