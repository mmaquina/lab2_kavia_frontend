import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainSection from '../components/MainSection/MainSection';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

  test('each deal card has title, description and image', () => {
    renderWithTheme(<MainSection />);
    const dealCards = screen.getAllByTestId('deal-card');
    const dealTitles = screen.getAllByText(/Special Deal \d/);
    const dealDescriptions = screen.getAllByText(/(Amazing offer|Exclusive|Home decor|Kitchen essentials)/);
    const dealImages = screen.getAllByRole('img');

    expect(dealCards).toHaveLength(4);
    expect(dealTitles).toHaveLength(4);
    expect(dealDescriptions).toHaveLength(4);
    expect(dealImages).toHaveLength(4);

    dealImages.forEach(img => {
      expect(img).toHaveAttribute('src', expect.stringContaining('placeholder.com'));
      expect(img).toHaveAttribute('alt', expect.stringMatching(/Special Deal \d/));
    });
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
});