import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Post from "./Post";
import classes from "../css/PostList.module.css";

const PostList = (props) => {
  console.log(props.resources);
  const [showNoResourcesText, setShowNoResourcesText] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (props.resources && props.resources.length < 1) {
        setShowNoResourcesText(true);
      }
    }, 1000);
  }, [props.resources]);

  return (
    <div
      className={classes["post-list-container"]}
      data-test="post-list-container"
    >
      {showNoResourcesText ? (
        <h3 className={classes["no-resources"]} data-test="no-resources-text">No resources to show</h3>
      ) : props.resources && props.resources.length > 0 ? (
        props.resources.map((resource) => (
          <Post
            key={resource.id}
            id={resource.id}
            title={resource.title}
            author={resource.author}
            description={resource.description}
            imageURL={resource.imageURL}
            avgRating={resource.avg_rating}
            numRatings={resource.num_ratings}
          />
        ))
      ) : (
        <FontAwesomeIcon
          icon={faSpinner}
          className={classes.spinner}
          data-test="spinner"
        />
      )}
    </div>
  );
};

export default PostList;
