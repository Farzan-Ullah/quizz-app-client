import React from "react";
import styles from "./DeleteQuiz.module.css";
function DeleteQuiz({ onDeleteConfirm, onCancel }) {
  return (
    <div className={styles.formContainer}>
      <p className={styles.title}>Are you confirm you want to delete?</p>
      <div className={styles.buttonContainer}>
        <button className={styles.deleteButton} onClick={onDeleteConfirm}>
          Confirm Delete
        </button>
        <button className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteQuiz;
