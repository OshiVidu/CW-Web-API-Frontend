// src/components/AllTrains.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Grid, Card, CardContent, CircularProgress } from '@mui/material';

const AllTrains = () => {
    const [trains, setTrains] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllTrains = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/trains');
                setTrains(response.data);
            } catch (error) {
                console.error('Error fetching all trains:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllTrains();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>
                All Trains
            </Typography>
            <Grid container spacing={3}>
                {trains.map((train) => (
                    <Grid item xs={12} sm={6} md={4} key={train.train_id}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {train.train_name} (ID: {train.train_id})
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Latitude:</strong> {train.latitude}<br />
                                    <strong>Longitude:</strong> {train.longitude}<br />
                                    <strong>Speed:</strong> {train.speed} km/h<br />
                                    <strong>Signal Strength:</strong> {train.signal_strength}%<br />
                                    <strong>Last Updated:</strong> {new Date(train.timestamp).toLocaleString()}<br />
                                    <strong>Location:</strong> {train.locationName}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default AllTrains;
