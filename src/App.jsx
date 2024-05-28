import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import QuizTestPage from "./pages/QuizTestPage/QuizTestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/quiz-test/:createdQuizId" element={<QuizTestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
