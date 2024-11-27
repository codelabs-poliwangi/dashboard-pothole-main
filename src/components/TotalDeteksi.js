import React, { useEffect, useState } from 'react';
import { Box, Heading, List, ListItem, Text, useBreakpointValue } from '@chakra-ui/react';
import { supabase } from '../services/supabase';

function TotalDeteksi() {
    const [totalData, setTotalData] = useState(0);
  
    useEffect(() => {
      const fetchData = async () => {
        const { count, error } = await supabase
          .from('history_deteksi') // Ganti dengan nama tabel Anda
          .select('*', { count: 'exact' }); // Menambahkan opsi count
  
        if (error) {
          console.error('Error fetching data:', error);
        } else {
          setTotalData(count);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        <h1>Total Data: {totalData}</h1>
      </div>
    );
  }
  
  export default TotalDeteksi;