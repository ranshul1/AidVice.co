import React from "react";

const LocationFetcher = ({ setUserLocation }) => {
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error fetching location:", error.message);
          alert("Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={getLocation}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Enable Location
      </button>
    </div>
  );
};

export default LocationFetcher;
