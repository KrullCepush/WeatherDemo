import React, { useState } from "react";
import clsx from "clsx";

import styles from "./styles.module.scss";
import List from "./List";
import listGeo from "~/static/city.list.json";

function SelectGeo({ redirectTo }) {
  const [results, setResults] = useState([]);
  const [position, setPosition] = useState(null);
  const [value, setValue] = useState("");
  const [visibleHelp, setVisibleHelp] = useState(null);

  function onChange(e) {
    setValue(e.target.value);
    findResults(e.target.value);
  }

  function findResults(text) {
    if (text.length > 2) {
      setVisibleHelp(true);
      setResults(
        listGeo.filter((element) => {
          return element.name.match(text);
        })
      );
    } else {
      setVisibleHelp(null);
    }
  }

  function chooseResult(result) {
    setPosition(result);
  }

  return (
    <div className={styles.wrap}>
      {position ? (
        <div className={styles.title}>
          <div className="f-title">You are in</div>
          <div className="f-displayLarge">{position?.name}</div>
        </div>
      ) : (
        <div className={styles.title}>
          <div className="f-title">we didn't find you</div>
          <div className="f-subTitle">please choose your position</div>
        </div>
      )}

      <input value={value} onChange={onChange} placeholder="Moscow" />
      <div className={clsx(!visibleHelp && styles.disable, styles.help)}>
        <List results={results} choose={chooseResult} />
      </div>
      <button
        disabled={!position}
        className="f-button"
        onClick={() => redirectTo(position)}
      >
        yes
      </button>
    </div>
  );
}

export default SelectGeo;
