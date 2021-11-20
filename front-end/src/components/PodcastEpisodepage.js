import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import { API  } from '../api-service';
import { useCookies } from 'react-cookie';

function PodcastEpisodePage() {
  let [resources, setResources] = useState([]);
  const [token] = useCookies(['mr-token']);

  useEffect(() => {
    API.fetchResource({
      resource: 'podcasts-episodes', 
      setResourceFunc: setResources,
      token: token})
  }, [token])

  console.log(resources)
  return (
    <div>
      <PostList resources={resources}/>
    </div>
  )
}

export default PodcastEpisodePage;