import React, { useState } from "react";
import { isValidURL } from "../utils";
import LabeledInput from "./LabeledInput";
import useToken from "./useToken";

function AddPodcastResourceForm(props) {
  const { token } = useToken();

  let [title, setTitle] = useState("");
  let [author, setAuthor] = useState("");
  let [description, setDescription] = useState("");

  // => Podcast fields
  let [websiteUrl, setWebsiteUrl] = useState("");
  let [spotifyPageUrl, setSpotifyPageUrl] = useState("");
  let [youtubePageUrl, setYoutubePageUrl] = useState("");

  let [valueOne, setValueOne] = useState("");
  let [valueTwo, setValueTwo] = useState("");
  let [valueThree, setValueThree] = useState("");

  // => Podcast error fields

  let [titleError, setTitleError] = useState("");
  let [authorError, setAuthorError] = useState("");

  let [websiteUrlError, setWebsiteUrlError] = useState("");
  let [spotifyPageUrlError, setSpotifyPageUrlError] = useState("");
  let [youtubePageUrlError, setYoutubePageUrlError] = useState("");

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

    if (!websiteUrl) {
      setWebsiteUrlError("Website URL cannot be empty!");
      validInput = false;
    } else if (!isValidURL(websiteUrl)) {
      setWebsiteUrlError("Website URL has to be a valid url!");
      validInput = false;
    } else {
      setWebsiteUrlError("");
    }

    if (!spotifyPageUrl) {
      setSpotifyPageUrlError("Spotify URL cannot be empty!");
      validInput = false;
    } else if (!isValidURL(spotifyPageUrl)) {
      setSpotifyPageUrlError("Spotify URL has to be a valid url!");
      validInput = false;
    } else {
      setSpotifyPageUrlError("");
    }

    if (!youtubePageUrl) {
      setYoutubePageUrlError("Youtube URL cannot be empty!");
      validInput = false;
    } else if (!isValidURL(youtubePageUrl)) {
      setYoutubePageUrlError("Youtube URL has to be a valid url!");
      validInput = false;
    } else {
      setYoutubePageUrlError("");
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

      newResource["website_url"] = websiteUrl;
      newResource["youtube_page_url"] = youtubePageUrl;

      console.log("---------------------------------------------------");
      console.log("New Resource obj");
      for(const key in newResource) {
          console.log(`${key}: ${newResource[key]}`);
      }
      

      fetch(`http://127.0.0.1:8000/api/podcasts/`, {
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

      setWebsiteUrl("");
      setSpotifyPageUrl("");
      setYoutubePageUrl("");

      setValueOne("");
      setValueTwo("");
      setValueThree("");

      props.submitClicked();
    }
  };

  return (
    <form className="add-podcast-form" onSubmit={submitClicked}>
      <h3>Add Podcasts Form</h3>
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

      <LabeledInput
        error={websiteUrlError}
        item="Website Url"
        itemType="text"
        value={websiteUrl}
        onChange={(evt) => {
          setWebsiteUrl(evt.target.value);
        }}
        dataAttr="website-url-input"
      />

      <LabeledInput
        error={spotifyPageUrlError}
        item="Spotify Url"
        itemType="text"
        value={spotifyPageUrl}
        onChange={(evt) => {
          setSpotifyPageUrl(evt.target.value);
        }}
        dataAttr="spotify-url-input"
      />

      <LabeledInput
        error={youtubePageUrlError}
        item="Youtube Url"
        itemType="text"
        value={youtubePageUrl}
        onChange={(evt) => {
          setYoutubePageUrl(evt.target.value);
        }}
        dataAttr="youtube-url-input"
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
        Add Podcast
      </button>
    </form>
  );
}

export default AddPodcastResourceForm;
