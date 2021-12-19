import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import useToken from "./useToken";

import "../css/CommentSection.css";

function CommentSection(props) {
  const { token } = useToken();

  let [comments, setComments] = useState([]);
  let [commentText, setCommentText] = useState("");

  useEffect(() => setComments(props.comments), [props.comments]);

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
        })
        .catch((error) => console.warn(error));

      setCommentText("");
    }
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
        data-test="comment-input"
      />

      <button
        id="submit"
        type="submit"
        onClick={submitClicked}
        data-test="add-comment-submit-button"
      >
        Add Comment
      </button>
      <button
        id="submit"
        type="submit"
        onClick={()=>{
          setCommentText("")
        }}
        data-test="add-comment-cancel-button"
      >
        Cancel
      </button>
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
