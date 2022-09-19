import { useEffect, useState } from "react";
import AddResourceForm from "./AddResourceForm";
import classes from "../css/Addpage.module.css";
import { API } from "../api-service";

const AddPage = () => {
  const [resourceType, setResourceType] = useState(null);
  const [podcastsAvailable, setPodcastsAvailable] = useState(false);

  useEffect(() => {
    API.getPodcastsAvailable(setPodcastsAvailable);
  }, []);

  const selectResourceTypeHandler = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex].value;
    setResourceType(selectedOption);
  };

  return (
    <div className="add-container" data-test="add-container">
      <div className={classes["select-container"]}>
        <select
          name="resources"
          className={classes["resources"]}
          onChange={selectResourceTypeHandler}
          data-test="select-resource-type"
        >
          <option value="">Select resource type</option>
          <option value="book">Book</option>
          <option value="podcast">Podcast</option>
          {podcastsAvailable && (
            <option value="podcast-episode">Podcast Episode</option>
          )}
          <option value="motivational-speech">Motivational Speech</option>
        </select>
      </div>

      {resourceType && (
        <div>
          <AddResourceForm resourceType={resourceType} />
        </div>
      )}
    </div>
  );
};

export default AddPage;
