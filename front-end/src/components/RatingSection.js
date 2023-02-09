import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import useToken from "./useToken";

import classes from "../css/RatingSection.module.css";
import { API } from "../api-service";

const RatingSection = (props) => {
  const { token } = useToken();
  const [showRatingInput, setShowRatingInput] = useState(false);
  const [hightlighted, setHighlighted] = useState(-1);

  const addRatingClickedHandler = () => {
    setShowRatingInput(!showRatingInput);
  };

  const highlightRate = (high) => (e) => {
    setHighlighted(high);
  };

  const submitRatingHandler = (rating) => (e) => {
    e.preventDefault();
    rating += 1;

    const newRating = {
      resource: props.resourceId,
      stars: rating,
    };

    API.postRating(token, newRating, () => {
      API.fetchResource(props.resourceId, token, props.updateResource);
      setShowRatingInput(false);
    });
  };

  let avgRating = props.avgRating;
  let numRatings = props.numRatings;

  return (
    <div className={classes["ratings-container"]} data-test="ratings-container">
      <div className={classes["ratings-icon-panel"]}>
        <div className={classes["star-container"]}>
          <FontAwesomeIcon
            icon={faStar}
            className={`${
              avgRating > 0 ? classes["orange"] : classes["no-display"]
            } ${classes["fa-star"]}`}
            data-test="star-icon-1"
          />
          <FontAwesomeIcon
            icon={faStar}
            className={`${
              avgRating > 1 ? classes["orange"] : classes["no-display"]
            } ${classes["fa-star"]}`}
            data-test="star-icon-2"
          />
          <FontAwesomeIcon
            icon={faStar}
            className={`${
              avgRating > 2 ? classes["orange"] : classes["no-display"]
            } ${classes["fa-star"]}`}
            data-test="star-icon-3"
          />
          <FontAwesomeIcon
            icon={faStar}
            className={`${
              avgRating > 3 ? classes["orange"] : classes["no-display"]
            } ${classes["fa-star"]}`}
            data-test="star-icon-4"
          />
          <FontAwesomeIcon
            icon={faStar}
            className={`${
              avgRating > 4 ? classes["orange"] : classes["no-display"]
            } ${classes["fa-star"]}`}
            data-test="star-icon-5"
          />
        </div>

        <span className={classes["num-ratings"]} data-test="num-ratings">
          {numRatings !== 1
            ? `(${numRatings} ratings)`
            : `(${numRatings} rating)`}
        </span>

        {props.addRatingBtn && (
          <div
            className={classes["add-rating-button-container"]}
            onClick={addRatingClickedHandler}
            data-test="add-rating-button"
          >
            <FontAwesomeIcon
              icon={faPlusSquare}
              className={classes["add-rating"]}
            />
          </div>
        )}
      </div>

      {showRatingInput && (
        <div className={classes["rate-container"]}>
          <h2 className={classes["rate-it-text"]}>Rate it!</h2>
          <div className={classes["stars-container"]}>
            {[...Array(5)].map((e, i) => {
              return (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={
                    hightlighted > i - 1
                      ? classes["orange-pointer"]
                      : classes["white"]
                  }
                  data-test={`add-star-icon-${i + 1}`}
                  onMouseEnter={highlightRate(i)}
                  onMouseLeave={highlightRate(-1)}
                  onClick={submitRatingHandler(i)}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingSection;
