import React, { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./styles.module.scss";

function Home() {
  const positionStore = useSelector((state) => state.currentPossition);

  return (
    <div>
      <div>{positionStore.name}</div>
    </div>
  );
}

export default Home;
