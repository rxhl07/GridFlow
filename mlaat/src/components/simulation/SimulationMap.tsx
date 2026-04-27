import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const nodes = [
  { id: 1, pos: [12.9716, 77.5946], status: 'stable', load: '45%' },
  { id: 2, pos: [12.9816, 77.6046], status: 'warning', load: '78%' },
  { id: 3, pos: [12.9616, 77.5846], status: 'critical', load: '92%' },
  { id: 4, pos: [12.9916, 77.6146], status: 'stable', load: '32%' },
  { id: 5, pos: [12.9516, 77.5746], status: 'stable', load: '55%' },
];

const SimulationMap: React.FC = () => {
  const center: [number, number] = [12.9716, 77.5946];

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden shadow-inner border border-gray-100 relative">
      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={false} 
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {nodes.map((node) => (
          <CircleMarker 
            key={node.id}
            center={node.pos as [number, number]}
            radius={10}
            pathOptions={{
              fillColor: node.status === 'stable' ? '#10B981' : node.status === 'warning' ? '#F59E0B' : '#EF4444',
              color: 'white',
              weight: 2,
              fillOpacity: 0.8
            }}
          >
            <Popup className="custom-popup">
              <div className="p-1">
                <p className="text-xs font-bold text-gray-900 mb-1">Substation #{node.id}</p>
                <div className="flex items-center gap-2">
                   <div className={node.status === 'stable' ? "w-2 h-2 rounded-full bg-emerald-500" : "w-2 h-2 rounded-full bg-red-500"} />
                   <p className="text-[10px] font-bold text-gray-500">Load: {node.load}</p>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      
      {/* Custom Map Controls */}
      <div className="absolute bottom-8 right-8 z-[1000] flex flex-col gap-2">
        <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center font-bold text-gray-600 hover:bg-gray-50">+</button>
        <button className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center font-bold text-gray-600 hover:bg-gray-50">-</button>
      </div>
    </div>
  );
};

export default SimulationMap;
