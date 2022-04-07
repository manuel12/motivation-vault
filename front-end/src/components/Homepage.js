import React, { useState, useEffect } from "react";
import PostList from "./PostList";
import { API } from "../api-service";

function HomePage() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    API.fetchAllResources(setResources);
  }, []);

  return (
    <div className="homepage" data-test="homepage">
      <PostList resources={resources} />
    </div>
  );
}

export default HomePage;
