import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Typography, 
  CircularProgress, 
  Alert,
  AlertTitle,
  Box,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Collapse,
  Card,
  CardContent,
  Divider,
  Stack,
  Button
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import mockProducts from '../../data/mockProducts.json';

// PUBLIC_INTERFACE
const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('Invalid product ID');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        // Simulate network delay for realistic behavior
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundProduct = mockProducts.products.find(p => p.id === productId);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError(`Product with ID ${productId} not found`);
          setProduct(null);
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Error loading product data. Please try again later.');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleNextImage = () => {
    if (!product?.images?.length) return;
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    if (!product?.images?.length) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 3,
              width: '100%',
              maxWidth: 600,
              textAlign: 'center',
            }}
          >
            <ErrorOutlineIcon 
              color="error" 
              sx={{ fontSize: 48, mb: 2 }} 
            />
            <Alert 
              severity="error" 
              variant="outlined"
              sx={{ mb: 2 }}
              icon={false}
            >
              <AlertTitle>Error Loading Product</AlertTitle>
              {error}
            </Alert>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Product ID: {productId}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<RefreshIcon />}
              onClick={() => window.location.reload()}
              sx={{ mt: 1 }}
            >
              Retry Loading
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} role="main">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          {/* Image Gallery Section */}
          <Paper elevation={2} sx={{ p: 2, position: 'relative' }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconButton
                sx={{
                  position: 'absolute',
                  left: 8,
                  zIndex: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
                }}
                onClick={handlePrevImage}
                aria-label="Previous image"
              >
                <ChevronLeftIcon />
              </IconButton>
              <Box
                component="img"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transition: 'all 0.3s ease-in-out',
                }}
                src={product.images[currentImageIndex]}
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  right: 8,
                  zIndex: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
                }}
                onClick={handleNextImage}
                aria-label="Next image"
              >
                <ChevronRightIcon />
              </IconButton>
            </Box>
            {product.images.length > 1 && (
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  mt: 2,
                  overflowX: 'auto',
                  py: 1,
                  '&::-webkit-scrollbar': { height: 6 },
                  '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,.2)' },
                }}
              >
                {product.images.map((image, index) => (
                  <Box
                    key={index}
                    component="img"
                    sx={{
                      width: 60,
                      height: 60,
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: index === currentImageIndex ? '2px solid #1976d2' : '2px solid transparent',
                      borderRadius: 1,
                    }}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </Stack>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          {/* Product Details Section */}
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                ${product.price.toFixed(2)}
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 2 }}>
                <Tab label="Overview" />
                <Tab label="Specifications" />
              </Tabs>

              {selectedTab === 0 && (
                <>
                  <Typography variant="body1" paragraph>
                    {product.description}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Category: {product.category} &gt; {product.subcategory}
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    gutterBottom 
                    color={product.stock > 0 ? 'success.main' : 'error.main'}
                  >
                    {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
                  </Typography>
                </>
              )}

              {selectedTab === 1 && product.specifications && (
                <Box>
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <React.Fragment key={key}>
                      {index > 0 && <Divider sx={{ my: 1 }} />}
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Typography variant="subtitle2" color="text.secondary">
                            {key.replace(/_/g, ' ').toUpperCase()}
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="body2">
                            {Array.isArray(value) ? value.join(', ') : value.toString()}
                          </Typography>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Expandable Description Section */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={toggleExpanded}
              >
                <Typography variant="h6">Detailed Description</Typography>
                <IconButton 
                  size="small"
                  aria-label={expanded ? "Collapse description" : "Expand description"}
                  aria-expanded={expanded}
                >
                  {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
              <Collapse in={expanded}>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {product.description}
                  {/* Add more detailed description here if available in the product data */}
                </Typography>
              </Collapse>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;
