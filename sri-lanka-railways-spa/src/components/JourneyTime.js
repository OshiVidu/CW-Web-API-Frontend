// src/components/JourneyTime.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';

const JourneyTime = () => {
    const [departureLocation, setDepartureLocation] = useState('');
    const [arrivalLocation, setArrivalLocation] = useState('');
    const [journeyTime, setJourneyTime] = useState('');

    const handleGetJourneyTime = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/v1/journey-time', {
                params: {
                    departureLocation,
                    arrivalLocation,
                },
            });
            setJourneyTime(response.data.estimatedTime);
        } catch (error) {
            console.error('Error fetching journey time:', error);
            setJourneyTime('Error fetching journey time');
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: '#f0f4f8',
                minHeight: '100vh',
                py: 6,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: 4, borderRadius: '12px' }}>
                    <Typography variant="h4" align="center" gutterBottom color="primary">
                        Get Journey Time
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        sx={{
                            mt: 3,
                        }}
                    >
                        <TextField
                            fullWidth
                            label="Departure Location"
                            variant="outlined"
                            margin="normal"
                            value={departureLocation}
                            onChange={(e) => setDepartureLocation(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Arrival Location"
                            variant="outlined"
                            margin="normal"
                            value={arrivalLocation}
                            onChange={(e) => setArrivalLocation(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            onClick={handleGetJourneyTime}
                            sx={{ mt: 3, py: 1, borderRadius: '8px' }}
                        >
                            Get Journey Time
                        </Button>
                    </Box>
                    {journeyTime && (
                        <Typography
                            variant="h6"
                            align="center"
                            sx={{
                                mt: 4,
                                backgroundColor: '#e0f7fa',
                                p: 2,
                                borderRadius: '8px',
                            }}
                        >
                            Estimated Journey Time: {journeyTime}
                        </Typography>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default JourneyTime;
