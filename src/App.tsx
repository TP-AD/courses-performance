import { StudentPointsAndGrades } from "./components/Templates/StudentPointsAndGrades/StudentPointsAndGrades";

function App() {
  // Amount of grades to put in and the pre-set for values
  // Expected to retrieve this from API - required data
  const APP_SETTINGS = {
    rows: {
      amount: 2,
      row_id_prefix: "ocena-",
      row_label_prefix: "Ocena ",
      points_label_prefix: "Točke ",
    },
    students: {
      amount: 2,
      student_name_prefix: "Študent ",
    },
  };

  const ROWS_CONFIG = Array.from(
    { length: APP_SETTINGS.rows.amount },
    (_, i) => ({
      id: APP_SETTINGS.rows.row_id_prefix + (i + 1),
      toggleData: { labelText: APP_SETTINGS.rows.row_label_prefix + (i + 1) },
      passData: {
        inputValue: "",
        labelText: "Min points",
        inputPlaceholder: "0",
        hasError: false,
      },
      maxData: {
        inputValue: "",
        labelText: "Max points",
        inputPlaceholder: "100",
        hasError: false,
      },
      pointsLabel: APP_SETTINGS.rows.points_label_prefix + (i + 1),
      checked: false,
      validationText: undefined,
    }),
  );

  const STUDENTS_CONFIG = Array.from(
    { length: APP_SETTINGS.students.amount },
    (_, i) => ({
      studentName: APP_SETTINGS.students.student_name_prefix + (i + 1),
      studentId: "123" + i,
    }),
  );

  // Existing values for grades and points per student
  // Expected to retrieve this from API - optional data, default is set if none provided
  const GRADES_CONFIG = {};

  // Array of students
  // Expected to retrieve this from API - required data

  return (
    <StudentPointsAndGrades
      rowsConfig={ROWS_CONFIG}
      gradesConfig={GRADES_CONFIG}
      studentsConfig={STUDENTS_CONFIG}
    />
  );
}

export default App;
