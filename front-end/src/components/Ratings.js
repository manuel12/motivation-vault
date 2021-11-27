import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import "../css/Ratings.css";

function Ratings(props) {
  let [showNumberInput, setShowNumberInput] = useState(false);
  let [rating, setRating] = useState(1);

  const handleClick = () => {
    setShowNumberInput(true);
  };

  const handleSubmitRating = () => {
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
      })
      .catch((error) => console.warn(error));
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
          <input
            type="number"
            max="5"
            min="1"
            defaultValue="1"
            onChange={(evt) => {
              setRating(evt.target.value);
            }}
            data-test="add-rating-input"
          />
          <button 
            type="button" 
            onClick={handleSubmitRating}
            data-test="add-rating-submit-button">
            Submit
          </button>
        </div>
      ) : null}
    </div>
    // : null
  );
}

export default Ratings;
