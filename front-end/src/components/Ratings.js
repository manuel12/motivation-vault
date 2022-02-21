import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import useToken from "./useToken";

import "../css/Ratings.css";

function Ratings(props) {
  const { token } = useToken();

  let [rating, setRating] = useState(-1);
  let [showRatingInput, setShowRatingInput] = useState(false);
  let [hightlighted, setHighlighted] = useState(-1);

  useEffect(() => setRating(props.avgRating), [props.avgRating]);

  const toggleDisplayRatingInput = () => {
    setShowRatingInput(!showRatingInput);
  };

  const highlightRate = (high) => (e) => {
    setHighlighted(high);
  };

  const handleSubmitRating = (rating) => (e) => {
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
        className={avgRating > 0 ? "orange" : "no-display"}
        data-test="star-icon-1"
      />
      <FontAwesomeIcon
        icon={faStar}
        className={avgRating > 1 ? "orange" : "no-display"}
        data-test="star-icon-2"
      />
      <FontAwesomeIcon
        icon={faStar}
        className={avgRating > 2 ? "orange" : "no-display"}
        data-test="star-icon-3"
      />
      <FontAwesomeIcon
        icon={faStar}
        className={avgRating > 3 ? "orange" : "no-display"}
        data-test="star-icon-4"
      />
      <FontAwesomeIcon
        icon={faStar}
        className={avgRating > 4 ? "orange" : "no-display"}
        data-test="star-icon-5"
      />

      <span className="num-ratings" data-test="num-ratings">
        {numRatings !== 1
          ? `(${numRatings} reviews)`
          : `(${numRatings} review)`}
      </span>

      {props.addRatingBtn && (
        <FontAwesomeIcon
          icon={faPlusSquare}
          className="add-rating"
          onClick={toggleDisplayRatingInput}
          data-test="add-rating-button"
        />
      )}

      {showRatingInput && (
        <div className="rate-container">
          <h2>Rate it!</h2>
          {[...Array(5)].map((e, i) => {
            return (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className={hightlighted > i - 1 ? "orange-pointer" : "white"}
                data-test={`add-star-icon-${i + 1}`}
                onMouseEnter={highlightRate(i)}
                onMouseLeave={highlightRate(-1)}
                onClick={handleSubmitRating(i)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Ratings;
