// src/components/ItemForm.js
import React, { useState } from 'react';
import axios from 'axios';
import ItemMap from './ItemMap';  // Import the map component
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
    Paper
} from '@mui/material';

const ItemForm = () => {
    const [itemData, setItemData] = useState({
        name: '',
        train_id: '',
        destination: ''
    });
    const [itemId, setItemId] = useState(null);
    const [enteredItemId, setEnteredItemId] = useState('');
    const [itemLocation, setItemLocation] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setItemData({
            ...itemData,
            [e.target.name]: e.target.value
        });
    };

    const handleItemIdChange = (e) => {
        setEnteredItemId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:3001/api/v1/items', itemData);
            setItemId(response.data.data.item_id);
        } catch (error) {
            console.error('Error submitting item data:', error);
            setError('Failed to submit item data. Please try again.');
        }
    };

    const handleItemIdSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.get(`http://localhost:3001/api/v1/items/${enteredItemId}`);
            setItemLocation(response.data.trainLocation);
        } catch (error) {
            console.error('Error fetching item location:', error);
            setError('Failed to fetch item location. Please check the Item ID.');
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: '#f7f9fc',
                minHeight: '100vh',
                py: 6,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: 4, borderRadius: '12px', backgroundColor: '#ffffff' }}>
                    <Typography variant="h5" align="center" gutterBottom color="primary">
                        Enter Item Details
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            name="name"
                            value={itemData.name}
                            onChange={handleChange}
                            margin="normal"
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Train ID"
                            variant="outlined"
                            name="train_id"
                            value={itemData.train_id}
                            onChange={handleChange}
                            margin="normal"
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Destination"
                            variant="outlined"
                            name="destination"
                            value={itemData.destination}
                            onChange={handleChange}
                            margin="normal"
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                },
                            }}
                        />
                        <Box mt={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                sx={{
                                    py: 1,
                                    borderRadius: '8px',
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>

                    {itemId && (
                        <Box mt={4}>
                            <Typography variant="h6" align="center" color="secondary">
                                Your Item ID is: {itemId}
                            </Typography>
                            <Typography align="center" sx={{ fontStyle: 'italic' }}>
                                You can use this ID to track the item's location.
                            </Typography>
                        </Box>
                    )}

                    {itemId && (
                        <Box mt={4} component="form" onSubmit={handleItemIdSubmit} noValidate autoComplete="off">
                            <Typography variant="h6" align="center" gutterBottom color="primary">
                                Track Item Location
                            </Typography>
                            <TextField
                                fullWidth
                                label="Enter Item ID"
                                variant="outlined"
                                value={enteredItemId}
                                onChange={handleItemIdChange}
                                margin="normal"
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                    },
                                }}
                            />
                            <Box mt={3}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    type="submit"
                                    sx={{
                                        py: 1,
                                        borderRadius: '8px',
                                    }}
                                >
                                    Track Item
                                </Button>
                            </Box>
                        </Box>
                    )}

                    {error && (
                        <Box mt={3}>
                            <Alert severity="error" sx={{ borderRadius: '8px' }}>
                                {error}
                            </Alert>
                        </Box>
                    )}
                </Paper>

                {itemLocation && (
                    <Box mt={4}>
                        <ItemMap location={itemLocation} />
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default ItemForm;
