import React, { Fragment } from "react";
import LabeledInput from "./LabeledInput";

const PodcastFormFields = (props) => {
  return (
    <Fragment>
      <LabeledInput
        error={props.websiteUrlError}
        item="Website URL"
        itemType="text"
        value={props.websiteUrl}
        onChange={(e) => {
          props.setWebsiteUrl(e.target.value);
          props.resourceDataUpdatedHandler && props.resourceDataUpdatedHandler();
        }}
        dataAttr="website-url-input"
      />

      <LabeledInput
        error={props.spotifyPageUrlError}
        item="Spotify URL"
        itemType="text"
        value={props.spotifyPageUrl}
        onChange={(e) => {
          props.setSpotifyPageUrl(e.target.value);
          props.resourceDataUpdatedHandler && props.resourceDataUpdatedHandler();
        }}
        dataAttr="spotify-page-url-input"
      />

      <LabeledInput
        error={props.youtubePageUrlError}
        item="Youtube URL"
        itemType="text"
        value={props.youtubePageUrl}
        onChange={(e) => {
          props.setYoutubePageUrl(e.target.value);
          props.resourceDataUpdatedHandler && props.resourceDataUpdatedHandler();
        }}
        dataAttr="youtube-page-url-input"
      />
    </Fragment>
  );
}

export default PodcastFormFields;
