import React, { useState } from "react";
import RegisterUser from "../../components/RegisterUser/RegisterUser";
import LoginUser from "../../components/LoginUser/LoginUser";
import styles from "./ProfilePage.module.css";
import toast, { Toaster } from "react-hot-toast";

function ProfilePage() {
  const [showRegister, setShowRegister] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.logo}>
          <h1>QUIZZIE</h1>
        </div>
        <div className={styles.profileBtns}>
          <button
            className={`${styles.profileBtn} ${
              showRegister ? styles.active : ""
            }`}
            onClick={() => setShowRegister(true)}
          >
            Sign Up
          </button>
          <button
            className={`${styles.profileBtn} ${
              !showRegister ? styles.active : ""
            }`}
            onClick={() => setShowRegister(false)}
          >
            Login
          </button>
        </div>
        <div className={styles.profileForm}>
          {showRegister ? (
            <RegisterUser
              onSuccess={() => {
                setShowRegister(false);
              }}
            />
          ) : (
            <LoginUser
              onSuccess={() => {
                toast.success("Logged in successfully");
              }}
            />
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default ProfilePage;
