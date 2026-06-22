import type { ChangeEvent, FC } from "react";
import { twMerge } from "tailwind-merge";

export type ToggleProps = {
  id: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Toggle: FC<ToggleProps> = ({ id, checked, onChange }) => {
  return (
    <div className="relative w-fit ">
      <div className="w-19 h-10 border-2 border-neutral-600 rounded-full relative ">
        <div
          className={twMerge(
            "absolute -top-0.5 -left-0.5 -z-10 w-10 h-10 rounded-full bg-blue-600 transition-all",
            checked && "left-8.5",
          )}
        ></div>
      </div>
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
};
