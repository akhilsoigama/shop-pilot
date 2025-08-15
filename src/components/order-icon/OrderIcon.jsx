'use client';
import { motion } from 'framer-motion';
import { ShoppingBag } from '@mui/icons-material';
import { Badge, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const OrderIcon = ({ count = 0 }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/yourOrder');
  };

  return (
    <Button
      variant="text"
      color="inherit"
      onClick={handleClick}
      sx={{
        minWidth: 'auto',
        borderRadius: '50%',
        aspectRatio: '1/1',
        p: 1.5,
        position: 'relative',
        '&:hover': {
          backgroundColor: 'action.hover'
        }
      }}
      component={motion.div}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Badge 
        badgeContent={count} 
        color="primary"
        overlap="circular"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          '& .MuiBadge-badge': {
            right: 8,
            top: 8,
            transform: 'scale(1) translate(50%, -50%)'
          }
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 5, -5, 5, 0],
            y: [0, -2, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <ShoppingBag 
            sx={{ 
              fontSize: 28,
              color: 'inherit'
            }} 
          />
        </motion.div>
      </Badge>

      {count === 0 && (
        <motion.div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 8,
            height: 8,
            backgroundColor: 'red',
            borderRadius: '50%'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      )}
    </Button>
  );
};

export default OrderIcon;