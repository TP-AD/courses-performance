import type { FC } from "react";
import {
  InputLabel,
  type InputLabelProps,
} from "../../Atoms/InputLabel/InputLabel";
import {
  RadioLabelGroup,
  type GradeRadioOptions,
} from "../RadioLabelGroup/RadioLabelGroup";
import type { RadioLabelProps } from "../../Atoms/RadioLabel/RadioLabel";
import type { GradePointsType } from "../../Organisms/StudentCard/StudentCard";
import { ValidationText } from "../../Atoms/ValidationText/ValidationText";

type GradeEntryRowProps = {
  groupName: string;
  gradeOptions: GradeRadioOptions[];
  studentGradeRow: Omit<InputLabelProps, "onChange" | "onBlur" | "inputValue"> &
    Omit<
      RadioLabelProps,
      "onChange" | "checked" | "labelText" | "groupName" | "value"
    > & {
      points: GradePointsType;
      grade: GradePointsType;
      inputEnabled: boolean;
    };
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
            text={studentGradeRow.validationText}
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
