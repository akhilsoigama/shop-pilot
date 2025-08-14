'use client'
import { Box, Typography, IconButton, Button, Divider, Chip, Badge } from '@mui/material'
import { Close, Add, Remove, Delete, ShoppingCart, ArrowForward, LocalShipping, Redeem } from '@mui/icons-material'
import Image from 'next/image'
import { useTheme, alpha } from '@mui/material/styles'
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion'
import { useCart } from '@/context/cartContext'
import { useEffect, useState } from 'react'

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  const theme = useTheme()

  // Get variant specifications text
  const getVariantText = () => {
    if (!item.specifications) return ''
    return item.specifications
      .filter(spec => ['Size', 'Color'].includes(spec.name))
      .map(spec => `${spec.value}`)
      .join(' | ')
  }

  return (
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 2,
        p: 2,
        borderRadius: 3,
        bgcolor: alpha(theme.palette.primary.main, 0.03),
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        position: 'relative',
      }}
    >
      <Box sx={{ 
        position: 'relative', 
        minWidth: 80, 
        height: 80,
        borderRadius: 2,
        overflow: 'hidden',
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
        
        {/* Display variant info */}
        {getVariantText() && (
          <Typography variant="body2" sx={{ 
            color: theme.palette.text.secondary,
            fontSize: '0.8rem',
            mt: 0.5
          }}>
            {getVariantText()}
          </Typography>
        )}
        
        <Typography variant="body2" sx={{ 
          color: theme.palette.primary.main,
          fontWeight: 600,
          mt: 1
        }}>
          ₹{item.discountPrice}
        </Typography>
      </Box>
      
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1 
      }}>
        <IconButton 
          size="small"
          onClick={() => updateQuantity(item.variantId || item._id, item.quantity - 1)}
        >
          <Remove fontSize="small" />
        </IconButton>
        
        <Typography>{item.quantity}</Typography>
        
        <IconButton 
          size="small"
          onClick={() => updateQuantity(item.variantId || item._id, item.quantity + 1)}
        >
          <Add fontSize="small" />
        </IconButton>
        
        <IconButton 
          size="small"
          onClick={() => removeFromCart(item.variantId || item._id)}
          sx={{ color: theme.palette.error.main }}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  )
}


export default function CartDrawer() {
    const theme = useTheme()
    const {
        cart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        getTotalItems,
        closeCart,
        isCartOpen
    } = useCart()

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <AnimatePresence>
            {isCartOpen && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        height: '100vh',
                        width: '100%',
                        maxWidth: 420,
                        zIndex: 1400,
                        overflow: 'hidden'
                    }}
                >
                    <Box sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: 'background.paper',
                        p: { xs: 2, sm: 3 },
                        boxShadow: 24,
                        position: 'relative'
                    }}>
                        {/* Floating particles background */}
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                            zIndex: 0,
                            opacity: 0.05,
                            pointerEvents: 'none'
                        }}>
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ 
                                        x: Math.random() * 100,
                                        y: Math.random() * 100,
                                        rotate: Math.random() * 360
                                    }}
                                    animate={{ 
                                        y: [null, Math.random() * 100],
                                        rotate: [null, Math.random() * 360]
                                    }}
                                    transition={{ 
                                        duration: 10 + Math.random() * 20,
                                        repeat: Infinity,
                                        repeatType: 'reverse',
                                        ease: 'easeInOut'
                                    }}
                                    style={{
                                        position: 'absolute',
                                        width: 10,
                                        height: 10,
                                        borderRadius: '50%',
                                        background: theme.palette.primary.main,
                                        filter: 'blur(1px)'
                                    }}
                                />
                            ))}
                        </Box>

                        {/* Header */}
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2,
                            position: 'relative',
                            zIndex: 1
                        }}>
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <motion.div
                                        animate={{ 
                                            rotate: [0, 10, -10, 0],
                                            y: [0, -5, 0]
                                        }}
                                        transition={{ 
                                            duration: 1.5,
                                            repeat: Infinity,
                                            repeatType: 'mirror'
                                        }}
                                    >
                                        <ShoppingCart color="primary" sx={{ fontSize: 28 }} />
                                    </motion.div>
                                    <Typography variant="h6" sx={{ 
                                        fontWeight: 800,
                                        fontSize: '1.3rem',
                                        letterSpacing: 0.5,
                                        background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}>
                                        YOUR CART
                                    </Typography>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring' }}
                                    >
                                        <Chip 
                                            label={getTotalItems()} 
                                            size="small" 
                                            color="primary"
                                            sx={{ 
                                                ml: 1,
                                                fontWeight: 700,
                                                fontSize: '0.8rem'
                                            }}
                                        />
                                    </motion.div>
                                </Box>
                            </motion.div>
                            <motion.div whileHover={{ rotate: 90 }}>
                                <IconButton 
                                    onClick={closeCart}
                                    sx={{
                                        '&:hover': {
                                            bgcolor: alpha(theme.palette.primary.main, 0.1)
                                        }
                                    }}
                                >
                                    <Close />
                                </IconButton>
                            </motion.div>
                        </Box>

                        <Divider sx={{ 
                            mb: 2,
                            borderColor: alpha(theme.palette.divider, 0.2)
                        }} />

                        {/* Cart Content */}
                        {cart.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                style={{ flex: 1 }}
                            >
                                <Box sx={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 2,
                                    textAlign: 'center',
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    <motion.div
                                        animate={{
                                            y: [0, -15, 0],
                                            rotate: [0, 5, -5, 0]
                                        }}
                                        transition={{ 
                                            duration: 4,
                                            repeat: Infinity,
                                            repeatType: 'mirror'
                                        }}
                                    >
                                        <ShoppingCart sx={{ 
                                            fontSize: 80, 
                                            color: 'text.disabled',
                                            opacity: 0.3
                                        }} />
                                    </motion.div>
                                    <Typography variant="h6" sx={{ 
                                        fontWeight: 600,
                                        color: 'text.secondary'
                                    }}>
                                        Your cart feels lonely
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Add some amazing products to get started!
                                    </Typography>
                                    <motion.div whileHover={{ scale: 1.05 }}>
                                        <Button
                                            variant="outlined"
                                            onClick={closeCart}
                                            endIcon={
                                                <motion.div
                                                    animate={{ x: [0, 5, 0] }}
                                                    transition={{ 
                                                        duration: 1.5,
                                                        repeat: Infinity
                                                    }}
                                                >
                                                    <ArrowForward />
                                                </motion.div>
                                            }
                                            sx={{ 
                                                mt: 3,
                                                px: 4,
                                                borderRadius: 2,
                                                fontWeight: 600
                                            }}
                                        >
                                            Continue Shopping
                                        </Button>
                                    </motion.div>
                                </Box>
                            </motion.div>
                        ) : (
                            <>
                                <Box sx={{
                                    flex: 1,
                                    overflowY: 'auto',
                                    pr: 1,
                                    position: 'relative',
                                    zIndex: 1,
                                    '&::-webkit-scrollbar': { 
                                        width: '6px',
                                        height: '6px'
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        bgcolor: alpha(theme.palette.primary.main, 0.4),
                                        borderRadius: '3px',
                                        '&:hover': {
                                            bgcolor: alpha(theme.palette.primary.main, 0.6)
                                        }
                                    }
                                }}>
                                    <AnimatePresence>
                                        {cart.map((item) => (
                                            <CartItem 
                                                key={item._id}
                                                item={item}
                                                removeFromCart={removeFromCart}
                                                updateQuantity={updateQuantity}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </Box>

                                <Divider sx={{ 
                                    my: 2,
                                    borderColor: alpha(theme.palette.divider, 0.2)
                                }} />

                                {/* Summary */}
                                <Box sx={{ 
                                    mb: 2,
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            mb: 1.5
                                        }}>
                                            <Typography variant="body1">Subtotal:</Typography>
                                            <motion.div
                                                key={`total-${getTotalPrice()}`}
                                                initial={{ scale: 1.2 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: 'spring' }}
                                            >
                                                <Typography variant="subtitle1" sx={{ 
                                                    fontWeight: 700,
                                                    fontSize: '1.1rem'
                                                }}>
                                                    ₹{getTotalPrice().toLocaleString()}
                                                </Typography>
                                            </motion.div>
                                        </Box>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            mb: 2.5,
                                            p: 1.5,
                                            borderRadius: 2,
                                            bgcolor: alpha(theme.palette.primary.main, 0.03)
                                        }}>
                                            <LocalShipping sx={{ 
                                                fontSize: 20,
                                                color: 'primary.main'
                                            }} />
                                            <Typography variant="body2" sx={{ flex: 1 }}>
                                                <strong>Free shipping</strong> on orders over ₹999
                                            </Typography>
                                        </Box>
                                    </motion.div>
                                </Box>

                                <Box sx={{ 
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1.5,
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            size="large"
                                            sx={{ 
                                                py: 1.5,
                                                borderRadius: 2,
                                                fontWeight: 700,
                                                fontSize: '1rem',
                                                letterSpacing: 0.5,
                                                textTransform: 'uppercase',
                                                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                                                '&:hover': {
                                                    boxShadow: `0 6px 25px ${alpha(theme.palette.primary.main, 0.4)}`
                                                }
                                            }}
                                        >
                                            Proceed to Checkout
                                        </Button>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.01 }}
                                    >
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            onClick={closeCart}
                                            sx={{
                                                py: 1.25,
                                                borderRadius: 2,
                                                fontWeight: 600,
                                                fontSize: '0.9rem',
                                                borderWidth: 2,
                                                '&:hover': {
                                                    borderWidth: 2
                                                }
                                            }}
                                        >
                                            Continue Shopping
                                        </Button>
                                    </motion.div>
                                </Box>
                            </>
                        )}
                    </Box>
                </motion.div>
            )}
        </AnimatePresence>
    )
}