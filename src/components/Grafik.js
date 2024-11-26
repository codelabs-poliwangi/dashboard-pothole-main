// src/components/Grafik.js

import React, { useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import { supabase } from '../services/supabase';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Grafik = () => {
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('history_deteksi') 
        .select('jenis_kerusakan');

      if (error) {
        setError(error.message);
      } else {
        const counts = data.reduce((acc, curr) => {
          const category = curr.jenis_kerusakan; 
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


  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  const chartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: 'Jumlah Kerusakan Berdasarkan Kategori',
        data: Object.values(categoryCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: context => `${context.label}: ${context.raw} kejadian`,
        },
      },
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  return (
    <Box>
      <Heading size="md" mb={4}>Grafik Kerusakan Berdasarkan Kategori</Heading>
      <Box width="100%" height="100%">
        <Bar data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default Grafik;
