import React, { useState } from "react";
import LabeledInput from "./LabeledInput";

function AddBookResourceForm(props) {
  let [title, setTitle] = useState("");
  let [author, setAuthor] = useState("");
  let [description, setDescription] = useState("");

  let [valueOne, setValueOne] = useState("");
  let [valueTwo, setValueTwo] = useState("");
  let [valueThree, setValueThree] = useState("");

  // => Book fields
  let [subtitle, setSubtitle] = useState("");
  let [isbn, setIsbn] = useState("");

  // => Book error fields
  let [titleError, setTitleError] = useState("");
  let [authorError, setAuthorError] = useState("");

  let [subtitleError, setSubtitleError] = useState("");
  let [isbnError, setIsbnError] = useState("");

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

      newResource["subtitle"] = subtitle;
      newResource["isbn"] = isbn;

      fetch(`http://127.0.0.1:8000/api/books/`, {
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

      setSubtitle("");
      setIsbn("");

      setValueOne("");
      setValueTwo("");
      setValueThree("");

      props.submitClicked();
    }
  };

  return (
    <div className="add-book-form">
      <h3>Add Book Form</h3>

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
        error={subtitleError}
        item="Subtitle"
        itemType="text"
        value={subtitle}
        onChange={(evt) => {
          setSubtitle(evt.target.value);
        }}
        dataAttr="subtitle-input"
      />

      <LabeledInput
        error={isbnError}
        item="ISBN-13"
        itemType="text"
        value={isbn}
        onChange={(evt) => {
          setIsbn(evt.target.value);
        }}
        dataAttr="isbn-input"
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
        Add Book
      </button>
    </div>
  );
}

export default AddBookResourceForm;
