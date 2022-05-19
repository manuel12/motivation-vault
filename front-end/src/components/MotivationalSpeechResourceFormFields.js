import React, { Fragment } from "react";
import LabeledInput from "./LabeledInput";

const MotivationalSpeechResourceFormFields = (props) => {
  return (
    <Fragment>
      <LabeledInput
        error={props.youtubeUrlError}
        item="Youtube URL"
        itemType="text"
        value={props.youtubeUrl}
        onChange={(e) => {
          props.resourceDataUpdatedHandler();
          props.setYoutubeUrl(e.target.value);
        }}
        dataAttr="youtube-url-input"
      />
    </Fragment>
  );
}

export default MotivationalSpeechResourceFormFields;
