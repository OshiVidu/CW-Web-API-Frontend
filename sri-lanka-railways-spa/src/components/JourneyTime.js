// src/components/JourneyTime.js
import React, { useState } from 'react';
import axios from 'axios';

const JourneyTime = () => {
    const [departureLocation, setDepartureLocation] = useState('');
    const [arrivalLocation, setArrivalLocation] = useState('');
    const [journeyTime, setJourneyTime] = useState('');

    const handleGetJourneyTime = async () => {
        try {
            // Ensure the parameters are correctly passed in the URL
            const response = await axios.get('http://localhost:3001/api/v1/journey-time', {
                params: {
                    departureLocation: departureLocation,
                    arrivalLocation: arrivalLocation
                }
            });
            setJourneyTime(response.data.estimatedTime);
        } catch (error) {
            console.error('Error fetching journey time:', error);
            setJourneyTime('Error fetching journey time');
        }
    };

    return (
        <div>
            <h2>Get Journey Time</h2>
            <div>
                <label>Departure Location:</label>
                <input
                    type="text"
                    placeholder="Enter Departure Location"
                    value={departureLocation}
                    onChange={(e) => setDepartureLocation(e.target.value)}
                />
            </div>
            <div>
                <label>Arrival Location:</label>
                <input
                    type="text"
                    placeholder="Enter Arrival Location"
                    value={arrivalLocation}
                    onChange={(e) => setArrivalLocation(e.target.value)}
                />
            </div>
            <button onClick={handleGetJourneyTime}>Get Journey Time</button>
            {journeyTime && <p>Estimated Journey Time: {journeyTime}</p>}
        </div>
    );
};

export default JourneyTime;