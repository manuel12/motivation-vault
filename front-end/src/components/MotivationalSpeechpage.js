import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import { API  } from '../api-service';
function MotivationalSpeechPage() {
  let [resources, setResources] = useState([]);

  useEffect(() => {
    API.fetchResource({
      resource: 'motivational-speeches', 
      setResourceFunc: setResources})
  }, [])

  return (
    <div>
      <PostList resources={resources}/>
    </div>
  )
}

export default MotivationalSpeechPage;