import React, { useState } from "react";
import { isValidIsbn, isValidUrl } from "../utils";
import LabeledInput from "./LabeledInput";
import AddBookResourceForm from "./AddBookResourceForm";
import AddPodcastResourceForm from "./AddPodcastResourceForm";
import AddPodcastEpisodeResourceForm from "./AddPodcastEpisodeResourceForm";
import AddMotivationalSpeechResourceForm from "./AddMotivationalSpeechResourceForm";
import useToken from "./useToken";

function AddResourceForm(props) {
  const { token } = useToken();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const [valueOne, setValueOne] = useState("");
  const [valueTwo, setValueTwo] = useState("");
  const [valueThree, setValueThree] = useState("");

  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");

  // => Book fields
  const [subtitle, setSubtitle] = useState("");
  const [isbn, setIsbn] = useState("");

  // => Book error fields
  const [subtitleError, setSubtitleError] = useState("");
  const [isbnError, setIsbnError] = useState("");

  // => Podcast fields
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [spotifyPageUrl, setSpotifyPageUrl] = useState("");
  const [youtubePageUrl, setYoutubePageUrl] = useState("");

  // => Podcast error fields
  const [websiteUrlError, setWebsiteUrlError] = useState("");
  const [spotifyPageUrlError, setSpotifyPageUrlError] = useState("");
  const [youtubePageUrlError, setYoutubePageUrlError] = useState("");

  // => Podcast Episode fields
  const [podcast, setPodcast] = useState("");
  const [youtubeEpisodeUrl, setYoutubeEpisodeUrl] = useState("");
  const [spotifyEpisodeUrl, setSpotifyEpisodeUrl] = useState("");

  // => Podcast Episode error fields
  const [podcastError, setPodcastError] = useState("");
  const [youtubeEpisodeUrlError, setYoutubeEpisodeUrlError] = useState("");
  const [spotifyEpisodeUrlError, setSpotifyEpisodeUrlError] = useState("");

  // => Motivational Speech fields
  const [youtubeUrl, setYoutubeUrl] = useState("");

  // => Motivational Speech error fields
  const [youtubeUrlError, setYoutubeUrlError] = useState("");

  const validate = () => {
    let isValidInput = true;

    if (!title) {
      setTitleError("Title cannot be empty!");
      isValidInput = false;
    } else {
      setTitleError("");
    }

    if (!author) {
      setAuthorError("Author cannot be empty!");
      isValidInput = false;
    } else {
      setAuthorError("");
    }

    if (props.resourceType === "book") {
      if (!subtitle) {
        setSubtitleError("Subtitle cannot be empty!");
        isValidInput = false;
      } else {
        setSubtitleError("");
      }

      if (!isbn) {
        setIsbnError("ISBN cannot be empty!");
        isValidInput = false;
      } else if (!isValidIsbn(isbn)) {
        setIsbnError("ISBN has to be a 13 digits!");
        isValidInput = false;
      } else {
        setIsbnError("");
      }
    }

    if (props.resourceType === "podcast") {
      if (!websiteUrl) {
        setWebsiteUrlError("Website URL cannot be empty!");
        isValidInput = false;
      } else if (!isValidUrl(websiteUrl)) {
        setWebsiteUrlError("Website URL has to be a valid url!");
        isValidInput = false;
      } else {
        setWebsiteUrlError("");
      }

      if (!spotifyPageUrl) {
        setSpotifyPageUrlError("Spotify URL cannot be empty!");
        isValidInput = false;
      } else if (!isValidUrl(spotifyPageUrl)) {
        setSpotifyPageUrlError("Spotify URL has to be a valid url!");
        isValidInput = false;
      } else {
        setSpotifyPageUrlError("");
      }

      if (!youtubePageUrl) {
        setYoutubePageUrlError("Youtube URL cannot be empty!");
        isValidInput = false;
      } else if (!isValidUrl(youtubePageUrl)) {
        setYoutubePageUrlError("Youtube URL has to be a valid url!");
        isValidInput = false;
      } else {
        setYoutubePageUrlError("");
      }
    }

    if (props.resourceType === "podcast-episode") {
      if (!podcast) {
        setPodcastError("Podcast cannot be empty!");
        isValidInput = false;
      } else {
        setPodcastError("");
      }

      if (!youtubeEpisodeUrl) {
        setYoutubeEpisodeUrlError("Youtube episode URL cannot be empty!");
        isValidInput = false;
      } else if (!isValidUrl(youtubeEpisodeUrl)) {
        setYoutubeEpisodeUrlError("Youtube episode URL has to be a valid url!");
        isValidInput = false;
      } else {
        setYoutubeEpisodeUrlError("");
      }

      if (!spotifyEpisodeUrl) {
        setSpotifyEpisodeUrlError("Spotify episode URL cannot be empty!");
        isValidInput = false;
      } else if (!isValidUrl(spotifyEpisodeUrl)) {
        setSpotifyEpisodeUrlError("Spotify episode URL has to be a valid url!");
        isValidInput = false;
      } else {
        setSpotifyEpisodeUrlError("");
      }
    }

    if (props.resourceType === "motivational-speech") {
      if (!youtubeUrl) {
        setYoutubeUrlError("Youtube URL cannot be empty!");
        isValidInput = false;
      } else if (!isValidUrl(youtubeUrl)) {
        setYoutubeUrlError("Youtube URL has to be a valid URL!");
        isValidInput = false;
      } else {
        setYoutubeUrlError("");
      }
    }

    return isValidInput;
  };

  const submitClickedHandler = (e) => {
    console.log(props.resourceType);
    e.preventDefault();

    if (validate()) {
      console.log("Validated!");
      const newResource = {
        title: title,
        author: author,
        description: description,
        value_one: valueOne,
        value_two: valueTwo,
        value_three: valueThree,
      };

      if (props.resourceType === "book") {
        newResource["subtitle"] = subtitle;
        newResource["isbn"] = isbn;
      }

      if (props.resourceType === "podcast") {
        newResource["website_url"] = websiteUrl;
        newResource["spotify_page_url"] = spotifyPageUrl;
        newResource["youtube_page_url"] = youtubePageUrl;
      }

      if (props.resourceType === "podcast-episode") {
        newResource["from_podcast"] = podcast;
        newResource["youtube_episode_url"] = youtubeEpisodeUrl;
        newResource["spotify_episode_url"] = spotifyEpisodeUrl;
      }

      if (props.resourceType === "motivational-speech") {
        newResource["youtube_url"] = youtubeUrl;
      }

      let url =
        props.resourceType === "motivational-speech"
          ? `http://127.0.0.1:8000/api/${props.resourceType}es/`
          : `http://127.0.0.1:8000/api/${props.resourceType}s/`;

      fetch(url, {
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

        window.location.href = "/";
    } else {
      console.log("Validation failed!");
    }
  };

  return (
    <form className="add-resource-form" onSubmit={submitClickedHandler}>
      <h3>Add Resource Form</h3>
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

      {props.resourceType === "book" && (
        <AddBookResourceForm
          isbn={isbn}
          setIsbn={setIsbn}
          isbnError={isbnError}
          subtitle={subtitle}
          setSubtitle={setSubtitle}
          subtitleError={subtitleError}
        />
      )}

      {props.resourceType === "podcast" && (
        <AddPodcastResourceForm
          websiteUrl={websiteUrl}
          setWebsiteUrl={setWebsiteUrl}
          websiteUrlError={websiteUrlError}
          spotifyPageUrl={spotifyPageUrl}
          setSpotifyPageUrl={setSpotifyPageUrl}
          spotifyPageUrlError={spotifyPageUrlError}
          youtubePageUrl={youtubePageUrl}
          setYoutubePageUrl={setYoutubePageUrl}
          youtubePageUrlError={youtubePageUrlError}
        />
      )}

      {props.resourceType === "podcast-episode" && (
        <AddPodcastEpisodeResourceForm
          podcast={podcast}
          setPodcast={setPodcast}
          podcastError={podcastError}
          youtubeEpisodeUrl={youtubeEpisodeUrl}
          setYoutubeEpisodeUrl={setYoutubeEpisodeUrl}
          youtubeEpisodeUrlError={youtubeEpisodeUrlError}
          spotifyEpisodeUrl={spotifyEpisodeUrl}
          setSpotifyEpisodeUrl={setSpotifyEpisodeUrl}
          spotifyEpisodeUrlError={spotifyEpisodeUrlError}
        />
      )}

      {props.resourceType === "motivational-speech" && (
        <AddMotivationalSpeechResourceForm
          youtubeUrl={youtubeUrl}
          setYoutubeUrl={setYoutubeUrl}
          youtubeUrlError={youtubeUrlError}
        />
      )}

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
        Add Resource
      </button>
    </form>
  );
}

export default AddResourceForm;
