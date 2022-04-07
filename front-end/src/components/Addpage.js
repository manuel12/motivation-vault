import { useState } from "react";
import AddResourceForm from "./AddResourceForm";
import AddBookResourceForm from "./AddBookResourceForm";
import AddPodcastResourceForm from "./AddPodcastResourceForm";
import AddPodcastEpisodeResourceForm from "./AddPodcastEpisodeResourceForm";
import AddMotivationalSpeechResourceForm from "./AddMotivationalSpeechResourceForm";

import classes from "../css/Addpage.module.css";

function AddPage() {
  const [resourceType, setResourceType] = useState(null);

  const selectResourceTypeHandler = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex].value;
    setResourceType(selectedOption);
  };

  return (
    <div className="add-container" data-test="add-container">
      <h2>Add a resource!</h2>
      <div className={classes["selectContainer"]}>
        <select
          name="resources"
          className={classes["resources"]}
          onChange={selectResourceTypeHandler}
          data-test="select-resource-type"
        >
          <option value="">Select resource type</option>
          <option value="book">Book</option>
          <option value="podcast">Podcast</option>
          <option value="podcast-episode">Podcast Episode</option>
          <option value="motivational-speech">Motivational Speech</option>
        </select>
      </div>
      {resourceType === "book" && (
        <div>
          <AddResourceForm resourceType={resourceType} />
        </div>
      )}
      {resourceType === "podcast" && (
        <div>
          <AddResourceForm resourceType={resourceType} />
        </div>
      )}
      {resourceType === "podcast-episode" && (
        <div>
          <AddResourceForm resourceType={resourceType} />
        </div>
      )}
      {resourceType === "motivational-speech" && (
        <div>
          <AddResourceForm resourceType={resourceType} />
        </div>
      )}
    </div>
  );
}

export default AddPage;
