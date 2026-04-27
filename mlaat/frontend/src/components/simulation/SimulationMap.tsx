import React from 'react'; // REMOVED useEffect and useState since we receive state from parent now
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from 'react-leaflet';

// Mock data for electrical substations
const SUBSTATIONS = [
  { id: 1, name: "North Grid Alpha", position: [13.1050, 80.2300] as [number, number], baseLoad: 2000 },
  { id: 2, name: "Central Hub", position: [13.0827, 80.2707] as [number, number], baseLoad: 4500 },
  { id: 3, name: "Industrial Park Beta", position: [13.0500, 80.2100] as [number, number], baseLoad: 3800 },
  { id: 4, name: "Coastal Node", position: [13.0200, 80.2800] as [number, number], baseLoad: 1500 },
  { id: 5, name: "West Ring Sub", position: [13.0700, 80.1900] as [number, number], baseLoad: 2500 },
];

// NEW: Define props to accept currentLoad
interface SimulationMapProps {
  currentLoad: number;
}

// NEW: Accept currentLoad in the component signature
const SimulationMap: React.FC<SimulationMapProps> = ({ currentLoad }) => {

  // Function to determine node color based on simulated stress
  const getStatusColor = (baseLoad: number) => {
    // A simple formula to simulate grid stress
    const stressFactor = (currentLoad / 15000) * (baseLoad / 3000);

    if (stressFactor > 1.2) return "#EF4444"; // Red (Critical)
    if (stressFactor > 0.8) return "#F59E0B"; // Amber (Warning)
    return "#10B981"; // Emerald (Stable)
  };

  return (
    <div className="w-full h-full bg-gray-900">
      <MapContainer
        center={[13.0650, 80.2400]}
        zoom={12}
        className="w-full h-full"
        zoomControl={false} // We disable default to move it via ZoomControl
      >
        {/* Dark-themed map tiles for that "Control Room" aesthetic */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Move zoom control to bottom right so it doesn't overlap your Control Panel */}
        <ZoomControl position="bottomright" />

        {/* Render our Substations */}
        {SUBSTATIONS.map((station) => (
          <CircleMarker
            key={station.id}
            center={station.position}
            radius={12}
            pathOptions={{
              color: getStatusColor(station.baseLoad),
              fillColor: getStatusColor(station.baseLoad),
              fillOpacity: 0.7,
              weight: 2
            }}
          >
            <Popup className="custom-popup">
              <div className="p-1">
                <p className="font-bold text-gray-900 m-0">{station.name}</p>
                <p className="text-xs text-gray-500 m-0 mt-1">Status:
                  <span style={{ color: getStatusColor(station.baseLoad), fontWeight: 'bold', marginLeft: '4px' }}>
                    {getStatusColor(station.baseLoad) === '#EF4444' ? 'CRITICAL' : 'STABLE'}
                  </span>
                </p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default SimulationMap;