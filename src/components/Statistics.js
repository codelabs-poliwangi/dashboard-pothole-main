import React, { useEffect, useState } from 'react';
import { Box, Heading, List, ListItem, Text, useBreakpointValue } from '@chakra-ui/react';
import { supabase } from '../services/supabase';

const Statistics = () => {
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Tambahkan state untuk error handling

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('history_deteksi') // Pastikan nama tabel benar
        .select('jenis_kerusakan'); // Ambil kolom yang relevan

      if (error) {
        setError(error.message); // Simpan pesan error
      } else {
        const counts = data.reduce((acc, curr) => {
          const category = curr.jenis_kerusakan; // Kolom jenis_kerusakan
          if (category) {
            acc[category] = (acc[category] || 0) + 1;
          }
          return acc;
        }, {});
        setCategoryCounts(counts);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Responsiveness adjustments
  const boxPadding = useBreakpointValue({ base: 2, md: 4 });
  const fontSize = useBreakpointValue({ base: 'sm', md: 'md' });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  //perubahan disini
  if (error) {
    return <Text color="red.500">Error: {error}</Text>; // Tampilkan error jika ada
  }

  return (
    <Box p={4} borderRadius="md" shadow="md">
      <Heading size="md" mb={4}>
        Jumlah Kerusakan Berdasarkan Kategori
      </Heading>
      <List spacing={3}>
        {Object.entries(categoryCounts).map(([category, count]) => (
          <ListItem key={category}>
            <Box
              p={boxPadding}
              borderRadius="md"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bg="teal.100" 
              w="full"
            >
              <Text fontWeight="bold" fontSize={fontSize}>
                {category}:
              </Text>
              <Text fontSize={fontSize}>{count} kejadian</Text>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Statistics;
