import React, { useState } from "react";
import { Validator } from "../utils";
import { API } from "../api-service";
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
  const [isbn, setISBN] = useState("");

  // => Book error fields
  const [subtitleError, setSubtitleError] = useState("");
  const [isbnError, setISBNError] = useState("");

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

  const validator = new Validator(true);

  const validate = () => {
    validator.registerTitle(title, setTitleError);
    validator.registerAuthor(author, setAuthorError);

    if (props.resourceType === "book") {
      validator.registerSubtitle(subtitle, setSubtitleError);
      validator.registerISBN(isbn, setISBNError);
    } else if (props.resourceType === "podcast") {
      validator.registerWebsiteUrl(websiteUrl, setWebsiteUrlError);
      validator.registerSpotifyPageUrl(spotifyPageUrl, setSpotifyPageUrlError);
      validator.registerYoutubePageUrl(youtubePageUrl, setYoutubePageUrlError);
    } else if (props.resourceType === "podcast-episode") {
      validator.registerPodcast(podcast, setPodcastError);
      validator.registerYoutubeEpisodeUrl(
        youtubeEpisodeUrl,
        setYoutubeEpisodeUrlError
      );
      validator.registerSpotifyEpisodeUrl(
        spotifyEpisodeUrl,
        setSpotifyEpisodeUrlError
      );
    } else if (props.resourceType === "motivational-speech") {
      validator.registerYoutubeUrl(youtubeUrl, setYoutubeUrlError);
    }

    return validator.validate();
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
      API.createResource(props.resourceType, token, newResource);
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
          setISBN={setISBN}
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
