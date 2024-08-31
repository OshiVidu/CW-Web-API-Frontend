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
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Train Tracking Dashboard
            </Typography>
            <Box component="form" noValidate autoComplete="off" mb={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Enter Train ID"
                            variant="outlined"
                            value={trainId}
                            onChange={(e) => setTrainId(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} sm={4}>
                        <Button variant="contained" fullWidth onClick={handleSearchTrain}>
                            Search Train Location
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button variant="contained" fullWidth onClick={handleGetTrainByDate}>
                            Get Specific Train
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button variant="contained" fullWidth onClick={handleGetTrainHistory}>
                            Get Train History
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Button variant="outlined" fullWidth onClick={handleGetAllTrains}>
                            Get All Trains
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button variant="outlined" fullWidth onClick={handleJourneyTime}>
                            Get Journey Time
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button variant="outlined" fullWidth onClick={handleCheckItems}>
                            Check Items
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Dashboard;
