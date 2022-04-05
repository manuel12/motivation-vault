import React, { useState } from "react";
import { isValidUrl } from "../utils";
import LabeledInput from "./LabeledInput";
import useToken from "./useToken";

function AddPodcastResourceForm(props) {
  const { token } = useToken();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  // => Podcast fields
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [spotifyPageUrl, setSpotifyPageUrl] = useState("");
  const [youtubePageUrl, setYoutubePageUrl] = useState("");

  const [valueOne, setValueOne] = useState("");
  const [valueTwo, setValueTwo] = useState("");
  const [valueThree, setValueThree] = useState("");

  // => Podcast error fields

  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");

  const [websiteUrlError, setWebsiteUrlError] = useState("");
  const [spotifyPageUrlError, setSpotifyPageUrlError] = useState("");
  const [youtubePageUrlError, setYoutubePageUrlError] = useState("");

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
    } else if (!isValidUrl(websiteUrl)) {
      setWebsiteUrlError("Website URL has to be a valid url!");
      validInput = false;
    } else {
      setWebsiteUrlError("");
    }

    if (!spotifyPageUrl) {
      setSpotifyPageUrlError("Spotify URL cannot be empty!");
      validInput = false;
    } else if (!isValidUrl(spotifyPageUrl)) {
      setSpotifyPageUrlError("Spotify URL has to be a valid url!");
      validInput = false;
    } else {
      setSpotifyPageUrlError("");
    }

    if (!youtubePageUrl) {
      setYoutubePageUrlError("Youtube URL cannot be empty!");
      validInput = false;
    } else if (!isValidUrl(youtubePageUrl)) {
      setYoutubePageUrlError("Youtube URL has to be a valid url!");
      validInput = false;
    } else {
      setYoutubePageUrlError("");
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

      newResource["website_url"] = websiteUrl;
      newResource["youtube_page_url"] = youtubePageUrl;

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

      props.submitClickedHandler();
    }
  };

  return (
    <form className="add-podcast-form" onSubmit={submitClickedHandler}>
      <h3>Add Podcasts Form</h3>
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

      <LabeledInput
        error={websiteUrlError}
        item="Website URL"
        itemType="text"
        value={websiteUrl}
        onChange={(e) => {
          setWebsiteUrl(e.target.value);
        }}
        dataAttr="website-url-input"
      />

      <LabeledInput
        error={spotifyPageUrlError}
        item="Spotify URL"
        itemType="text"
        value={spotifyPageUrl}
        onChange={(e) => {
          setSpotifyPageUrl(e.target.value);
        }}
        dataAttr="spotify-page-url-input"
      />

      <LabeledInput
        error={youtubePageUrlError}
        item="Youtube URL"
        itemType="text"
        value={youtubePageUrl}
        onChange={(e) => {
          setYoutubePageUrl(e.target.value);
        }}
        dataAttr="youtube-page-url-input"
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
        Add Podcast
      </button>
    </form>
  );
}

export default AddPodcastResourceForm;
