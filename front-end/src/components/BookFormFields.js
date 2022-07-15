import React, { Fragment } from "react";
import LabeledInput from "./LabeledInput";

const BookFormFields = (props) => {
  return (
    <Fragment>
      <LabeledInput
        error={props.subtitleError}
        item="Subtitle"
        itemType="text"
        value={props.subtitle}
        onChange={(e) => {
          props.setSubtitle(e.target.value);
          props.resourceDataUpdatedHandler && props.resourceDataUpdatedHandler();
        }}
        dataAttr="subtitle-input"
      />

      <LabeledInput
        error={props.isbnError}
        item="ISBN-13"
        itemType="text"
        value={props.isbn}
        onChange={(e) => {
          props.setISBN(e.target.value);
          props.resourceDataUpdatedHandler && props.resourceDataUpdatedHandler();
        }}
        dataAttr="isbn-input"
      />
    </Fragment>
  );
}

export default BookFormFields;
