import type { FC } from "react";
import { InputLabel } from "../../Atoms/InputLabel/InputLabel";
import {
  RadioLabelGroup,
  type GradeRadioOptions,
} from "../RadioLabelGroup/RadioLabelGroup";
import { ValidationText } from "../../Atoms/ValidationText/ValidationText";
import { parseValidationArray } from "../../Atoms/ValidationText/ValidationText.utils";
import type { StudentGradeEntryRow } from "./GradeEntryRow.types";
import { useGradePointsContext } from "../../../context/GradePointsContext";

type GradeEntryRowProps = {
  groupName: string;
  gradeOptions: GradeRadioOptions[];
  studentGradeRow: StudentGradeEntryRow;
  studentId: string;
  rowId: number;
};

export const GradeEntryRow: FC<GradeEntryRowProps> = ({
  groupName,
  gradeOptions,
  studentGradeRow,
  studentId,
  rowId,
}) => {
  const { handleStudentChange } = useGradePointsContext();
  return (
    <div className="flex items-center gap-4">
      <div className="min-w-4.5">
        {studentGradeRow.validationText && (
          <ValidationText
            text={parseValidationArray(studentGradeRow.validationText)}
            direction="left"
          />
        )}
      </div>
      <div>
        <RadioLabelGroup
          groupName={groupName}
          gradeOptions={gradeOptions}
          activeRadioId={studentGradeRow.grade}
          hasError={studentGradeRow.valsWithError.includes("grade")}
          studentId={studentId}
          rowId={rowId}
        />
        {studentGradeRow.inputEnabled && (
          <InputLabel
            key={`grade-${studentGradeRow.id}`}
            id={`grade-${studentGradeRow.id}`}
            inputValue={studentGradeRow.points}
            labelText={studentGradeRow.labelText}
            hasError={studentGradeRow.valsWithError.includes("points")}
            onChange={(e) =>
              handleStudentChange(studentId, rowId, {
                value: e.target.value,
                type: "input",
              })
            }
          />
        )}
      </div>
    </div>
  );
};
