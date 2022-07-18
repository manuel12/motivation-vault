import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";

import { getEmbedYoutubeUrl } from "../utils";
import { useParams } from "react-router-dom";
import { API } from "../api-service";
import useToken from "./useToken";
import CommentSection from "./CommentSection";
import RatingSection from "./RatingSection";
import ValueSection from "./ValueSection";
import NotFound from "./NotFound";

import Modal from "./Modal";
import AlertMessage from "./AlertMessage";

import classes from "../css/Detailpage.module.css";

const DetailPage = () => {
  const { id } = useParams();
  const { token } = useToken();
  const [resource, setResource] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    API.fetchResource(id, token, setResource);
  }, [id]);

  if (resource.error && resource.error === "Not found") {
    return <NotFound />;
  }

  const editButtonClickedHandler = () => {
    let resourceType = resource.get_resource_type;
    window.location.href = `/update/${resourceType}/${id}/`;
  };

  const deleteButtonClickedHandler = () => {
    setDisplayModal(true);
  };

  const modalDeleteButtonClicked = () => {
    API.deleteResource(resource.get_resource_type, id, token);
    setDisplayModal(false);
  };

  const modalCancelButtonClicked = () => {
    setDisplayModal(false);
  };

  return resource ? (
    <Fragment>
      {displayModal && (
        <Modal
          heading={"Delete Resource"}
          question={"Are you sure you want to delete this resource?"}
          acceptButtonClicked={modalDeleteButtonClicked}
          cancelButtonClicked={modalCancelButtonClicked}
        />
      )}
      {displaySuccessMessage && <AlertMessage message={successMessage} />}
      <div
        className={classes["detail-page-container"]}
        data-test="detail-page-container"
      >
        <div className={classes["post-section-container"]}>
          <div className={classes["crud-buttons-container"]}>
            <div className={classes["edit-button-container"]}>
              <FontAwesomeIcon
                icon={faEdit}
                className={classes["edit-button"]}
                data-test="edit-button"
                onClick={editButtonClickedHandler}
              />
            </div>
            <div className={classes["delete-button-container"]}>
              <FontAwesomeIcon
                icon={faTrash}
                className={classes["delete-button"]}
                data-test="delete-button"
                onClick={deleteButtonClickedHandler}
              />
            </div>
          </div>

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
          {resource.description && (
            <div className={classes["description-section"]}>
              <h3>Description</h3>
              <p className={classes["paragraph-container"]}>
                {resource.description}
              </p>
            </div>
          )}
        </div>

        <ValueSection resource={resource} />
        <CommentSection resourceId={id} comments={resource.get_comments} />
      </div>
    </Fragment>
  ) : (
    <FontAwesomeIcon
      icon={faSpinner}
      className={classes.spinner}
      data-test="spinner"
    />
  );
};

export default DetailPage;
