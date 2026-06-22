import type { FC } from "react";
import { RadioLabel } from "../../Atoms/RadioLabel/RadioLabel";

export type GradeRadioOptions = {
  id: string;
  labelText: string;
  value: string;
};

type RadioLabelGroupProps = {
  groupName: string;
  gradeOptions: GradeRadioOptions[];
  onChange: (selectedRadioValue: string) => void;
  activeRadioId?: string;
  hasError?: boolean;
};

export const RadioLabelGroup: FC<RadioLabelGroupProps> = ({
  groupName,
  gradeOptions,
  onChange,
  activeRadioId,
  hasError,
}) => {
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
            onChange={() => onChange(option.value)}
            hasError={hasError}
          />
        );
      })}
    </fieldset>
  );
};
