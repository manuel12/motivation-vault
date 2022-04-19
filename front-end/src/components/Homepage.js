import React, { useState, useEffect } from "react";
import PostList from "./PostList";
import { API } from "../api-service";
import useToken from "./useToken";

const HomePage = () => {
  const { token } = useToken();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    API.fetchAllResources(token, setResources);
  }, []);

  return (
    <div className="homepage" data-test="homepage">
      <PostList resources={resources} />
    </div>
  );
}

export default HomePage;
