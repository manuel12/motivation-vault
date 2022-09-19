import React, { Fragment, useEffect, useState } from "react";
import { API } from "../api-service";
import LabeledInput from "./LabeledInput";

const PodcastEpisodeFormFields = (props) => {
  const [podcastsTitlesAndIds, setPodcastsTitlesAndIds] = useState([]);

  useEffect(() => {
    API.getPodcastsTitlesAndIds(setPodcastsTitlesAndIds);
  }, []);

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
          props.resourceDataUpdatedHandler &&
            props.resourceDataUpdatedHandler();
        }}
        data-test="select-podcast"
      >
        <option value="">Select podcast</option>
        {podcastsTitlesAndIds.map((podcast) => (
          <option value={podcast.id}>{podcast.title}</option>
        ))}
      </select>

      <LabeledInput
        error={props.spotifyEpisodeUrlError}
        item="Spotify Episode Url"
        itemType="text"
        value={props.spotifyEpisodeUrl}
        onChange={(e) => {
          props.setSpotifyEpisodeUrl(e.target.value);
          props.resourceDataUpdatedHandler &&
            props.resourceDataUpdatedHandler();
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
          props.resourceDataUpdatedHandler &&
            props.resourceDataUpdatedHandler();
        }}
        dataAttr="youtube-ep-url-input"
      />
    </Fragment>
  );
};

export default PodcastEpisodeFormFields;
