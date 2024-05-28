import React, { useEffect, useState } from "react";
import styles from "./StatCard.module.css";
import { getUserStats } from "../../apis/auth";

function StatCard() {
  const [stats, setStats] = useState({ quizCreated: 0, questionsCreated: 0 });

  useEffect(() => {
    const fetchStats = async (userId) => {
      const userStats = await getUserStats(userId);
      setStats({
        quizCreated: userStats.quizCreated,
        questionsCreated: userStats.questionsCreated,
      });
    };

    fetchStats();
  }, []);

  return (
    <>
      {" "}
      <div className={styles.statCard}>
        <div className={`${styles.count} ${styles.firstCount}`}>
          <span>{stats.quizCreated}</span> quiz created
        </div>
      </div>
      <div className={styles.statCard}>
        <div className={`${styles.count} ${styles.secondCount}`}>
          <span>{stats.questionsCreated}</span> questions created
        </div>
      </div>
      <div className={styles.statCard}>
        <div className={`${styles.count} ${styles.thirdCount}`}>
          <span>1.4k</span> Total Impressions
        </div>
      </div>
    </>
  );
}

export default StatCard;
