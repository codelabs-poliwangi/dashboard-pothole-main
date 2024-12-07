import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase'; // Pastikan file supabase.js sudah dikonfigurasi

const Login = () => {
  const navigate = useNavigate(); // Untuk navigasi halaman
  const [email, setEmail] = useState(''); // State untuk email
  const [password, setPassword] = useState(''); // State untuk password

  // Fungsi untuk menangani login
  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form dikirim
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message); // Log error jika login gagal
        alert(`Login failed: ${error.message}`); // Notifikasi error ke user
      } else {
        console.log('Login successful!', data); // Log sukses jika login berhasil
        alert('Login successful! Redirecting to home...'); // Notifikasi sukses ke user
        navigate('/home'); // Navigasi ke halaman home
      }
    } catch (err) {
      console.error('Unexpected error:', err); // Log error tak terduga
      alert('An unexpected error occurred. Please try again.'); // Notifikasi error tak terduga
    }
  };

  return (
    <Box
      minHeight="100vh"
      bg="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        bg="white"
        p={8}
        borderRadius="lg"
        border="1px solid #E2E8F0"
        boxShadow="sm"
        maxWidth="400px"
        width="full"
        textAlign="center"
      >
        <Heading as="h1" size="lg" mb={4} color="teal.600">
          Login
        </Heading>
        <Text fontSize="sm" color="gray.600" mb={6}>
          Please enter your credentials
        </Text>
        <form onSubmit={handleLogin}>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              bg="gray.50"
              borderColor="gray.300"
              _focus={{
                borderColor: 'teal.400',
                boxShadow: '0 0 0 1px teal.400',
              }}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              bg="gray.50"
              borderColor="gray.300"
              _focus={{
                borderColor: 'teal.400',
                boxShadow: '0 0 0 1px teal.400',
              }}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            bg="teal.500"
            _hover={{
              bg: 'teal.600',
              transform: 'scale(1.05)',
            }}
            transition="all 0.2s ease-in-out"
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
