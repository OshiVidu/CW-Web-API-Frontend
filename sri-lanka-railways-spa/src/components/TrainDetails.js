// TrainDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TrainDetails = () => {
    const { train_id } = useParams();
    const [train, setTrain] = useState(null);

    useEffect(() => {
        const fetchTrainDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/v1/trains/${train_id}`);
                setTrain(response.data);
            } catch (error) {
                console.error('Error fetching train details:', error);
            }
        };

        fetchTrainDetails();
    }, [train_id]);

    if (!train) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{train.train_name}</h2>
            <p>Train ID: {train.train_id}</p>
            <p>Latitude: {train.latitude}</p>
            <p>Longitude: {train.longitude}</p>
            <p>Speed: {train.speed} km/h</p>
            <p>Signal Strength: {train.signal_strength}%</p>
        </div>
    );
};

export default TrainDetails;