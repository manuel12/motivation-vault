import { useState } from 'react';
import AddBookForm from './AddbookForm';
import AddPodcastForm from './AddpodcastForm';
import AddPodcastEpisodeForm from './AddpodcastEpisodeForm';
import AddMotivationalSpeechForm from './AddMotivationalSpeechForm';
import '../css/Addpage.css';

function AddPage() {
  const [resourceType, setResourceType] = useState(null);

  const selectResourceType = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex].text;
    setResourceType(selectedOption)
  }

  const submitClicked = () => {
    window.location.href = '/' ;
  }


  return(
    <div className="add-container">

      <select 
        onChange={selectResourceType}
        name="resoruces" 
        id="resources"
        data-test="select-resource-type">
        <option value="">Select resource type</option>
        <option value="Book">Book</option>
        <option value="Podcast">Podcast</option>
        <option value="Podcast-Episode">Podcast Episode</option>
        <option value="Motivational-Speech">Motivational Speech</option>
      </select>

      {resourceType === 'Book' && <div>
        <AddBookForm submitClicked={submitClicked}/>
      </div>}
      {resourceType === 'Podcast' &&  <div>
        <AddPodcastForm submitClicked={submitClicked}/>
      </div>}
      {resourceType === 'Podcast Episode' &&  <div>
        <AddPodcastEpisodeForm submitClicked={submitClicked}/>
      </div>}
      {resourceType === 'Motivational Speech' && <div>
        <AddMotivationalSpeechForm submitClicked={submitClicked}/>
      </div>}

      
    </div>
  )
}

export default AddPage;