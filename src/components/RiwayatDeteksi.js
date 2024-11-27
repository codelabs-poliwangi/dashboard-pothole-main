import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading, Text } from '@chakra-ui/react';
import { supabase } from '../services/supabase';

const RiwayatDeteksi = () => {
  const [riwayatData, setRiwayatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('history_deteksi') 
        .select('id, jenis_kerusakan, longitude, latitude, area_kerusakan, kedalaman_rata_rata, volume, waktu_deteksi'); 

      if (error) {
        setError(error.message); // Simpan pesan error
      } else {
        setRiwayatData(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  return (
    <Box p={5} borderWidth={1} borderRadius="md" shadow="md" bg="white">
      <Heading size="lg" mb={4}>Riwayat Proses Deteksi</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Jenis Kerusakan</Th>
            <Th>Longitude</Th>
            <Th>Latitude</Th>
            <Th>Area Kerusakan</Th>
            <Th>Kedalaman rata - rata</Th>
            <Th>Volume</Th>
            <Th>Waktu deteksi</Th>
          </Tr>
        </Thead>
        <Tbody>
          {riwayatData.map((item, index) => (
            <Tr key={item.id}>
              <Td>{index + 1}</Td>
              <Td>{item.jenis_kerusakan}</Td>
              <Td>{item.longitude}</Td>
              <Td>{item.latitude}</Td>
              <Td>{item.area_kerusakan} m²</Td>
              <Td>{item.kedalaman_rata_rata}</Td>
              <Td>{item.volume} m³</Td>
              <Td>{item.waktu_deteksi}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default RiwayatDeteksi;
