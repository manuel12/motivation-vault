import { useState } from 'react';
import Input  from './Input';

function AddPodcastForm() {
  let [title,             setTitle]     = useState('');
  let [author,           setAuthor]     = useState('');
  let [description, setDescription]     = useState('');
  let [websiteUrl,   setWebsiteUrl]     = useState('');
  let [youtubeUrl,   setYoutubeUrl]     = useState('');
  let [valueOne,       setValueOne]     = useState('');
  let [valueTwo,       setValueTwo]     = useState('');
  let [valueThree,   setValueThree]     = useState('');

  const submitClicked = () => {
    if(title && 
      author && 
      description && 
      youtubeUrl && 
      valueOne && 
      valueTwo && 
      valueThree) {

      const newPodcast = {
        'title': title,
        'author': author,
        'description': description,
        'website_url': websiteUrl,
        'youtube_url': youtubeUrl,
        'value_one': valueOne,
        'value_two': valueTwo,
        'value_three': valueThree
      }
      
      console.log(newPodcast)

      fetch('http://127.0.0.1:8000/api/podcasts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPodcast)
      })
      .then( resp => resp.json())
      .then( resp => {
        console.log(resp)
      })
      .catch( error => console.log(error))

      setTitle('');
      setAuthor('');
      setDescription('');
      setWebsiteUrl('');
      setYoutubeUrl('');
      setValueOne('');
      setValueTwo('');
      setValueThree('');
    }
  }

  return (
    <div className="add-podcast-form">
      <Input 
        item="Title" 
        itemType="text" 
        value={title}
        onChange={ evt => {
          setTitle(evt.target.value)
          }
        }
        dataAttr="title-input"/>

      <Input 
        item="Author" 
        itemType="text" 
        value={author}
        onChange={ evt => {
          setAuthor(evt.target.value)
          }
        }
        dataAttr="author-input"/>

      <textarea 
        id="description" 
        name="description" 
        placeholder="Descripion..."
        rows="4" 
        cols="50"
        value={description}
        onChange={ evt => {
          setDescription(evt.target.value)
          }
        }
        data-test="description-input">
      </textarea>

      <Input 
        item="Website Url" 
        itemType="text" 
        value={websiteUrl}
        onChange={ evt => {
          setWebsiteUrl(evt.target.value)
          }
        }
        dataAttr="website-url-input"/>

      <Input 
        item="Youtube Url" 
        itemType="text" 
        value={youtubeUrl}
        onChange={ evt => {
          setYoutubeUrl(evt.target.value)
          }
        }
        dataAttr="youtube-url-input"/>

      <Input 
        item="Value One" 
        itemType="text" 
        value={valueOne}
        onChange={ evt => {
          setValueOne(evt.target.value)
          }
        }
        dataAttr="value-one-input"/>

      <Input 
        item="Value Two" 
        itemType="text" 
        value={valueTwo}
        onChange={ evt => {
          setValueTwo(evt.target.value)
          }
        }
        dataAttr="value-two-input"/>

      <Input 
        item="Value Three" 
        itemType="text"
        value={valueThree}
        onChange={ evt => {
          setValueThree(evt.target.value)
          }
        }
        dataAttr="value-three-input"/>
        
      <input  
        id="submit"
        type="submit"
        onClick={submitClicked}
        data-test="submit"/>
    </div>
 
  )
}

export default AddPodcastForm;