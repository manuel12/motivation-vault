import React, { useState, useEffect } from "react";
import PostList from "./PostList";
import { API } from "../api-service";
import useToken from './useToken';

function PodcastEpisodePage() {
  const {token} = useToken();
  let [resources, setResources] = useState([]);

  useEffect(() => {
    API.fetchResource({
      resource: "podcast-episodes",
      token: token,
      setResourceFunc: setResources,
    });
  }, [token]);

  return (
    <div>
      <PostList resources={resources} />
    </div>
  );
}

export default PodcastEpisodePage;
