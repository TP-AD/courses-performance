import { type FC } from "react";
import {
  InputLabel,
  type InputLabelProps,
} from "../../Atoms/InputLabel/InputLabel";
import {
  ToggleLabel,
  type ToggleLabelProps,
} from "../../Atoms/ToggleLabel/ToggleLabel";
import { ValidationText } from "../../Atoms/ValidationText/ValidationText";

export type GradeSettingsRowChange =
  | { field: "toggle"; value: boolean }
  | { field: "passInput" | "maxInput"; value: string };

export type GradeSettingsRowProps = {
  toggle: Omit<ToggleLabelProps, "onChange">;
  passInput: Omit<InputLabelProps, "onChange" | "onBlur">;
  maxInput: Omit<InputLabelProps, "onChange" | "onBlur">;
  onChange: (change: GradeSettingsRowChange) => void;
  validationText?: string[];
};

export const GradeSettingsRow: FC<GradeSettingsRowProps> = ({
  toggle,
  passInput,
  maxInput,
  onChange,
  validationText,
}) => {
  return (
    <>
      <div className="flex items-center gap-3">
        <ToggleLabel
          {...toggle}
          onChange={() => onChange({ field: "toggle", value: !toggle.checked })}
        />
        <InputLabel
          {...passInput}
          enabled={toggle.checked}
          onChange={(e) =>
            onChange({ field: "passInput", value: e.target.value })
          }
        />
        <InputLabel
          {...maxInput}
          enabled={toggle.checked}
          onChange={(e) =>
            onChange({ field: "maxInput", value: e.target.value })
          }
        />
        {validationText && <ValidationText text={validationText} />}
      </div>
    </>
  );
};
