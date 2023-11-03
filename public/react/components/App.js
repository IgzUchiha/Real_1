import React, { useState, useEffect } from 'react';
import { ItemList } from './ItemList';
import { AddPage } from './AddPage';
import { SinglePage } from './SinglePage';
import { EditPage } from './EditPage';
import { DeletePage } from './DeletePage';
import { Navbar } from './Navbar';
import apiURL from '../api';

export const App = () => {
    const [items, setItems] = useState([]);
    const [displayAddPage, setDisplayAddPage] = useState(false)
    const [displaySinglePage, setDisplaySinglePage] = useState(null)
    const [editing, setEditing] = useState(false);
    const [toEdit, setToEdit] = useState(null)
    const [deletePage, setDeletePage] = useState(null)

    async function fetchItems() {
        try {
            const response = await fetch(`${apiURL}/items`);
            const itemsData = await response.json();
            setItems(itemsData);
        } catch (err) {
            console.log("Oh no an error in fetchProducts! ", err)
        }
    }

    async function fetchSingleItem(id) {
        try {
            const response = await fetch(`${apiURL}/items/${id}`);
            const singleItemData = await response.json();
            setDisplaySinglePage(singleItemData);
        } catch (err) {
            console.log("Oh no an error in fetchSingleItem! ", err)
        }
    }

    function isEditing(product) {
        setEditing(!editing);
        setDisplaySinglePage(null)
        setToEdit(product)
        console.log(product)
    }

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <main>
            <div>
                <Navbar />
            </div>
            <div className='main'>
                {
                    displayAddPage ? (
                        <AddPage setDisplayAddPage={setDisplayAddPage} fetchItems={fetchItems} />
                    ) :
                        displaySinglePage ? (
                            <SinglePage isEditing={isEditing} setDeletePage={setDeletePage} displaySinglePage={displaySinglePage} setDisplaySinglePage={setDisplaySinglePage} />
                        ) : editing ? (<EditPage fetchItems={fetchItems} toEdit={toEdit} setEditing={setEditing} />)
                            : deletePage ? (<DeletePage fetchItems={fetchItems} deletePage={deletePage} setDeletePage={setDeletePage} />) : (<>
                                <ItemList items={items} fetchSingleItem={fetchSingleItem} />
                                <button onClick={() => setDisplayAddPage(true)}>Add Something!</button>
                            </>)}
            </div>
        </main>
    )
}