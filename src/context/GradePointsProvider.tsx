import { useState, type FC, type PropsWithChildren } from "react";
import GradePointsContext from "./GradePointsContext";
import { APP_SETTINGS } from "../setup/appSetup";
import type {
  StudentConfigType,
  StudentGradeValue,
} from "../components/Templates/StudentPointsAndGrades/StudentPointsAndGrades.types";
import type { GradeSettingsRowType } from "../components/Organisms/GradeSettingsRowWrapper/GradeSettingsRowWrapper.types";
import type { GradeSettingsRowChange } from "../components/Molecules/GradeSettingsRow/GradeSettingsRow.types";
import type { StudentCardChange } from "../components/Organisms/StudentCardWrapper/StudentCardWrapper.types";
import {
  validateGradeInput,
  validateGradeSettings,
  type GradeValueType,
} from "../functions/validation";
import {
  applyNewEntryValidation,
  defaultStudentEntry,
} from "./GradePointsProvider.utils";

// Settings for points & grades
const ROWS_CONFIG: GradeSettingsRowType[] = Array.from(
  { length: APP_SETTINGS.rows.amount },
  (_, i) => ({
    id: APP_SETTINGS.rows.row_id_prefix + (i + 1),
    toggleData: { labelText: APP_SETTINGS.rows.row_label_prefix + (i + 1) },
    passData: {
      inputValue: "",
      labelText: APP_SETTINGS.rows.pass_label,
      inputPlaceholder: APP_SETTINGS.rows.pass_placeholder,
    },
    maxData: {
      inputValue: "",
      labelText: APP_SETTINGS.rows.max_label,
      inputPlaceholder: APP_SETTINGS.rows.max_placeholder,
    },
    valsWithError: [],
    pointsLabel: APP_SETTINGS.rows.points_label_prefix + (i + 1),
    checked: false,
    validationText: undefined,
  }),
);

// List of students
const STUDENTS_CONFIG: StudentConfigType[] = Array.from(
  { length: APP_SETTINGS.students.amount },
  (_, i) => ({
    studentName: APP_SETTINGS.students.student_name_prefix + (i + 1),
    studentId: "123" + i,
  }),
);

export const GradePointsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [rowsConfig, setRowsConfig] =
    useState<GradeSettingsRowType[]>(ROWS_CONFIG);
  const studentsConfig = STUDENTS_CONFIG;
  const [gradeValues, setGradeValues] = useState<
    Record<string, StudentGradeValue[]>
  >({});

  const handleSettingsChange = (
    rowId: number,
    change: GradeSettingsRowChange,
  ) => {
    const oldRow = rowsConfig[rowId];
    const newRow = structuredClone(oldRow);

    if (change.field === "toggle") {
      newRow.checked = change.value;
    } else if (change.field === "maxInput") {
      newRow.maxData.inputValue = change.value;
    } else if (change.field === "passInput") {
      newRow.passData.inputValue = change.value;
    }

    const validate = validateGradeSettings(newRow);
    newRow.valsWithError = validate.issues ?? [];
    newRow.validationText = validate.message ?? [];

    setRowsConfig((prev) =>
      prev.map((row, i) => {
        if (i !== rowId) return row;
        return newRow;
      }),
    );

    const gradeValuesCopy = structuredClone(gradeValues);
    Object.keys(gradeValues).forEach((key) => {
      const changedStudent = gradeValuesCopy[key][rowId];
      if (changedStudent) {
        const validation = validateGradeInput(
          newRow,
          gradeValuesCopy[key][rowId],
        );
        applyNewEntryValidation(changedStudent, validation);
      }
    });

    setGradeValues(gradeValuesCopy);
  };

  const handleStudentChange = (
    studentId: string,
    row: number,
    change: StudentCardChange,
  ) => {
    const gradeValuesCopy = structuredClone(gradeValues);
    const changeStudent = gradeValuesCopy[studentId] ?? [];

    for (let i = 0; i < rowsConfig.length; i++) {
      if (!changeStudent[i]) {
        changeStudent[i] = { ...defaultStudentEntry };
      }

      if (i === row) {
        if (change.type === "input") {
          changeStudent[i].points = change.value;
        } else if (change.type === "radio") {
          changeStudent[i].grade = change.value as GradeValueType;
        }
        const validation = validateGradeInput(
          rowsConfig[row],
          changeStudent[i],
        );

        applyNewEntryValidation(changeStudent[i], validation);
      }
    }

    setGradeValues((prev) => ({ ...prev, [studentId]: changeStudent }));
  };

  return (
    <GradePointsContext.Provider
      value={{
        gradeValues,
        handleSettingsChange,
        handleStudentChange,
        rowsConfig,
        studentsConfig,
      }}
    >
      {children}
    </GradePointsContext.Provider>
  );
};

//todo: optimizations
// - settingsrow "flatten it" da bodo errorji na istem nivoju kot id, pass, max...
// - validacija po rowu; funkcija ne rabi celega objekta ampak samo vrednosti, ki jih validira (adapt to fn, not to object using it)
