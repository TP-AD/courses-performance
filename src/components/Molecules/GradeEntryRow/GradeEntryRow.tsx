import type { FC } from "react";
import { InputLabel } from "../../Atoms/InputLabel/InputLabel";
import {
  RadioLabelGroup,
  type GradeRadioOptions,
} from "../RadioLabelGroup/RadioLabelGroup";
import { ValidationText } from "../../Atoms/ValidationText/ValidationText";
import { parseValidationArray } from "../../Atoms/ValidationText/ValidationText.utils";
import type { StudentGradeEntryRow } from "./GradeEntryRow.types";

type GradeEntryRowProps = {
  groupName: string;
  gradeOptions: GradeRadioOptions[];
  studentGradeRow: StudentGradeEntryRow;
  onChange: (value: string, type: "input" | "radio") => void;
};

export const GradeEntryRow: FC<GradeEntryRowProps> = ({
  groupName,
  gradeOptions,
  studentGradeRow,
  onChange,
}) => {
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
          onChange={(radioId) => {
            onChange(radioId, "radio");
          }}
          activeRadioId={studentGradeRow.grade.value}
          hasError={studentGradeRow.grade.hasError ?? false}
        />
        {studentGradeRow.inputEnabled && (
          <InputLabel
            key={`grade-${studentGradeRow.id}`}
            id={`grade-${studentGradeRow.id}`}
            inputValue={studentGradeRow.points.value}
            labelText={studentGradeRow.labelText}
            hasError={studentGradeRow.points.hasError ?? false}
            onChange={(e) => onChange(e.target.value, "input")}
          />
        )}
      </div>
    </div>
  );
};
