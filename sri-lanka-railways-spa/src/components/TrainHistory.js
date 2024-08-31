import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    CircularProgress,
    Box,
    Paper
} from '@mui/material';

const TrainHistory = () => {
    const { train_id } = useParams();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrainHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/v1/${train_id}/history`);
                setHistory(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching train history:', error);
                setLoading(false);
            }
        };

        fetchTrainHistory();
    }, [train_id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: '#e0f7fa' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ backgroundColor: '#e0f7fa', minHeight: '100vh', padding: '20px 0' }}>
            <Container maxWidth="md">
                <Paper elevation={3} sx={{ padding: '20px', backgroundColor: '#ffffff' }}>
                    <Typography variant="h4" align="center" gutterBottom sx={{ marginBottom: '20px' }}>
                        Train History for {train_id}
                    </Typography>
                    <List>
                        {history.map((entry, index) => (
                            <React.Fragment key={index}>
                                <ListItem>
                                    <ListItemText
                                        primary={`Time: ${new Date(entry.timestamp).toLocaleString()}`}
                                        secondary={`Lat: ${entry.latitude}, Lon: ${entry.longitude} | Speed: ${entry.speed} km/h`}
                                    />
                                </ListItem>
                                {index < history.length - 1 && <Divider variant="inset" component="li" />}
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            </Container>
        </Box>
    );
};

export default TrainHistory;
