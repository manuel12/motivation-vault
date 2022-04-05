import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import useToken from "./useToken";

import classes from "../css/RatingSection.module.css";

function RatingSection(props) {
  const { token } = useToken();

  const [rating, setRating] = useState(-1);
  const [showRatingInput, setShowRatingInput] = useState(false);
  const [hightlighted, setHighlighted] = useState(-1);

  useEffect(() => setRating(props.avgRating), [props.avgRating]);

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

    fetch(`http://127.0.0.1:8000/api/ratings/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(newRating),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        getDetails();
      })
      .catch((error) => console.warn(error));

    setShowRatingInput(false);
  };

  const getDetails = () => {
    fetch(`http://127.0.0.1:8000/api/${props.resourceId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => props.updateResource(resp))
      .catch((error) => console.log(error));
  };

  let avgRating = props.avgRating;
  let numRatings = props.numRatings;

  return (
    <div className={classes["ratings-container"]} data-test="ratings-container">
      <FontAwesomeIcon
        icon={faStar}
        className={avgRating > 0 ? classes["orange"] : classes["no-display"]}
        data-test="star-icon-1"
      />
      <FontAwesomeIcon
        icon={faStar}
        className={avgRating > 1 ? classes["orange"] : classes["no-display"]}
        data-test="star-icon-2"
      />
      <FontAwesomeIcon
        icon={faStar}
        className={avgRating > 2 ? classes["orange"] : classes["no-display"]}
        data-test="star-icon-3"
      />
      <FontAwesomeIcon
        icon={faStar}
        className={avgRating > 3 ? classes["orange"] : classes["no-display"]}
        data-test="star-icon-4"
      />
      <FontAwesomeIcon
        icon={faStar}
        className={avgRating > 4 ? classes["orange"] : classes["no-display"]}
        data-test="star-icon-5"
      />

      <span className={classes["num-ratings"]} data-test="num-ratings">
        {numRatings !== 1
          ? `(${numRatings} reviews)`
          : `(${numRatings} review)`}
      </span>

      {props.addRatingBtn && (
        <FontAwesomeIcon
          icon={faPlusSquare}
          className={classes["add-rating"]}
          onClick={addRatingClickedHandler}
          data-test="add-rating-button"
        />
      )}

      {showRatingInput && (
        <div className={classes["rate-container"]}>
          <h2>Rate it!</h2>
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
      )}
    </div>
  );
}

export default RatingSection;
