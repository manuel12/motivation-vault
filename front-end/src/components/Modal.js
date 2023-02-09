import React, { Fragment } from "react";
import classes from "../css/Modal.module.css";

const Modal = (props) => {
  return (
    <Fragment>
      <div className={classes["backdrop"]}></div>
      <div className={classes["modal-container"]} data-test="modal-container">
        <div className={classes["modal"]}>
          <div className={classes["header"]}>
            <h3 className={classes["header-text"]}>{props.heading}</h3>
          </div>
          <div className={classes["question"]}>
            <p>{props.question}</p>
          </div>
          <div class={classes["button-container"]}>
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
