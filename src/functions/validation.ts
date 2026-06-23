import * as z from "zod";
import type { StudentGradeValue } from "../components/Templates/StudentPointsAndGrades/StudentPointsAndGrades.types";
import type { GradeSettingsRowType } from "../components/Organisms/GradeSettingsRowWrapper/GradeSettingsRowWrapper.types";

const VALID_PATHS = [
  "entry",
  "settings",
  "pass",
  "max",
  "grade",
  "points",
] as const;

export type ValidationResult = {
  issues?: PathType[] | undefined;
  message: string[] | undefined;
};

export type PathType = (typeof VALID_PATHS)[number];

type GradeInputReturnType = {
  points: number;
  grade:
    | ""
    | "ni-pristopil"
    | "grade-5"
    | "grade-6"
    | "grade-7"
    | "grade-8"
    | "grade-9"
    | "grade-10";
  passValue: number;
  maxValue: number;
  checked: boolean;
};

type GradeSettingsReturnType = {
  passValue: number;
  maxValue: number;
  checked: boolean;
};

const invalidGrade = z.literal("");
const noGrade = z.literal("ni-pristopil"); // do noGrade.parse(value) to check if element is valid
const failGrade = z.literal("grade-5");
const passGrade = z.literal([
  "grade-6",
  "grade-7",
  "grade-8",
  "grade-9",
  "grade-10",
]);

//looseObject ce zelim vidt keri kljuci so podani, ampak nedefinirani
const GradeSettings = z
  .object({
    passValue: z.coerce.number({ error: "Vnešene točke morajo biti število." }),
    maxValue: z.coerce.number({ error: "Vnešene točke morajo biti število." }),
    checked: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (!Number.isNaN(data.passValue) && data.passValue < 1) {
      ctx.addIssue({
        code: "custom",
        message: "Št. točk mora biti večje od 0.",
        path: ["settings", "pass"],
      });
    }
    if (!Number.isNaN(data.maxValue) && data.maxValue < 1) {
      ctx.addIssue({
        code: "custom",
        message: "Št. točk mora biti večje od 0.",
        path: ["settings", "max"],
      });
    }

    if (data.passValue && data.maxValue && data.maxValue <= data.passValue) {
      ctx.addIssue({
        code: "custom",
        message: "Max št. točk mora biti večje od min št. točk",
        path: ["settings", "pass", "max"],
      });
    }
  });

const GradeEntry = z.object({
  points: z.coerce.number(),
  grade: z.union([noGrade, failGrade, passGrade, invalidGrade]),
});

const GradeEvalObject = z
  .object({
    ...GradeSettings.shape,
    ...GradeEntry.shape,
  })
  .superRefine((data, ctx) => {
    if (invalidGrade.safeParse(data.grade).success) {
      ctx.addIssue({
        code: "custom",
        message: "Prosimo, vnesite oceno.",
        path: ["entry", "grade"],
      });
    }
    if (data.checked) {
      if (
        (Number.isNaN(data.points) || data.points === 0) &&
        !noGrade.safeParse(data.grade).success
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Prosimo, vnesite točke.",
          path: ["entry", "grade", "points"],
        });
      }
      if (
        data.points > 0 &&
        noGrade.safeParse(data.grade).success &&
        !invalidGrade.safeParse(data.grade).success
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Vrednost točk je za izbrano oceno previsoka.",
          path: ["entry", "grade", "points"],
        });
      }
      if (
        data.points > 0 &&
        data.points < data.passValue &&
        !failGrade.safeParse(data.grade).success &&
        !noGrade.safeParse(data.grade).success
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Vrednost točk je za izbrano oceno prenizka.",
          path: ["entry", "grade", "points"],
        });
      }
      if (
        data.points >= data.passValue &&
        !passGrade.safeParse(data.grade).success &&
        !noGrade.safeParse(data.grade).success &&
        !invalidGrade.safeParse(data.grade).success
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Ocena je za vnešene točke prenizka.",
          path: ["entry", "grade", "points"],
        });
      }
    }
  });

const issueTypeguard = (issue: string): issue is PathType => {
  return VALID_PATHS.includes(issue as PathType); // typeFest pkg -> pretvori type v array, bolje/lažje v obratno smer
};

export const validateGradeSettings = (
  gradeSettingsRow: GradeSettingsRowType,
): ValidationResult => {
  const results = GradeSettings.safeParse({
    maxValue: gradeSettingsRow.maxData.inputValue,
    passValue: gradeSettingsRow.passData.inputValue,
    checked: gradeSettingsRow.checked,
  });

  return validateUpdate(results, gradeSettingsRow.checked);
};

export const validateGradeInput = (
  gradeSettingsRow: GradeSettingsRowType,
  studentGradeValue: StudentGradeValue,
): ValidationResult => {
  const results = GradeEvalObject.safeParse({
    maxValue: gradeSettingsRow.maxData.inputValue,
    passValue: gradeSettingsRow.passData.inputValue,
    checked: gradeSettingsRow.checked,
    points: studentGradeValue.points.value,
    grade: studentGradeValue.grade.value,
  });

  return validateUpdate(results, gradeSettingsRow.checked);
};

export const validateUpdate = (
  results: z.ZodSafeParseResult<GradeInputReturnType | GradeSettingsReturnType>,
  enabled: boolean,
): ValidationResult => {
  const errors: string[] = [];
  const issues: PathType[] = [];

  if (!enabled || results.success) return { message: undefined };

  results.error.issues.forEach((error) => {
    if (errors.indexOf(error.message) < 0) errors.push(error.message);
    error.path.forEach((target) => {
      const targetEl = target.toString();
      if (!issueTypeguard(targetEl)) return;
      if (issues.indexOf(targetEl) < 0) issues.push(targetEl);
    });
  });

  return { issues: issues, message: errors };
};

// grqdeEval:
// - vnešeni settingsi, ampak nevnešen grade entry row
// - On toggle grade: hide points input, validate only grade
// - add student ID to fieldset radio
