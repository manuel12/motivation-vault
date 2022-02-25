import React, { useState } from "react";
import { isValidURL } from "../utils";
import LabeledInput from "./LabeledInput";
import useToken from "./useToken";

function AddPodcastEpisodeResourceForm(props) {
  const { token } = useToken();

  let [title, setTitle] = useState("");
  let [author, setAuthor] = useState("");
  let [description, setDescription] = useState("");

  // => Podcast Episode fields
  let [podcast, setPodcast] = useState("");
  let [youtubeEpisodeUrl, setYoutubeEpisodeUrl] = useState("");
  let [spotifyEpisodeUrl, setSpotifyEpisodeUrl] = useState("");

  let [valueOne, setValueOne] = useState("");
  let [valueTwo, setValueTwo] = useState("");
  let [valueThree, setValueThree] = useState("");

  // => Podcast Episode fields

  let [titleError, setTitleError] = useState("");
  let [authorError, setAuthorError] = useState("");

  let [podcastError, setPodcastError] = useState("");
  let [youtubeEpisodeUrlError, setYoutubeEpisodeUrlError] = useState("");
  let [spotifyEpisodeUrlError, setSpotifyEpisodeUrlError] = useState("");

  const validate = () => {
    let validInput = true;

    if (!title) {
      setTitleError("Title cannot be empty!");
      validInput = false;
    } else {
      setTitleError("");
    }

    if (!author) {
      setAuthorError("Author cannot be empty!");
      validInput = false;
    } else {
      setAuthorError("");
    }

    if (!podcast) {
      setPodcastError("Podcast cannot be empty!");
      validInput = false;
    } else {
      setPodcastError("");
    }

    if (!youtubeEpisodeUrl) {
      setYoutubeEpisodeUrlError("Youtube episode URL cannot be empty!");
      validInput = false;
    } else if (!isValidURL(youtubeEpisodeUrl)) {
      setYoutubeEpisodeUrlError("Youtube episode URL has to be a valid url!");
      validInput = false;
    } else {
      setYoutubeEpisodeUrlError("");
    }

    if (!spotifyEpisodeUrl) {
      setSpotifyEpisodeUrlError("Spotify episode URL cannot be empty!");
      validInput = false;
    } else if (!isValidURL(spotifyEpisodeUrl)) {
      setSpotifyEpisodeUrlError("Spotify episode URL has to be a valid url!");
      validInput = false;
    } else {
      setSpotifyEpisodeUrlError("");
    }

    return validInput;
  };

  const submitClicked = (e) => {
    e.preventDefault();

    if (validate()) {
      const newResource = {
        title: title,
        author: author,
        description: description,
        value_one: valueOne,
        value_two: valueTwo,
        value_three: valueThree,
      };

      newResource["from_podcast"] = podcast;
      newResource["youtube_episode_url"] = youtubeEpisodeUrl;
      newResource["spotify_episode_url"] = spotifyEpisodeUrl;

      fetch(`http://127.0.0.1:8000/api/podcast-episodes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(newResource),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          console.log(resp);
        })
        .catch((error) => console.error(error));

      setTitle("");
      setAuthor("");
      setDescription("");

      setPodcast("");
      setSpotifyEpisodeUrl("");
      setYoutubeEpisodeUrl("");

      setValueOne("");
      setValueTwo("");
      setValueThree("");

      props.submitClicked();
    }
  };

  return (
    <form className="add-podcast-episode-form" onSubmit={submitClicked}>
      <h3>Add Podcast Episode Form</h3>
      <LabeledInput
        error={titleError}
        item="Title"
        itemType="text"
        value={title}
        onChange={(evt) => {
          setTitle(evt.target.value);
        }}
        dataAttr="title-input"
      />

      <LabeledInput
        error={authorError}
        item="Author"
        itemType="text"
        value={author}
        onChange={(evt) => {
          setAuthor(evt.target.value);
        }}
        dataAttr="author-input"
      />

      <textarea
        id="description"
        name="description"
        placeholder="Description..."
        rows="4"
        cols="50"
        value={description}
        onChange={(evt) => {
          setDescription(evt.target.value);
        }}
        data-test="description-input"
      ></textarea>

      {podcastError ? (
        <label data-test="select-podcast-error">*{podcastError}</label>
      ) : null}
      <select
        name="select-podcast"
        id="select-podcast"
        value={podcast}
        onChange={(evt) => {
          setPodcast(evt.target.value);
        }}
        data-test="select-podcast"
      >
        <option value="">Select podcast</option>
        <option value="83">Impact Theory</option>
        <option value="81">School of Greatness</option>
        <option value="82">The Tim Ferris Show</option>
      </select>

      <LabeledInput
        error={spotifyEpisodeUrlError}
        item="Spotify Episode Url"
        itemType="text"
        value={spotifyEpisodeUrl}
        onChange={(evt) => {
          setSpotifyEpisodeUrl(evt.target.value);
        }}
        dataAttr="spotify-ep-url-input"
      />

      <LabeledInput
        error={youtubeEpisodeUrlError}
        item="Youtube Episode Url"
        itemType="text"
        value={youtubeEpisodeUrl}
        onChange={(evt) => {
          setYoutubeEpisodeUrl(evt.target.value);
        }}
        dataAttr="youtube-ep-url-input"
      />

      <LabeledInput
        item="Value One"
        itemType="text"
        value={valueOne}
        onChange={(evt) => {
          setValueOne(evt.target.value);
        }}
        dataAttr="value-one-input"
      />

      <LabeledInput
        item="Value Two"
        itemType="text"
        value={valueTwo}
        onChange={(evt) => {
          setValueTwo(evt.target.value);
        }}
        dataAttr="value-two-input"
      />

      <LabeledInput
        item="Value Three"
        itemType="text"
        value={valueThree}
        onChange={(evt) => {
          setValueThree(evt.target.value);
        }}
        dataAttr="value-three-input"
      />

      <button id="submit" type="submit" data-test="submit">
        Add Podcast Episode
      </button>
    </form>
  );
}

export default AddPodcastEpisodeResourceForm;
