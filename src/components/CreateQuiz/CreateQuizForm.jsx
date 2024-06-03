import React, { useEffect, useState } from "react";
import styles from "../CreateQuiz/CreateQuizForm.module.css";
import QnAForm from "../QuizForms/QnAForm";
import PollForm from "../QuizForms/PollForm";

function CreateQuizForm({ onClose, quizToEdit, isEditMode }) {
  const [quizName, setQuizName] = useState("");
  const [quizType, setQuizType] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (isEditMode && quizToEdit) {
      setQuizName(quizToEdit.quizName);
      setQuizType(quizToEdit.quizType);
      setShowForm(true);
    }
  }, [isEditMode, quizToEdit]);

  useEffect(() => {
    localStorage.setItem("quizName", quizName);
  }, [quizName]);

  const handleQuizTypeChange = (type) => {
    setQuizType(type);
  };

  const handleQuiznameChange = (e) => {
    setQuizName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quizName.trim() === "" || quizType === "") {
      return;
    }
    setShowForm(true);
  };

  const handleBack = () => {
    setShowForm(false);
  };

  return (
    <>
      {!showForm && !isEditMode && (
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <input
              type="text"
              id="quizName"
              value={quizName}
              onChange={handleQuiznameChange}
              placeholder="Quiz name"
              required
            />
          </div>
          <div className={`${styles.formGroup} ${styles.quizTypeGroup}`}>
            <label>Quiz Type</label>
            <div className={styles.quizTypeButtons}>
              <button
                type="button"
                className={`${styles.quizTypeButton} ${
                  quizType === "QnA" ? styles.active : ""
                }`}
                onClick={() => handleQuizTypeChange("QnA")}
              >
                Q & A
              </button>
              <button
                type="button"
                className={`${styles.quizTypeButton} ${
                  quizType === "Poll" ? styles.active : ""
                }`}
                onClick={() => handleQuizTypeChange("Poll")}
              >
                Poll Type
              </button>
            </div>
          </div>
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.continueButton}
              onClick={handleSubmit}
            >
              Continue
            </button>
          </div>
        </form>
      )}
      {showForm && quizType === "QnA" && (
        <QnAForm
          quizName={quizName}
          onBack={handleBack}
          onSubmit={onClose}
          quizId={quizToEdit ? quizToEdit._id : null}
          isEditMode={isEditMode}
        />
      )}
      {showForm && quizType === "Poll" && (
        <PollForm
          quizName={quizName}
          onBack={handleBack}
          onSubmit={onClose}
          quizId={quizToEdit ? quizToEdit._id : null}
          isEditMode={isEditMode}
        />
      )}
    </>
  );
}

export default CreateQuizForm;
