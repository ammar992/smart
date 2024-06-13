/* eslint-disable react/prop-types */

import { Box, Input, Select, Stack, Text } from '@chakra-ui/react';
import { useEffect } from 'react';

const File = ({
  nameRef,
  fileNumberRef,
  nationalityRef,
  dobRef,
  emiRef,
  country,
}) => {
  // Define the maximum length for the file number
  const maxLength = 10;

  // Initial value with dashes up to maxLength
  useEffect(() => {
    if (fileNumberRef.current) {
      fileNumberRef.current.value = '-'.repeat(maxLength);
    }
  }, []);

  // Handler for input changes to ensure numeric input for file number
  const handleFileNumberChange = (e) => {
    // Get the current input value
    const rawValue = e.target.value;

    // Extract only numeric characters from the raw input
    const numericValue = rawValue.replace(/[^0-9]/g, '');

    // Ensure the length does not exceed the maxLength
    const trimmedValue = numericValue.slice(0, maxLength);

    // Pad the numeric input with dashes up to maxLength
    const paddedValue = trimmedValue.padEnd(maxLength, '-');

    if (fileNumberRef.current) {
      fileNumberRef.current.value = paddedValue;
    }
  };

  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
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
            onChange={handleFileNumberChange}
            fontFamily="monospace" // Ensure a fixed-width font for proper alignment
            onFocus={(e) => e.target.select()} // Optional: auto-select input content on focus
          />
        </Box>
      </Box>

      <Box width={'24%'}>
        <Box mb={1} display={'flex'} gap={1}>
          <Text fontWeight={'500'}>Nationality</Text>
          <Text color={'red'}>*</Text>
        </Box>
        <Box width={'100%'}>
          <Select ref={nationalityRef} placeholder="Select">
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
      <Box width={'24%'}>
        <Box mb={1} display={'flex'} gap={1}>
          <Text fontWeight={'500'}>EMI Number</Text>
          <Text color={'red'}>*</Text>
        </Box>
        <Box width={'100%'}>
          <Input type="text" ref={emiRef} placeholder="Enter EMI Number" />
        </Box>
      </Box>
    </Stack>
  );
};

export default File;
