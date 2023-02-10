import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import NoResourcesText from "./NoResourcesText";

import classes from "../css/Spinner.module.css";

const Spinner = (props) => {
  const [showNoResourcesText, setShowNoResourcesText] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      console.log(`props.resources?.length: ${props.resources?.length}`);

      props.resources?.length < 1
        ? setShowNoResourcesText(true)
        : setShowNoResourcesText(false);
    }, 3000);
  }, [props.resources]);

  return (
    <div className={classes["spinner-container"]}>
      {showNoResourcesText ? (
        <NoResourcesText />
      ) : (
        <FontAwesomeIcon
          icon={faSpinner}
          className={classes.spinner}
          data-test="spinner"
        />
      )}
    </div>
  );
};

export default Spinner;
