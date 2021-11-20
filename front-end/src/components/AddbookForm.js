import { useState } from 'react';
import Input  from './Input';

function AddBookForm() {
  let [title,             setTitle]     = useState('');
  let [subtitle,       setSubtitle]     = useState('');
  let [author,           setAuthor]     = useState('');
  let [description, setDescription]     = useState('');
  let [isbn,               setIsbn]     = useState('');
  let [valueOne,       setValueOne]     = useState('');
  let [valueTwo,       setValueTwo]     = useState('');
  let [valueThree,   setValueThree]     = useState('');

  const submitClicked = () => {
    if(title && 
      subtitle &&
      author && 
      description &&
      isbn && 
      valueOne && 
      valueTwo && 
      valueThree) {

      const newBook = {
        'title': title,
        'subtitle': subtitle,
        'author': author,
        'description': description,
        'isbn': isbn,
        'value_one': valueOne,
        'value_two': valueTwo,
        'value_three': valueThree
      }
      
      console.log(newBook)
      
      fetch('http://127.0.0.1:8000/api/books/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
      })
      .then( resp => resp.json())
      .then( resp => {
        console.log(resp)
      })
      .catch( error => console.log(error))

      setTitle('');
      setSubtitle('')
      setAuthor('');
      setDescription('');
      setIsbn('');
      setValueOne('');
      setValueTwo('');
      setValueThree('');

      window.location.pathname = 'books/'
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
        item="Subtitle" 
        itemType="text" 
        value={subtitle}
        onChange={ evt => {
          setSubtitle(evt.target.value)
          }
        }
        dataAttr="subtitle-input"/>

      <Input 
        item="Author" 
        itemType="text" 
        value={author}
        onChange={ evt => {
          setAuthor(evt.target.value)
          }
        }
        dataAttr="author-input"/>

      <Input 
        item="ISBN-13" 
        itemType="text" 
        value={isbn}
        onChange={ evt => {
          setIsbn(evt.target.value)
          }
        }
        dataAttr="isbn-input"/>

      
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

export default AddBookForm;