import React, { useEffect, useState } from "react";
import styles from "./StatCard.module.css";
import { getUserStats } from "../../apis/auth";
import { getAllQuizzes } from "../../apis/quiz";

function StatCard({ userId }) {
  const [stats, setStats] = useState({
    quizCreated: 0,
    questionsCreated: 0,
    totalImpressions: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch user-specific stats
        const userStats = await getUserStats(userId);
        setStats((prevStats) => ({
          ...prevStats,
          quizCreated: userStats.quizCreated,
          questionsCreated: userStats.questionsCreated,
        }));

        // Fetch all quizzes to calculate total impressions
        const allQuizzes = await getAllQuizzes();
        const totalImpressions = allQuizzes.reduce(
          (acc, quiz) => acc + quiz.totalImpressions,
          0
        );
        setStats((prevStats) => ({
          ...prevStats,
          totalImpressions,
        }));
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [userId]);

  return (
    <>
      <div className={styles.statCard}>
        <div className={`${styles.count} ${styles.firstCount}`}>
          <span>{stats.quizCreated}</span> quizzes created
        </div>
      </div>
      <div className={styles.statCard}>
        <div className={`${styles.count} ${styles.secondCount}`}>
          <span>{stats.questionsCreated}</span> questions created
        </div>
      </div>
      <div className={styles.statCard}>
        <div className={`${styles.count} ${styles.thirdCount}`}>
          <span>{stats.totalImpressions}</span> Total Impressions
        </div>
      </div>
    </>
  );
}

export default StatCard;
