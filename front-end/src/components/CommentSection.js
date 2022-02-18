import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import useToken from "./useToken";

import "../css/CommentSection.css";

function CommentSection(props) {
  const { token } = useToken();

  let [comments, setComments] = useState([]);
  let [commentText, setCommentText] = useState("");
  let [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);

  const submitBtn = document.getElementById("submit");
  const cancelBtn = document.getElementById("cancel");

  useEffect(() => setComments(props.comments), [props.comments]);
  useEffect(() => {
    if (commentText) {
      submitBtn.className = "add-comment-btn-enabled";
      setSubmitBtnDisabled(false);
    } else {
      if (submitBtn) {
        if (cancelBtn.className === "hidden") {
          submitBtn.className = "hidden";
        } else {
          submitBtn.className = "add-comment-btn";
        }
      }
    }
  }, [commentText]);

  const inputClicked = () => {
    if (commentText) {
      submitBtn.className = "add-comment-btn-enabled";
    } else {
      submitBtn.className = "add-comment-btn";
    }
    cancelBtn.className = "cancel-button";
  };

  const submitClicked = () => {
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
      submitBtn.className = "hidden";
      cancelBtn.className = "hidden";
    }
  };

  const cancelClicked = () => {
    setSubmitBtnDisabled(true);
    setCommentText("");
    submitBtn.className = "hidden";
    cancelBtn.className = "hidden";
  };

  return (
    <div className="comment-section-container" data-test="comment-section">
      <h3>
        <u>Comments</u>
      </h3>

      <input
        className="add-comment"
        type="text"
        value={commentText}
        placeholder="Write a comment..."
        onChange={(evt) => {
          setCommentText(evt.target.value);
        }}
        onClick={inputClicked}
        data-test="comment-input"
      />
      <div className="btn-container">
        <button
          disabled={submitBtnDisabled}
          className="hidden"
          id="submit"
          type="submit"
          onClick={submitClicked}
          data-test="add-comment-submit-button"
        >
          Comment
        </button>
        <button
          className="hidden"
          id="cancel"
          type="submit"
          onClick={cancelClicked}
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
