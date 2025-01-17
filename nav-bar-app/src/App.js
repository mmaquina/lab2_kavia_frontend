import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, Typography, Container } from '@mui/material';
import NavBar from './components/NavBar/NavBar';
import './App.css';
import ProductPage from './components/ProductPage/ProductPage';

// PUBLIC_INTERFACE
const NotFound = () => (
  <Container>
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1">
        The page you are looking for does not exist.
      </Typography>
    </Box>
  </Container>
);

// PUBLIC_INTERFACE
const HomePage = () => (
  <Container>
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Navigation Bar App
      </Typography>
      <Typography variant="body1">
        Browse our products using the navigation bar above.
      </Typography>
    </Box>
  </Container>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <NavBar />
          <Box component="main" sx={{ flex: 1 }} role="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Box>
        </Box>
      </div>
    </Router>
  );
}

export default App;
