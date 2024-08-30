import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TrainHistory = () => {
    const { train_id } = useParams();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchTrainHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/v1/${train_id}/history`);
                setHistory(response.data);
            } catch (error) {
                console.error('Error fetching train history:', error);
            }
        };

        fetchTrainHistory();
    }, [train_id]);

    return (
        <div>
            <h2>Train History for {train_id}</h2>
            <ul>
                {history.map((entry, index) => (
                    <li key={index}>
                        Time: {entry.timestamp} | Lat: {entry.latitude}, Lon: {entry.longitude} | Speed: {entry.speed} km/h
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrainHistory;