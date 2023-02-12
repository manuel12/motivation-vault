import React, { useEffect, useState } from "react";
import { cleanUpUrl, getUrlSearchParam } from "../utils";
import classes from "../css/AlertMessage.module.css";

const AlertMessage = () => {
  const resourceUpdated = getUrlSearchParam("updated");
  const resourceDeleted = getUrlSearchParam("deleted");

  let successMessage = "";

  if (resourceUpdated) {
    successMessage = "Resource successfully updated!";
  } else if (resourceDeleted) {
    successMessage = "Resource successfully deleted!";
  }

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(successMessage);
      cleanUpUrl();
    }, 500);
  }, []);

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
      <span
        className={classes["close-btn"]}
        onClick={closeButtonClickedHandler}
      >
        &times;
      </span>
      {successMessage}
    </div>
  );
};

export default AlertMessage;
