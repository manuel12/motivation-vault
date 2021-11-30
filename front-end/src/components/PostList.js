import Post from './Post';

function PostList(props) {

  return (
    <div>
      {props.resources.map((resource) =>(
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
  )
}

export default PostList;

