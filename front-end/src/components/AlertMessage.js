import React, { useEffect, useState } from "react";
import classes from "../css/AlertMessage.module.css";

const AlertMessage = (props) => {
  const [display, setDisplay] = useState(props.display);

  useEffect(() => {
    setDisplay(props.display);
  }, [props.display]);

  const closeButtonClickedHandler = () => {
    setDisplay(false);
  };

  return (
    <div
      className={
        display
          ? `${classes["alert"]} ${classes["alert-displayed"]}`
          : `${classes["alert"]}`
      }
    >
      <span className={classes["closebtn"]} onClick={closeButtonClickedHandler}>
        &times;
      </span>
      Resource updated successfully!
      {/*props.message*/}
    </div>
  );
};

export default AlertMessage;
