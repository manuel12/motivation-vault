import React, { useState, useEffect } from "react";
import PostList from "./PostList";
import { API } from "../api-service";
import useToken from "./useToken";

function MotivationalSpeechPage() {
  const { token } = useToken();
  let [resources, setResources] = useState([]);

  useEffect(() => {
    API.fetchResource({
      resource: "motivational-speeches",
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

export default MotivationalSpeechPage;
