import React from "react";

import styles from "./styles.module.scss";

function Container(props) {
  return <section className={styles.container}>{props.children}</section>;
}

export default Container;
