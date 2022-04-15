import Post from "./Post";

const PostList = (props) => {
  return (
    <div data-test="post-list-container">
      {props.resources.map((resource) => (
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
      ))}
    </div>
  );
}

export default PostList;
