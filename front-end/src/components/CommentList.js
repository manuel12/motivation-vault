import Comment from './Comment';
import "../css/CommentList.css"

function CommentList(props) {

  return (
    <div
      className="comment-list-container"
      date-test="comment-section">

      <h3><u>Comments</u></h3>

      <input
        className="add-comment"
        type="text"
        placeholder="Write a comment..."
        date-test="comment-input"/>

      <br/>

      {props.comments && props.comments.map((comment) =>(
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
