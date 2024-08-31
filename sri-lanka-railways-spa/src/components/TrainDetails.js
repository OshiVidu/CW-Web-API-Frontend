// src/components/TrainDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Typography, Box, Paper, CircularProgress } from '@mui/material';

const TrainDetails = () => {
    const { train_id } = useParams();
    const location = useLocation(); // Hook to get query parameters
    const [train, setTrain] = useState(null);

    useEffect(() => {
        const fetchTrainDetails = async () => {
            try {
                const params = new URLSearchParams(location.search); // Get query params from the URL
                const date = params.get('date'); // Extract the 'date' query parameter
                
                const response = await axios.get(`http://localhost:3001/api/v1/trains/${train_id}/locations`, {
                    params: { date } // Pass the date as a query parameter to the backend
                });
                setTrain(response.data);
            } catch (error) {
                console.error('Error fetching train details:', error);
            }
        };

        fetchTrainDetails();
    }, [train_id, location.search]);

    if (!train) {
        return (
            <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Box mt={4} mb={4}>
                <Typography variant="h4" gutterBottom align="center">
                    Train Details
                </Typography>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h6">
                        {train.train_name}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Train ID:</strong> {train.train_id}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Latitude:</strong> {train.latitude}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Longitude:</strong> {train.longitude}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Speed:</strong> {train.speed} km/h
                    </Typography>
                    <Typography variant="body1">
                        <strong>Signal Strength:</strong> {train.signal_strength}%
                    </Typography>
                    <Typography variant="body1">
                        <strong>Location:</strong> {train.locationName}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Timestamp:</strong> {new Date(train.timestamp).toLocaleString()}
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default TrainDetails;
