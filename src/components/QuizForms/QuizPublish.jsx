import React from "react";
import styles from "./QuizPublish.module.css";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { getQuizDetails } from "../../apis/quiz";
function QuizPublish({ quizId, onClose }) {
  const quizLink =
    window.location.origin +
    "/quiz-test/" +
    localStorage.getItem("createdQuizId");

  function copyToClipboard(quizId) {
    navigator.clipboard.writeText(quizId).then(
      () => {
        toast.success("Link copied to clipboard!", {
          position: "top-center",
          autoClose: "1000",
          closeOnClick: false,
          transition: Slide,
        });

        console.log("URL copied to clipboard:", quizId);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>Congrats your Quiz is Published!</h2>
        <input
          type="text"
          className={styles.quizLinkInput}
          value={quizLink}
          readOnly
        />
        <button
          className={styles.copyButton}
          onClick={() => copyToClipboard(quizLink)}
        >
          Share
        </button>

        <ToastContainer
          closeButton={false}
          autoClose={1000}
          closeOnClick={false}
          rtl={false}
          pauseOnHover={false}
          toastClassName={styles.toast}
          position="top-center"
          transition={Slide}
        />
      </div>
    </div>
  );
}

export default QuizPublish;
