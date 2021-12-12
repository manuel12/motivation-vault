import React, { useState } from "react";
import LabeledInput from "./LabeledInput";

function AddPodcastResourceForm(props) {
  let [title, setTitle] = useState("");
  let [author, setAuthor] = useState("");
  let [description, setDescription] = useState("");

  // => Podcast fields
  let [websiteUrl, setWebsiteUrl] = useState("");
  let [spotifyUrl, setSpotifyUrl] = useState("");
  let [youtubeUrl, setYoutubeUrl] = useState("");

  let [valueOne, setValueOne] = useState("");
  let [valueTwo, setValueTwo] = useState("");
  let [valueThree, setValueThree] = useState("");

  // => Podcast error fields

  let [titleError, setTitleError] = useState("");
  let [authorError, setAuthorError] = useState("");

  let [websiteUrlError, setWebsiteUrlError] = useState("");
  let [spotifyUrlError, setSpotifyUrlError] = useState("");
  let [youtubeUrlError, setYoutubeUrlError] = useState("");

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
    } else {
      setWebsiteUrlError("");
    }

    if (!spotifyUrl) {
      setSpotifyUrlError("Spotify URL cannot be empty!");
      validInput = false;
    } else {
      setSpotifyUrlError("");
    }

    if (!youtubeUrl) {
      setYoutubeUrlError("Youtube URL cannot be empty!");
      validInput = false;
    } else {
      setYoutubeUrlError("");
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

      newResource["website_url"] = websiteUrl;
      newResource["youtube_url"] = youtubeUrl;

      fetch(`http://127.0.0.1:8000/api/podcasts/`, {
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

      setWebsiteUrl("");
      setSpotifyUrl("");
      setYoutubeUrl("");

      setValueOne("");
      setValueTwo("");
      setValueThree("");

      props.submitClicked();
    }
  };

  return (
    <div className="add-podcast-form">
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
        placeholder="Descripion..."
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
        error={spotifyUrlError}
        item="Spotify Url"
        itemType="text"
        value={spotifyUrl}
        onChange={(evt) => {
          setSpotifyUrl(evt.target.value);
        }}
        dataAttr="spotify-url-input"
      />

      <LabeledInput
        error={youtubeUrlError}
        item="Youtube Url"
        itemType="text"
        value={youtubeUrl}
        onChange={(evt) => {
          setYoutubeUrl(evt.target.value);
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

      <button
        id="submit"
        type="submit"
        onClick={submitClicked}
        data-test="submit"
      >
        Add Podcast
      </button>
    </div>
  );
}

export default AddPodcastResourceForm;
