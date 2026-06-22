import type { FC } from "react";
import { StudentCard, type StudentCardProps } from "../StudentCard/StudentCard";

export type StudentCardChange = {
  value: string;
  type: "input" | "radio";
};

type StudentCardWrapperProps = {
  studentsArray: Omit<StudentCardProps, "onChange">[];
  onChange: (
    studentId: string,
    index: number,
    change: StudentCardChange,
  ) => void;
};

export const StudentCardWrapper: FC<StudentCardWrapperProps> = ({
  studentsArray,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-4 my-3">
      {studentsArray.map((student, i) => (
        <StudentCard
          key={`student-${i}`}
          studentId={student.studentId}
          studentName={student.studentName}
          onChange={(index, value, type) =>
            onChange(student.studentId, index, { value: value, type: type })
          }
          gradesArray={student.gradesArray}
        />
      ))}
    </div>
  );
};
