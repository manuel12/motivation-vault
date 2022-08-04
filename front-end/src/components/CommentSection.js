import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import Button from "./Button";
import useToken from "./useToken";

import classes from "../css/CommentSection.module.css";
import { API } from "../api-service";

const CommentSection = (props) => {
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

      API.createComment(token, newComment, (resp) => {
        // Add user and formatted date data in order to display it.
        newComment["user"] = resp["get_username"];
        newComment["date"] = resp["get_formatted_date"];

        const updatedComments = [newComment, ...comments];
        setComments(updatedComments);

        const commentElems =
          document.getElementsByClassName("comment-container");
        const lastCommentElem = commentElems[commentElems.length - 1];
        lastCommentElem.scrollIntoView();
      });

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
      data-test="comment-section-container"
    >
      <h3 className={classes["comment-section-heading"]}>Comments</h3>

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
        <Button
          disabled={submitBtnDisabled}
          className={submitBtnClassName}
          id="submit"
          type="submit"
          text="Comment"
          onClick={submitClickedHandler}
          data-test="add-comment-button"
        />
        <Button
          className={cancelBtnClassName}
          id="cancel"
          type="submit"
          text="Cancel"
          onClick={cancelClickedHandler}
          data-test="cancel-comment-button"
        />
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
};

export default CommentSection;
