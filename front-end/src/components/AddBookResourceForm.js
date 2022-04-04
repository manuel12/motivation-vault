import React, { useState } from "react";
import { isValidIsbn } from "../utils";
import LabeledInput from "./LabeledInput";
import useToken from "./useToken";


function AddBookResourceForm(props) {
  const { token } = useToken();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const [valueOne, setValueOne] = useState("");
  const [valueTwo, setValueTwo] = useState("");
  
  const [valueThree, setValueThree] = useState("");

  // => Book fields
  const [subtitle, setSubtitle] = useState("");
  const [isbn, setIsbn] = useState("");

  // => Book error fields
  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");

  const [subtitleError, setSubtitleError] = useState("");
  const [isbnError, setIsbnError] = useState("");

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

    return isValidInput;
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

      newResource["subtitle"] = subtitle;
      newResource["isbn"] = isbn;

      fetch(`http://127.0.0.1:8000/api/books/`, {
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

      setSubtitle("");
      setIsbn("");

      setValueOne("");
      setValueTwo("");
      setValueThree("");

      props.submitClickedHandler();
    }
  };

  return (
    <form className="add-book-form" onSubmit={submitClickedHandler}>
      <h3>Add Book Form</h3>

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
        error={subtitleError}
        item="Subtitle"
        itemType="text"
        value={subtitle}
        onChange={(e) => {
          setSubtitle(e.target.value);
        }}
        dataAttr="subtitle-input"
      />

      <LabeledInput
        error={isbnError}
        item="ISBN-13"
        itemType="text"
        value={isbn}
        onChange={(e) => {
          setIsbn(e.target.value);
        }}
        dataAttr="isbn-input"
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
        Add Book
      </button>
    </form>
  );
}

export default AddBookResourceForm;
