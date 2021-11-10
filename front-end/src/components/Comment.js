import "../css/Comment.css"

function Comment(props) {

    return (
      <div className="comment-container">
        <div>
          <strong>
            {props.get_username}
          </strong> 
          - {props.get_datetime}
        </div>
        <div>{props.text}</div> 
        <hr></hr>
      </div>
    )
}

export default Comment;