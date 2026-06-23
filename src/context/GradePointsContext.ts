import { createContext, useContext } from "react";
import type { RowsConfig } from "../App";
import type {
  StudentConfigType,
  StudentGradeValue,
} from "../components/Templates/StudentPointsAndGrades/StudentPointsAndGrades.types";

type GradeOptions = {
  value: string;
  labelText: string;
};

export type GradePointsContextType = {
  ROWS_CONFIG: RowsConfig;
  STUDENTS_CONFIG: StudentConfigType;
  GRADES_CONFIG?: Record<string, StudentGradeValue[]> | undefined;
  GRADE_OPTIONS: GradeOptions[];
};

type TemporaryType = {
  val: string;
  setVal: (value: string) => void;
};

const GradePointsContext = createContext<TemporaryType | undefined>(undefined);

export const useGradeNameContext = () => {
  const context = useContext(GradePointsContext);
  if (context === undefined) {
    throw new Error(
      "useGradeNameContext needs to be used in in  GradePointsProvided",
    );
  }
};

export default GradePointsContext;
