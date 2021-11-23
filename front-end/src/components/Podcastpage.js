import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import { API  } from '../api-service';

function PodcastPage() {
  let [resources, setResources] = useState([]);

  useEffect(() => {
    API.fetchResource({
      resource: 'podcasts', 
      setResourceFunc: setResources})
  }, [])

  return (
    <div>
      <PostList resources={resources}/>
    </div>
  )
}

export default PodcastPage;