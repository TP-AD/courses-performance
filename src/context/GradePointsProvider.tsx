import { useState, type FC, type PropsWithChildren } from "react";
import GradePointsContext from "./GradePointsContext";

export const GradePointsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [val, setVal] = useState<string>("Test value");
  return (
    <GradePointsContext.Provider value={{ val, setVal }}>
      {children}
    </GradePointsContext.Provider>
  );
};
