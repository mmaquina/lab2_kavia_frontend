import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// PUBLIC_INTERFACE
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <TextField
      size="small"
      variant="outlined"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        sx: {
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: 1,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.7)',
          },
        }
      }}
      sx={{
        width: { xs: '100%', sm: '200px', md: '300px' },
        transition: (theme) => theme.transitions.create('width', {
          duration: theme.transitions.duration.standard,
        }),
        '& input': {
          color: 'white',
          '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.7)',
            opacity: 1,
          },
        },
        '& .MuiInputBase-root': {
          transition: (theme) => theme.transitions.create(['background-color', 'border-color'], {
            duration: theme.transitions.duration.standard,
          }),
        }
      }}
    />
  );
};

export default SearchBar;
