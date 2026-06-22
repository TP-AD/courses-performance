import { useId, type FC } from "react";
import { Toggle, type ToggleProps } from "../Toggle/Toggle";

export type ToggleLabelProps = Omit<ToggleProps, "id"> & {
  labelText: string;
  id?: string;
};

export const ToggleLabel: FC<ToggleLabelProps> = ({
  labelText,
  checked,
  onChange,
  id,
}) => {
  const componentId = id ?? useId();
  return (
    <div>
      <div className="flex gap-3 items-center">
        {labelText && (
          <label htmlFor={componentId} className="text-black">
            {labelText}
          </label>
        )}
        <Toggle id={componentId} onChange={onChange} checked={checked} />
      </div>
    </div>
  );
};
