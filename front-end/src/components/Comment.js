import "../css/Comment.css"

function Comment(props) {

    return (
      <div
        className="comment-container"
        data-test="comment-container">
        <div>
          <strong>{props.user}</strong> - {props.date}
        </div>
        <div>{props.text}</div> 
        <br/>
      </div>
    )
}

export default Comment;