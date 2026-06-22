import { type FC } from "react";
import { type InputLabelProps } from "../../Atoms/InputLabel/InputLabel";
import type { RadioLabelProps } from "../../Atoms/RadioLabel/RadioLabel";
import { GradeEntryRow } from "../../Molecules/GradeEntryRow/GradeEntryRow";
import type { StudentConfigType } from "../../Templates/StudentPointsAndGrades/StudentPointsAndGrades.types";

export type GradePointsType = {
  value: string;
  hasError?: boolean;
};

export type StudentCardProps = StudentConfigType & {
  onChange: (index: number, value: string, type: "input" | "radio") => void;
  gradesArray: (Omit<InputLabelProps, "onChange" | "onBlur" | "inputValue"> &
    Omit<
      RadioLabelProps,
      "onChange" | "checked" | "labelText" | "groupName"
    > & {
      points: GradePointsType;
      grade: GradePointsType;
      inputEnabled: boolean;
    })[];
};

export const StudentCard: FC<StudentCardProps> = ({
  studentName,
  studentId,
  onChange,
  gradesArray,
}) => {
  const gradeOptions = [
    // TODO: fix this mess - lift this array up, pass as prop
    {
      value: `ni-pristopil`,
      labelText: "Ni pristopil",
    },
    {
      value: `grade-5`,
      labelText: "5",
    },
    { value: `grade-6`, labelText: "6" },
    { value: `grade-7`, labelText: "7" },
    { value: `grade-8`, labelText: "8" },
    { value: `grade-9`, labelText: "9" },
    { value: `grade-10`, labelText: "10" },
  ];

  return (
    <div className="p-3 border-2 border-gray-200 flex justify-between rounded-lg items-center gap-6">
      <div className="flex flex-col items-start">
        <span>{studentName}</span>
        <span>{studentId}</span>
      </div>
      <div>
        <div>
          {gradesArray.map((studentGradeRow, i) => {
            return (
              <GradeEntryRow
                groupName={`${studentId}-${i}`}
                key={`${studentGradeRow.id}-${i}`}
                gradeOptions={gradeOptions.map((option) => ({
                  ...option,
                  id: `${studentId}-${i}-${option.value}`,
                }))}
                studentGradeRow={studentGradeRow}
                onChange={(value, type) => onChange(i, value, type)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
