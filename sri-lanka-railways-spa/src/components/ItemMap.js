// src/components/ItemMap.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import locationIcon from './location-pin.png'; // Ensure the path to the icon is correct
import { Box, Card, Typography } from '@mui/material';

const customIcon = new L.Icon({
    iconUrl: locationIcon,
    iconSize: [38, 45],
    iconAnchor: [22, 45],
    popupAnchor: [-3, -45],
});

const ItemMap = ({ location }) => {
    return (
        <Box mt={4} display="flex" justifyContent="center">
            <Card elevation={3} style={{ width: '100%', maxWidth: '800px', padding: '16px' }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Item Location Map
                </Typography>
                <MapContainer center={[location.latitude, location.longitude]} zoom={12} style={{ height: "500px", borderRadius: '8px', overflow: 'hidden' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        maxZoom={18}
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[location.latitude, location.longitude]} icon={customIcon}>
                        <Popup>
                            <Typography variant="body1">
                                <strong>Item Location</strong> <br />
                                Latitude: {location.latitude}, Longitude: {location.longitude} <br />
                                Location: {location.locationName}
                            </Typography>
                        </Popup>
                    </Marker>
                </MapContainer>
            </Card>
        </Box>
    );
};

export default ItemMap;
