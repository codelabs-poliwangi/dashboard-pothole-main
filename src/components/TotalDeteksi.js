import React, { useEffect, useState } from 'react';
import { Box, Heading, List, ListItem, Text, useBreakpointValue } from '@chakra-ui/react';
import { supabase } from '../services/supabase';

function TotalDeteksi() {
    //const [totalData, setTotalData] = useState(0);
    const [totalArea, setTotalArea] = useState(0);

    useEffect(() => {
      const fetchtotalArea = async () => {
        const { data, error } = await supabase
          .from('history_deteksi')
          .select('area_kerusakan');

          if (error) {
            console.error('Error fetching data:', error);
          } else {
            const total = data.reduce((sum, row) => sum + row.area_kerusakan, 0);
            const roundTotal = total.toFixed(2);
            setTotalArea(roundTotal);
          }
      }
      fetchtotalArea();
    }, []);

    const boxPadding = useBreakpointValue({ base: 2, md: 4 });
    const fontSize = useBreakpointValue({ base: 'sm', md: 'md' });


    
    return (
        <Box p={4} borderRadius="md" shadow="md">
            <Heading size="lg" mb={4}>Total Area Kerusakan</Heading>
            <List spacing={3}>
              <ListItem>
                <Box
                  p={boxPadding}
                  borderRadius="md"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  bg="teal.100" 
                  w="full"
                  marginBottom={3}
                >
                  <Text fontWeight="bold" fontSize={fontSize}>
                    Total Area Kerusakan:
                  </Text>
                  <Text fontSize={fontSize}>{totalArea} m3</Text>
                </Box>
              </ListItem>
            </List>
            
        </Box>

    );
  }
  
  export default TotalDeteksi;