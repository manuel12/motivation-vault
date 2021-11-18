import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons';
import "../css/Ratings.css"

function Rating(props) {

  return (
    props.rating ? 
      <div 
        className="ratings-container"
        data-test="ratings-container">
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
    </div> : null
  )
}

export default Rating;