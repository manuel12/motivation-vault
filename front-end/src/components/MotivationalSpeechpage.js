import React, { useState, useEffect } from "react";
import PostList from "./PostList";
import { API } from "../api-service";
import useToken from "./useToken";

const MotivationalSpeechPage = () => {
  const { token } = useToken();
  const [resources, setResources] = useState(null);

  useEffect(() => {
    API.fetchAllResourcesOfType("motivational-speeches", token, setResources);
  }, [token]);

  return (
    <div>
      <PostList resources={resources} />
    </div>
  );
}

export default MotivationalSpeechPage;
