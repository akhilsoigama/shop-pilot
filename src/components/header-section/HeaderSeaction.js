'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AppBar, Toolbar, Button, IconButton, Drawer, List,
  ListItem, ListItemText, Box, Container, Typography,
  Badge, InputBase, useTheme, Avatar
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import {
  Menu, Close, ShoppingCart, Search,
  Favorite
} from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useCart } from '@/context/cartContext';
import Link from 'next/link';
import CartDrawer from '@/components/cartDrawer/cartDrawer';
import SettingsDropdown from '../setting/Setting';
import NotificationsIcon from '@mui/icons-material/Notifications';
import OrderIcon from '../order-icon/OrderIcon';
const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: alpha(
    theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
    0.05
  ),
  '&:hover': {
    backgroundColor: alpha(
      theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
      0.08
    ),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  transition: theme.transitions.create(['width', 'background-color'], {
    duration: theme.transitions.duration.standard,
  }),
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.mode === 'dark' ?
    alpha(theme.palette.common.white, 0.7) :
    alpha(theme.palette.common.black, 0.5),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  letterSpacing: 0.5,
  borderRadius: 12,
  padding: '8px 16px',
  transition: theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    transform: 'translateY(-2px)',
  },
}));

const HeaderSection = () => {
  const theme = useTheme();
  const { isSignedIn, user } = useUser();
  const {
    getTotalItems,
    isCartOpen,
    toggleCart,
    closeCart
  } = useCart();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="sticky"

        sx={{
          backgroundColor: isScrolled
            ? alpha(theme.palette.background.default, 0.98)
            : 'transparent',
          color: theme.palette.text.primary,
          // boxShadow: isScrolled ? theme.shadows[4] : 'none',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          transition: 'all 0.3s ease-in-out',
          // borderBottom: isScrolled 
          //   ? `1px solid ${alpha(theme.palette.divider, 0.1)}` 
          //   : 'none',
          zIndex: theme.zIndex.appBar + 1,
          backgroundImage: 'none',
        }}
        elevation={0}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Toolbar disableGutters sx={{ minHeight: { xs: 56, sm: 64 } }}>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  // mr: 1,
                  display: { md: 'none' },
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                <Menu />
              </IconButton>
            )}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Link href="/" passHref>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    '& img': {
                      transform: 'rotate(-10deg) scale(1.1)'
                    }
                  }
                }}

                >
                  <motion.div
                    whileHover={{ rotate: -10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Image
                      src='/logo.png'
                      width={60}
                      height={60}
                      alt='logo'
                      style={{
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </motion.div>
                  <Typography variant="h6" sx={{

                    fontWeight: 800,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: { xs: 'none', sm: 'block' }
                  }}>
                    ShopPilot
                  </Typography>
                </Box>
              </Link>
            </motion.div>

            {!isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: 32,
                  flexGrow: 1,
                  maxWidth: 600
                }}
              >
                <SearchContainer>
                  <SearchIconWrapper>
                    <Search />
                  </SearchIconWrapper>
                  <StyledInputBase className='truncate'
                    placeholder="Search  products"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </SearchContainer>
              </motion.div>
            )}

            <Box sx={{ flexGrow: 1 }} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing(1)
              }}
            >
              {!isMobile && (
                <>
                  <Link href="/" passHref>
                    <NavButton
                      color="inherit"
                      startIcon={<Favorite />}
                      sx={{
                        '&:hover': {
                          color: theme.palette.error.main,
                          backgroundColor: alpha(theme.palette.error.main, 0.1),
                        }
                      }}
                    >
                      Wishlist
                    </NavButton>
                  </Link>
                </>
              )}

              <IconButton
                color="inherit"
                onClick={toggleCart}
                sx={{
                  p: 1,
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                <Badge
                  badgeContent={getTotalItems()}
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      right: 4,
                      top: 4,
                      border: `2px solid ${theme.palette.background.paper}`,
                      padding: '0 4px',
                      fontWeight: 600
                    }
                  }}
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <OrderIcon />

              <Button
                variant="text"
                color="inherit"
                sx={{
                  minWidth: "0",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.04)",
                  },
                }}
              >
                <Badge badgeContent={3} color="primary" overlap="circular">
                  <NotificationsIcon size={20} />
                </Badge>
              </Button>

              <SettingsDropdown />

              {!isMobile && isSignedIn ? (
                <Box sx={{ ml: 1 }}>
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        userButtonAvatarBox: {
                          width: 36,
                          height: 36,
                          border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                          transition: 'all 0.3s',
                          '&:hover': {
                            borderColor: theme.palette.primary.main
                          }
                        }
                      }
                    }}
                  />
                </Box>
              ) : !isMobile && (
                <NavButton
                  variant="contained"
                  color="primary"
                  href="/sign-in"
                  sx={{
                    ml: 1,
                    px: 3,
                    fontWeight: 600,
                    boxShadow: theme.shadows[2],
                    '&:hover': {
                      boxShadow: theme.shadows[4],
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Sign In
                </NavButton>
              )}
            </motion.div>
          </Toolbar>
        </Container>
      </AppBar>

      <CartDrawer open={isCartOpen} onClose={closeCart} />

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '90%',
            maxWidth: 350,
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: theme.shadows[16],
            zIndex: theme.zIndex.drawer + 2, // Higher than app bar
          },
        }}
      >
        <Box sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.light, 0.05)}, transparent)`
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            backgroundColor: alpha(theme.palette.background.default, 0.8),
            backdropFilter: 'blur(10px)',
          }}>
            <Link href="/" passHref>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Image src='/logo.png' width={40} height={40} alt='shop-pilot' />
                <Typography variant="h6" sx={{
                  fontWeight: 800,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  ShopPilot
                </Typography>
              </Box>
            </Link>
            <Box display="flex" alignItems="center" gap={1}>
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.error.main, 0.1),
                    color: theme.palette.error.main
                  }
                }}
              >
                <Close />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{
            p: 2,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            backgroundColor: alpha(theme.palette.background.default, 0.8),
            backdropFilter: 'blur(10px)',
          }}>
            <SearchContainer>
              <SearchIconWrapper>
                <Search />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search products..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </SearchContainer>
          </Box>

          <Box sx={{
            flex: 1,
            overflowY: 'auto',
            p: 2,
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: alpha(theme.palette.primary.main, 0.3),
              borderRadius: '3px',
            },
          }}>

            <List>
              <ListItem
                component={Link}
                href="/orders"
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                <ListItemText primary="Orders" />
              </ListItem>

              <ListItem
                component={Link}
                href="/wishlist"
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                <ListItemText primary="Wishlist" />
              </ListItem>

              <ListItem
                component={Link}
                href="/notifications"
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                <ListItemText primary="Notifications" />
              </ListItem>
            </List>
          </Box>

          <Box sx={{
            p: 3,
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            backgroundColor: alpha(theme.palette.background.default, 0.8),
            backdropFilter: 'blur(10px)',
          }}>
            {isSignedIn ? (
              <Box sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
              }}>
                <Avatar
                  src={user.imageUrl}
                  sx={{
                    width: 64,
                    height: 64,
                    border: `2px solid ${theme.palette.primary.main}`,
                    mb: 1
                  }}
                />
                <Typography variant="subtitle1" fontWeight={600}>
                  {user.fullName || 'Welcome back!'}
                </Typography>
              </Box>
            ) : (
              <>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"

                  sx={{
                    mb: 2,
                    py: 1.5,
                    fontWeight: 600,
                    borderRadius: 2,
                    boxShadow: theme.shadows[2],
                    '&:hover': {
                      boxShadow: theme.shadows[4],
                    }
                  }}
                  href="/sign-in"
                >
                  Sign In
                </Button>
                <Typography variant="body2" textAlign="center" color="text.secondary">
                  New customer?{' '}
                  <Link href="/sign-up" passHref>
                    <Typography
                      component="span"
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                          cursor: 'pointer'
                        }
                      }}
                    >
                      Start here
                    </Typography>
                  </Link>
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default HeaderSection;