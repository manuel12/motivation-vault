import { useState } from 'react';
import Input  from './Input';

function AddPodcastEpisodeForm() {
  let [title,                         setTitle]  = useState('');
  let [author,                       setAuthor]  = useState('');
  let [description,             setDescription]  = useState('');
  let [podcast,                     setPodcast]  = useState('');
  let [spotifyEpisodeUrl, setSpotifyEpisodeUrl]  = useState('');
  let [youtubeEpisodeUrl, setYoutubeEpisodeUrl]  = useState('');
  let [valueOne,                   setValueOne]  = useState('');
  let [valueTwo,                   setValueTwo]  = useState('');
  let [valueThree,               setValueThree]  = useState('');

  const submitClicked = () => {
    if(title && 
      author && 
      description && 
      youtubeEpisodeUrl && 
      valueOne && 
      valueTwo && 
      valueThree) {

      const newPodcastEpisode = {
        'title': title,
        'author': author,
        'description': description,
        'from_podcast': parseInt(podcast),
        'spotify_episode_url': spotifyEpisodeUrl,
        'youtube_episode_url': youtubeEpisodeUrl,
        'value_one': valueOne,
        'value_two': valueTwo,
        'value_three': valueThree
      }
      
      console.log(newPodcastEpisode)

      fetch('http://127.0.0.1:8000/api/podcasts-episodes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPodcastEpisode)
      })
      .then( resp => resp.json())
      .then( resp => {
        console.log(resp)
      })
      .catch( error => console.log(error))

      setTitle('');
      setAuthor('');
      setDescription('');
      setSpotifyEpisodeUrl('');
      setYoutubeEpisodeUrl('');
      setValueOne('');
      setValueTwo('');
      setValueThree('');
    }
  }

  return (
    <div className="add-book-form">
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

      <select 
        name="select-podcast" 
        id="select-podcast"
        value={podcast}
        onChange={evt => { 
            setPodcast(evt.target.value)
          }
        }
        data-test="select-podcast">
        <option value="">Select podcast</option>
        <option value="12">Impact Theory</option>
        <option value="10">School of Greatness</option>
        <option value="11">The Tim Ferris Show</option>
      </select>

      <Input 
        item="Spotify Url" 
        itemType="text" 
        value={spotifyEpisodeUrl}
        onChange={ evt => {
          setSpotifyEpisodeUrl(evt.target.value)
          }
        }
        dataAttr="website-url-input"/>

      <Input 
        item="Youtube Episode Url" 
        itemType="text" 
        value={youtubeEpisodeUrl}
        onChange={ evt => {
          setYoutubeEpisodeUrl(evt.target.value)
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

export default AddPodcastEpisodeForm;