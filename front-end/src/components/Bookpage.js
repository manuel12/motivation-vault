import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import { API  } from '../api-service';

function BookPage() {
  let [resources, setResources] = useState([]);

  useEffect(() => {
    API.fetchResource({
      resource: 'books', 
      setResourceFunc: setResources})
  }, [])
  
  return (
    <div>
      <PostList resources={resources}/>
    </div>
  )
}

export default BookPage;