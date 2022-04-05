import React, { useState } from "react";
import { isValidUrl } from "../utils";
import LabeledInput from "./LabeledInput";
import useToken from "./useToken";

function AddPodcastEpisodeResourceForm(props) {
  const { token } = useToken();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  // => Podcast Episode fields
  const [podcast, setPodcast] = useState("");
  const [youtubeEpisodeUrl, setYoutubeEpisodeUrl] = useState("");
  const [spotifyEpisodeUrl, setSpotifyEpisodeUrl] = useState("");

  const [valueOne, setValueOne] = useState("");
  const [valueTwo, setValueTwo] = useState("");
  const [valueThree, setValueThree] = useState("");

  // => Podcast Episode fields

  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");

  const [podcastError, setPodcastError] = useState("");
  const [youtubeEpisodeUrlError, setYoutubeEpisodeUrlError] = useState("");
  const [spotifyEpisodeUrlError, setSpotifyEpisodeUrlError] = useState("");

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
    } else if (!isValidUrl(youtubeEpisodeUrl)) {
      setYoutubeEpisodeUrlError("Youtube episode URL has to be a valid url!");
      validInput = false;
    } else {
      setYoutubeEpisodeUrlError("");
    }

    if (!spotifyEpisodeUrl) {
      setSpotifyEpisodeUrlError("Spotify episode URL cannot be empty!");
      validInput = false;
    } else if (!isValidUrl(spotifyEpisodeUrl)) {
      setSpotifyEpisodeUrlError("Spotify episode URL has to be a valid url!");
      validInput = false;
    } else {
      setSpotifyEpisodeUrlError("");
    }

    return validInput;
  };

  const submitClickedHandler = (e) => {
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

      props.submitClickedHandler();
    }
  };

  return (
    <form className="add-podcast-episode-form" onSubmit={submitClickedHandler}>
      <h3>Add Podcast Episode Form</h3>
      <LabeledInput
        error={titleError}
        item="Title"
        itemType="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        dataAttr="title-input"
      />

      <LabeledInput
        error={authorError}
        item="Author"
        itemType="text"
        value={author}
        onChange={(e) => {
          setAuthor(e.target.value);
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
        onChange={(e) => {
          setDescription(e.target.value);
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
        onChange={(e) => {
          setPodcast(e.target.value);
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
        onChange={(e) => {
          setSpotifyEpisodeUrl(e.target.value);
        }}
        dataAttr="spotify-ep-url-input"
      />

      <LabeledInput
        error={youtubeEpisodeUrlError}
        item="Youtube Episode Url"
        itemType="text"
        value={youtubeEpisodeUrl}
        onChange={(e) => {
          setYoutubeEpisodeUrl(e.target.value);
        }}
        dataAttr="youtube-ep-url-input"
      />

      <LabeledInput
        item="Value One"
        itemType="text"
        value={valueOne}
        onChange={(e) => {
          setValueOne(e.target.value);
        }}
        dataAttr="value-one-input"
      />

      <LabeledInput
        item="Value Two"
        itemType="text"
        value={valueTwo}
        onChange={(e) => {
          setValueTwo(e.target.value);
        }}
        dataAttr="value-two-input"
      />

      <LabeledInput
        item="Value Three"
        itemType="text"
        value={valueThree}
        onChange={(e) => {
          setValueThree(e.target.value);
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
