import React from "react";

import styles from "./styles.module.scss";

function LoadingComponent() {
  return (
    <div className={styles.load}>
      <img src={require("@assets/img/load.gif").default} alt="loading..." />
    </div>
  );
}

export default LoadingComponent;
