// src/pages/Home.js

import React from 'react';
import { Box, Heading, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import Statistics from '../components/Statistics';
import Grafik from '../components/Grafik';
import RiwayatDeteksi from '../components/RiwayatDeteksi';

const Home = () => {
  // Menentukan ukuran card berdasarkan ukuran layar
  const cardHeight = useBreakpointValue({ base: '300px', md: '500px' });
  const gridColumns = useBreakpointValue({ base: 1, md: 2 }); // Mengatur jumlah kolom grid

  return (
    <Box maxW="container.xl" mx="auto" py={8} px={4}>
      <Heading mb={8} textAlign="center" fontSize={{ base: 'xl', md: '2xl' }}>
        Dashboard Monitoring Jalan Rusak
      </Heading>
      <SimpleGrid columns={gridColumns} spacing={8}>
        <Box 
          p={5} 
          borderWidth={1} 
          borderRadius="md" 
          shadow="md"
          bg="white"
          height={cardHeight}
          display="flex"
          flexDirection="column"
        >
          <Statistics />  {/* Menampilkan statistik */}
        </Box>
        <Box 
          p={5} 
          borderWidth={1} 
          borderRadius="md" 
          shadow="md"
          bg="white"
          height={cardHeight}
          display="flex"
          flexDirection="column"
        >
          <Grafik />  {/* Menampilkan grafik */}
        </Box>
      </SimpleGrid>
      <Box mt={8}>
        <RiwayatDeteksi />  {/* Menampilkan Riwayat Deteksi */}
      </Box>
    </Box>
  );
};

export default Home;
