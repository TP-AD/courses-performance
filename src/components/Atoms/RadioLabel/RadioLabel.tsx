import type { FC } from "react";
import { twMerge } from "tailwind-merge";

export type RadioLabelProps = {
  labelText: string;
  id: string;
  value: string;
  checked: boolean;
  groupName: string;
  onChange: () => void;
  hasError?: boolean;
};

export const RadioLabel: FC<RadioLabelProps> = ({
  labelText,
  id,
  value,
  checked,
  groupName,
  onChange,
  hasError,
}) => {
  return (
    <div className="flex gap-1">
      <input
        type="radio"
        id={id}
        name={groupName}
        checked={checked}
        onChange={onChange}
        value={value}
      />
      <label htmlFor={id} className={twMerge(hasError && "text-red-500")}>
        {labelText}
      </label>
    </div>
  );
};
