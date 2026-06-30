import { type FC } from "react";
import { GradeSettingsRowWrapper } from "../../Organisms/GradeSettingsRowWrapper/GradeSettingsRowWrapper";
import { StudentCardWrapper } from "../../Organisms/StudentCardWrapper/StudentCardWrapper";
import { buildStudentVals } from "./StudentPointsAndGrades.utils";
import { useGradePointsContext } from "../../../context/GradePointsContext";

export const StudentPointsAndGrades: FC = () => {
  const { gradeValues, handleSettingsChange, rowsConfig, studentsConfig } =
    useGradePointsContext();

  const studentValues = buildStudentVals(
    studentsConfig,
    rowsConfig,
    gradeValues,
  );

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Onchange: toggle, točke N max in min */}
      <GradeSettingsRowWrapper
        gradeSettingsRowArray={rowsConfig}
        onChange={handleSettingsChange}
      />
      {/* Onchange: točke N */}
      <StudentCardWrapper studentsArray={studentValues} />
    </div>
  );
};
