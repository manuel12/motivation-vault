import React, { Fragment } from "react";
import LabeledInput from "./LabeledInput";

function AddPodcastEpisodeResourceForm(props) {
  return (
    <Fragment>
      {props.podcastError ? (
        <label data-test="select-podcast-error">*{props.podcastError}</label>
      ) : null}
      <select
        name="select-podcast"
        id="select-podcast"
        value={props.podcast}
        onChange={(e) => {
          props.setPodcast(e.target.value);
        }}
        data-test="select-podcast"
      >
        <option value="">Select podcast</option>
        <option value="83">Impact Theory</option>
        <option value="81">School of Greatness</option>
        <option value="82">The Tim Ferris Show</option>
      </select>

      <LabeledInput
        error={props.spotifyEpisodeUrlError}
        item="Spotify Episode Url"
        itemType="text"
        value={props.spotifyEpisodeUrl}
        onChange={(e) => {
          props.setSpotifyEpisodeUrl(e.target.value);
        }}
        dataAttr="spotify-ep-url-input"
      />

      <LabeledInput
        error={props.youtubeEpisodeUrlError}
        item="Youtube Episode Url"
        itemType="text"
        value={props.youtubeEpisodeUrl}
        onChange={(e) => {
          props.setYoutubeEpisodeUrl(e.target.value);
        }}
        dataAttr="youtube-ep-url-input"
      />
    </Fragment>
  );
}

export default AddPodcastEpisodeResourceForm;
