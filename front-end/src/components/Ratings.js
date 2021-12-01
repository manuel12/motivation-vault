import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import "../css/Ratings.css";

function Ratings(props) {
  let [showNumberInput, setShowNumberInput] = useState(false);
  let [rating, setRating] = useState(-1);
  let [ratingInputError, setRatingInputError] = useState(false);

  useEffect(() => setRating(props.avgRating), [props.avgRating]);

  const handleClick = () => {
    setShowNumberInput(true);
  };

  const handleSubmitRating = () => {
    if (rating >= 1 && rating <= 5) {
      const newRating = {
        resource: props.resourceId,
        stars: rating,
      };

      fetch(`http://127.0.0.1:8000/api/ratings/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token 51d55878caa6db7066be358ad1cd51eb90d88897`,
        },
        body: JSON.stringify(newRating),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          console.log(resp);
          getDetails();
        })
        .catch((error) => console.warn(error));
      setShowNumberInput(false);
    } else {
      setRatingInputError(true);
    }
  };

  const getDetails = () => {
    fetch(`http://127.0.0.1:8000/api/${props.resourceId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token 51d55878caa6db7066be358ad1cd51eb90d88897`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => props.updateResource(resp))
      .catch((error) => console.log(error));
  };

  let avgRating = props.avgRating;
  let numRatings = props.numRatings;

  return (
    <div className="ratings-container" data-test="ratings-container">
      <FontAwesomeIcon
        icon={faStar}
        className={avgRating > 0 ? "orange" : "white"}
        data-test={`star-icon-${1}`}
      />
      <FontAwesomeIcon
        icon={faStar}
        className={avgRating > 1 ? "orange" : "white"}
        data-test={`star-icon-${2}`}
      />
      <FontAwesomeIcon
        icon={faStar}
        className={avgRating > 2 ? "orange" : "white"}
        data-test={`star-icon-${3}`}
      />
      <FontAwesomeIcon
        icon={faStar}
        className={avgRating > 3 ? "orange" : "white"}
        data-test={`star-icon-${4}`}
      />
      <FontAwesomeIcon
        icon={faStar}
        className={avgRating > 4 ? "orange" : "white"}
        data-test={`star-icon-${5}`}
      />

      <span className="num-ratings" data-test="num-ratings">
        (
        {`${numRatings} 
            ${numRatings !== 1 ? "reviews" : "review"}`}
        )
      </span>
      {props.addRatingBtn ? (
        <FontAwesomeIcon
          icon={faPlusSquare}
          className="add-rating"
          onClick={handleClick}
          data-test="add-rating-button"
        />
      ) : null}
      {showNumberInput ? (
        <div>
          {ratingInputError ? (
            <label data-test="add-rating-input-error">
              Rating needs to be between 1 and 5
            </label>
          ) : null}
          <input
            type="number"
            max="5"
            min="1"
            defaultValue="0"
            value={rating}
            onChange={(evt) => {
              setRating(evt.target.value);
            }}
            data-test="add-rating-input"
          />
          <button
            type="button"
            onClick={handleSubmitRating}
            data-test="add-rating-submit-button"
          >
            Submit
          </button>
        </div>
      ) : null}
    </div>
    // : null
  );
}

export default Ratings;
