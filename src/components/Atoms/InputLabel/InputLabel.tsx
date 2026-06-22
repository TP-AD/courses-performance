import { useId, useState, type FC } from "react";
import { Input, type InputProps } from "../Input/Input";
import { twMerge } from "tailwind-merge";
import { ValidationText } from "../ValidationText/ValidationText";
import { parseValidationArray } from "../ValidationText/ValidationText.utils";

export type InputLabelProps = InputProps & {
  labelText: string;
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
  const [currentVal, setCurrentVal] = useState<string>(inputValue);
  const componentId = id ?? useId();

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
              "text-black",
              !enabled && "pointer-events-none text-neutral-500",
            )}
          >
            {labelText}
            {required && <span className="text-red-600">*</span>}
          </label>
        )}
        <Input
          inputValue={currentVal}
          inputPlaceholder={inputPlaceholder}
          id={componentId}
          onBlur={onBlur}
          onChange={(e) => {
            setCurrentVal(e.target.value);
            onChange(e);
          }}
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
