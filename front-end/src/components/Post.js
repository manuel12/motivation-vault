import "../css/Post.css"

function Post(props) {

    return (
      <div className="post-container">
        <a href={`http://localhost:3000/${props.id}/`} className="container-link">
          <div className="image-container">
            <img src={props.imageURL} className="image" alt=""></img>
          </div>
          <div className="text-container">
            <h3>{props.title}</h3>
            <div className="author-text-container">
              By <h5 className="author-name">{props.author}</h5>
            </div>
            <p className="description-container">{
              props.description &&
              props.description.length > 300 ?
              `${props.description.substring(0,300)}...` :
              props.description
              }</p>
          </div>
        </a>
      </div>
    )
}

export default Post;