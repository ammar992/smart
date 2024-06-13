import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
// import Footer from '../../components/footer/footer';
const MainPage = () => {
  return (
    <Box>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </Box>
  );
};

export default MainPage;
