import React from 'react';
import { useState } from 'react';
import apiURL from '../api';

export const EditPage = ({ fetchItems, toEdit, setEditing}) => {

  const[title, setTitle] = useState('');
  const[price, setPrice] = useState('');
  const[description, setDescription] = useState('');
  const[category, setCategory] = useState('');
  const[image, setImage] = useState('');

  async function handleSubmitItem(id){
    const dataToSend = {
      
      title: title,
      price: price,
      description: description, 
      category: category,
      image: image
    };
    const response = await fetch(`${apiURL}/items/${id}`, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        dataToSend
      )
    })
    setEditing(false)
    const data = await response.json()
    fetchItems()
  };

  return <>
    <div>
      <form className='editItem'>
        <h3>Edit Item</h3>
        
        <input onChange={(event) => setTitle(event.target.value)} value={title} placeholder='Title'></input>
        <input onChange={(event) => setPrice(event.target.value)} value={price} placeholder='Price'></input>
        <input onChange={(event) => setDescription(event.target.value)} value={description} placeholder='description'></input>
        <input onChange={(event) => setCategory(event.target.value)} value={category}  placeholder='category'></input>
        <input onChange={(event) => setImage(event.target.value)} value={image}  placeholder='image'></input>
        <button onClick={() => handleSubmitItem(toEdit.id)} type='button'> Edit Item</button>
        <button onClick={() => {setEditing(false)}}>Back</button>
      </form>
    </div>
  </>
}