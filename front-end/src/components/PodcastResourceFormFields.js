import React, { Fragment } from "react";
import LabeledInput from "./LabeledInput";

const PodcastResourceFormFields = (props) => {
  return (
    <Fragment>
      <LabeledInput
        error={props.websiteUrlError}
        item="Website URL"
        itemType="text"
        value={props.websiteUrl}
        onChange={(e) => {
          props.resourceDataUpdatedHandler();
          props.setWebsiteUrl(e.target.value);
        }}
        dataAttr="website-url-input"
      />

      <LabeledInput
        error={props.spotifyPageUrlError}
        item="Spotify URL"
        itemType="text"
        value={props.spotifyPageUrl}
        onChange={(e) => {
          props.resourceDataUpdatedHandler();
          props.setSpotifyPageUrl(e.target.value);
        }}
        dataAttr="spotify-page-url-input"
      />

      <LabeledInput
        error={props.youtubePageUrlError}
        item="Youtube URL"
        itemType="text"
        value={props.youtubePageUrl}
        onChange={(e) => {
          props.resourceDataUpdatedHandler();
          props.setYoutubePageUrl(e.target.value);
        }}
        dataAttr="youtube-page-url-input"
      />
    </Fragment>
  );
}

export default PodcastResourceFormFields;
