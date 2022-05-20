import React, { Fragment } from "react";
import classes from "../css/Modal.module.css";

const Modal = (props) => {
  return (
    <Fragment>
      <div className={classes["backdrop"]}></div>
      <div className={classes["modal-container"]}>
        <div className={classes["modal"]}>
          <header className={classes["header"]}>
            <h2>Delete Resource</h2>
          </header>
          <div>
            <p>Are you sure you want to delete this resource?</p>
          </div>
          <footer>
            <button
              onClick={props.deleteButtonClicked}
              data-test="modal-delete-button"
            >
              Delete
            </button>
            <button
              onClick={props.cancelButtonClicked}
              data-test="modal-cancel-button"
            >
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
