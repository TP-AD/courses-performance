import { type FC } from "react";
import {
  GradeSettingsRow,
  type GradeSettingsRowChange,
} from "../../Molecules/GradeSettingsRow/GradeSettingsRow";
import type { ToggleLabelProps } from "../../Atoms/ToggleLabel/ToggleLabel";
import type { InputLabelProps } from "../../Atoms/InputLabel/InputLabel";

export type GradeSettingsRowType = {
  id: string;
  toggleData: Omit<ToggleLabelProps, "onChange" | "checked">;
  passData: Omit<
    InputLabelProps,
    "onBlur" | "onChange" | "validationText" | "id" | "required"
  >;
  maxData: Omit<
    InputLabelProps,
    "onBlur" | "onChange" | "validationText" | "id" | "required"
  >;
  checked: boolean;
  pointsLabel: string;
  validationText?: string[];
};
export type GradeSettingsRowWrapperProps = {
  gradeSettingsRowArray: GradeSettingsRowType[];
  onChange: (index: number, change: GradeSettingsRowChange) => void;
};

export const GradeSettingsRowWrapper: FC<GradeSettingsRowWrapperProps> = ({
  gradeSettingsRowArray,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {gradeSettingsRowArray.map((config, i) => {
        const rowId = `${config.id}-${i}`;
        return (
          <GradeSettingsRow
            key={rowId}
            toggle={{
              labelText: config.toggleData.labelText,
              checked: config.checked,
              id: `toggle-${rowId}`,
            }}
            passInput={{
              labelText: config.passData.labelText,
              inputValue: config.passData.inputValue,
              inputPlaceholder: config.passData.inputPlaceholder,
              hasError: config.passData.hasError ?? false,
              id: `passGrade-${rowId}`,
              enabled: config.checked,
            }}
            maxInput={{
              labelText: config.maxData.labelText,
              inputValue: config.maxData.inputValue,
              inputPlaceholder: config.maxData.inputPlaceholder,
              hasError: config.maxData.hasError ?? false,
              id: `maxGrade-${rowId}`,
              enabled: config.checked,
            }}
            onChange={(change) => onChange(i, change)}
            validationText={config.validationText}
          />
        );
      })}
    </div>
  );
};
