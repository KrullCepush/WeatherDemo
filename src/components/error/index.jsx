import React from "react";

import styles from "./styles.module.scss";

function ErrorComponent() {
  return (
    <div className={styles.error}>
      <div className="f-displayLarge">Что-то упало</div>
      <div className="f-title">
        Скорее всего что-то на сервере, я не виноват :c
      </div>
    </div>
  );
}

export default ErrorComponent;
