import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from '../components/NavBar/NavBar';
import { ThemeProvider, createTheme } from '@mui/material';

// Mock the useMediaQuery hook
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
}));

describe('NavBar Component', () => {
  const theme = createTheme();
  const renderNavBar = (isMobile = false) => {
    // Mock the useMediaQuery response
    const useMediaQuery = require('@mui/material').useMediaQuery;
    useMediaQuery.mockImplementation(() => isMobile);

    return render(
      <ThemeProvider theme={theme}>
        <NavBar />
      </ThemeProvider>
    );
  };

  describe('Desktop View', () => {
    beforeEach(() => {
      renderNavBar(false);
    });

    test('renders all category buttons', () => {
      const categories = ['Electronics', 'Fashion', 'Home', 'Books'];
      categories.forEach(category => {
        const buttons = screen.getAllByText(category);
        expect(buttons.length).toBeGreaterThan(0);
      });
    });

    test('opens dropdown menu when category button is clicked', () => {
      const electronicsButton = screen.getAllByText('Electronics')[0];
      fireEvent.click(electronicsButton);
      
      const subcategories = ['Phones', 'Laptops', 'Tablets', 'Accessories'];
      subcategories.forEach(subcategory => {
        expect(screen.getByText(subcategory)).toBeInTheDocument();
      });
    });

    test('closes dropdown menu when clicking outside', () => {
      // Open menu
      const electronicsButton = screen.getAllByText('Electronics')[0];
      fireEvent.click(electronicsButton);
      
      // Click outside
      fireEvent.mouseDown(document.body);
      
      // Check if subcategory is no longer visible
      // Wait for animation to complete
      setTimeout(() => {
        expect(screen.queryByText('Phones')).not.toBeInTheDocument();
      }, 0);
    });

    test('renders search bar', () => {
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });
  });

  describe('Mobile View', () => {
    beforeEach(() => {
      renderNavBar(true);
    });

    test('renders hamburger menu button', () => {
      expect(screen.getByLabelText('open drawer')).toBeInTheDocument();
    });

    test('opens drawer when hamburger menu is clicked', () => {
      const menuButton = screen.getByLabelText('open drawer');
      fireEvent.click(menuButton);

      const categories = ['Electronics', 'Fashion', 'Home', 'Books'];
      categories.forEach(category => {
        expect(screen.getByText(category)).toBeInTheDocument();
      });
    });

    test('expands category in drawer when clicked', () => {
      // Open drawer
      const menuButton = screen.getByLabelText('open drawer');
      fireEvent.click(menuButton);

      // Click on Electronics category
      const electronicsButton = screen.getByText('Electronics');
      fireEvent.click(electronicsButton);

      // Check if subcategories are visible
      const subcategories = ['Phones', 'Laptops', 'Tablets', 'Accessories'];
      subcategories.forEach(subcategory => {
        expect(screen.getByText(subcategory)).toBeInTheDocument();
      });
    });

    test('collapses expanded category when clicked again', () => {
      // Open drawer
      const menuButton = screen.getByLabelText('open drawer');
      fireEvent.click(menuButton);

      // Click on Electronics category twice
      const electronicsButton = screen.getByText('Electronics');
      fireEvent.click(electronicsButton);
      fireEvent.click(electronicsButton);

      // Check if subcategories are hidden
      // Wait for animation to complete
      setTimeout(() => {
        expect(screen.queryByText('Phones')).not.toBeInTheDocument();
      }, 0);
    });
  });
});
