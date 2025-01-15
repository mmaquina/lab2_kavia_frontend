import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const DealCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  minHeight: { xs: 340, sm: 380 },
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
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

// Mock data for initial display
const mockDeals = [
  {
    id: 1,
    title: 'Special Deal 1',
    description: 'Amazing offer on electronics',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: 2,
    title: 'Special Deal 2',
    description: 'Exclusive fashion deals',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: 3,
    title: 'Special Deal 3',
    description: 'Home decor savings',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: 4,
    title: 'Special Deal 4',
    description: 'Kitchen essentials offer',
    image: 'https://via.placeholder.com/300x200',
  },
];

// PUBLIC_INTERFACE
const MainSection = () => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4 }, mt: { xs: 1, sm: 2 } }}>
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
            <DealCard data-testid="deal-card">
              <CardMedia
                component="img"
                height="180"
                image={deal.image}
                alt={deal.title}
                sx={{
                  objectFit: 'cover',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              />
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
