// src/components/TrainMap.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import locationIcon from './location-pin.png';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box } from '@mui/material';

const customIcon = new L.Icon({
    iconUrl: locationIcon,
    iconSize: [38, 45],
    iconAnchor: [22, 45],
    popupAnchor: [-3, -45],
});

const TrainMap = () => {
    const { train_id } = useParams();
    const [train, setTrain] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrainData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/v1/trains/${train_id}`);
                setTrain(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching train data:', error);
                setLoading(false);
            }
        };

        fetchTrainData();
    }, [train_id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!train) {
        return (
            <Container>
                <Typography variant="h5" align="center" color="error" gutterBottom>
                    Train data could not be loaded.
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Live Location of {train.train_name}
            </Typography>
            <MapContainer center={[train.latitude, train.longitude]} zoom={10} style={{ height: "70vh", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxZoom={18}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[train.latitude, train.longitude]} icon={customIcon}>
                    <Popup>
                        <strong>{train.train_name}</strong> <br />
                        Latitude: {train.latitude}, Longitude: {train.longitude} <br />
                        Speed: {train.speed} km/h <br />
                        Last updated: {new Date(train.timestamp).toLocaleTimeString()}
                    </Popup>
                </Marker>
            </MapContainer>
        </Container>
    );
};

export default TrainMap;
