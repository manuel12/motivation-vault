import React, { useState, useEffect } from "react";
import PostList from "./PostList";
import { API } from "../api-service";
import useToken from './useToken';

function PodcastPage() {
  const {token} = useToken();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    API.fetchResource({
      resource: "podcasts",
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

export default PodcastPage;
