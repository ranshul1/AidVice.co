import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const HospitalMap = ({ userLocation, hospitals }) => {
  return (
    <MapContainer
      center={[userLocation.latitude, userLocation.longitude]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* User's Location */}
      <Marker position={[userLocation.latitude, userLocation.longitude]}>
        <Popup>You are here</Popup>
      </Marker>
      {/* Nearby Hospitals */}
      {hospitals.map((hospital, index) => (
        <Marker key={index} position={[hospital.latitude, hospital.longitude]}>
          <Popup>{hospital.name || "Unnamed Hospital"}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default HospitalMap;
