import Comment from './Comment';
import "../css/CommentList.css"

function CommentList(props) {

  return (
    <div className="comment-list-container">
      <h3><u>Comments</u></h3>
      {props.comments.map((comment) =>(
        <div>
          <Comment 
            key={comment.id}
            get_username={comment.get_username}
            get_datetime={comment.get_datetime}
            text={comment.text}
          />
        </div>
      ))}
    </div>
  )
}

export default CommentList;

