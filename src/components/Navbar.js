import React from 'react';
import { Box, Flex, Link,  useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, IconButton } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons'; // Pastikan @chakra-ui/icons terinstal

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="teal.500" py={4}>
      <Flex maxW="container.xl" mx="auto" align="center" color="white" justify="space-between">
        <Link as={RouterLink} to="/home" fontWeight="bold" fontSize="xl">
          Dashboard Monitoring
        </Link>
        <IconButton
          display={{ base: 'block', md: 'none' }}
          icon={<HamburgerIcon />}
          onClick={onOpen}
          variant="outline"
          aria-label="Open Menu"
          colorScheme="whiteAlpha"
        />
        <Flex display={{ base: 'none', md: 'flex' }} align="center">
          <Link as={RouterLink} to="/home" px={4}>
            Beranda
          </Link>
          <Link as={RouterLink} to="/map" px={4}>
            Peta
          </Link>
          <Link as={RouterLink} to="/users" px={4}>
            Feedback and Support
          </Link>
        </Flex>
      </Flex>
      
      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Flex direction="column" align="start">
              <Link as={RouterLink} to="/home" py={2} onClick={onClose}>
                Beranda
              </Link>
              <Link as={RouterLink} to="/map" py={2} onClick={onClose}>
                Peta
              </Link>
              <Link as={RouterLink} to="/users" py={2} onClick={onClose}>
                Feedback and Support
              </Link>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
