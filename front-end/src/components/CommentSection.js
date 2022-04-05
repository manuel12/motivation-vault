import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import useToken from "./useToken";

import classes from "../css/CommentSection.module.css";

function CommentSection(props) {
  const { token } = useToken();

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);

  const [submitBtnClassName, setSubmitBtnClassName] = useState(
    classes["hidden"]
  );
  const [cancelBtnClassName, setCancelBtnClassName] = useState(
    classes["hidden"]
  );

  useEffect(() => setComments(props.comments), [props.comments]);
  useEffect(() => {
    if (commentText) {
      setSubmitBtnClassName(classes["add-comment-btn-enabled"]);
      setSubmitBtnDisabled(false);
    } else {
      if (cancelBtnClassName === classes["hidden"]) {
        setSubmitBtnClassName(classes["hidden"]);
      } else {
        setSubmitBtnClassName(classes["add-comment-btn"]);
      }
    }
  }, [commentText]);

  const inputClickedHandler = () => {
    if (commentText) {
      setSubmitBtnClassName(classes["add-comment-btn-enabled"]);
    } else {
      setSubmitBtnClassName(classes["add-comment-btn"]);
    }
    setCancelBtnClassName(classes["cancel-button"]);
  };

  const submitClickedHandler = () => {
    if (commentText) {
      const newComment = {
        resource: props.resourceId,
        text: commentText,
        date: new Date().toISOString(),
      };

      fetch(`http://127.0.0.1:8000/api/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(newComment),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          newComment["user"] = resp["get_username"];

          const updatedComments = [newComment, ...comments];
          setComments(updatedComments);

          const commentElems =
            document.getElementsByClassName("comment-container");
          const lastCommentElem = commentElems[commentElems.length - 1];
          lastCommentElem.scrollIntoView();
        })
        .catch((error) => console.warn(error));

      setSubmitBtnDisabled(true);
      setCommentText("");
      setSubmitBtnClassName(classes["hidden"]);
      setCancelBtnClassName(classes["hidden"]);
    }
  };

  const cancelClickedHandler = () => {
    setSubmitBtnDisabled(true);
    setCommentText("");

    setSubmitBtnClassName(classes["hidden"]);
    setCancelBtnClassName(classes["hidden"]);
  };

  return (
    <div
      className={classes["comment-section-container"]}
      data-test="comment-section"
    >
      <h3>
        <u>Comments</u>
      </h3>

      <input
        className="add-comment"
        type="text"
        value={commentText}
        placeholder="Write a comment..."
        onChange={(e) => {
          setCommentText(e.target.value);
        }}
        onClick={inputClickedHandler}
        data-test="comment-input"
      />
      <div className={classes["btn-container"]}>
        <button
          disabled={submitBtnDisabled}
          className={submitBtnClassName}
          id="submit"
          type="submit"
          onClick={submitClickedHandler}
          data-test="add-comment-submit-button"
        >
          Comment
        </button>
        <button
          className={cancelBtnClassName}
          id="cancel"
          type="submit"
          onClick={cancelClickedHandler}
          data-test="add-comment-cancel-button"
        >
          Cancel
        </button>
      </div>
      <br />

      {comments &&
        comments.map((comment) => (
          <Comment
            key={comment.date}
            user={comment.user}
            date={comment.date}
            text={comment.text}
          />
        ))}
    </div>
  );
}

export default CommentSection;
