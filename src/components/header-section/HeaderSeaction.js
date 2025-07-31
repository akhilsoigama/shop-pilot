'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AppBar, Toolbar, Button, IconButton, Drawer, List,
  ListItem, ListItemText, Box, Container, Typography,
  Badge, InputBase, useTheme
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import {
  Menu, Close, ShoppingCart, Search,
  Person, Add, Remove, Delete
} from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { UserButton, useUser } from '@clerk/nextjs';
import { useColorMode } from '@/hooks/DarkmodeProvider';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { categories, Subcategories } from '@/lib/category';
import Image from 'next/image';
import { useCart } from '@/context/cartContext';
import Link from 'next/link';

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
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
        width: '28ch',
      },
    },
  },
}));

const CategoryItem = styled('a')(({ theme }) => ({
  display: 'block',
  padding: theme.spacing(0.5, 1),
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.2s',
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
  },
}));

const MegaMenuContainer = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  left: 0,
  right: 0,
  top: '64px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[6],
  zIndex: theme.zIndex.modal,
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(4),
  height: '400px',
  overflowY: 'auto',
}));

const CartDrawerContent = ({ closeCart }) => {
  const theme = useTheme();
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice 
  } = useCart();

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Your Cart</Typography>
        <IconButton onClick={closeCart}>
          <Close />
        </IconButton>
      </Box>

      {cart.length === 0 ? (
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography>Your cart is empty</Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
            {cart.map((item) => (
              <Box 
                key={item._id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 2,
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: alpha(theme.palette.primary.main, 0.05)
                }}
              >
                <Box sx={{ 
                  position: 'relative', 
                  minWidth: 60, 
                  height: 60,
                  borderRadius: 1,
                  overflow: 'hidden'
                }}>
                  <Image
                    src={item.productImage?.[0] || '/placeholder.jpg'}
                    alt={item.productName}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
                
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item.productName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.primary.main }}>
                    ₹{item.discountPrice}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton 
                    size="small"
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  >
                    <Remove fontSize="small" />
                  </IconButton>
                  
                  <Typography>{item.quantity}</Typography>
                  
                  <IconButton 
                    size="small"
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    <Add fontSize="small" />
                  </IconButton>
                  
                  <IconButton 
                    size="small"
                    onClick={() => removeFromCart(item._id)}
                    sx={{ color: theme.palette.error.main }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1">Total:</Typography>
              <Typography variant="h6">₹{getTotalPrice()}</Typography>
            </Box>
            <Button 
              fullWidth 
              variant="contained"
              color="primary"
              sx={{ mb: 1 }}
            >
              Proceed to Checkout
            </Button>
            <Button 
              fullWidth 
              variant="outlined"
              onClick={closeCart}
            >
              Continue Shopping
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

const HeaderSection = () => {
  const theme = useTheme();
  const { isSignedIn } = useUser();
  const { toggleColorMode, mode } = useColorMode();
  const { 
    getTotalItems, 
    isCartOpen, 
    toggleCart, 
    closeCart 
  } = useCart();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Create category map that handles both string and object subcategories
  const categoryMap = {};
  Subcategories.forEach(cat => {
    categoryMap[cat.name] = cat.subcategories.map(sub => 
      typeof sub === 'string' ? { name: sub, imageUrl: '' } : sub
    );
  });

  const mainCategories = categories.slice(0, 4);
  const moreCategories = categories.slice(5);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getCategoryUrl = (category, subcategory) => {
    const subName = typeof subcategory === 'string' ? subcategory : subcategory.name;
    return `/categories/${encodeURIComponent(category)}/${encodeURIComponent(subName)}`;
  };

  const handleLinkClick = () => {
    setHoveredCategory(null);
    setMobileOpen(false);
  };

  const renderMegaMenu = (category) => {
    return (
      <MegaMenuContainer
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setHoveredCategory(category)}
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'grid', gap: theme.spacing(3) }}>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  mb: 2,
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                }}
              >
                {category}
              </Typography>
              <ul className='m-0 p-0 list-none'>
                {categoryMap[category]?.map((sub) => {
                  const subItem = typeof sub === 'string' ? { name: sub } : sub;
                  return (
                    <li key={subItem.name}>
                      <Link
                        href={getCategoryUrl(category, subItem)}
                        onClick={handleLinkClick}
                        className='font-medium text-[12px] hover:bg-gray-300 dark:hover:bg-gray-300/10 flex items-center gap-2 p-2'
                      >
                        {subItem.imageUrl && (
                          <Box sx={{ 
                            position: 'relative', 
                            width: 24, 
                            height: 24,
                            borderRadius: '4px',
                            overflow: 'hidden'
                          }}>
                            <Image
                              src={subItem.imageUrl}
                              alt={subItem.name}
                              fill
                              style={{ objectFit: 'cover' }}
                            />
                          </Box>
                        )}
                        {subItem.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Box>
          </Box>
        </Container>
      </MegaMenuContainer>
    );
  };

  const renderMoreMegaMenu = () => {
    return (
      <MegaMenuContainer
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className='text-[12px]'
        onMouseEnter={() => setHoveredCategory('more')}
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <Container maxWidth="xl">
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: theme.spacing(3),
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            {moreCategories.map((category) => (
              <Box key={category} sx={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    mb: 1,
                    fontSize: '12px',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }}
                >
                  {category}
                </Typography>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {categoryMap[category]?.map((sub) => {
                    const subItem = typeof sub === 'string' ? { name: sub } : sub;
                    return (
                      <li key={subItem.name}>
                        <Link
                          href={getCategoryUrl(category, subItem)}
                          onClick={handleLinkClick}
                          className='font-medium hover:bg-gray-300 dark:hover:bg-gray-300/10 p-2 flex items-center gap-2'
                        >
                          {subItem.imageUrl && (
                            <Box sx={{ 
                              position: 'relative', 
                              width: 24, 
                              height: 24,
                              borderRadius: '4px',
                              overflow: 'hidden'
                            }}>
                              <Image
                                src={subItem.imageUrl}
                                alt={subItem.name}
                                fill
                                style={{ objectFit: 'cover' }}
                              />
                            </Box>
                          )}
                          {subItem.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Box>
            ))}
          </Box>
        </Container>
      </MegaMenuContainer>
    );
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: isScrolled
            ? alpha(theme.palette.background.default, 0.98)
            : alpha(theme.palette.background.default, 0.95),
          color: theme.palette.text.primary,
          boxShadow: isScrolled ? theme.shadows[4] : 'none',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.3s ease-in-out',
          borderBottom: isScrolled ? 'none' : `1px solid ${theme.palette.divider}`,
          zIndex: theme.zIndex.drawer + 1,
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
                sx={{ mr: 1, display: { md: 'none' } }}
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
              <Link href="/">
                <Image src='/logo.png' width={40} height={40} alt='logo' />
              </Link>
            </motion.div>

            {!isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ display: 'flex', alignItems: 'center', marginLeft: 32 }}
              >
                <SearchContainer>
                  <SearchIconWrapper>
                    <Search />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search products..."
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </SearchContainer>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    color="inherit"
                    sx={{
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '12px',
                      '&:hover': {
                        color: theme.palette.primary.main,
                        backgroundColor: 'transparent',
                      }
                    }}
                    component={Link}
                    href="/"
                  >
                    Home
                  </Button>

                  {mainCategories.map((category) => (
                    <Box key={category} sx={{ position: 'relative' }}>
                      <Button
                        color="inherit"
                        sx={{
                          fontWeight: 600,
                          textTransform: 'none',
                          fontSize: '12px',
                          '&:hover': {
                            color: theme.palette.primary.main,
                            backgroundColor: 'transparent',
                          }
                        }}
                        onMouseEnter={() => setHoveredCategory(category)}
                        onMouseLeave={() => setHoveredCategory(null)}
                      >
                        {category}
                      </Button>

                      <AnimatePresence>
                        {hoveredCategory === category && renderMegaMenu(category)}
                      </AnimatePresence>
                    </Box>
                  ))}

                  <Box sx={{ position: 'relative' }}>
                    <Button
                      color="inherit"
                      sx={{
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '12px',
                        '&:hover': {
                          color: theme.palette.primary.main,
                          backgroundColor: 'transparent',
                        }
                      }}
                      onMouseEnter={() => setHoveredCategory('more')}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      More
                    </Button>

                    <AnimatePresence>
                      {hoveredCategory === 'more' && renderMoreMegaMenu()}
                    </AnimatePresence>
                  </Box>
                </Box>
              </motion.div>
            )}

            <Box sx={{ flexGrow: 1 }} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
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
                    }
                  }}
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  marginLeft: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={toggleColorMode}
              >
                <Box sx={{
                  p: 1,
                  borderRadius: '50%',
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                }}>
                  <AnimatePresence mode="wait" initial={false}>
                    {mode === 'dark' ? (
                      <motion.div
                        key="light"
                        initial={{ opacity: 0, rotate: -30 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 30 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MdLightMode style={{
                          fontSize: '20px',
                          color: theme.palette.primary.main
                        }} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="dark"
                        initial={{ opacity: 0, rotate: 30 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: -30 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MdDarkMode style={{
                          fontSize: '20px',
                          color: theme.palette.primary.main
                        }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>
              </motion.div>
              {!isMobile && (
                <>
                  <IconButton
                    color="inherit"
                    sx={{
                      p: 1,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      }
                    }}
                  >
                    {isSignedIn ? (
                      <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            userButtonAvatarBox: {
                              width: 32,
                              height: 32,
                            }
                          }
                        }}
                      />
                    ) : (
                      <Person />
                    )}
                  </IconButton>
                </>
              )}
              {!isMobile && !isSignedIn && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    ml: 2,
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 2,
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: theme.shadows[4],
                    }
                  }}
                  href="/sign-in"
                >
                  Sign In
                </Button>
              )}
            </motion.div>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={closeCart}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 400 },
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <CartDrawerContent closeCart={closeCart} />
      </Drawer>

      {/* Mobile Menu Drawer */}
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
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.default,
          }}>
            <Link href="/">
              <Image src='/logo.png' width={40} height={40} alt='shop-pilot' />
            </Link>
            <Box display="flex" alignItems="center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ cursor: 'pointer' }}
                onClick={toggleColorMode}
              >
                <Box sx={{
                  p: 1,
                  borderRadius: '50%',
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <AnimatePresence mode="wait" initial={false}>
                    {mode === 'dark' ? (
                      <motion.div
                        key="light-mobile"
                        initial={{ opacity: 0, rotate: -30 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 30 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MdLightMode style={{
                          fontSize: '20px',
                          color: theme.palette.primary.main
                        }} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="dark-mobile"
                        initial={{ opacity: 0, rotate: 30 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: -30 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MdDarkMode style={{
                          fontSize: '20px',
                          color: theme.palette.primary.main
                        }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>
              </motion.div>
              <IconButton onClick={handleDrawerToggle}>
                <Close />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
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

          <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
            <List disablePadding>
              <ListItem
                component={Link}
                href="/"
                sx={{
                  px: 3,
                  py: 1.5,
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
                onClick={handleLinkClick}
              >
                <ListItemText
                  primary="Home"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>

              <ListItem className='scrollbar-hide'
                component="button"
                sx={{
                  px: 3,
                  py: 1.5,
                  display: 'block',
                  width: '100%',
                  fontSize: '12px',
                  textAlign: 'left',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
                onClick={() => setHoveredCategory(hoveredCategory === 'mobile-categories' ? null : 'mobile-categories')}
              >
                <ListItemText
                  primary="Categories"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>

              {hoveredCategory === 'mobile-categories' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ overflow: 'hidden' }}
                  className='scrollbar-hide'
                >
                  {categories.map((category) => (
                    <div key={category} style={{ paddingLeft: 32, paddingRight: 16 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          mt: 1,
                          px: 2,
                          py: 1,
                          borderRadius: 1,
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        }}
                      >
                        {category}
                      </Typography>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                        {categoryMap[category]?.map((sub) => {
                          const subItem = typeof sub === 'string' ? { name: sub } : sub;
                          return (
                            <li key={subItem.name}>
                              <Link
                                href={getCategoryUrl(category, subItem)}
                                onClick={handleLinkClick}
                                className='font-medium hover:bg-gray-300 dark:hover:bg-gray-300/10 p-2 flex items-center gap-2'
                              >
                                {subItem.imageUrl && (
                                  <Box sx={{ 
                                    position: 'relative', 
                                    width: 24, 
                                    height: 24,
                                    borderRadius: '4px',
                                    overflow: 'hidden'
                                  }}>
                                    <Image
                                      src={subItem.imageUrl}
                                      alt={subItem.name}
                                      fill
                                      style={{ objectFit: 'cover' }}
                                    />
                                  </Box>
                                )}
                                {subItem.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}

              <ListItem
                component={Link}
                href="/new-arrivals"
                sx={{
                  px: 3,
                  py: 1.5,
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
                onClick={handleLinkClick}
              >
                <ListItemText
                  primary="New Arrivals"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
              <ListItem
                component={Link}
                href="/deals"
                sx={{
                  px: 3,
                  py: 1.5,
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
                onClick={handleLinkClick}
              >
                <ListItemText
                  primary="Deals"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
              <ListItem
                component={Link}
                href="/about"
                sx={{
                  px: 3,
                  py: 1.5,
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
                onClick={handleLinkClick}
              >
                <ListItemText
                  primary="About"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
            </List>
          </Box>

          <Box sx={{ p: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
            {isSignedIn ? (
              <Box sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
              }}>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: 64,
                        height: 64,
                      }
                    }
                  }}
                />
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
                  }}
                  href="/sign-in"
                >
                  Sign In
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default HeaderSection;