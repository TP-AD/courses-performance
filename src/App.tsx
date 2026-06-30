import { StudentPointsAndGrades } from "./components/Templates/StudentPointsAndGrades/StudentPointsAndGrades";
import { GradePointsProvider } from "./context/GradePointsProvider";

function App() {
  return (
    <GradePointsProvider>
      <StudentPointsAndGrades />
    </GradePointsProvider>
  );
}

export default App;
