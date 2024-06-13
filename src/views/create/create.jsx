import { useRef, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { POST } from '../../utils/ApiProvider';

const CreateForm = () => {
  // Define refs for each input field
  const nameRef = useRef(null);
  const fileNumberRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const emiRef = useRef(null);
  const fileStatusRef = useRef(null);
  const fileIssueRef = useRef(null);
  const lastDateAllowanceRef = useRef(null);
  const applicationNumberRef = useRef(null);
  const transactionNumberRef = useRef(null);
  const paymentDateRef = useRef(null);
  const nationalityRef = useRef(null);
  const dobRef = useRef(null);
  const toast = useToast();

  const [data, setData] = useState({});
  // Maximum length for numeric fields
  const maxLength = 10;

  const [country, setCountry] = useState([]);

  const getCountries = async () => {
    try {
      const res = await axios.get(
        'https://countriesnow.space/api/v0.1/countries'
      );
      setCountry(res?.data?.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  // Initial setup for numeric fields to have dashes
  useEffect(() => {
    if (fileNumberRef.current) {
      fileNumberRef.current.value = '-'.repeat(maxLength);
    }
    if (emiRef.current) {
      emiRef.current.value = '-'.repeat(maxLength);
    }
    if (fileIssueRef.current) {
      fileIssueRef.current.value = '-'.repeat(maxLength);
    }
    if (lastDateAllowanceRef.current) {
      lastDateAllowanceRef.current.value = '-'.repeat(maxLength);
    }
    if (applicationNumberRef.current) {
      applicationNumberRef.current.value = '-'.repeat(maxLength);
    }
    if (transactionNumberRef.current) {
      transactionNumberRef.current.value = '-'.repeat(maxLength);
    }

    getCountries();
  }, []);

  // Handler for numeric input changes
  const handleNumericInputChange = (e, ref, maxLength) => {
    const rawValue = e.target.value;
    const numericValue = rawValue.replace(/[^0-9]/g, '');
    const trimmedValue = numericValue.slice(0, maxLength);
    const paddedValue = trimmedValue.padEnd(maxLength, '-');

    if (ref.current) {
      ref.current.value = paddedValue;
    }
  };

  // Handler for form submission
  const createData = async () => {
    setLoading(true);
    const data = {
      name: nameRef.current.value.trim(),
      FileNo: fileNumberRef.current.value.replace(/-/g, '').trim(),
      EMINumber: emiRef.current.value.replace(/-/g, '').trim(),
      FileStatus: fileStatusRef.current.value,
      FileIssue: fileIssueRef.current.value,
      LastDateAllowance: lastDateAllowanceRef.current.value,
      applicationNumber: applicationNumberRef.current.value,
      transactionNumber: transactionNumberRef.current.value
        .replace(/-/g, '')
        .trim(),
      paymentDate: paymentDateRef.current.value,
      nationality: nationalityRef.current.value,
      dob: dobRef.current.value,
    };
    if (
      !data.name ||
      !data.FileNo ||
      !data.EMINumber ||
      !data.FileStatus ||
      !data.FileIssue ||
      !data.LastDateAllowance ||
      !data.applicationNumber ||
      !data.transactionNumber ||
      !data.paymentDate ||
      !data.nationality ||
      !data.dob
    ) {
      toast({
        position: 'bottom-left',
        isClosable: true,
        status: 'error',
        description: 'Empty field is not allowed',
        duration: 5000,
      });
      return;
    }
    try {
      const res = await POST('/users/add', data);
      if (res?.data?.status) {
        setData(res?.data?.data);
        toast({
          position: 'bottom-left',
          isClosable: true,
          duration: 5000,
          status: 'success',
          description: 'Created successfully',
        });
        nameRef.current.value = '';
        fileNumberRef.current.value = '';
        emiRef.current.value = '';
        fileStatusRef.current.value = '';
        fileIssueRef.current.value = '';
        lastDateAllowanceRef.current.value = '';
        applicationNumberRef.current.value = '';
        transactionNumberRef.current.value = '';
        paymentDateRef.current.value = '';
        nationalityRef.current.value = '';
        dobRef.current.value = '';
        return;
      }
    } catch (error) {
      console.error('Error creating data:', error.message);
    }    finally {
      setLoading(false);
    }
  };

  console.log(data);
  return (
    <Container maxW={'7xl'} p={5}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        wrap={'wrap'}
        spacing={4}
      >
        <Box width={'24%'}>
          <Box display={'flex'} gap={1}>
            <Text fontWeight={'500'}>First Name (English)</Text>
            <Text color={'red'}>*</Text>
          </Box>
          <Box width={'100%'}>
            <Input
              type="text"
              ref={nameRef}
              placeholder="Enter First Name (English)"
            />
          </Box>
        </Box>

        <Box width={'24%'}>
          <Box mb={1} display={'flex'} gap={1}>
            <Text fontWeight={'500'}>File Number</Text>
            <Text color={'red'}>*</Text>
          </Box>
          <Box width={'100%'}>
            <Input
              type="text" // Use "text" to allow displaying as text
              ref={fileNumberRef}
              placeholder="Enter File Number"
              onChange={(e) =>
                handleNumericInputChange(e, fileNumberRef, maxLength)
              }
              fontFamily="monospace" // Ensure a fixed-width font for proper alignment
              onFocus={(e) => e.target.select()} // Optional: auto-select input content on focus
            />
          </Box>
        </Box>

        <Box width={'24%'}>
          <Box mb={1} display={'flex'} gap={1}>
            <Text fontWeight={'500'}>EMI Number</Text>
            <Text color={'red'}>*</Text>
          </Box>
          <Box width={'100%'}>
            <Input
              type="text"
              ref={emiRef}
              placeholder="Enter EMI Number"
              onChange={(e) => handleNumericInputChange(e, emiRef, maxLength)}
              fontFamily="monospace"
            />
          </Box>
        </Box>

        <Box width={'24%'}>
          <Box mb={1} display={'flex'} gap={1}>
            <Text fontWeight={'500'}>File Status</Text>
            <Text color={'red'}>*</Text>
          </Box>
          <Box width={'100%'}>
            <Select ref={fileStatusRef} placeholder="Select">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
          </Box>
        </Box>

        <Box width={'24%'}>
          <Box mb={1} display={'flex'} gap={1}>
            <Text fontWeight={'500'}>File Issue</Text>
            <Text color={'red'}>*</Text>
          </Box>
          <Box width={'100%'}>
            <Input
              type="date"
              ref={fileIssueRef}
              placeholder="Enter File Issue Date"
              fontFamily="monospace"
            />
          </Box>
        </Box>

        <Box width={'24%'}>
          <Box mb={1} display={'flex'} gap={1}>
            <Text fontWeight={'500'}>Last Date Allowance</Text>
            <Text color={'red'}>*</Text>
          </Box>
          <Box width={'100%'}>
            <Input
              type="date"
              ref={lastDateAllowanceRef}
              placeholder="Enter Last Date Allowance"
              fontFamily="monospace"
            />
          </Box>
        </Box>

        <Box width={'24%'}>
          <Box mb={1} display={'flex'} gap={1}>
            <Text fontWeight={'500'}>Application Number</Text>
            <Text color={'red'}>*</Text>
          </Box>
          <Box width={'100%'}>
            <Input
              type="number"
              ref={applicationNumberRef}
              placeholder="Enter Application Number"
              fontFamily="monospace"
            />
          </Box>
        </Box>

        <Box width={'24%'}>
          <Box mb={1} display={'flex'} gap={1}>
            <Text fontWeight={'500'}>Transaction Number</Text>
            <Text color={'red'}>*</Text>
          </Box>
          <Box width={'100%'}>
            <Input
              type="text"
              ref={transactionNumberRef}
              placeholder="Enter Transaction Number"
              onChange={(e) =>
                handleNumericInputChange(e, transactionNumberRef, maxLength)
              }
              fontFamily="monospace"
            />
          </Box>
        </Box>

        <Box width={'24%'}>
          <Box mb={1} display={'flex'} gap={1}>
            <Text fontWeight={'500'}>Payment Date</Text>
            <Text color={'red'}>*</Text>
          </Box>
          <Box width={'100%'}>
            <Input
              type="date"
              ref={paymentDateRef}
              placeholder="Enter Payment Date"
            />
          </Box>
        </Box>

        <Box width={'24%'}>
          <Box mb={1} display={'flex'} gap={1}>
            <Text fontWeight={'500'}>Nationality</Text>
            <Text color={'red'}>*</Text>
          </Box>
          <Box width={'100%'}>
            <Select ref={nationalityRef} placeholder="Select Country">
              {country.length > 0 &&
                country.map((item) => {
                  return (
                    <option key={item.country} value={item.country}>
                      {item.country}
                    </option>
                  );
                })}
            </Select>
          </Box>
        </Box>

        <Box width={'24%'}>
          <Box mb={1} display={'flex'} gap={1}>
            <Text fontWeight={'500'}>Birth Date</Text>
            <Text color={'red'}>*</Text>
          </Box>
          <Box width={'100%'}>
            <Input type="date" ref={dobRef} placeholder="Enter Birth Date" />
          </Box>
        </Box>
      </Stack>

      <Box mt={5} display={'flex'} gap={2}>
        <Button
          bg={'#9a2f23'}
          isLoading={loading}
          color={'white'}
          onClick={createData}
          colorScheme="blue"
          _hover={'none'}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default CreateForm;
