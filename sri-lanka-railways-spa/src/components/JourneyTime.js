// src/components/JourneyTime.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const JourneyTime = () => {
    const [departureLocation, setDepartureLocation] = useState('');
    const [arrivalLocation, setArrivalLocation] = useState('');
    const [journeyTime, setJourneyTime] = useState('');

    const handleGetJourneyTime = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/v1/journey-time', {
                params: {
                    departureLocation,
                    arrivalLocation
                }
            });
            setJourneyTime(response.data.estimatedTime);
        } catch (error) {
            console.error('Error fetching journey time:', error);
            setJourneyTime('Error fetching journey time');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Get Journey Time
            </Typography>
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    fullWidth
                    label="Departure Location"
                    variant="outlined"
                    margin="normal"
                    value={departureLocation}
                    onChange={(e) => setDepartureLocation(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Arrival Location"
                    variant="outlined"
                    margin="normal"
                    value={arrivalLocation}
                    onChange={(e) => setArrivalLocation(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleGetJourneyTime}
                    sx={{ mt: 2 }}
                >
                    Get Journey Time
                </Button>
            </Box>
            {journeyTime && (
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                    Estimated Journey Time: {journeyTime}
                </Typography>
            )}
        </Container>
    );
};

export default JourneyTime;
