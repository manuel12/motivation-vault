import React, { Fragment } from "react";
import LabeledInput from "./LabeledInput";

const MotivationalSpeechFormFields = (props) => {
  return (
    <Fragment>
      <LabeledInput
        error={props.youtubeUrlError}
        item="Youtube URL"
        itemType="text"
        value={props.youtubeUrl}
        onChange={(e) => {
          props.setYoutubeUrl(e.target.value);
          props.resourceDataUpdatedHandler && props.resourceDataUpdatedHandler();
        }}
        dataAttr="youtube-url-input"
      />
    </Fragment>
  );
}

export default MotivationalSpeechFormFields;
