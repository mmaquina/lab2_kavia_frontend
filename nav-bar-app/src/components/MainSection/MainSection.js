import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const DealCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  minHeight: { xs: 360, sm: 400 },
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[12],
  },
  '&:focus-visible': {
    outline: `3px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
    boxShadow: theme.shadows[8],
  },
  '&:active': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
    '&:hover': {
      transform: 'none',
    },
    '&:active': {
      transform: 'none',
    },
  },
}));

const DealTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.25rem',
  marginBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  lineHeight: 1.3,
}));

const DealDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  lineHeight: 1.6,
  letterSpacing: '0.1px',
}));

// Fallback images for each category
const fallbackImages = {
  electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=500',
  fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=500',
  home: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=500',
  kitchen: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=500',
};

// Mock data for initial display
const mockDeals = [
  {
    id: 1,
    title: 'Electronics Super Sale',
    description: 'Up to 50% off on premium electronics and gadgets',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=500',
    category: 'electronics',
  },
  {
    id: 2,
    title: 'Fashion Week Special',
    description: 'Designer brands at unbeatable prices',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500',
    category: 'fashion',
  },
  {
    id: 3,
    title: 'Home & Living Deals',
    description: 'Transform your space with amazing discounts',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500',
    category: 'home',
  },
  {
    id: 4,
    title: 'Kitchen Essentials',
    description: 'Premium cookware and appliances on sale',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=500',
    category: 'kitchen',
  },
];

const handleDealClick = (deal) => {
  console.log(`Clicked deal: ${deal.title} in category: ${deal.category}`);
  // TODO: Implement navigation or modal display for deal details
};

// PUBLIC_INTERFACE
const MainSection = () => {
  const handleImageError = (event, category) => {
    event.target.src = fallbackImages[category];
    event.target.onerror = null; // Prevent infinite loop if fallback also fails
  };
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 5 }, mt: { xs: 2, sm: 3 } }}>
      <Typography
        variant="h5"
        component="h1"
        sx={{
          mb: { xs: 2, sm: 3 },
          fontWeight: 700,
          textAlign: 'center',
          fontSize: { xs: '1.5rem', sm: '1.75rem' },
        }}
      >
        Featured Deals
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {mockDeals.map((deal) => (
          <Grid 
            item 
            key={deal.id}
            xs={12}    // Full width on extra small devices
            sm={6}     // 2 cards per row on small devices
            md={4}     // 3 cards per row on medium devices
            lg={3}     // 4 cards per row on large devices
          >
            <DealCard 
              data-testid="deal-card"
              onClick={() => handleDealClick(deal)}
            >
              <CardMedia
                component="div"
                sx={({ palette }) => ({
                  position: 'relative',
                  paddingTop: '56.25%', // 16:9 aspect ratio
                  overflow: 'hidden',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: palette.grey[100],
                  '& img': {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                  },
                  '&:hover img': {
                    transform: 'scale(1.05)',
                  },
                  '@media (prefers-reduced-motion: reduce)': {
                    '& img': {
                      transition: 'none',
                    },
                    '&:hover img': {
                      transform: 'none',
                    },
                  },
                })}
              >
                <img
                  src={deal.image}
                  alt={`${deal.title} - ${deal.category} deal`}
                  onError={(e) => handleImageError(e, deal.category)}
                />
              </CardMedia>
              <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 } }}>
                <DealTitle variant="h5" component="h2">
                  {deal.title}
                </DealTitle>
                <DealDescription>
                  {deal.description}
                </DealDescription>
              </CardContent>
            </DealCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MainSection;
