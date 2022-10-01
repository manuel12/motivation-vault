import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Post from "./Post";
import Spinner from "./Spinner";

import classes from "../css/PostList.module.css";

const PostList = (props) => {
  const [currentResources, setCurrentResources] = useState(null);

  const [postPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const newCurrentResources = props.resources.slice(
      firstPostIndex,
      lastPostIndex
    );

    setCurrentResources(newCurrentResources);
    setPageCount(Math.ceil(props.resources.length / postPerPage));

    console.log(currentPage);
    console.log(pageCount);
  }, [props.resources, currentPage]);

  const prevResources = () => {
    const newCurrentPage = currentPage - 1;
    setCurrentPage(newCurrentPage < 1 ? currentPage : newCurrentPage);
  };

  const nextResources = () => {
    const newCurrentPage = currentPage + 1;
    setCurrentPage(newCurrentPage > pageCount ? currentPage : newCurrentPage);
  };

  return (
    <div
      className={classes["post-list-container"]}
      data-test="post-list-container"
    >
      {currentResources && props.resources.length > 0 ? (
        currentResources.map((resource) => (
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
        <Spinner resources={currentResources} />
      )}

      <div className={classes["pagination-buttons-container"]}>
        <button
          className={`${classes["pagination-button"]} ${
            currentPage - 1 > 0 ?  classes["visible"] : classes["invisible"]
          }`}
          onClick={prevResources}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <button
          className={`${classes["pagination-button"]} ${
            currentPage + 1 <= pageCount
              ? classes["visible"] : classes["invisible"]
          }`}
          onClick={nextResources}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default PostList;
