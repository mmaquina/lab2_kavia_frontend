import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Container, 
  Button, 
  Menu, 
  MenuItem, 
  Box,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SearchBar from './SearchBar';

// Mock category data (in a real app, this would come from an API)
const categories = [
  {
    name: 'Electronics',
    subcategories: ['Phones', 'Laptops', 'Tablets', 'Accessories']
  },
  {
    name: 'Fashion',
    subcategories: ['Men', 'Women', 'Kids', 'Accessories']
  },
  {
    name: 'Home',
    subcategories: ['Furniture', 'Decor', 'Kitchen', 'Garden']
  },
  {
    name: 'Books',
    subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Children']
  }
];

// PUBLIC_INTERFACE
const NavBar = () => {
  // State for managing dropdown menus and mobile drawer
  const [anchorEls, setAnchorEls] = useState(Array(categories.length).fill(null));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  
  // Theme and media query for responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Handle opening dropdown menu
  const handleMenuOpen = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  // Handle closing dropdown menu
  const handleMenuClose = (index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

  // Mobile drawer handlers
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCategoryClick = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  const handleSearch = (searchTerm) => {
    // Handle search functionality
    console.log('Searching for:', searchTerm);
  };

  // Mobile drawer content
  const drawer = (
    <List>
      {categories.map((category, index) => (
        <React.Fragment key={category.name}>
          <ListItemButton onClick={() => handleCategoryClick(index)}>
            <ListItemText primary={category.name} />
            {expandedCategory === index ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={expandedCategory === index} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {category.subcategories.map((subcategory) => (
                <ListItemButton 
                  key={subcategory} 
                  sx={{
                    pl: 4,
                    py: 1.5, // Increased touch target
                    '&:hover': {
                      backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                    },
                    transition: (theme) => theme.transitions.create(['background-color'], {
                      duration: theme.transitions.duration.shorter,
                    }),
                  }}
                >
                  <ListItemText 
                    primary={subcategory}
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      fontWeight: 'medium',
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );

  return (
    <AppBar 
      position="static"
      sx={{
        boxShadow: 2,
        background: (theme) => `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack 
            direction="row" 
            spacing={{ xs: 1, sm: 2, md: 3 }} 
            alignItems="center" 
            sx={{ 
              width: '100%',
              justifyContent: 'space-between',
              py: { xs: 1, md: 1.5 }
            }}
          >
            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
            {categories.map((category, index) => (
              <React.Fragment key={category.name}>
                <Button
                  color="inherit"
                  onClick={(e) => handleMenuOpen(e, index)}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{ 
                    px: 2,
                    py: 1,
                    fontSize: '1rem',
                    fontWeight: 'medium',
                    borderRadius: 1,
                    transition: (theme) => theme.transitions.create(
                      ['background-color', 'transform'],
                      { duration: theme.transitions.duration.shorter }
                    ),
                    '&:hover': { 
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      transform: 'translateY(-1px)'
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)'
                    }
                  }}
                >
                  {category.name}
                </Button>
                <Menu
                  anchorEl={anchorEls[index]}
                  open={Boolean(anchorEls[index])}
                  onClose={() => handleMenuClose(index)}
                  MenuListProps={{
                    'aria-labelledby': `${category.name}-button`,
                  }}
                >
                  {category.subcategories.map((subcategory) => (
                    <MenuItem 
                      key={subcategory}
                      onClick={() => handleMenuClose(index)}
                      sx={{
                        py: 1.25,
                        px: 2.5,
                        minHeight: 48,
                        transition: (theme) => theme.transitions.create(
                          ['background-color'],
                          { duration: theme.transitions.duration.shorter }
                        ),
                        '&:hover': {
                          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                        }
                      }}
                    >
                      {subcategory}
                    </MenuItem>
                  ))}
                </Menu>
              </React.Fragment>
            ))}
              </Box>
            )}
            <Box sx={{ ml: { xs: 0, md: 4 }, flexGrow: { xs: 1, md: 0 } }}>
              <SearchBar onSearch={handleSearch} />
            </Box>
          </Stack>
        </Toolbar>
      </Container>
      
      {/* Mobile Navigation Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            transition: theme.transitions.create(['transform'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
