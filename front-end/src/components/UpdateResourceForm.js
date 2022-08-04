import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Validator } from "../utils";
import { API } from "../api-service";
import LabeledInput from "./LabeledInput";
import BookFormFields from "./BookFormFields";
import PodcastFormFields from "./PodcastFormFields";
import PodcastEpisodeFormFields from "./PodcastEpisodeFormFields";
import MotivationalSpeechFormFields from "./MotivationalSpeechFormFields";
import Button from "./Button";
import useToken from "./useToken";

import classes from "../css/UpdateResourceForm.module.css";

const UpdateResourceForm = (props) => {
  const { id, resourceType } = useParams();
  const { token } = useToken();

  const [resource, setResource] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [valueOne, setValueOne] = useState("");
  const [valueTwo, setValueTwo] = useState("");
  const [valueThree, setValueThree] = useState("");

  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");

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

  const [submitEnabled, setSubmitEnabled] = useState(false);

  const validator = new Validator(true);

  const validate = () => {
    validator.registerTitle(title, setTitleError);
    validator.registerAuthor(author, setAuthorError);

    if (resourceType === "book") {
      validator.registerSubtitle(subtitle, setSubtitleError);
      validator.registerISBN(isbn, setISBNError);
    } else if (resourceType === "podcast") {
      validator.registerWebsiteUrl(websiteUrl, setWebsiteUrlError);
      validator.registerSpotifyPageUrl(spotifyPageUrl, setSpotifyPageUrlError);
      validator.registerYoutubePageUrl(youtubePageUrl, setYoutubePageUrlError);
    } else if (resourceType === "podcast-episode") {
      validator.registerPodcast(podcast, setPodcastError);
      validator.registerYoutubeEpisodeUrl(
        youtubeEpisodeUrl,
        setYoutubeEpisodeUrlError
      );
      validator.registerSpotifyEpisodeUrl(
        spotifyEpisodeUrl,
        setSpotifyEpisodeUrlError
      );
    } else if (resourceType === "motivational-speech") {
      validator.registerYoutubeUrl(youtubeUrl, setYoutubeUrlError);
    }

    return validator.validate();
  };

  const resourceDataUpdatedHandler = () => {
    setSubmitEnabled(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (validate()) {
      const newResource = {
        title: title,
        author: author,
        description: description,
        imageURL: imageUrl,
        value_one: valueOne,
        value_two: valueTwo,
        value_three: valueThree,
      };

      if (resourceType === "book") {
        newResource["subtitle"] = subtitle;
        newResource["isbn"] = isbn;
      }

      if (resourceType === "podcast") {
        newResource["website_url"] = websiteUrl;
        newResource["spotify_page_url"] = spotifyPageUrl;
        newResource["youtube_page_url"] = youtubePageUrl;
      }

      if (resourceType === "podcast-episode") {
        newResource["from_podcast"] = podcast;
        newResource["youtube_episode_url"] = youtubeEpisodeUrl;
        newResource["spotify_episode_url"] = spotifyEpisodeUrl;
      }

      if (resourceType === "motivational-speech") {
        newResource["youtube_url"] = youtubeUrl;
      }
      API.updateResource(resourceType, id, token, newResource);
    }
  };

  useEffect(() => {
    API.fetchResourceOfType(resourceType, id, token, setResource).then(
      (resp) => {
        console.log(resp);

        setTitle(resp.title);
        setAuthor(resp.author);
        setDescription(resp.description);
        setImageUrl(resp.imageURL);

        setSubtitle(resp.subtitle);
        setISBN(resp.isbn);

        setWebsiteUrl(resp.website_url);
        setYoutubePageUrl(resp.youtube_page_url);
        setSpotifyPageUrl(resp.spotify_page_url);

        setPodcast(resp.from_podcast);
        setYoutubeEpisodeUrl(resp.youtube_episode_url);
        setSpotifyEpisodeUrl(resp.spotify_episode_url);

        setYoutubeUrl(resp.youtube_url);

        setValueOne(resp.value_one);
        setValueTwo(resp.value_two);
        setValueThree(resp.value_three);
      }
    );
  }, [id]);

  return (
    <form className="add-resource-form" onSubmit={submitHandler}>
      <h3 className={classes["update-resource-form-heading"]}>Update Resource Form</h3>
      <LabeledInput
        error={titleError}
        item="Title"
        itemType="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          resourceDataUpdatedHandler({ title: e.target.value });
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
          resourceDataUpdatedHandler();
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
          resourceDataUpdatedHandler();
        }}
        data-test="description-input"
      ></textarea>

      <LabeledInput
        error={imageUrlError}
        item="Image Url"
        itemType="text"
        value={imageUrl}
        onChange={(e) => {
          setImageUrl(e.target.value);
          resourceDataUpdatedHandler();
        }}
        dataAttr="image-url-input"
      />

      {resourceType === "book" && (
        <BookFormFields
          isbn={isbn}
          setISBN={setISBN}
          isbnError={isbnError}
          subtitle={subtitle}
          setSubtitle={setSubtitle}
          subtitleError={subtitleError}
          resourceDataUpdatedHandler={resourceDataUpdatedHandler}
        />
      )}

      {resourceType === "podcast" && (
        <PodcastFormFields
          websiteUrl={websiteUrl}
          setWebsiteUrl={setWebsiteUrl}
          websiteUrlError={websiteUrlError}
          spotifyPageUrl={spotifyPageUrl}
          setSpotifyPageUrl={setSpotifyPageUrl}
          spotifyPageUrlError={spotifyPageUrlError}
          youtubePageUrl={youtubePageUrl}
          setYoutubePageUrl={setYoutubePageUrl}
          youtubePageUrlError={youtubePageUrlError}
          resourceDataUpdatedHandler={resourceDataUpdatedHandler}
        />
      )}

      {resourceType === "podcast-episode" && (
        <PodcastEpisodeFormFields
          podcast={podcast}
          setPodcast={setPodcast}
          podcastError={podcastError}
          youtubeEpisodeUrl={youtubeEpisodeUrl}
          setYoutubeEpisodeUrl={setYoutubeEpisodeUrl}
          youtubeEpisodeUrlError={youtubeEpisodeUrlError}
          spotifyEpisodeUrl={spotifyEpisodeUrl}
          setSpotifyEpisodeUrl={setSpotifyEpisodeUrl}
          spotifyEpisodeUrlError={spotifyEpisodeUrlError}
          resourceDataUpdatedHandler={resourceDataUpdatedHandler}
        />
      )}

      {resourceType === "motivational-speech" && (
        <MotivationalSpeechFormFields
          youtubeUrl={youtubeUrl}
          setYoutubeUrl={setYoutubeUrl}
          youtubeUrlError={youtubeUrlError}
          resourceDataUpdatedHandler={resourceDataUpdatedHandler}
        />
      )}

      <LabeledInput
        item="Value One"
        itemType="text"
        value={valueOne}
        onChange={(e) => {
          setValueOne(e.target.value);
          resourceDataUpdatedHandler();
        }}
        dataAttr="value-one-input"
      />
      <LabeledInput
        item="Value Two"
        itemType="text"
        value={valueTwo}
        onChange={(e) => {
          setValueTwo(e.target.value);
          resourceDataUpdatedHandler();
        }}
        dataAttr="value-two-input"
      />
      <LabeledInput
        item="Value Three"
        itemType="text"
        value={valueThree}
        onChange={(e) => {
          setValueThree(e.target.value);
          resourceDataUpdatedHandler();
        }}
        dataAttr="value-three-input"
      />
      <Button
        className={
          classes[`submit-button-${submitEnabled ? "enabled" : "disabled"}`]
        }
        id="submit"
        type="submit"
        text="Update Resource"
        data-test="submit"
        disabled={!submitEnabled}
      />
    </form>
  );
};

export default UpdateResourceForm;
