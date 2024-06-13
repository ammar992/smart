/* eslint-disable react/prop-types */


import { Box, Stack, Text } from '@chakra-ui/react';
import { GoDash } from 'react-icons/go';

const DataTable = ({vat,main,first,second,fi,si,LastDateAllowance}) => {
  return (
    <Box mt={4} border={'gray'}>
      <Stack
        p={3}
        color={'white'}
        bg={'brand.900'}
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Text fontWeight={600} fontSize={'17px'}>
          {main}
        </Text>
        <GoDash fontSize={'20px'} />
      </Stack>
      <Stack direction={'row'}>
        <Box flex={'1'} display={"flex"} gap={2} alignItems={"center"}>
          <Box fontWeight={'bold'}>{first}</Box>
          <Text>{fi}</Text>
        </Box>
        <Box flex={'1'} display={"flex"} gap={2} alignItems={"center"}>
          <Box fontWeight={'bold'}>{second}</Box>
          <Text>{si}</Text>
        </Box>
        {
            vat &&   <Box flex={'1'} display={"flex"} gap={2} alignItems={"center"}>
            <Box fontWeight={'bold'}>Last Date Allowed To Enter the Country:</Box>
            <Text>{LastDateAllowance}</Text>
          </Box>
        }
      </Stack>
    </Box>
  );
};

export default DataTable;
