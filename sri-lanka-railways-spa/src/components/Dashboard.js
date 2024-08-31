// src/components/Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box, Grid } from '@mui/material';

const Dashboard = () => {
    const [trainId, setTrainId] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const handleSearchTrain = () => {
        if (trainId) {
            navigate(`/trains/${trainId}`);
        }
    };

    const handleGetTrainByDate = () => {
        if (trainId && date) {
            navigate(`/trains/${trainId}/details?date=${date}`);
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
        <Box
            sx={{
                backgroundColor: '#e0f7fa',
                minHeight: '100vh',
                py: 6,
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" gutterBottom color="primary">
                    Sri Lanka Railways Train Tracking System
                </Typography>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    mb={4}
                    sx={{
                        padding: 3,
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Grid container spacing={3} direction="column">
                        <Grid item>
                            <TextField
                                fullWidth
                                label="Enter Train ID"
                                variant="outlined"
                                value={trainId}
                                onChange={(e) => setTrainId(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                fullWidth
                                type="date"
                                variant="outlined"
                                label="Select Date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleSearchTrain}
                            >
                                Search Train Location
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleGetTrainByDate}
                            >
                                Get Specific Train
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleGetTrainHistory}
                            >
                                 Train History
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleGetAllTrains}
                            >
                                All Trains
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleJourneyTime}
                            >
                                Journey Time
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                onClick={handleCheckItems}
                            >
                                Check Items
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default Dashboard;
