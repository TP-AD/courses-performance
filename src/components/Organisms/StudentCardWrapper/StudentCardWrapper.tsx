import type { FC } from "react";
import { StudentCard, type StudentCardProps } from "../StudentCard/StudentCard";
import type { Simplify } from "type-fest";

type StudentCardWrapperProps = {
  studentsArray: Simplify<Omit<StudentCardProps, "onChange">[]>;
};

export const StudentCardWrapper: FC<StudentCardWrapperProps> = ({
  studentsArray,
}) => {
  return (
    <div className="flex flex-col gap-4 ">
      {studentsArray.map((student, i) => (
        <StudentCard
          key={`student-${i}`}
          studentId={student.studentId}
          studentName={student.studentName}
          gradesArray={student.gradesArray}
        />
      ))}
    </div>
  );
};
