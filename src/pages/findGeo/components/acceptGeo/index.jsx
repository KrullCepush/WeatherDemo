import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

function AcceptGeo({ city = "", reject }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <div className="f-title">You are in</div>
        <div className="f-displayLarge">{city}</div>
      </div>
      <div className={styles.btn}>
        <Link to="/home"> Yes </Link>
        <button onClick={() => reject()}>No</button>
      </div>
    </div>
  );
}

export default AcceptGeo;
