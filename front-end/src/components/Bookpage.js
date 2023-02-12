import React, { useState, useEffect } from "react";
import PostList from "./PostList";
import { API } from "../api-service";
import useToken from "./useToken";

const BookPage = () => {
  const { token } = useToken();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    API.fetchAllResourcesOfType("books", token, setResources);
  }, [token]);

  return (
    <div className="book-page">
      <PostList resources={resources} />
    </div>
  );
};

export default BookPage;
