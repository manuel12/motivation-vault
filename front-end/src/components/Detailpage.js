import React, { useState, useEffect } from "react";
import { getEmbedYoutubeUrl } from "../utils";
import { useParams } from "react-router-dom";
import { API } from "../api-service";
import useToken from "./useToken";
import CommentSection from "./CommentSection";
import RatingSection from "./RatingSection";
import ValueSection from "./ValueSection";
import classes from "../css/Detailpage.module.css";

const DetailPage = () => {
  const { id } = useParams();
  const { token } = useToken();
  const [resource, setResource] = useState([]);

  useEffect(() => {
    API.fetchResource(id, token, setResource);
  }, [id]);

  return (
    <div
      className={classes["detail-page-container"]}
      data-test="detail-page-container"
    >
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
                data-test="iframe"
              ></iframe>
            ) : (
              <img
                src={resource.imageURL}
                className={classes["image"]}
                data-test="image"
              />
            ))}
        </div>

        <h3>Description</h3>
        <p className={classes["paragraph-container"]}>{resource.description}</p>
      </div>

      <ValueSection resource={resource} />
      <CommentSection resourceId={id} comments={resource.get_comments} />
    </div>
  );
};

export default DetailPage;
