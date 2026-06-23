import { type ChangeEvent, type FC, type FocusEvent } from "react";
import { twMerge } from "tailwind-merge";

export type InputProps = {
  inputValue: string;
  inputPlaceholder?: string;
  hasError: boolean;
  enabled?: boolean;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  required?: boolean;
};

export const Input: FC<InputProps> = ({
  inputValue,
  id,
  inputPlaceholder,
  hasError,
  enabled = true,
  required,
  onBlur,
  onChange,
}) => {
  const baseClasses =
    "w-full inline-block px-2 py-1 rounded-2 border-2 border-solid border-neutral-600 rounded-lg text-black";
  const errorClasses = "border-red-500";
  const disabledClasses = "border-neutral-200 pointer-events-none";

  return (
    <input
      type="text"
      value={inputValue}
      name={id}
      id={id}
      {...(inputPlaceholder && { placeholder: inputPlaceholder })}
      required={required}
      onBlur={onBlur}
      onChange={onChange}
      className={twMerge(
        baseClasses,
        hasError && errorClasses,
        !enabled && disabledClasses,
      )}
    />
  );
};
