import RatingSection from "./RatingSection";
import classes from "../css/Post.module.css";

const Post = (props) => {
  return (
    <div className={classes["post-container"]} data-test="post-container">
      <a
        href={`http://localhost:3000/${props.id}/`}
        className={classes["post-container-link"]}
      >
        <div className={classes["image-container"]}>
          <img
            src={props.imageURL}
            className={classes["post-image"]}
            alt=""
            data-test="image"
          ></img>
        </div>
        <div className={classes["text-container"]} data-test="text-container">
          <h3>{props.title}</h3>
          <div className={classes["author-text-container"]}>
            by <h5 className={classes["author-name"]}>{props.author}</h5>
          </div>
          <RatingSection
            avgRating={props.avgRating}
            numRatings={props.numRatings}
          />
          <p className={classes["description-container"]}>
            {props.description && props.description.length > 300
              ? `${props.description.substring(0, 300)}...`
              : props.description}
          </p>
        </div>
      </a>
    </div>
  );
}

export default Post;
