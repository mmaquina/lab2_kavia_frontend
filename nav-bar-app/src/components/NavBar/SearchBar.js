import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// PUBLIC_INTERFACE
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Searching for:', searchTerm);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        width: isMobile ? '100%' : 300,
        m: 1,
      }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="inherit" />
            </InputAdornment>
          ),
          sx: {
            color: 'inherit',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderRadius: theme.shape.borderRadius,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: '1px solid rgba(255, 255, 255, 0.3)',
            },
          },
        }}
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </Box>
  );
};

export default SearchBar;
