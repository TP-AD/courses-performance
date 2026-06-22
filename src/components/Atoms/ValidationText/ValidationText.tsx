import { useState } from "react";
import { GoAlertFill } from "react-icons/go";
import { twMerge } from "tailwind-merge";

export const ValidationText = ({
  text,
  direction = "right",
}: {
  text: string[];
  direction?: "right" | "left";
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <div className="relative">
      <GoAlertFill
        className="text-red-500 cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
      />
      <div
        className={twMerge(
          "absolute w-57.5 bg-[#f1f1f1] top-0  p-1.5 rounded-xl border-2 border-red-500 text-[12px] text-red-500 -translate-y-1/4",
          isVisible ? "block" : "hidden",
          direction === "left" ? "right-7" : "left-7",
        )}
      >
        {text.join("\n")}
      </div>
    </div>
  );
};

/*
width: 230px;
    background: #f1f1f1;
    top: 0;
    left: 28px;
    padding: 6px;
    border-radius: 10px;
    border: 2px solid red;
    font-size: 12px;
    color: red;
    transform: translateY(-25%);
*/
