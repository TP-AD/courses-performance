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
import { parseValidationArray } from "../../Atoms/ValidationText/ValidationText.utils";
import type { GradeSettingsRowChange } from "./GradeSettingsRow.types";
import { useGradePointsContext } from "../../../context/GradePointsContext";

export type GradeSettingsRowProps = {
  toggle: Omit<ToggleLabelProps, "onChange">;
  passInput: Omit<InputLabelProps, "onChange" | "onBlur">;
  maxInput: Omit<InputLabelProps, "onChange" | "onBlur">;
  onChange: (change: GradeSettingsRowChange) => void;
  rowId: number;
  validationText?: string[];
};

export const GradeSettingsRow: FC<GradeSettingsRowProps> = ({
  toggle,
  passInput,
  maxInput,
  validationText,
  rowId,
}) => {
  const { handleSettingsChange } = useGradePointsContext();
  return (
    <>
      <div className="flex items-center gap-3">
        <ToggleLabel
          {...toggle}
          onChange={() =>
            handleSettingsChange(rowId, {
              field: "toggle",
              value: !toggle.checked,
            })
          }
        />
        <InputLabel
          {...passInput}
          enabled={toggle.checked}
          onChange={(e) =>
            handleSettingsChange(rowId, {
              field: "passInput",
              value: e.target.value,
            })
          }
        />
        <InputLabel
          {...maxInput}
          enabled={toggle.checked}
          onChange={(e) =>
            handleSettingsChange(rowId, {
              field: "maxInput",
              value: e.target.value,
            })
          }
        />
        {validationText && (
          <ValidationText text={parseValidationArray(validationText)} />
        )}
      </div>
    </>
  );
};
