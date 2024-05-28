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
  // const [isCopying, setIsCopying] = useState(false);
  // const [quizLink, setQuizLink] = useState("");

  // useEffect(() => {
  //   const fetchQuizData = async () => {
  //     if (quizId) {
  //       try {
  //         const quiz = await getQuizDetails(quizId);
  //         if (quiz) {
  //           const quizUrl = `${window.location.origin}/quiz-test/${quizId}`;
  //           // const quizUrl = window.location.origin + "/quiz-test/" + quizId;
  //           setQuizLink(quizUrl);
  //         } else {
  //           console.error("Quiz not found");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching quiz details:", error);
  //       }
  //     }
  //   };

  //   fetchQuizData();
  // }, [quizId]);

  function copyToClipboard(quizId) {
    // if (isCopying) return;
    // setIsCopying(true);

    navigator.clipboard.writeText(quizId).then(
      () => {
        toast.success("Link copied to clipboard!", {
          position: "top-center",
          autoClose: "1000",
          closeOnClick: false,
          transition: Slide,
        });

        console.log("URL copied to clipboard:", quizId);
        // setTimeout(() => {
        //   setIsCopying(false);
        // }, 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
        // setIsCopying(false);
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
          // disabled={isCopying}
        >
          Share
          {/* {isCopying ? "Copying..." : "Share"} */}
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
