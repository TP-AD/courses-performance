import { type FC } from "react";
import { RadioLabel } from "../../Atoms/RadioLabel/RadioLabel";
import type { GradeValueType } from "../../../functions/validation";
import { useGradePointsContext } from "../../../context/GradePointsContext";

export type GradeRadioOptions = {
  id: string;
  labelText: string;
  value: GradeValueType;
};

type RadioLabelGroupProps = {
  groupName: string;
  gradeOptions: GradeRadioOptions[];
  activeRadioId?: string;
  studentId: string;
  rowId: number;
  hasError?: boolean;
};

// Onchange dobim nov value + id sestavljen iz študentID-ocenaID-izbiraID
// to lahko direkt nafilam v objekt Študent in re-validiram radio + input proti settings inputi
// dobim za točno ta študent podatek hasError oz. validationText
// kako sedaj updejtam samo ta radio?
// - dodej state za value te grupe
// na vsak change validirej in shrani vrednost + validacijo v "master entry" databank
// databank naj bo ref zato da ga react ignorira pri rerender

export const RadioLabelGroup: FC<RadioLabelGroupProps> = ({
  groupName,
  gradeOptions,
  activeRadioId,
  studentId,
  rowId,
  hasError,
}) => {
  const { handleStudentChange } = useGradePointsContext();

  const handleChange = (option: GradeRadioOptions) => {
    handleStudentChange(studentId, rowId, {
      value: option.value,
      type: "radio",
    });
  };

  return (
    <fieldset className="flex gap-3">
      {gradeOptions.map((option) => {
        return (
          <RadioLabel
            key={option.id}
            value={option.value}
            groupName={groupName}
            labelText={option.labelText}
            id={option.id}
            checked={activeRadioId === option.value}
            onChange={() => handleChange(option)}
            hasError={hasError}
          />
        );
      })}
    </fieldset>
  );
};
