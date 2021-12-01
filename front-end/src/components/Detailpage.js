import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../api-service";
import CommentSection from "./CommentSection";
import Rating from "./Ratings";
import ValueSection from "./ValueSection";
import "../css/Detailpage.css";

function DetailPage() {
  const { id } = useParams();
  let [resource, setResource] = useState([]);

  useEffect(() => {
    API.fetchResource({
      resource: null,
      setResourceFunc: setResource,
      id: id,
    });
  }, [id]);

  return (
    <div className="container">
      <div className="post-section-container">
        <h1 className="heading">{resource.title}</h1>
        <div className="author-container">
          By <strong>{resource.author}</strong>
        </div>
        <Rating
          resourceId={resource.id}
          avgRating={resource.avg_rating}
          numRatings={resource.num_ratings}
          updateResource={setResource}
          addRatingBtn={true}
        />
        <img src={resource.imageURL} className="image" alt=""></img>
        <h3>Description</h3>
        <p className="paragraph-container">{resource.description}</p>
      </div>

      <ValueSection resource={resource} />
      <CommentSection resourceId={id} comments={resource.get_comments} />
    </div>
  );
}

export default DetailPage;
