import React from 'react';
import styles from './LockMessage.module.css'; // Import CSS Module

const LockMessage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.lock}></div>
      <div className={styles.message}>
        <h1>Access to this page is restricted</h1>
        <p>Please check with the site admin if you believe this is a mistake.</p>
      </div>
    </div>
  );
};

export default LockMessage;
