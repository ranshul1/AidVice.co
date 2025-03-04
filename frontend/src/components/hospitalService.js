export const fetchHospitals = async (latitude, longitude) => {
    const radius = 5000; // 5km radius
    const url = `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=hospital](around:${radius},${latitude},${longitude});out;`;
  
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch hospitals");
    }
  
    const data = await response.json();
    return data.elements.map((hospital) => ({
      name: hospital.tags.name || "Unnamed Hospital",
      latitude: hospital.lat,
      longitude: hospital.lon,
    }));
  };
  