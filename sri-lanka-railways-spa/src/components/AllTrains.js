// src/components/AllTrains.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllTrains = () => {
    const [trains, setTrains] = useState([]);

    useEffect(() => {
        const fetchAllTrains = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/trains');
                setTrains(response.data);
            } catch (error) {
                console.error('Error fetching all trains:', error);
            }
        };

        fetchAllTrains();
    }, []);

    return (
        <div>
            <h2>All Trains</h2>
            <ul>
                {trains.map((train) => (
                    <li key={train.train_id}>
                        {train.train_name} (ID: {train.train_id}) - Lat: {train.latitude}, Lon: {train.longitude}, Speed: {train.speed} km/h, Signal Strength: {train.signal_strength}%, Last updated: {new Date(train.timestamp).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllTrains;