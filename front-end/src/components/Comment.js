import classes from "../css/Comment.module.css";

function Comment(props) {
  return (
    <div className={classes["comment-container"]} data-test="comment-container">
      <div>
        <strong>{props.user}</strong> - {props.date}
      </div>
      <div>{props.text}</div>
      <br />
    </div>
  );
}

export default Comment;
