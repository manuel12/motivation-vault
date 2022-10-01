import RatingSection from "./RatingSection";
import classes from "../css/Post.module.css";

const Post = (props) => {
  return (
    <div className={classes["post-container"]} data-test="post-container">
      <a
        href={`/${props.id}/`}
        className={classes["post-container-link"]}
      >
        <div className={classes["image-container"]} data-test="image-container">
          <img
            src={props.imageURL}
            className={classes["post-image"]}
            alt=""
            data-test="post-image"
          ></img>
        </div>
        <div className={classes["text-container"]} data-test="text-container">
          <h3 className={classes["post-title"]} data-test="post-title">{props.title}</h3>
          <div className={classes["author-text-container"]}>
            by{" "}
            <h5 className={classes["author-name"]} data-test="post-author">
              {props.author}
            </h5>
          </div>
          <RatingSection
            avgRating={props.avgRating}
            numRatings={props.numRatings}
          />
          <p className={classes["description-container"]} data-test="post-description">
            {props.description && props.description.length > 260
              ? `${props.description.substring(0, 260)}...`
              : props.description}
          </p>
        </div>
      </a>
    </div>
  );
};

export default Post;
