import { useState, type FC } from "react";
import {
  GradeSettingsRowWrapper,
  type GradeSettingsRowType,
} from "../../Organisms/GradeSettingsRowWrapper/GradeSettingsRowWrapper";
import {
  StudentCardWrapper,
  type StudentCardChange,
} from "../../Organisms/StudentCardWrapper/StudentCardWrapper";
import type { GradeSettingsRowChange } from "../../Molecules/GradeSettingsRow/GradeSettingsRow";
import {
  validateGradeInput,
  validateGradeSettings,
} from "../../../functions/validation";
import type {
  StudentConfigType,
  StudentGradeValue,
} from "./StudentPointsAndGrades.types";
import { buildStudentVals } from "./StudentPointsAndGrades.utils";

export type StudentPointsAndGradesProps = {
  rowsConfig: GradeSettingsRowType[];
  gradesConfig: Record<string, StudentGradeValue[]>;
  studentsConfig: StudentConfigType[];
  showValidation?: boolean;
  onRowChange?: (index: number, change: GradeSettingsRowChange) => void;
  onCardChange?: (
    studentId: string,
    rowIndex: number,
    change: StudentCardChange,
  ) => void;
};

export const StudentPointsAndGrades: FC<StudentPointsAndGradesProps> = ({
  rowsConfig,
  gradesConfig,
  studentsConfig,
  showValidation = true,
  onRowChange,
  onCardChange,
}) => {
  const [rowValues, setRowValues] =
    useState<GradeSettingsRowType[]>(rowsConfig);
  const [gradeValues, setGradeValues] =
    useState<Record<string, StudentGradeValue[]>>(gradesConfig);

  const studentValues = buildStudentVals(
    studentsConfig,
    rowValues,
    gradeValues,
  );
  // localstorage + useeffect / -> za syncanje react state z zunanjim non-react statom (npr. localstorage)

  // Validation here
  //RowChange - handles Grades Settings
  // on row settings change - re-validate every related row id for entered grade; use fn for cardChange

  // -> ko se settings row spremeni, se mora re-validirat student card (ind. row)
  /*     const validate = validateGradeInput(
        rowValues[rowIndex],  --> row
        updatedGrades[rowIndex],  --> gradeValues[študent][i]
  );*/

  const handleRowChange = (index: number, change: GradeSettingsRowChange) => {
    onRowChange?.(index, change);

    setRowValues((prev) => {
      return prev.map((row, i) => {
        if (i !== index) return row;

        let returnObject = {
          ...row,
          passData: { ...row.passData },
          maxData: { ...row.maxData },
          toggleData: { ...row.toggleData },
        };

        if (change.field === "toggle") {
          returnObject.checked = !row.checked;
        } else if (change.field === "passInput") {
          returnObject.passData.inputValue = change.value;
        } else {
          returnObject.maxData.inputValue = change.value;
        }
        //VALIDATION
        const validate = validateGradeSettings(returnObject); // also pass entered values
        const validationTxt = showValidation ? validate.message : undefined;
        returnObject.passData.hasError =
          validate.issues?.includes("pass") ?? false;
        returnObject.maxData.hasError =
          validate.issues?.includes("max") ?? false;

        /*if (validate.issues) {
          validate.issues.map((issue) => {
            if (assertIssueKey(issue)) {
              const key: ErrorKey = `${issue}HasError`;
              returnObject[key] = true;
            }
          });
        }*/
        return { ...returnObject, validationText: validationTxt };
      });
    });

    setGradeValues((prev) => {
      const newObject = { ...prev };
      Object.keys(newObject).forEach((key) => {
        const rowToValidate = newObject[key][index]; // points, grades, new validation text

        const newSettings = rowValues[index];
        if (change.field === "toggle") {
          newSettings.checked = change.value;
        } else if (change.field === "passInput") {
          newSettings.passData.inputValue = change.value;
        } else if (change.field === "maxInput") {
          newSettings.maxData.inputValue = change.value;
        }

        const validate = validateGradeInput(newSettings, rowToValidate);

        rowToValidate.validationText = validate.message;

        newObject[key][index] = rowToValidate;
      });

      return newObject;
    });
  };

  // Validation here
  const handleCardChange = (
    studentId: string,
    rowIndex: number,
    change: StudentCardChange,
  ) => {
    onCardChange?.(studentId, rowIndex, change);
    setGradeValues((prev) => {
      let newGrades: StudentGradeValue[] | undefined;

      if (!prev[studentId]) {
        newGrades = rowValues.map(() => ({
          points: { value: "", hasError: false },
          grade: { value: "", hasError: false },
        }));
      } else {
        newGrades = prev[studentId];
      }

      const current: StudentGradeValue = {
        ...newGrades[rowIndex],
        points: { ...newGrades[rowIndex].points },
        grade: { ...newGrades[rowIndex].grade },
      };

      if (change.type === "radio") {
        current.grade.value = change.value;
      } else {
        current.points.value = change.value;
      }

      const updatedGrades = [...newGrades]; // updated = [{points:"", grade:""},{points:"", grade:""}]
      updatedGrades[rowIndex] = current; // dodamo notri objekt, ki smo ga v if/else updejtal

      //Validation
      const validate = validateGradeInput(
        rowValues[rowIndex],
        updatedGrades[rowIndex],
      );
      updatedGrades[rowIndex].validationText = showValidation
        ? validate.message
        : undefined;

      updatedGrades[rowIndex].points.hasError =
        validate.issues?.includes("points") ?? false;
      updatedGrades[rowIndex].grade.hasError =
        validate.issues?.includes("grade") ?? false;

      const next = { ...prev, [studentId]: updatedGrades };
      return next;
    });
  };

  return (
    <>
      {/* Onchange: toggle, točke N max in min */}
      <GradeSettingsRowWrapper
        gradeSettingsRowArray={rowValues}
        onChange={handleRowChange}
      />
      {/* Onchange: točke N */}
      <StudentCardWrapper
        studentsArray={studentValues}
        onChange={handleCardChange}
      />
    </>
  );
};
