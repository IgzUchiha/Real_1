import React, { useState } from 'react';
import apiURL from '../api';

export const AddPage = ({ setDisplayAddPage, fetchItems }) => {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')

    const handleSubmit = async (ev) => {
        const itemData={
            id: id,
            title: title,
            price: price,
            description:description,
            category:category,
            image:image
        }
        event.preventDefault()
        console.log('items submitted')
        const response = await fetch(`${apiURL}/items`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                itemData)
        });
        const data = await response.json();
        setDisplayAddPage(false);
        fetchItems(data)
    }

    return (
        <>
            <h1>Add Clothes!</h1>
            <br></br>
            <form onSubmit={() => handleSubmit()}>
                <h2>Add Item</h2>
                <input type="text" placeholder='id'
                    value={id} onChange={(ev) => setId(ev.target.value)} />
                <input type="text" placeholder='Title'
                    value={title} onChange={(ev) => setTitle(ev.target.value)} />
                <input type="text" placeholder='Price'
                    value={price} onChange={(ev) => setPrice(ev.target.value)} />
                <input type="text" placeholder='Description'
                    value={description} onChange={(ev) => setDescription(ev.target.value)} />
                <input type="text" placeholder='Category'
                    value={category} onChange={(ev) => setCategory(ev.target.value)} />
                <input type="text" placeholder='Image'
                    value={image} onChange={(ev) => setImage(ev.target.value)} />
                <button type='submit'> Submit</button>
            </form>
        </>
    )
}