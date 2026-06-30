import type { Simplify } from "type-fest";
import type { InputLabelProps } from "../../Atoms/InputLabel/InputLabel";
import type { ToggleLabelProps } from "../../Atoms/ToggleLabel/ToggleLabel";
import type { PathType } from "../../../functions/validation";

export type InputData = Simplify<
  Pick<InputLabelProps, "inputValue" | "labelText" | "inputPlaceholder">
>;

export type GradeSettingsRowType = {
  id: string;
  toggleData: Simplify<Pick<ToggleLabelProps, "labelText">>;
  passData: InputData;
  maxData: InputData;
  checked: boolean;
  pointsLabel: string;
  validationText?: string[];
  valsWithError: PathType[];
};
