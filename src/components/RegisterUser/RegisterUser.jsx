import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { registerUser } from "../../apis/auth";
import styles from "./RegisterUser.module.css";
import toast, { Toaster } from "react-hot-toast";

export default function RegisterUser({ onSuccess }) {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;
    // Validation
    const errors = validateForm(username, email, password, confirmPassword);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    try {
      const response = await registerUser(formData);
      if (response) {
        toast.success("User registered successfully");
        onSuccess();
        // navigate("/login");
      } else {
        toast.error("User already registered");
      }
    } catch (error) {
      toast.error("Error registering user");
      console.log(error);
    }
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
  };

  const validateForm = (username, email, password, confirmPassword) => {
    const errors = {};
    if (!username) {
      errors.username = "Invalid name";
    }
    if (!email) {
      errors.email = "Invalid Email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!password) {
      errors.password = "invalid password";
    } else if (password.length < 4) {
      errors.password = "Weak Password";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm password";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  return (
    <div className={styles.container}>
      <form className={styles.registerForm}>
        <div className={styles.formRow}>
          <label htmlFor="username">Name</label>
          <input
            id="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        {errors.username && <p className={styles.error}>{errors.username}</p>}

        <div className={styles.formRow}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {errors.email && <p className={styles.error}>{errors.email}</p>}

        <div className={styles.formRow}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        <div className={styles.formRow}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button className={styles.formBtn} type="submit" onClick={handleSubmit}>
          Register
        </button>
      </form>
      <Toaster />
    </div>
  );
}
