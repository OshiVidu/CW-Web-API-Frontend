// src/components/ItemMap.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import locationIcon from './location-pin.png'; // Adjust this path if the icon is located elsewhere

const customIcon = new L.Icon({
    iconUrl: locationIcon,
    iconSize: [38, 45],
    iconAnchor: [22, 45],
    popupAnchor: [-3, -45],
});

const ItemMap = ({ location }) => {
    return (
        <MapContainer center={[location.latitude, location.longitude]} zoom={10} style={{ height: "400px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={18}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[location.latitude, location.longitude]} icon={customIcon}>
                <Popup>
                    <strong>Item Location</strong> <br />
                    Latitude: {location.latitude}, Longitude: {location.longitude} <br />
                    Location: {location.locationName}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default ItemMap;