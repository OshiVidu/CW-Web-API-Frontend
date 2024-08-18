document.addEventListener('DOMContentLoaded', () => {
    // Show the default section
    showSection('all-trains');

    // Handle form submissions for train details, location tracking, and luggage booking
    document.getElementById('train-details-form').addEventListener('submit', fetchTrainDetails);
    document.getElementById('user-location-form').addEventListener('submit', fetchArrivalTime);
    document.getElementById('track-location-form').addEventListener('submit', fetchTrainLocation);
    document.getElementById('luggage-booking-form').addEventListener('submit', bookLuggage);

    // Fetch and display all trains
    fetchAllTrains();
});

// Function to switch between different sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    const buttons = document.querySelectorAll('nav ul li button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(`btn-${sectionId}`).classList.add('active');
}

// Fetch and display all trains
async function fetchAllTrains() {
    try {
        const response = await fetch('/api/v1/trains');
        const trains = await response.json();

        const trainList = document.getElementById('train-list');
        trainList.innerHTML = '';

        trains.forEach(train => {
            const trainItem = document.createElement('div');
            trainItem.classList.add('train-item');
            trainItem.textContent = `Train ID: ${train.train_id}, Route: ${train.route_id}`;
            trainList.appendChild(trainItem);
        });
    } catch (error) {
        console.error('Error fetching trains:', error);
    }
}

// Fetch and display train details
async function fetchTrainDetails(event) {
    event.preventDefault();

    const trainId = document.getElementById('train-id').value;
    try {
        const response = await fetch(`/api/v1/trains/${trainId}`);
        const train = await response.json();

        const output = document.getElementById('train-details-output');
        output.innerHTML = `Train ID: ${train.train_id}<br>Route: ${train.route_id}<br>Engine: ${train.engine_id}`;
    } catch (error) {
        console.error('Error fetching train details:', error);
    }
}

// Fetch and display estimated arrival time
async function fetchArrivalTime(event) {
    event.preventDefault();

    const trainId = document.getElementById('train-id').value;
    const userLocation = document.getElementById('user-location').value;
    try {
        const response = await fetch(`/api/v1/trains/${trainId}/estimate-time?userLocation=${encodeURIComponent(userLocation)}`);
        const result = await response.json();

        const output = document.getElementById('arrival-time-output');
        output.innerHTML = result.message;
    } catch (error) {
        console.error('Error fetching estimated arrival time:', error);
    }
}

// Initialize the map
const map = L.map('map').setView([7.8731, 80.7718], 7); // Coordinates for Sri Lanka

// Set up the OSM tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

let marker; // To store the marker

// Fetch and display the train's location on the map
async function fetchTrainLocation(event) {
    event.preventDefault();

    const trainId = document.getElementById('track-train-id').value;
    try {
        const response = await fetch(`/api/v1/trains/${trainId}/locations`);
        const locationData = await response.json();

        const output = document.getElementById('location-output');
        output.innerHTML = '';

        locationData.forEach(location => {
            const locationItem = document.createElement('div');
            locationItem.textContent = `Lat: ${location.latitude}, Lng: ${location.longitude}, Time: ${location.timestamp}`;
            output.appendChild(locationItem);
        });

        // Update map
        const latestLocation = locationData[0]; // Assuming the latest location is the first in the array
        if (latestLocation) {
            const { latitude, longitude } = latestLocation;
            map.setView([latitude, longitude], 13);

            if (marker) {
                marker.setLatLng([latitude, longitude]);
            } else {
                marker = L.marker([latitude, longitude]).addTo(map);
            }
        }
    } catch (error) {
        console.error('Error fetching train location:', error);
    }
}

// Handle luggage booking
async function bookLuggage(event) {
    event.preventDefault();

    const departureStation = document.getElementById('departure-station').value;
    const destinationStation = document.getElementById('destination-station').value;

    try {
        const response = await fetch('/api/v1/luggage/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                departureStation,
                destinationStation
            }),
        });

        const result = await response.json();

        const output = document.getElementById('luggage-booking-output');
        output.innerHTML = result.message;
    } catch (error) {
        console.error('Error booking luggage:', error);
    }
}