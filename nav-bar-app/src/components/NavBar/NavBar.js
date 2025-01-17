import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Stack,
  Collapse,
  Fade,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchBar from './SearchBar';
import { categories } from '../../data/categories';

// Shared styles for consistent spacing and transitions
const menuItemStyles = {
  desktop: {
    mx: 2,
    px: 3,
    py: 1.5,
    borderRadius: 1,
    textTransform: 'none',
    fontSize: '1rem',
    letterSpacing: '0.02em',
    transition: 'all 0.2s ease-in-out',
  },
  mobile: {
    py: 1.5,
    px: 2,
    transition: theme => theme.transitions.create(['background-color', 'padding'], {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  submenu: {
    py: 1.5,
    px: 2,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    transition: theme => theme.transitions.create(['background-color', 'padding'], {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  drawer: {
    width: 300,
    backgroundColor: theme => theme.palette.primary.main,
    color: 'white',
    boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.2)',
    zIndex: theme => theme.zIndex.appBar + 1,
    transition: theme => theme.transitions.create(['transform', 'width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
  },
  drawerHeader: {
    p: 3,
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
};

// PUBLIC_INTERFACE
const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const location = useLocation();

  // Reset mobile menu state when switching between mobile and desktop views
  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
      setMobileSubMenuOpen({});
    }
  }, [isMobile]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'About', path: '/about' },
  ];

  const handleCategoryMouseEnter = (event, category) => {
    setCategoryAnchorEl(event.currentTarget);
    setHoveredCategory(category);
  };

  const handleCategoryMouseLeave = () => {
    // Add a small delay before closing to allow moving to submenu
    setTimeout(() => {
      if (!document.querySelector(':hover > .MuiMenu-root')) {
        setCategoryAnchorEl(null);
        setHoveredCategory(null);
      }
    }, 100);
  };

  const handleSubcategoryClick = (categoryId, subcategoryId) => {
    // Handle navigation to subcategory page
    setCategoryAnchorEl(null);
    setHoveredCategory(null);
  };

  const handleSubmenuMouseLeave = () => {
    setCategoryAnchorEl(null);
    setHoveredCategory(null);
  };

  const handleMobileSubMenuToggle = (categoryId) => {
    setMobileSubMenuOpen(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  const renderDesktopNav = () => (
    <Fade in={!isMobile}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}>
      {menuItems.map((item) => (
        <Button
          key={item.label}
          component={Link}
          to={item.path}
          color="inherit"
          sx={{
            ...menuItemStyles.desktop,
            fontWeight: isActive(item.path) ? 'bold' : 'normal',
            backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          {item.label}
        </Button>
      ))}
      
      {categories.map((category) => (
        <Box
          key={category.id}
          onMouseEnter={(e) => handleCategoryMouseEnter(e, category)}
          onMouseLeave={handleCategoryMouseLeave}
          sx={{ position: 'relative', display: 'inline-block' }}
        >
          <Button
            color="inherit"
            endIcon={<ExpandMoreIcon />}
            sx={{
              ...menuItemStyles.desktop,
              backgroundColor: hoveredCategory?.id === category.id ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            {category.name}
          </Button>
        </Box>
      ))}
      
      <Menu
        anchorEl={categoryAnchorEl}
        open={Boolean(categoryAnchorEl) && Boolean(hoveredCategory)}
        onClose={() => {
          setCategoryAnchorEl(null);
          setHoveredCategory(null);
        }}
        MenuListProps={{
          'aria-labelledby': 'categories-button',
          onMouseLeave: handleSubmenuMouseLeave,
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            width: 240,
            borderRadius: 1,
            pointerEvents: 'auto',
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {hoveredCategory?.subcategories.map((subcategory) => (
          <MenuItem
            key={subcategory.id}
            onClick={() => handleSubcategoryClick(hoveredCategory.id, subcategory.id)}
            sx={menuItemStyles.submenu}
          >
            {subcategory.name}
          </MenuItem>
        ))}
      </Menu>
      </Box>
    </Fade>
  );

  const renderMobileNav = () => (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
      id="mobile-menu"
      sx={{
        '& .MuiDrawer-paper': menuItemStyles.drawer,
        '& .MuiBackdrop-root': {
          zIndex: theme.zIndex.appBar,
          transition: theme.transitions.create('opacity', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
          }),
        }
      }}
    >
      <Box sx={menuItemStyles.drawerHeader}>
        <Stack direction="row" spacing={1} alignItems="center">
          <StorefrontIcon sx={{ fontSize: 28 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            E-Shop
          </Typography>
        </Stack>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.label}
            component={Link}
            to={item.path}
            onClick={handleMobileMenuToggle}
            sx={{
              ...menuItemStyles.mobile,
              backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                sx: {
                  fontWeight: isActive(item.path) ? 'bold' : 'normal',
                },
              }}
            />
          </ListItem>
        ))}
        
        {/* Categories in mobile menu */}
        {categories.map((category) => (
          <React.Fragment key={category.id}>
            <ListItem
              button
              onClick={() => handleMobileSubMenuToggle(category.id)}
              TouchRippleProps={{
                style: {
                  color: 'rgba(255, 255, 255, 0.3)',
                }
              }}
              sx={{
                ...menuItemStyles.mobile,
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:active': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              <ListItemText 
                primary={category.name}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: 500,
                    fontSize: '1rem',
                  }
                }}
              />
              <ExpandMoreIcon
                sx={{
                  transform: mobileSubMenuOpen[category.id] ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s',
                }}
              />
            </ListItem>
            <Collapse in={mobileSubMenuOpen[category.id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {category.subcategories.map((subcategory) => (
                  <ListItem
                    key={subcategory.id}
                    button
                    onClick={() => {
                      handleSubcategoryClick(category.id, subcategory.id);
                      handleMobileMenuToggle();
                    }}
                    TouchRippleProps={{
                      style: {
                        color: 'rgba(255, 255, 255, 0.3)',
                      }
                    }}
                    sx={{
                      ...menuItemStyles.mobile,
                      pl: 4,
                      backgroundColor: 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        paddingLeft: '20px',
                      },
                      '&:active': {
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      },
                    }}
                  >
                    <ListItemText 
                      primary={subcategory.name}
                      primaryTypographyProps={{
                        sx: {
                          fontSize: '0.95rem',
                          color: 'rgba(255, 255, 255, 0.9)',
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );

  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleMobileMenuToggle}
            aria-label="Open main menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            flexGrow: isMobile ? 1 : 0,
            transition: theme.transitions.create(['margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          <StorefrontIcon sx={{ fontSize: 28 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: '0.03em',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
            }}
          >
            E-Shop
          </Typography>
        </Stack>

        {!isMobile && renderDesktopNav()}
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}>
          <SearchBar />
        </Box>

        {renderMobileNav()}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;