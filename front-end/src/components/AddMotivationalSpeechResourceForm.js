import React, { useState } from "react";
import Input from "./Input";

function AddMotivationalSpeechResourceForm(props) {
  let [title, setTitle] = useState("");
  let [author, setAuthor] = useState("");
  let [description, setDescription] = useState("");

  let [youtubeUrl, setYoutubeUrl] = useState("");

  let [valueOne, setValueOne] = useState("");
  let [valueTwo, setValueTwo] = useState("");
  let [valueThree, setValueThree] = useState("");

  // => Motivational Speech error fields
  let [titleError, setTitleError] = useState("");
  let [authorError, setAuthorError] = useState("");

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

      newResource["youtube_url"] = youtubeUrl;

      fetch(`http://127.0.0.1:8000/api/motivational-speeches/`, {
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

      setYoutubeUrl("");

      setValueOne("");
      setValueTwo("");
      setValueThree("");

      props.submitClicked();
    }
  };

  return (
    <div className="add-motivational-speech-form">
      <h3>Add Motivational Speech Form</h3>
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

export default AddMotivationalSpeechResourceForm;
