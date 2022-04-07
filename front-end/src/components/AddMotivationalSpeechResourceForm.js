import React, { Fragment } from "react";
import LabeledInput from "./LabeledInput";

function AddMotivationalSpeechResourceForm(props) {
  return (
    <Fragment>
      <LabeledInput
        error={props.youtubeUrlError}
        item="Youtube URL"
        itemType="text"
        value={props.youtubeUrl}
        onChange={(e) => {
          props.setYoutubeUrl(e.target.value);
        }}
        dataAttr="youtube-url-input"
      />
    </Fragment>
  );
}

export default AddMotivationalSpeechResourceForm;
