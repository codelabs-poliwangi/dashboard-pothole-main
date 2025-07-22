// src/components/MapComponent.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, Select, Text, Spinner } from '@chakra-ui/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { supabase } from '../services/supabase';

// Ikon bawaan Leaflet
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapComponent() {
  const [potholes, setPotholes] = useState([]);
  const [filter, setFilter]     = useState('all');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('history_deteksi')
        .select('id, jenis_kerusakan, latitude, longitude, waktu_deteksi');
      if (error) {
        setError(error.message);
      } else {
        // Map data: parse coords to float, keep damage type
        const parsed = data
          .map(item => {
            const lat = parseFloat(item.latitude);
            const lng = parseFloat(item.longitude);
            if (isNaN(lat) || isNaN(lng)) return null;
            return {
              id: item.id,
              jenis: item.jenis_kerusakan,
              position: [lat, lng],
              waktu_deteksi: item.waktu_deteksi,
            };
          })
          .filter(Boolean);
        setPotholes(parsed);
      }
      setLoading(false);
    })();
  }, []);

  // Buat list opsi berdasarkan data unik
  const jenisOptions = Array.from(
    new Set(potholes.map(p => p.jenis))
  );

  // Filter data
  const shown = filter === 'all'
    ? potholes
    : potholes.filter(p => p.jenis === filter);

  return (
    <Box h="80vh" w="100%" p={4} borderRadius="lg" boxShadow="lg" overflow="hidden">
      {error && <Text color="red.500">Error: {error}</Text>}
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            mb={4}
            placeholder="Semua Jenis Kerusakan"
          >
            <option value="all">Semua Jenis Kerusakan</option>
            {jenisOptions.map(j => (
              <option key={j} value={j}>
                {j}
              </option>
            ))}
          </Select>

          <Box h="calc(100% - 56px)" /* kurangi height Select + padding */>
            <MapContainer
              center={[-8.35, 114.27]}
              zoom={12}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {shown.map(p => (
                <Marker key={p.id} position={p.position} icon={defaultIcon}>
                  <Popup>
                    <Text fontWeight="bold">{p.jenis}</Text>
                    <Text fontSize="sm">
                      Deteksi: {new Date(p.waktu_deteksi).toLocaleString()}
                    </Text>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Box>
        </>
      )}
    </Box>
  );
}
