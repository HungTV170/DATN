import React from 'react';
import styles from './LockMessage.module.css'; // Import CSS Module
import { Link } from "react-router-dom";
const Authorize = () => {
  return (
    <div className={styles.container}>
      <div className={styles.lock}></div>
      <div className={styles.message}>
        <h1>Try Login Agin</h1>
        <p><Link to={process.env.REACT_APP_PATH_LOGIN}>Log in</Link></p>
      </div>
    </div>
  );
};

export default Authorize;
