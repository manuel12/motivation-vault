import React, { useState, useEffect } from "react";
import PostList from "./PostList";
import { API } from "../api-service";

function PodcastEpisodePage() {
  let [resources, setResources] = useState([]);

  useEffect(() => {
    API.fetchResource({
      resource: "podcast-episodes",
      setResourceFunc: setResources,
    });
  }, []);

  return (
    <div>
      <PostList resources={resources} />
    </div>
  );
}

export default PodcastEpisodePage;
