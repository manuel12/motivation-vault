import React, { Fragment } from "react";
import LabeledInput from "./LabeledInput";

const AddBookResourceForm = (props) => {
  return (
    <Fragment>
      <LabeledInput
        error={props.subtitleError}
        item="Subtitle"
        itemType="text"
        value={props.subtitle}
        onChange={(e) => {
          props.setSubtitle(e.target.value);
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
        }}
        dataAttr="isbn-input"
      />
    </Fragment>
  );
}

export default AddBookResourceForm;
