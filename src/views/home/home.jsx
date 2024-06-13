import {
  Box,
  Button,
  Container,
  Stack,
  Text,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import File from './file/file';
import { POST } from '../../utils/ApiProvider';
import { useToast } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import DataTable from '../../components/dataTable/dataTable';

const Home = () => {
  const [value, setValue] = useState('1');
  const [data, setData] = useState({});
  const [loading,setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const toast = useToast();
  const [country, setCountry] = useState([]);

  // Create refs for the form inputs
  const nameRef = useRef(null);
  const fileNumberRef = useRef(null);
  const nationalityRef = useRef(null);
  const dobRef = useRef(null);
  const emiRef = useRef(null);

  const getContries = async () => {
    try {
      const res = await axios.get(
        'https://countriesnow.space/api/v0.1/countries'
      );
      setCountry(res?.data?.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  // Handle the search button click
  const handleSearch = async () => {
    
    try {
      setLoading(true);
      // Collect values from refs
      const name = nameRef.current ? nameRef.current.value : '';
      const fileNumber = fileNumberRef.current
        ? fileNumberRef.current.value
        : '';
      const EMINumber = emiRef.current ? emiRef.current.value : '';
      const nationality = nationalityRef.current
        ? nationalityRef.current.value
        : '';
      const dob = dobRef.current ? dobRef.current.value : '';

      // Logging collected values for debugging
      console.log('Collected Data:', {
        name,
        fileNumber,
        EMINumber,
        nationality,
        dob,
      });

      const myData = {
        name,
        FileNo: fileNumber,
        nationality: nationality,
        dob: dob,
        EMINumber,
      };

      if (!name || !fileNumber || !EMINumber || !nationality || !dob) {
        toast({
          position: 'bottom-left',
          isClosable: true,
          duration: 5000,
          status: 'error',
          description: 'empty fields is not allowed',
        });
        return;
      }

      // Send POST request
      const res = await POST('/users/search', myData);
      console.log(res);
      // Check if response has the expected structure
      if (!res?.data?.status) {
        console.log('Status is false or undefined, triggering alert.');
        setErr(true);
        return;
      }

      // If the status is true, proceed to set data
      setData(res.data.user); // Adjust to access user data
      setErr(false);
    } catch (error) {
      // Catch and log any errors
      console.error('Error during handleSearch:', error);
      alert('An error occurred during the search operation.');
      setErr(true);
    }
    finally{
      setLoading(false);
    }
  };
  console.log('data', data);

  useEffect(() => {
    getContries();
  }, []);

  return (
    <Box bg={'#f9f8f6'}>
      <Container maxW={'7xl'} p={5}>
        <Text fontWeight={400} fontSize={'35px'}>
          Status Tracking
        </Text>
        <Stack mt={4} bg={'white'} shadow={'md'} rounded={'sm'} p={3}>
          <Text color={'brand.900'} fontSize={'17px'} fontWeight={'700'}>
            PLEASE ENTER ALL THE SEARCHING PARAMETERS
          </Text>
          <Box mt={5}>
            <Text>Search by:</Text>
            <RadioGroup onChange={setValue} value={value}>
              <Stack
                direction="row"
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Radio colorScheme="orange" value="1">
                  Application
                </Radio>
                <Radio colorScheme="orange" value="2">
                  File
                </Radio>
                <Radio colorScheme="orange" value="3">
                  Over the Counter Service Applications
                </Radio>
                <Radio colorScheme="orange" value="4">
                  Special Requests
                </Radio>
                <Radio colorScheme="orange" value="5">
                  Establishment
                </Radio>
                <Radio colorScheme="orange" value="6">
                  Application for reconsideration
                </Radio>
              </Stack>
              <Stack>
                <Box
                  bg={'gray.200'}
                  width={'100%'}
                  mt={8}
                  mb={2}
                  height={'1px'}
                ></Box>
              </Stack>
            </RadioGroup>
          </Box>
          <Box mt={1}>
            {value === '2' ? (
              <File
                nameRef={nameRef}
                fileNumberRef={fileNumberRef}
                nationalityRef={nationalityRef}
                dobRef={dobRef}
                emiRef={emiRef}
                country={country}
              />
            ) : (
              <Text>No data found</Text>
            )}
          </Box>
        </Stack>
        {value === '2' && (
          <Box
            display={'flex'}
            alignItems={'center'}
            gap={4}
            mt={6}
            justifyContent={'flex-end'}
          >
            <Button
              _hover={'none'}
              fontWeight={'500'}
              fontSize={'14px'}
              px={8}
              bg={'white'}
              color={'brand.900'}
              border={'1px solid #9a2f23'}
              onClick={() => {
                // Clear the input fields
                if (nameRef.current) nameRef.current.value = '';
                if (fileNumberRef.current) fileNumberRef.current.value = '';
                if (nationalityRef.current) nationalityRef.current.value = '';
                if (dobRef.current) dobRef.current.value = '';
              }}
            >
              Clear
            </Button>
            <Button
              _hover={'none'}
              bg={'brand.900'}
              fontSize={'14px'}
              px={8}
              isLoading={loading}
              color={'white'}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
        )}
        {err && <Box color={'red'}>No Data found</Box>}

        {Object.keys(data).length > 0 && <DataTable first="File No" fi={data?.FileNo} si={data?.EMINumber} second="Emirates Unfied Number" main={"Identification Information For Sponsered(Service Beneficiary)"}  /> }
        {Object.keys(data).length > 0 && <DataTable first="File Status" fi={data?.FileStatus} si={data?.FileIssue} LastDateAllowance={data?.LastDateAllowance} second="File assuance Date" main={"File Information"} vat={true} /> }
      </Container>
    </Box>
  );
};

export default Home;
