import React, { useState } from "react";
import Input from "./Input";

function AddPodcastEpisodeResourceForm(props) {
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
    } else {
      setYoutubeEpisodeUrlError("");
    }

    if (!spotifyEpisodeUrl) {
      setSpotifyEpisodeUrlError("Spotify episode URL cannot be empty!");
      validInput = false;
    } else {
      setSpotifyEpisodeUrlError("");
    }

    return validInput;
  };

  const submitClicked = () => {
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
        },
        body: JSON.stringify(newResource),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          console.log(resp);
        })
        .catch((error) => console.log(error));

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
    <div className="add-podcast-episode-form">
      <h3>Add Podcast Episode Form</h3>
      <Input
        error={titleError}
        item="Title"
        itemType="text"
        value={title}
        onChange={(evt) => {
          setTitle(evt.target.value);
        }}
        dataAttr="title-input"
      />

      <Input
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
        placeholder="Descripion..."
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

      <Input
        error={spotifyEpisodeUrlError}
        item="Spotify Episode Url"
        itemType="text"
        value={spotifyEpisodeUrl}
        onChange={(evt) => {
          setSpotifyEpisodeUrl(evt.target.value);
        }}
        dataAttr="spotify-ep-url-input"
      />

      <Input
        error={youtubeEpisodeUrlError}
        item="Youtube Episode Url"
        itemType="text"
        value={youtubeEpisodeUrl}
        onChange={(evt) => {
          setYoutubeEpisodeUrl(evt.target.value);
        }}
        dataAttr="youtube-ep-url-input"
      />

      <Input
        item="Value One"
        itemType="text"
        value={valueOne}
        onChange={(evt) => {
          setValueOne(evt.target.value);
        }}
        dataAttr="value-one-input"
      />

      <Input
        item="Value Two"
        itemType="text"
        value={valueTwo}
        onChange={(evt) => {
          setValueTwo(evt.target.value);
        }}
        dataAttr="value-two-input"
      />

      <Input
        item="Value Three"
        itemType="text"
        value={valueThree}
        onChange={(evt) => {
          setValueThree(evt.target.value);
        }}
        dataAttr="value-three-input"
      />

      <input
        id="submit"
        type="submit"
        onClick={submitClicked}
        data-test="submit"
      />
    </div>
  );
}

export default AddPodcastEpisodeResourceForm;
