import React, { useState } from "react";

import styles from "./counters.module.css";

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <button type="button" className={styles.counter} onClick={handleClick}>
        Clicked {count} times
      </button>
    </div>
  );
}

export default function MyApp() {
  return <MyButton />;
}
