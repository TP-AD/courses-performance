import { useId, type FC } from "react";
import { Input, type InputProps } from "../Input/Input";
import { twMerge } from "tailwind-merge";
import { ValidationText } from "../ValidationText/ValidationText";
import { parseValidationArray } from "../ValidationText/ValidationText.utils";

export type InputLabelProps = Omit<InputProps, "onChange"> & {
  labelText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement, Element>) => void;
  validationText?: string[] | undefined;
};

export const InputLabel: FC<InputLabelProps> = ({
  inputValue,
  inputPlaceholder,
  labelText,
  hasError,
  enabled,
  onBlur,
  onChange,
  validationText,
  id,
  required,
}) => {
  const backupId = useId();
  const componentId = id ?? backupId;

  return (
    <div>
      <div
        className={twMerge(
          "flex gap-3 items-center",
          !enabled && "cursor-not-allowed",
        )}
      >
        {labelText && (
          <label
            htmlFor={componentId}
            className={twMerge(
              "text-black text-[14px] leading-3.5",
              !enabled && "pointer-events-none text-neutral-500",
            )}
          >
            {labelText}
            {required && <span className="text-red-600">*</span>}
          </label>
        )}
        <Input
          inputValue={inputValue}
          inputPlaceholder={inputPlaceholder}
          id={componentId}
          onBlur={onBlur}
          onChange={(e) => onChange(e)}
          hasError={hasError}
          required={required}
          enabled={enabled}
        />
      </div>
      {validationText && (
        <ValidationText text={parseValidationArray(validationText)} />
      )}
    </div>
  );
};
