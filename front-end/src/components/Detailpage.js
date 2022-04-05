import React, { useState, useEffect } from "react";
import { getEmbedYoutubeUrl } from "../utils";
import { useParams } from "react-router-dom";
import { API } from "../api-service";
import CommentSection from "./CommentSection";
import RatingSection from "./RatingSection";
import ValueSection from "./ValueSection";
import classes from "../css/Detailpage.module.css";

function DetailPage() {
  const { id } = useParams();
  const [resource, setResource] = useState([]);

  useEffect(() => {
    API.fetchResource({
      resource: null,
      setResourceFunc: setResource,
      id: id,
    });
  }, [id]);

  return (
    <div className={classes["container"]}>
      <div className={classes["post-section-container"]}>
        <h1 className={classes["heading"]} data-test="heading">
          {resource.title}
        </h1>
        <div className={classes["author-container"]}>
          By <strong>{resource.author}</strong>
        </div>
        <RatingSection
          resourceId={resource.id}
          avgRating={resource.avg_rating}
          numRatings={resource.num_ratings}
          updateResource={setResource}
          addRatingBtn={true}
        />
        <div className={classes["media-container"]}>
          {resource &&
            (resource.get_youtube_url ? (
              <iframe
                className={classes["iframe"]}
                title={resource.title}
                src={getEmbedYoutubeUrl(resource)}
              ></iframe>
            ) : (
              <img src={resource.imageURL} className={classes["image"]} />
            ))}
        </div>

        <h3>Description</h3>
        <p className={classes["paragraph-container"]}>{resource.description}</p>
      </div>

      <ValueSection resource={resource} />
      <CommentSection resourceId={id} comments={resource.get_comments} />
    </div>
  );
}

export default DetailPage;
