import React, { useEffect, useState } from "react";
import styles from "./StatCard.module.css";
import { getUserStats } from "../../apis/auth";
import { getAllQuizzes } from "../../apis/quiz";
// import { getQuizByUser } from "../../apis/quiz";

function StatCard({ userId }) {
  const formatNumber = (number) => {
    if (number < 1000) return number;
    const suffixes = ["", "k", "M", "B", "T"];
    const suffixIndex = Math.floor(("" + number).length / 3);
    let shortNumber = parseFloat(
      (suffixIndex !== 0
        ? number / Math.pow(1000, suffixIndex)
        : number
      ).toPrecision(2)
    );
    if (shortNumber % 1 !== 0) {
      shortNumber = shortNumber.toFixed(1);
    }
    return shortNumber + suffixes[suffixIndex];
  };

  const [stats, setStats] = useState({
    quizCreated: 0,
    questionsCreated: 0,
    totalImpressions: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userStats = await getUserStats(userId);
        setStats((prevStats) => ({
          ...prevStats,
          quizCreated: userStats.quizCreated,
          questionsCreated: userStats.questionsCreated,
        }));

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
          <span>{formatNumber(stats.totalImpressions)}</span> Total Impressions
        </div>
      </div>
    </>
  );
}

export default StatCard;
