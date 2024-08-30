// src/components/Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [trainId, setTrainId] = useState('');
    const navigate = useNavigate();

    const handleSearchTrain = () => {
        if (trainId) {
            navigate(`/trains/${trainId}`);
        }
    };

    const handleGetAllTrains = () => {
        navigate('/trains');
    };

    const handleGetTrainHistory = () => {
        if (trainId) {
            navigate(`/trains/${trainId}/history`);
        }
    };

    const handleJourneyTime = () => {
        navigate('/journey-time');
    };

    const handleCheckItems = () => {
        navigate('/items');
    };

    return (
        <div>
            <h1>Train Tracking Dashboard</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter Train ID"
                    value={trainId}
                    onChange={(e) => setTrainId(e.target.value)}
                />
                <button onClick={handleSearchTrain}>Search Train Location</button>
                <button onClick={handleGetTrainHistory}>Get Train History</button>
            </div>
            <div>
                <button onClick={handleGetAllTrains}>Get All Trains</button>
                <button onClick={handleJourneyTime}>Get Journey Time</button>
                <button onClick={handleCheckItems}>Check Items</button>
            </div>
        </div>
    );
};

export default Dashboard;