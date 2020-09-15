import React from "react";
import styles from "./styles.module.scss";

function LoadingGeo() {
  return (
    <div className={styles.wrap}>
      <div className="f-displayMedium">looking for your location</div>
      <img src={require("./loading.gif").default} alt="#" />
    </div>
  );
}

export default LoadingGeo;
