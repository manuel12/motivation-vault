import React, { useState } from "react";
import Input from "./Input";

function AddResourceForm(props) {
  let [title, setTitle] = useState("");
  let [author, setAuthor] = useState("");
  let [description, setDescription] = useState("");

  // => Book fields
  let [subtitle, setSubtitle] = useState("");
  let [isbn, setIsbn] = useState("");

  // => Podcast fields
  let [websiteUrl, setWebsiteUrl] = useState("");
  let [youtubeUrl, setYoutubeUrl] = useState("");

  // => Podcast Episode fields
  let [podcast, setPodcast] = useState("");
  let [youtubeEpisodeUrl, setYoutubeEpisodeUrl] = useState("");
  let [spotifyEpisodeUrl, setSpotifyEpisodeUrl] = useState("");

  let [valueOne, setValueOne] = useState("");
  let [valueTwo, setValueTwo] = useState("");
  let [valueThree, setValueThree] = useState("");

  let [titleError, setTitleError] = useState("");
  let [authorError, setAuthorError] = useState("");

  // => Book fields
  let [subtitleError, setSubtitleError] = useState("");
  let [isbnError, setIsbnError] = useState("");

  // => Podcast fields
  let [websiteUrlError, setWebsiteUrlError] = useState("");
  let [youtubeUrlError, setYoutubeUrlError] = useState("");

  // => Podcast Episode fields
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

    if (props.resourceType === "book") {
      if (!subtitle) {
        setSubtitleError("Subtitle cannot be empty!");
        validInput = false;
      } else {
        setSubtitleError("");
      }

      if (!isbn) {
        setIsbnError("ISBN cannot be empty!");
        validInput = false;
      } else {
        setIsbnError("");
      }
    }

    if (props.resourceType === "podcast") {
      if (!websiteUrl) {
        setWebsiteUrlError("Website URL cannot be empty!");
        validInput = false;
      } else {
        setWebsiteUrlError("");
      }

      if (!youtubeUrl) {
        setYoutubeUrlError("Youtube URL cannot be empty!");
        validInput = false;
      } else {
        setYoutubeUrlError("");
      }
    }

    if (props.resourceType === "podcast-episode") {
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
    }

    if (props.resourceType === "motivational-speech") {
      if (!youtubeUrl) {
        setYoutubeUrlError("Youtube URL cannot be empty!");
        validInput = false;
      } else {
        setYoutubeUrlError("");
      }
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

      if (props.resourceType === "book") {
        newResource["subtitle"] = subtitle;
        newResource["isbn"] = isbn;
      }

      if (props.resourceType === "podcast") {
        newResource["website_url"] = websiteUrl;
        newResource["youtube_url"] = youtubeUrl;
      }

      if (props.resourceType === "podcast-episode") {
        newResource["from_podcast"] = podcast;
        newResource["youtube_episode_url"] = youtubeEpisodeUrl;
        newResource["spotify_episode_url"] = spotifyEpisodeUrl;
      }

      if (props.resourceType === "motivational-speech") {
        newResource["youtube_url"] = youtubeUrl;
      }

      console.log(newResource);
      
      const resourcePlural = props.resourceType === 'motivational-speech' 
        ? `${props.resourceType}es` : `${props.resourceType}s`;

      fetch(`http://127.0.0.1:8000/api/${resourcePlural}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newResource),
      })
        .then( (resp) => resp.json())
        .then( (resp) => {
          console.log(resp);
        })
        .catch( (error) => console.log(error));

      setTitle("");
      setAuthor("");
      setDescription("");

      setSubtitle("");
      setIsbn("");

      setWebsiteUrl("");
      setYoutubeUrl("");

      setPodcast("");
      setSpotifyEpisodeUrl("");
      setYoutubeEpisodeUrl("");

      setValueOne("");
      setValueTwo("");
      setValueThree("");
      
      props.submitClicked()
    }
  };

  return (
    <div className="add-motivational-speech-form">
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

      {props.resourceType === "book" && (
        <React.Fragment>
          <Input
            error={subtitleError}
            item="Subtitle"
            itemType="text"
            value={subtitle}
            onChange={(evt) => {
              setSubtitle(evt.target.value);
            }}
            dataAttr="subtitle-input"
          />

          <Input
            error={isbnError}
            item="ISBN-13"
            itemType="text"
            value={isbn}
            onChange={(evt) => {
              setIsbn(evt.target.value);
            }}
            dataAttr="isbn-input"
          />
        </React.Fragment>
      )}

      {props.resourceType === "podcast" && (
        <React.Fragment>
          <Input
            error={websiteUrlError}
            item="Website Url"
            itemType="text"
            value={websiteUrl}
            onChange={(evt) => {
              setWebsiteUrl(evt.target.value);
            }}
            dataAttr="website-url-input"
          />

          <Input
            error={youtubeUrlError}
            item="Youtube Url"
            itemType="text"
            value={youtubeUrl}
            onChange={(evt) => {
              setYoutubeUrl(evt.target.value);
            }}
            dataAttr="youtube-url-input"
          />
        </React.Fragment>
      )}

      {props.resourceType === "podcast-episode" && (
        <React.Fragment>
          {podcastError ? 
            <label data-test="select-podcast-error">
              *{podcastError}
            </label> : null}
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
            <option value="12">Impact Theory</option>
            <option value="10">School of Greatness</option>
            <option value="11">The Tim Ferris Show</option>
          </select>

          <Input
            error={spotifyEpisodeUrlError}
            item="Spotify Episode Url"
            itemType="text"
            value={spotifyEpisodeUrl}
            onChange={(evt) => {
              setSpotifyEpisodeUrl(evt.target.value);
            }}
            dataAttr="website-url-input"
          />

          <Input
            error={youtubeEpisodeUrlError}
            item="Youtube Episode Url"
            itemType="text"
            value={youtubeEpisodeUrl}
            onChange={(evt) => {
              setYoutubeEpisodeUrl(evt.target.value);
            }}
            dataAttr="youtube-url-input"
          />
        </React.Fragment>
      )}

      {props.resourceType === "motivational-speech" && (
        <React.Fragment>
          <Input
            error={youtubeUrlError}
            item="Youtube Url"
            itemType="text"
            value={youtubeUrl}
            onChange={(evt) => {
              setYoutubeUrl(evt.target.value);
            }}
            dataAttr="youtube-url-input"
          />
        </React.Fragment>
      )}

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

export default AddResourceForm;
