import React from "react";
import styles from "./signup.module.css"; // Import your CSS module
import { useRouter } from "next/router";
import LoginForm from "../../components/signupForm/signupForm"
const RegisterCard = () => {
  const router = useRouter();

  

  return (
    <>
      <header className={styles.header}>
        {/* <h1 className={styles.title}>Destinations</h1>
        <nav>Home ➔ Destinations</nav> */}
      </header>
      <div className={styles["card-container"]}>
      <LoginForm />
     </div>
    </>
  );
};

export default RegisterCard;
