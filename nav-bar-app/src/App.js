import React from 'react';
import { Box } from '@mui/material';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import MainSection from './components/MainSection/MainSection';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <NavBar />
      <MainSection />
      <Footer />
    </Box>
  );
}

export default App;
