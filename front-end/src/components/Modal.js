import React, { Fragment } from "react";
import classes from "../css/Modal.module.css";

const Modal = (props) => {
  return (
    <Fragment>
      <div className={classes["backdrop"]}></div>
      <div className={classes["modal-container"]}>
        <div className={classes["modal"]}>
          <header className={classes["header"]}>
            <h3>{props.heading}</h3>
          </header>
          <div className={classes["question"]}>
            <p>{props.question}</p>
          </div>
          <footer>
            <button
              className={classes["accept-button"]}
              onClick={props.acceptButtonClicked}
              data-test="modal-accept-button"
            >
              Delete
            </button>

            {props.cancelButtonClicked && (
              <button
                className={classes["cancel-button"]}
                onClick={props.cancelButtonClicked}
                data-test="modal-cancel-button"
              >
                Cancel
              </button>
            )}
          </footer>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
