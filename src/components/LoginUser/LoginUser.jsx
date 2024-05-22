import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginUser.module.css";
import { loginUser } from "../../apis/auth";
import toast, { Toaster } from "react-hot-toast";

function LoginUser({ onSuccess }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // const handleChange = (e) => {
  //   const { id, value } = e.target;
  //   setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  //   console.log(formData);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    // Validation
    const errors = validateForm(email, password);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    try {
      const response = await loginUser(formData);
      if (response) {
        toast.success("Login Successfull");
        setTimeout(() => {
          navigate("/dashboard"); // Navigate to /dashboard after 2 seconds
        }, 1000);
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("Login Failed!");
      console.log(error);
    }
    setFormData({ email: "", password: "" });
  };

  const validateForm = (email, password) => {
    const errors = {};

    if (!email) {
      errors.email = "Invalid Email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!password) {
      errors.password = "invalid password";
    }
    //  else if (password.length < 4) {
    //   errors.password = "Weak Password";
    // }
    return errors;
  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer}>
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
        <button className={styles.formBtn} type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default LoginUser;
