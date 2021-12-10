import { useState } from "react";
import AddBookResourceForm from "./AddBookResourceForm";
import AddPodcastResourceForm from "./AddPodcastResourceForm";
import AddPodcastEpisodeResourceForm from "./AddPodcastEpisodeResourceForm";
import AddMotivationalSpeechResourceForm from "./AddMotivationalSpeechResourceForm";

import "../css/Addpage.css";

function AddPage() {
  const [resourceType, setResourceType] = useState(null);

  const selectResourceType = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex].value;
    setResourceType(selectedOption);
  };

  const submitClicked = () => {
    window.location.href = "/";
  };

  return (
    <div className="add-container">
      <select
        onChange={selectResourceType}
        name="resoruces"
        id="resources"
        data-test="select-resource-type"
      >
        <option value="">Select resource type</option>
        <option value="book">Book</option>
        <option value="podcast">Podcast</option>
        <option value="podcast-episode">Podcast Episode</option>
        <option value="motivational-speech">Motivational Speech</option>
      </select>

      {resourceType === "book" && (
        <div>
          <AddBookResourceForm
            resourceType={resourceType}
            submitClicked={submitClicked}
          />
        </div>
      )}
      {resourceType === "podcast" && (
        <div>
          <AddPodcastResourceForm
            resourceType={resourceType}
            submitClicked={submitClicked}
          />
        </div>
      )}
      {resourceType === "podcast-episode" && (
        <div>
          <AddPodcastEpisodeResourceForm
            resourceType={resourceType}
            submitClicked={submitClicked}
          />
        </div>
      )}
      {resourceType === "motivational-speech" && (
        <div>
          <AddMotivationalSpeechResourceForm
            resourceType={resourceType}
            submitClicked={submitClicked}
          />
        </div>
      )}
    </div>
  );
}

export default AddPage;
