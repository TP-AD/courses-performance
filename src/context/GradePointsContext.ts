import { createContext, useContext } from "react";
import type {
  StudentConfigType,
  StudentGradeValue,
} from "../components/Templates/StudentPointsAndGrades/StudentPointsAndGrades.types";
import type { GradeSettingsRowChange } from "../components/Molecules/GradeSettingsRow/GradeSettingsRow.types";
import type { StudentCardChange } from "../components/Organisms/StudentCardWrapper/StudentCardWrapper.types";
import type { GradeSettingsRowType } from "../components/Organisms/GradeSettingsRowWrapper/GradeSettingsRowWrapper.types";

export type GradePointsContextType = {
  gradeValues: Record<string, StudentGradeValue[]>;
  handleSettingsChange: (row: number, change: GradeSettingsRowChange) => void;
  handleStudentChange: (
    student: string,
    row: number,
    change: StudentCardChange,
  ) => void;
  rowsConfig: GradeSettingsRowType[];
  studentsConfig: StudentConfigType[];
};

const GradePointsContext = createContext<GradePointsContextType | undefined>(
  undefined,
);

export const useGradePointsContext = () => {
  const context = useContext(GradePointsContext);
  if (context === undefined) {
    throw new Error(
      "useGradePointsContext needs to be used in GradePointsProvider",
    );
  }

  return context;
};

export default GradePointsContext;
