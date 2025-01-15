import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainSection from '../components/MainSection/MainSection';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Mock console.log to test click handler
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

const theme = createTheme();

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('MainSection Component', () => {
  test('renders Featured Deals heading', () => {
    renderWithTheme(<MainSection />);
    expect(screen.getByText('Featured Deals')).toBeInTheDocument();
  });

  test('renders correct number of deal cards', () => {
    renderWithTheme(<MainSection />);
    const dealCards = screen.getAllByTestId('deal-card');
    expect(dealCards).toHaveLength(4);
  });

  test('each deal card has title, description and image with correct content', () => {
    renderWithTheme(<MainSection />);
    const dealCards = screen.getAllByTestId('deal-card');
    const dealImages = screen.getAllByRole('img');

    expect(dealCards).toHaveLength(4);
    expect(screen.getByText('Electronics Super Sale')).toBeInTheDocument();
    expect(screen.getByText('Fashion Week Special')).toBeInTheDocument();
    expect(screen.getByText('Home & Living Deals')).toBeInTheDocument();
    expect(screen.getByText('Kitchen Essentials')).toBeInTheDocument();

    dealImages.forEach((img, index) => {
      expect(img).toHaveAttribute('src', expect.stringContaining('unsplash.com'));
      expect(img).toHaveAttribute('alt', expect.stringContaining('deal'));
    });
  });

  test('images have proper alt text for accessibility', () => {
    renderWithTheme(<MainSection />);
    const dealImages = screen.getAllByRole('img');
    
    expect(dealImages[0]).toHaveAttribute('alt', 'Electronics Super Sale - electronics deal');
    expect(dealImages[1]).toHaveAttribute('alt', 'Fashion Week Special - fashion deal');
    expect(dealImages[2]).toHaveAttribute('alt', 'Home & Living Deals - home deal');
    expect(dealImages[3]).toHaveAttribute('alt', 'Kitchen Essentials - kitchen deal');
  });

  test('handles image loading errors with fallback images', () => {
    renderWithTheme(<MainSection />);
    const dealImages = screen.getAllByRole('img');
    
    // Simulate image loading error for each category
    fireEvent.error(dealImages[0]); // electronics
    expect(dealImages[0].src).toBe('https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=500');
    
    fireEvent.error(dealImages[1]); // fashion
    expect(dealImages[1].src).toBe('https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=500');
  });

  test('deal cards have hover effect styles defined', () => {
    renderWithTheme(<MainSection />);
    const dealCard = screen.getAllByTestId('deal-card')[0];
    
    // Check if the hover styles are defined in the component
    expect(dealCard).toHaveStyle({
      cursor: 'pointer',
      transition: 'transform 0.3s ease-in-out,box-shadow 0.3s ease-in-out'
    });
  });

  test('clicking deal card triggers handler with correct deal info', () => {
    renderWithTheme(<MainSection />);
    const dealCards = screen.getAllByTestId('deal-card');
    
    fireEvent.click(dealCards[0]);
    expect(mockConsoleLog).toHaveBeenCalledWith('Clicked deal: Electronics Super Sale in category: electronics');
    
    fireEvent.click(dealCards[1]);
    expect(mockConsoleLog).toHaveBeenCalledWith('Clicked deal: Fashion Week Special in category: fashion');
  });

  test('grid layout renders with correct responsive breakpoints', () => {
    renderWithTheme(<MainSection />);
    const gridItems = screen.getAllByTestId('deal-card').map(card => card.closest('.MuiGrid-item'));
    
    gridItems.forEach(item => {
      expect(item).toHaveClass('MuiGrid-item');
      expect(item).toHaveClass('MuiGrid-grid-xs-12');
      expect(item).toHaveClass('MuiGrid-grid-sm-6');
      expect(item).toHaveClass('MuiGrid-grid-md-4');
      expect(item).toHaveClass('MuiGrid-grid-lg-3');
    });
  });

  test('deal cards have fixed height implementation', () => {
    renderWithTheme(<MainSection />);
    const dealCards = screen.getAllByTestId('deal-card');
    
    dealCards.forEach(card => {
      const styles = window.getComputedStyle(card);
      expect(styles.height).toBe('100%');
      expect(styles.display).toBe('flex');
      expect(styles.flexDirection).toBe('column');
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
});
