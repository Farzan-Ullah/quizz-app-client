import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import StatCard from "./StatCard";
import QuizCard from "./QuizCard";
import Modal from "../CreateQuiz/Modal";
import CreateQuizForm from "../CreateQuiz/CreateQuizForm";

function Dashboard() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("Dashboard");
  const [isModalOpen, setModalOpen] = useState(false);

  const quizzes = Array(50).fill({
    title: "Quiz 1",
    createdOn: "04 Sep, 2023",
    attempts: 667,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
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
                  <QuizCard key={index} {...quiz} />
                ))}
              </div>
            </div>
          </div>
        )}
        {activeSection === "Analytics" && (
          <div>
            {/* Replace this with your Analytics component/content */}
            <h2>Analytics Content</h2>
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
