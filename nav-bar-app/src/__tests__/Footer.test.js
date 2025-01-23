import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Footer Component', () => {
  test('renders all section headings', () => {
    renderWithTheme(<Footer />);
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Legal')).toBeInTheDocument();
    expect(screen.getByText('Connect With Us')).toBeInTheDocument();
  });

  test('renders all company links', () => {
    renderWithTheme(<Footer />);
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Careers')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  test('renders all support links', () => {
    renderWithTheme(<Footer />);
    expect(screen.getByText('Help Center')).toBeInTheDocument();
    expect(screen.getByText('Returns')).toBeInTheDocument();
    expect(screen.getByText('Shipping Info')).toBeInTheDocument();
  });

  test('renders all legal links', () => {
    renderWithTheme(<Footer />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('Cookie Policy')).toBeInTheDocument();
  });

  test('renders all social media icons', () => {
    renderWithTheme(<Footer />);
    expect(screen.getByLabelText('facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('linkedin')).toBeInTheDocument();
  });

  test('renders copyright text with current year', () => {
    renderWithTheme(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Your Company Name. All rights reserved.`)).toBeInTheDocument();
  });

  test('footer links have correct attributes', () => {
    renderWithTheme(<Footer />);
    const links = screen.getAllByRole('link');
    
    links.forEach(link => {
      expect(link).toHaveAttribute('href', expect.stringMatching(/^#/));
      expect(link).toHaveClass('MuiTypography-inherit');
    });
  });

  test('responsive stacking behavior through grid props', () => {
    renderWithTheme(<Footer />);
    const gridItems = screen.getAllByRole('heading').map(heading => heading.closest('.MuiGrid-item'));
    
    gridItems.forEach(item => {
      expect(item).toHaveClass('MuiGrid-grid-xs-12');
      expect(item).toHaveClass('MuiGrid-grid-sm-6');
      expect(item).toHaveClass('MuiGrid-grid-md-3');
    });
  });
});
