import { Box, Container, Image, Stack, Text } from '@chakra-ui/react';
import logo from '../../assets/images/log2.png';
import log2 from '../../assets/images/logoImg.png';
import { FaBars } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { FaWheelchair } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';

const Navbar = () => {
  return (
    <>
      <Box shadow={'md'}>
        <Container maxW={'7xl'}>
          <Box paddingY={7}>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Box>
                <Image src={log2} width={'130px'} alt="icl" />
              </Box>
              <Box>
                <Image src={logo} width={'420px'} alt="log icon" />
              </Box>
            </Stack>
            <Stack direction={'row'} mt={8} gap={'90px'} alignItems={'center'}>
                <Box display={"flex"} gap={"40px"} alignItems={"center"}>
              <FaBars fontWeight={'400'} color="#9a2f23" />
              <Box
                fontSize={'13px'}
                fontWeight={'400'}
                gap={6}
                w={'760px'}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                color={'#9a2f23'}
              >
                <Text cursor={'pointer'}>Home</Text>
                <Text cursor={'pointer'}>About Us</Text>
                <Text cursor={'pointer'}>Services</Text>
                <Text cursor={'pointer'}>Media Center</Text>
                <Text cursor={'pointer'}>Contact Us</Text>
                <Text cursor={'pointer'}>E-Participation</Text>
                <Text cursor={'pointer'}>AISAADA Card</Text>
              </Box>
              </Box>
              <Stack color="#9a2f23" direction={'row'} justifyContent={"space-between"} alignItems={'center'}>
              <Box
                  display={'flex'}
                  gap={4}
                  alignItems={'center'}
                  padding={'7px 15px'}
                  rounded={'full'}
                  bg={'#f7f4f4'}
                >
                  <IoSearch />
                  <Text fontSize={'13px'}>Search...</Text>
                </Box>
                <Box
                  padding={'7px 15px'}
                  width={'fit-content'}
                  rounded={'full'}
                  bg={'#f7f4f4'}
                >
                  العربية
                </Box>
                <Box
                  padding={'7px 15px'}
                  width={'fit-content'}
                  rounded={'full'}
                  bg={'#f7f4f4'}
                >
                  <FaWheelchair />
                </Box>
                <Box
                  display={'flex'}
                  gap={4}
                  alignItems={'center'}
                  padding={'7px 15px'}
                  rounded={'full'}
                  bg={'#f7f4f4'}
                >
                  <FaCircleUser />
                  <Text fontSize={'13px'}>login</Text>
                </Box>
               
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
