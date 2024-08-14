document.addEventListener('DOMContentLoaded', () => {
    // Show the default section
    showSection('all-trains');

    // Handle form submissions for train details and location tracking
    document.getElementById('train-details-form').addEventListener('submit', fetchTrainDetails);
    document.getElementById('track-location-form').addEventListener('submit', fetchTrainLocation);

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
            locationItem.textContent = `Time: ${location.timestamp}, Lat: ${location.latitude}, Long: ${location.longitude}, Speed: ${location.speed}`;
            output.appendChild(locationItem);

            // Update the map with the latest location
            if (marker) {
                map.removeLayer(marker); // Remove the old marker
            }
            marker = L.marker([location.latitude, location.longitude]).addTo(map);
            map.setView([location.latitude, location.longitude], 12); // Zoom in to the location
        });
    } catch (error) {
        console.error('Error fetching train location:', error);
    }
}