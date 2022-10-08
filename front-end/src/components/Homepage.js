import React, { useState, useEffect } from "react";
import PostList from "./PostList";
import { API } from "../api-service";
import useToken from "./useToken";

const HomePage = () => {
  const { token } = useToken();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    console.log(token);
    API.fetchAllResources(token, setResources);
  }, [token]);

  return (
    <div className="homepage" data-test="homepage">
      <PostList resources={resources} />
    </div>
  );
};

export default HomePage;
