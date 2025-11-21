import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { BiSearch, BiCurrentLocation, BiMap } from "react-icons/bi";
import { MdDeliveryDining, MdLocationOn } from "react-icons/md";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "leaflet/dist/images/marker-icon-2x.png",
  iconUrl: "leaflet/dist/images/marker-icon.png",
  shadowUrl: "leaflet/dist/images/marker-shadow.png",
});

// Custom marker for delivery location
const deliveryIcon = L.divIcon({
  html: '<div style="background: #a8d05f; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>',
  className: '',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

// Component to change map center
function ChangeMapView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}

// Map click handler
function MapClickHandler({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      onLocationSelect([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

const Coverage = () => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState([23.8103, 90.4125]); // Default Dhaka
  const [userLocation, setUserLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showCoverage, setShowCoverage] = useState(true);
  const [deliveryAvailable, setDeliveryAvailable] = useState(null);

  // Bangladesh districts for coverage (sample data)
  const coverageAreas = [
    { name: "Dhaka", coords: [23.8103, 90.4125], radius: 25000 },
    { name: "Chittagong", coords: [22.3569, 91.7832], radius: 20000 },
    { name: "Rajshahi", coords: [24.3745, 88.6042], radius: 15000 },
    { name: "Khulna", coords: [22.8456, 89.5403], radius: 15000 },
    { name: "Sylhet", coords: [24.8949, 91.8687], radius: 12000 },
  ];

  // Detect user location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
          setMarkerPosition([latitude, longitude]);
          reverseGeocode(latitude, longitude);
        },
        (error) => {
          console.log("Location access denied");
        }
      );
    }
  }, []);

  // Reverse geocode to get address
  const reverseGeocode = async (lat, lon) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
      const res = await fetch(url);
      const data = await res.json();
      if (data) {
        setSelectedAddress(data.display_name);
        checkDeliveryAvailability(lat, lon);
      }
    } catch (error) {
      console.error("Reverse geocoding failed", error);
    }
  };

  // Check if delivery is available at location
  const checkDeliveryAvailability = (lat, lon) => {
    const isAvailable = coverageAreas.some((area) => {
      const distance = calculateDistance(lat, lon, area.coords[0], area.coords[1]);
      return distance <= area.radius;
    });
    setDeliveryAvailable(isAvailable);
  };

  // Calculate distance between two points (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Earth's radius in meters
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Search via Nominatim API
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${searchQuery},Bangladesh&format=json&limit=1`;
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newPos = [parseFloat(lat), parseFloat(lon)];
        setMapCenter(newPos);
        setMarkerPosition(newPos);
        setSelectedAddress(display_name);
        checkDeliveryAvailability(parseFloat(lat), parseFloat(lon));
      }
    } catch (error) {
      console.error("Search failed", error);
    }
    setIsSearching(false);
  };

  // Handle location selection
  const handleLocationSelect = (coords) => {
    setMarkerPosition(coords);
    reverseGeocode(coords[0], coords[1]);
  };

  // Get current location
  const handleGetCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        const newPos = [latitude, longitude];
        setUserLocation(newPos);
        setMapCenter(newPos);
        setMarkerPosition(newPos);
        reverseGeocode(latitude, longitude);
      });
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200 p-3 sm:p-5">
      <div className="lg:max-w-4/5 mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a4d3c] mb-2">
            We are available in 64 districts
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Search your location to check delivery availability
          </p>
        </div>

        {/* Search Section */}
        <div className="flex flex-col sm:flex-row space-y-2 md:space-y-0  mb-6">
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full sm:rounded-r-none">
            <BiSearch className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search district, area or landmark..."
              className="bg-transparent border-none outline-none text-gray-800 placeholder-gray-400"
            />
          </div>
          <div>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-[#a8d05f] text-[#0a4d3c]  w-full rounded-full sm:rounded-l-none px-6 py-2 font-semibold hover:bg-[#96bc4f] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed sm:flex-none"
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
           
          </div>
        </div>

        {/* Coverage Toggle */}
        <div className="flex items-center justify-between mb-4 bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <BiMap className="w-5 h-5 text-[#0a4d3c]" />
            <span className="text-sm font-medium text-gray-700">Show Coverage Areas</span>
          </div>
          <button
            onClick={() => setShowCoverage(!showCoverage)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showCoverage ? "bg-[#a8d05f]" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showCoverage ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Selected Address Card */}
        {selectedAddress && (
          <div className="mb-4 bg-gradient-to-r from-[#0a4d3c] to-[#0d6149] text-white p-4 rounded-lg shadow-md">
            <div className="flex items-start gap-3">
              <MdLocationOn className="w-6 h-6 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Selected Location</h3>
                <p className="text-sm opacity-90">{selectedAddress}</p>
                {deliveryAvailable !== null && (
                  <div className="mt-2 flex items-center gap-2">
                    <MdDeliveryDining className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {deliveryAvailable
                        ? "✓ Delivery Available"
                        : "✗ Outside Delivery Zone"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Subheading */}
        <h2 className="text-lg sm:text-xl font-semibold text-[#0a4d3c] mb-4">
          We deliver almost all over Bangladesh
        </h2>

        {/* Map Container */}
        <div className="rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: "500px", width: "100%" }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors © CARTO"
            />

            <ChangeMapView center={mapCenter} />
            <MapClickHandler onLocationSelect={handleLocationSelect} />

            {/* Coverage areas */}
            {showCoverage &&
              coverageAreas.map((area, idx) => (
                <Circle
                  key={idx}
                  center={area.coords}
                  radius={area.radius}
                  pathOptions={{
                    color: "#a8d05f",
                    fillColor: "#a8d05f",
                    fillOpacity: 0.15,
                  }}
                >
                  <Popup>
                    <strong>{area.name}</strong>
                    <br />
                    Delivery Available
                  </Popup>
                </Circle>
              ))}

            {/* Selected marker */}
            {markerPosition && (
              <Marker
                position={markerPosition}
                draggable={true}
                icon={deliveryIcon}
                eventHandlers={{
                  dragend: (e) => {
                    const newPos = [
                      e.target.getLatLng().lat,
                      e.target.getLatLng().lng,
                    ];
                    setMarkerPosition(newPos);
                    reverseGeocode(newPos[0], newPos[1]);
                  },
                }}
              >
                <Popup>
                  <strong>Delivery Location</strong>
                  <br />
                  <small>Drag to adjust position</small>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            How to use:
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Click anywhere on the map to select your delivery location</li>
            <li>• Use the search bar to find a specific area or landmark</li>
            <li>• Drag the marker to fine-tune your location</li>
            <li>• Toggle coverage areas to see where we deliver</li>
            <li>• Click the location button to use your current position</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Coverage;