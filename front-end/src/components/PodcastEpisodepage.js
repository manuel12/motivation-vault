import React, { useState, useEffect } from "react";
import PostList from "./PostList";
import { API } from "../api-service";
import useToken from "./useToken";

const PodcastEpisodePage = () => {
  const { token } = useToken();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    API.fetchAllResourcesOfType("podcast-episodes", token, setResources);
  }, [token]);

  return (
    <div>
      <PostList resources={resources} />
    </div>
  );
}

export default PodcastEpisodePage;
