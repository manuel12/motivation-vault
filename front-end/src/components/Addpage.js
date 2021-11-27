import { useState } from 'react';
import AddResourceForm from './AddResourceForm';
import '../css/Addpage.css';

function AddPage() {
  const [resourceType, setResourceType] = useState(null);

  const selectResourceType = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex].value;
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
        <option value="book">Book</option>
        <option value="podcast">Podcast</option>
        <option value="podcast-episode">Podcast Episode</option>
        <option value="motivational-speech">Motivational Speech</option>
      </select>


      {resourceType === 'book' && <div>
        <AddResourceForm
          resourceType={resourceType}
          submitClicked={submitClicked}/>
      </div>}
      {resourceType === 'podcast' &&  <div>
        <AddResourceForm
          resourceType={resourceType}
          submitClicked={submitClicked}/>
      </div>}
      {resourceType === 'podcast-episode' &&  <div>
        <AddResourceForm
          resourceType={resourceType}
          submitClicked={submitClicked}/>
      </div>}
      {resourceType === 'motivational-speech' && <div>
        <AddResourceForm
          resourceType={resourceType}
         submitClicked={submitClicked}/>
      </div>}

      
    </div>
  )
}

export default AddPage;