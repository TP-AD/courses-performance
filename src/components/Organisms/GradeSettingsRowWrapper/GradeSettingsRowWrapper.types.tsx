import type { Simplify } from "type-fest";
import type { InputLabelProps } from "../../Atoms/InputLabel/InputLabel";
import type { ToggleLabelProps } from "../../Atoms/ToggleLabel/ToggleLabel";

export type InputData = Simplify<
  Omit<
    InputLabelProps,
    "onBlur" | "onChange" | "validationText" | "id" | "required"
  >
>;

export type GradeSettingsRowType = {
  id: string;
  toggleData: Simplify<Omit<ToggleLabelProps, "onChange" | "checked">>;
  passData: InputData;
  maxData: InputData;
  checked: boolean;
  pointsLabel: string;
  validationText?: string[];
};
