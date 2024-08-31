// src/components/TrainDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Typography, Box, Paper, CircularProgress, Grid } from '@mui/material';
import { styled } from '@mui/system';

const BackgroundBox = styled(Box)({
    background: 'linear-gradient(135deg, #f6f8f9, #e2ebf0)',
    minHeight: '100vh',
    paddingTop: '50px',
    paddingBottom: '50px',
});

const StyledPaper = styled(Paper)({
    padding: '30px',
    backgroundColor: '#e0f7fa',
    borderRadius: '15px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
});

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
            <BackgroundBox display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
            </BackgroundBox>
        );
    }

    return (
        <BackgroundBox>
            <Container maxWidth="md">
                <Box mt={4} mb={4}>
                    <Typography variant="h4" gutterBottom align="center" sx={{ color: '#333' }}>
                        Specific Train Details
                    </Typography>
                    <StyledPaper elevation={3}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#00695c' }}>
                                    {train.train_name}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">
                                    <strong>Train ID:</strong> {train.train_id}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Latitude:</strong> {train.latitude}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Longitude:</strong> {train.longitude}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
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
                            </Grid>
                        </Grid>
                    </StyledPaper>
                </Box>
            </Container>
        </BackgroundBox>
    );
};

export default TrainDetails;
