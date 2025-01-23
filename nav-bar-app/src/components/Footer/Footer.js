import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const StyledFooter = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(4, 0),
  marginTop: theme.spacing(4),
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    marginBottom: theme.spacing(2),
  },
  [theme.breakpoints.up('md')]: {
    marginBottom: 0,
  },
  '& .MuiTypography-h6': {
    marginBottom: theme.spacing(2),
    fontWeight: 700,
    fontSize: '1.1rem',
    letterSpacing: '0.5px',
  },
  '& .MuiBox-root': {
    marginBottom: theme.spacing(1.5),
  },
  '& .MuiLink-root': {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    letterSpacing: '0.2px',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  marginRight: theme.spacing(1),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

// PUBLIC_INTERFACE
const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About Us', url: '#' },
      { name: 'Careers', url: '#' },
      { name: 'Contact Us', url: '#' },
    ],
    support: [
      { name: 'Help Center', url: '#' },
      { name: 'Returns', url: '#' },
      { name: 'Shipping Info', url: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', url: '#' },
      { name: 'Terms of Service', url: '#' },
      { name: 'Cookie Policy', url: '#' },
    ],
  };

  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Links */}
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column' }}>
            <FooterSection>
              <Typography variant="h6" gutterBottom>
                Company
              </Typography>
              {footerLinks.company.map((link) => (
                <Box key={link.name} mb={1}>
                  <Link href={link.url} color="inherit" underline="hover">
                    {link.name}
                  </Link>
                </Box>
              ))}
            </FooterSection>
          </Grid>

          {/* Support Links */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterSection>
              <Typography variant="h6" gutterBottom>
                Support
              </Typography>
              {footerLinks.support.map((link) => (
                <Box key={link.name} mb={1}>
                  <Link href={link.url} color="inherit" underline="hover">
                    {link.name}
                  </Link>
                </Box>
              ))}
            </FooterSection>
          </Grid>

          {/* Legal Links */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterSection>
              <Typography variant="h6" gutterBottom>
                Legal
              </Typography>
              {footerLinks.legal.map((link) => (
                <Box key={link.name} mb={1}>
                  <Link href={link.url} color="inherit" underline="hover">
                    {link.name}
                  </Link>
                </Box>
              ))}
            </FooterSection>
          </Grid>

          {/* Social Media & Copyright */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterSection>
              <Typography variant="h6" gutterBottom>
                Connect With Us
              </Typography>
              <Box mb={2}>
                <SocialIcon aria-label="facebook">
                  <FacebookIcon />
                </SocialIcon>
                <SocialIcon aria-label="twitter">
                  <TwitterIcon />
                </SocialIcon>
                <SocialIcon aria-label="instagram">
                  <InstagramIcon />
                </SocialIcon>
                <SocialIcon aria-label="linkedin">
                  <LinkedInIcon />
                </SocialIcon>
              </Box>
            </FooterSection>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
