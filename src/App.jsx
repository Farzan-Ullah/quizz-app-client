import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
