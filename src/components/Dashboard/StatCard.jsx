import React from "react";
import styles from "./StatCard.module.css";

function StatCard({ count, label }) {
  return (
    <>
      {" "}
      <div className={styles.statCard}>
        <div className={`${styles.count} ${styles.firstCount}`}>
          <span>12</span> quiz created
        </div>
      </div>
      <div className={styles.statCard}>
        <div className={`${styles.count} ${styles.secondCount}`}>
          <span>110</span> questions created
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
