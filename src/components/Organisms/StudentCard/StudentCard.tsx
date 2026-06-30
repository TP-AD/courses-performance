import { type FC } from "react";
import { GradeEntryRow } from "../../Molecules/GradeEntryRow/GradeEntryRow";
import type { StudentConfigType } from "../../Templates/StudentPointsAndGrades/StudentPointsAndGrades.types";
import { twMerge } from "tailwind-merge";
import type { StudentGradeEntryRow } from "../../Molecules/GradeEntryRow/GradeEntryRow.types";
import { defaultGradeOptions } from "./StudentCard.utils";

export type StudentCardProps = StudentConfigType & {
  gradesArray: StudentGradeEntryRow[];
};

export const StudentCard: FC<StudentCardProps> = ({
  studentName,
  studentId,
  gradesArray,
}) => {
  const cardHasError = gradesArray.some(
    (entry) => entry.valsWithError.length > 0,
  );

  return (
    <div
      className={twMerge(
        "p-3 border-2 border-gray-200 flex justify-between rounded-lg items-center gap-6",
        cardHasError && "border-red-200",
      )}
    >
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
                gradeOptions={defaultGradeOptions.map((option) => ({
                  ...option,
                  id: `${studentId}-${i}-${option.value}`,
                }))}
                studentGradeRow={studentGradeRow}
                rowId={i}
                studentId={studentId}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
