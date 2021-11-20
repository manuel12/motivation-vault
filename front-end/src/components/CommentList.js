import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import "../css/CommentList.css"

function CommentList(props) {
  let [comments, setComments] = useState([]);
  let [commentText, setCommentText] = useState('');

  useEffect(() => setComments(props.comments), [props.comments])

  const submitClicked = () => {
    if(commentText) {
      const newComment = {
        'user': 'Manuel',
        'text': commentText,
        'date': new Date().toISOString()

      }
      const updatedComments = [newComment, ...comments];
      setComments(updatedComments);
      setCommentText('');
    }
  }

  return (
    <div
      className="comment-list-container"
      data-test="comment-section">

      <h3><u>Comments</u></h3>

      <input
        className="add-comment"
        type="text"
        value={commentText}
        placeholder="Write a comment..."
        onChange={ evt => {
          setCommentText(evt.target.value)
          }
        }
        data-test="comment-input"/>

      <input
        id="submit"
        type="submit"
        onClick={submitClicked}
        data-test="submit"/>
      <br/>

      {comments && comments.map((comment) =>(
        <div>
          <Comment
            key={comment.id}
            user={comment.user}
            date={comment.date}
            text={comment.text}
          />
        </div>
      ))}

    </div>
  )
}

export default CommentList;
