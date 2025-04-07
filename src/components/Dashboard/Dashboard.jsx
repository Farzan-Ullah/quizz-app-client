import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import StatCard from "./StatCard";
import QuizCard from "./QuizCard";
import Analytics from "./Analytics";
import Modal from "../CreateQuiz/Modal";
import CreateQuizForm from "../CreateQuiz/CreateQuizForm";
import { getAllQuizzes } from "../../apis/quiz";

function Dashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [isModalOpen, setModalOpen] = useState(false);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const allQuizzes = await getAllQuizzes();

        const filteredQuizzes = allQuizzes.filter(
          (quiz) => quiz.totalImpressions < 10
        );
        setQuizzes(filteredQuizzes);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    }
    fetchQuizzes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.logo}>QUIZZIE</div>
        <div className={styles.navBtns}>
          <button
            className={`${styles.navBtn} ${
              activeSection === "Dashboard" ? styles.active : ""
            }`}
            onClick={() => setActiveSection("Dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`${styles.navBtn} ${
              activeSection === "Analytics" ? styles.active : ""
            }`}
            onClick={() => setActiveSection("Analytics")}
          >
            Analytics
          </button>
          <button
            className={`${styles.navBtn} ${
              activeSection === "Create Quiz" ? styles.active : ""
            }`}
            onClick={() => setModalOpen(true)}
          >
            Create Quiz
          </button>
        </div>
        <div className={styles.logout} onClick={handleLogout}>
          LOGOUT
        </div>
      </div>
      <div className={styles.mainContent}>
        {activeSection === "Dashboard" && (
          <div>
            <div className={styles.stats}>
              <StatCard />
            </div>
            <div className={styles.trendingQuizzes}>
              <h2>Trending Quizzes</h2>
              <div className={styles.quizGrid}>
                {quizzes.map((quiz, index) => (
                  <QuizCard
                    key={index}
                    title={quiz.quizName}
                    createdOn={formatDate(quiz.createdAt)}
                    attempts={quiz.totalImpressions}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        {activeSection === "Analytics" && (
          <div className={styles.analyticsTable}>
            
            <Analytics quizzes={quizzes} formatDate={formatDate}/>
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <CreateQuizForm onClose={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default Dashboard;
