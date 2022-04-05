import React, { useState } from "react";
import { isValidUrl } from "../utils";
import LabeledInput from "./LabeledInput";
import useToken from "./useToken";

function AddMotivationalSpeechResourceForm(props) {
  const { token } = useToken();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const [youtubeUrl, setYoutubeUrl] = useState("");

  const [valueOne, setValueOne] = useState("");
  const [valueTwo, setValueTwo] = useState("");
  const [valueThree, setValueThree] = useState("");

  // => Motivational Speech error fields
  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");

  const [youtubeUrlError, setYoutubeUrlError] = useState("");

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

    if (!youtubeUrl) {
      setYoutubeUrlError("Youtube URL cannot be empty!");
      validInput = false;
    } else if (!isValidUrl(youtubeUrl)) {
      setYoutubeUrlError("Youtube URL has to be a valid URL!");
      validInput = false;
    } else {
      setYoutubeUrlError("");
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

      newResource["youtube_url"] = youtubeUrl;

      fetch(`http://127.0.0.1:8000/api/motivational-speeches/`, {
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

      setYoutubeUrl("");

      setValueOne("");
      setValueTwo("");
      setValueThree("");

      props.submitClickedHandler();
    }
  };

  return (
    <form className="add-motivational-speech-form" onSubmit={submitClickedHandler}>
      <h3>Add Motivational Speech Form</h3>
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
        error={youtubeUrlError}
        item="Youtube URL"
        itemType="text"
        value={youtubeUrl}
        onChange={(e) => {
          setYoutubeUrl(e.target.value);
        }}
        dataAttr="youtube-url-input"
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

      <button
        id="submit"
        type="submit"
        onClick={submitClickedHandler}
        data-test="submit"
      >
        Add Motivational Speech
      </button>
    </form>
  );
}

export default AddMotivationalSpeechResourceForm;
