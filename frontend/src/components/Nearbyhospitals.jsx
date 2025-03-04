// Dependencies to install:
// npm install react react-dom leaflet react-leaflet mapbox-gl @mapbox/mapbox-gl-geocoder tailwindcss postcss autoprefixer
// Add the following CSS to your project for Leaflet:
// import 'leaflet/dist/leaflet.css';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

mapboxgl.accessToken = 'pk.eyJ1IjoieWlrb3NlMTkyNSIsImEiOiJjbTRpeWk0cXcwOTJ5MmxzaGU3b3N6a2x2In0.NizzVUYncage_THZ9H6ANg';

const HospitalLocator = () => {
    const [currentLocation, setCurrentLocation] = useState([40.7128, -74.006]);
    const [hospitals, setHospitals] = useState([]);
    const [customLocation, setCustomLocation] = useState(null);

    useEffect(() => {
        fetchNearbyHospitals(currentLocation);
    }, [currentLocation]);

    const fetchNearbyHospitals = async (coordinates) => {
        const [lat, lng] = coordinates;
        try {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?proximity=${lng},${lat}&access_token=${mapboxgl.accessToken}`);
            const data = await response.json();
            setHospitals(data.features);
        } catch (error) {
            console.error('Error fetching nearby hospitals:', error);
        }
    };

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setCustomLocation([lat, lng]);
                fetchNearbyHospitals([lat, lng]);
            },
        });
        return customLocation ? (
            <Marker position={customLocation}>
                <Popup>Custom Location</Popup>
            </Marker>
        ) : null;
    };

    return (
        <div className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 min-h-screen flex flex-col items-center">
            <h1 className="text-4xl font-bold text-white mt-5">Nearby Hospitals Locator</h1>
            <MapContainer center={currentLocation} zoom={12} className="w-4/5 h-3/4 mt-5 border-4 border-white rounded-lg">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={currentLocation}>
                    <Popup>Your Current Location</Popup>
                </Marker>
                {hospitals.map((hospital) => (
                    <Marker
                        key={hospital.id}
                        position={hospital.geometry.coordinates.reverse()}
                        icon={L.icon({
                            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                        })}
                    >
                        <Popup>
                            <strong>{hospital.text}</strong>
                            <br />
                            {hospital.place_name}
                        </Popup>
                    </Marker>
                ))}
                <LocationMarker />
            </MapContainer>
            <div className="w-4/5 mt-5 bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-3">Nearby Hospitals</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hospitals.map((hospital) => (
                        <li key={hospital.id} className="p-3 bg-gray-100 rounded shadow">
                            <h3 className="font-bold">{hospital.text}</h3>
                            <p>{hospital.place_name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HospitalLocator;
