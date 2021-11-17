import "../css/Post.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons';

function Post(props) {
    console.log(props.rating)

    return (
      <div className="post-container">
        <a href={`http://localhost:3000/${props.id}/`} className="container-link">
          <div className="image-container">
            <img src={props.imageURL} className="image" alt=""></img>
          </div>
          <div className="text-container">
            <h3>{props.title}</h3>
            <div className="author-text-container">
              by <h5 className="author-name">{props.author}</h5>
            </div>

            <div className="ratings-container">
              <FontAwesomeIcon icon={faStar}
                className={props.rating > 0 ? 'orange' : 'white'}/>
              <FontAwesomeIcon icon={faStar}
                className={props.rating > 1 ? 'orange' : 'white'}/>
              <FontAwesomeIcon icon={faStar}
                className={props.rating > 2 ? 'orange' : 'white'}/>
              <FontAwesomeIcon icon={faStar}
                className={props.rating > 3 ? 'orange' : 'white'}/>
              <FontAwesomeIcon icon={faStar}
                className={props.rating > 4 ? 'orange' : 'white'}/>
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