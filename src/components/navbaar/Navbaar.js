'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import {
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  Button
} from "@mui/material";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Poppins } from 'next/font/google';
import Image from 'next/image';

// Configure Poppins font
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  },
  hover: {
    scale: 1.05,
    transition: { type: 'spring', stiffness: 400, damping: 10 }
  }
};

const navItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  },
  hover: {
    scale: 1.1,
    color: '#3b82f6',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.95
  }
};

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogin = () => {
    setUserLogin(true);
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`dark:bg-gray-950 dark:text-white rounded-[5rem] py-3 px-10 shadow-xl shadow-white/10 ${poppins.className}`}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '100%',
          margin: '0 auto',
          gap: '2rem',
        }}
      >
        <motion.div variants={itemVariants}>
          <Box sx={{ flex: '0 0 auto' }}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{ display: 'inline-block' }}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={50}
                height={30}
                style={{
                  filter: 'invert(var(--logo-invert, 0))',
                  cursor: 'pointer'
                }}
              />
            </motion.div>
          </Box>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Box sx={{
            flex: '1 1 auto',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <List sx={{
              display: 'flex',
              gap: '2rem',
              padding: 0,
              margin: 0,
            }}>
              {['Home', 'Services', 'Blog', 'Help Center', 'About'].map((item, index) => (
                <ListItem
                  key={item}
                  sx={{
                    padding: 0,
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}
                  onClick={item === 'Services' ? handleClick : undefined}
                  component={motion.li}
                  variants={navItemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  custom={index}
                >
                  {item}
                </ListItem>
              ))}
            </List>
          </Box>
        </motion.div>
        {/* Search Bar */}
        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <Box sx={{
            flex: '0 1 30%',
            minWidth: '250px',
            maxWidth: '400px'
          }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f5f5f5',
                borderRadius: '50px',
                padding: '0.5rem 1rem',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }
              }}
              component={motion.div}
              whileFocus={{ boxShadow: '0 0 0 2px #3b82f6' }}
            >
              <SearchIcon sx={{
                color: theme.palette.mode === 'dark' ? '#aaa' : '#666',
                marginRight: '0.5rem'
              }} />
              <input
                type="text"
                placeholder="Search here..."
                className={poppins.className}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              />
            </Box>
          </Box>
        </motion.div>

        {/* User Actions */}
        <motion.div variants={itemVariants}>
          <Box sx={{
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {userLogin ? (
              <>
                <IconButton
                  aria-label="notifications"
                  component={motion.button}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Badge badgeContent={4} color="error">
                    <NotificationsIcon sx={{ color: '#fff' }} />
                  </Badge>
                </IconButton>

                <IconButton
                  aria-label="profile"
                  component={motion.button}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f5f5f5',
                      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                    }}
                    component={motion.div}
                    whileHover={{ rotate: 10 }}
                  >
                    <PermIdentityIcon />
                  </Box>
                </IconButton>
              </>
            ) : (
              <Button
                variant="outlined"
                onClick={handleLogin}
                sx={{
                  color: 'white',
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: '#2563eb',
                  }
                }}
                component={motion.button}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 4px 8px rgba(59, 130, 246, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Sign Up
              </Button>
            )}
          </Box>
        </motion.div>
      </Box>
    </motion.nav>
  );
};

export default Navbar;