import React, { useState } from "react";
import classes from "../css/AlertMessage.module.css";

const AlertMessage = (props) => {
  const [display, setDisplay] = useState(true);

  const closeButtonClickedHandler = () => {
    setDisplay(false);
  };

  return (
    <div className={display ? classes["alert"] : classes["no-display"]}>
      <span className={classes["closebtn"]} onClick={closeButtonClickedHandler}>
        &times;
      </span>
      {props.message}
    </div>
  );
};

export default AlertMessage;
