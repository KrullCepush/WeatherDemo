import React from "react";
import styles from "./styles.module.scss";

function List({ results = [], choose }) {
  return (
    <div className={styles.list}>
      <ul>
        {results.map((result) => (
          <li onClick={() => choose(result)} key={result?.id}>
            {result?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
