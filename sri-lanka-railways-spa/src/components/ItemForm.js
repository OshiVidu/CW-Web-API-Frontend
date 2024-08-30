// src/components/ItemForm.js
import React, { useState } from 'react';
import axios from 'axios';
import ItemMap from './ItemMap';  // Import a new component to display the map

const ItemForm = () => {
    const [itemData, setItemData] = useState({
        name: '',         // Add a name field
        train_id: '',
        destination: ''
    });
    const [itemId, setItemId] = useState(null);
    const [enteredItemId, setEnteredItemId] = useState('');  // State to hold the entered item_id
    const [itemLocation, setItemLocation] = useState(null);  // State to hold the location data

    const handleChange = (e) => {
        setItemData({
            ...itemData,
            [e.target.name]: e.target.value
        });
    };

    const handleItemIdChange = (e) => {
        setEnteredItemId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/v1/items', itemData);
            setItemId(response.data.data.item_id);  // Extract and set the item_id from the response
        } catch (error) {
            console.error('Error submitting item data:', error);
        }
    };

    const handleItemIdSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3001/api/v1/items/${enteredItemId}`);
            setItemLocation(response.data.trainLocation);  // Extract and set the location data
        } catch (error) {
            console.error('Error fetching item location:', error);
        }
    };

    return (
        <div>
            <h2>Enter Item Details</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={itemData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Train ID:</label>
                    <input
                        type="text"
                        name="train_id"
                        value={itemData.train_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Destination:</label>
                    <input
                        type="text"
                        name="destination"
                        value={itemData.destination}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {itemId && (
                <div>
                    <h3>Your Item ID is: {itemId}</h3>
                    <p>You can use this ID to track the item's location.</p>
                </div>
            )}

            {itemId && (
                <div>
                    <h2>Track Item Location</h2>
                    <form onSubmit={handleItemIdSubmit}>
                        <input
                            type="text"
                            placeholder="Enter Item ID"
                            value={enteredItemId}
                            onChange={handleItemIdChange}
                            required
                        />
                        <button type="submit">Track Item</button>
                    </form>
                </div>
            )}

            {itemLocation && (
                <ItemMap location={itemLocation} />
            )}
        </div>
    );
};

export default ItemForm;