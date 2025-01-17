import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductPage from '../components/ProductPage/ProductPage';
import mockProducts from '../data/mockProducts.json';

// Mock useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    productId: 'P001'
  })
}));

const renderProductPage = (productId = 'P001') => {
  jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ productId });
  return render(
    <MemoryRouter initialEntries={[`/product/${productId}`]}>
      <Routes>
        <Route path="/product/:productId" element={<ProductPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('ProductPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    renderProductPage();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('displays loading state while fetching product data', () => {
    renderProductPage();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('displays error state with invalid product ID', async () => {
    renderProductPage('invalid-id');
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Product not found');
    });
  });

  test('displays product information correctly when data is loaded', async () => {
    renderProductPage('P001');
    const product = mockProducts.products.find(p => p.id === 'P001');

    await waitFor(() => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
      expect(screen.getByText(`Category: ${product.category} > ${product.subcategory}`)).toBeInTheDocument();
      expect(screen.getByText(`In Stock (${product.stock} units)`)).toBeInTheDocument();
    });
  });

  test('image gallery navigation works correctly', async () => {
    renderProductPage('P001');
    const product = mockProducts.products.find(p => p.id === 'P001');

    await waitFor(() => {
      const nextButton = screen.getByRole('button', { name: /next/i });
      const prevButton = screen.getByRole('button', { name: /previous/i });
      const mainImage = screen.getByRole('img', { name: new RegExp(`${product.name} - Image 1`) });

      expect(mainImage).toBeInTheDocument();
      expect(mainImage.src).toBe(product.images[0]);

      fireEvent.click(nextButton);
      expect(screen.getByRole('img', { name: new RegExp(`${product.name} - Image 2`) }).src).toBe(product.images[1]);

      fireEvent.click(prevButton);
      expect(screen.getByRole('img', { name: new RegExp(`${product.name} - Image 1`) }).src).toBe(product.images[0]);
    });
  });

  test('tab navigation works correctly', async () => {
    renderProductPage('P001');
    const product = mockProducts.products.find(p => p.id === 'P001');

    await waitFor(() => {
      const overviewTab = screen.getByRole('tab', { name: /overview/i });
      const specificationsTab = screen.getByRole('tab', { name: /specifications/i });

      // Initially Overview tab should be selected
      expect(overviewTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText(product.description)).toBeInTheDocument();

      // Switch to Specifications tab
      fireEvent.click(specificationsTab);
      expect(specificationsTab).toHaveAttribute('aria-selected', 'true');
      expect(overviewTab).toHaveAttribute('aria-selected', 'false');

      // Check if specifications are displayed
      Object.entries(product.specifications).forEach(([key, value]) => {
        const formattedKey = key.replace(/_/g, ' ').toUpperCase();
        expect(screen.getByText(formattedKey)).toBeInTheDocument();
        if (Array.isArray(value)) {
          expect(screen.getByText(value.join(', '))).toBeInTheDocument();
        } else {
          expect(screen.getByText(value.toString())).toBeInTheDocument();
        }
      });
    });
  });

  test('detailed description expansion works correctly', async () => {
    renderProductPage('P001');
    const product = mockProducts.products.find(p => p.id === 'P001');

    await waitFor(() => {
      const expandButton = screen.getByRole('button', { name: /expand/i });
      expect(screen.queryByText(product.description)).not.toBeVisible();

      fireEvent.click(expandButton);
      expect(screen.getByText(product.description)).toBeVisible();

      fireEvent.click(expandButton);
      expect(screen.queryByText(product.description)).not.toBeVisible();
    });
  });

  test('responsive layout elements are present', async () => {
    renderProductPage('P001');

    await waitFor(() => {
      // Check for responsive container
      expect(screen.getByRole('main')).toHaveStyle({ maxWidth: 'lg' });

      // Check for grid layout
      const gridContainer = screen.getByRole('main').querySelector('.MuiGrid-container');
      expect(gridContainer).toBeInTheDocument();

      // Check for image gallery section
      const imageGallery = screen.getByRole('img', { name: /Image 1/i }).closest('.MuiPaper-root');
      expect(imageGallery).toBeInTheDocument();

      // Check for product details section
      const productDetails = screen.getByRole('heading', { level: 1 }).closest('.MuiCard-root');
      expect(productDetails).toBeInTheDocument();
    });
  });
});