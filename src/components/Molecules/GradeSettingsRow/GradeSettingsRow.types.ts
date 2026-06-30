export type GradeSettingsRowChange =
  | { field: "toggle"; value: boolean }
  | { field: "passInput" | "maxInput"; value: string };
