import Post from "./Post";
import classes from "../css/PostList.module.css";

const PostList = (props) => {
  return (
    <div data-test="post-list-container">
      {props.resources && props.resources.length > 0 ? (
        props.resources.map((resource) => (
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
        <h2>No resoure data...</h2>
      )}
    </div>
  );
};

export default PostList;
