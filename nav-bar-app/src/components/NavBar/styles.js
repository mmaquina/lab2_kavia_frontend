// Shared styles for NavBar components
export const menuItemStyles = {
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