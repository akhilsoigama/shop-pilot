'use client'
import { Box, Typography, IconButton, Button, Divider, Chip, useMediaQuery, } from '@mui/material'
import { Close, Add, Remove, Delete, ShoppingCart, ArrowForward,  Discount } from '@mui/icons-material'
import Image from 'next/image'
import { useTheme, alpha } from '@mui/material/styles'
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion'
import { useCart } from '@/context/cartContext'
import { useEffect, useState } from 'react'
import useCheckout from '@/hooks/useCheckout'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  const theme = useTheme()
  const controls = useAnimationControls()
  const [isRemoving, setIsRemoving] = useState(false)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleRemove = () => {
    setIsRemoving(true)
    controls.start({
      x: -100,
      opacity: 0,
      transition: { duration: 0.2 }
    }).then(() => removeFromCart(item._id))
  }

  const handleQuantityChange = (newQty) => {
    if (newQty !== item.quantity) {
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.2 }
      })
      updateQuantity(item._id, newQty)
    }
  }

  return (
    <motion.div
      key={item._id}
      initial={{ opacity: 0, y: 10 }}
      animate={isRemoving ? { opacity: 0, x: -100 } : { opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1.5),
        marginBottom: theme.spacing(1.5),
        borderRadius: 12,
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.08 : 0.04),
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Pulse effect */}
      <motion.div
        animate={{
          opacity: [0, 0.2, 0],
          scale: [1, 1.5, 2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeOut"
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: theme.palette.primary.main,
          filter: 'blur(2px)',
        }}
      />

      <Box sx={{
        flexShrink: 0,
        position: 'relative',
        width: isMobile ? 60 : 70,
        height: isMobile ? 60 : 70,
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: theme.shadows[1],
        mr: 2
      }}
      >
        <Image
          src={item.productImage[0] || '/placeholder.png'}
          alt={item.productName}
          fill
          style={{ objectFit: 'cover' }}
          sizes={isMobile ? "60px" : "70px"}
        />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ overflow: 'hidden' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: isMobile ? '0.875rem' : '0.9375rem'
              }}
            >
              {item.productName}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
              {item.brand}
            </Typography>
          </Box>
          <motion.div whileTap={{ scale: 0.9 }}>
            <IconButton
              size="small"
              onClick={handleRemove}
              sx={{
                p: 0.5,
                '&:hover': {
                  color: theme.palette.error.main,
                  backgroundColor: alpha(theme.palette.error.main, 0.1)
                }
              }}
            >
              <Delete fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </motion.div>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
          {item.discountPrice ? (
            <>
              <Typography variant="body2" sx={{
                fontWeight: 700,
                mr: 1,
                fontSize: isMobile ? '0.875rem' : '0.9375rem'
              }}>
                ₹{item.discountPrice.toLocaleString()}
              </Typography>
              <Typography variant="caption" sx={{
                textDecoration: 'line-through',
                color: 'text.disabled',
                mr: 1,
                fontSize: isMobile ? '0.7rem' : '0.75rem'
              }}>
                ₹{item.price.toLocaleString()}
              </Typography>
              <Chip
                label={`${Math.round((1 - item.discountPrice / item.price) * 100)}% OFF`}
                size="small"
                color="success"
                icon={<Discount sx={{ fontSize: '12px !important' }} />}
                sx={{
                  height: 18,
                  fontSize: '0.6rem',
                  '& .MuiChip-icon': {
                    marginLeft: '4px'
                  }
                }}
              />
            </>
          ) : (
            <Typography variant="body2" sx={{
              fontWeight: 700,
              fontSize: isMobile ? '0.875rem' : '0.9375rem'
            }}>
              ₹{item.price.toLocaleString()}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <motion.div whileTap={{ scale: 0.95 }}>
            <IconButton
              size="small"
              onClick={() => handleQuantityChange(Math.max(1, item.quantity - 1))}
              disabled={item.quantity <= 1}
              sx={{
                p: 0.5,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '6px 0 0 6px',
                backgroundColor: theme.palette.background.paper
              }}
            >
              <Remove fontSize="small" />
            </IconButton>
          </motion.div>
          <Typography
            variant="body2"
            sx={{
              px: 1.5,
              py: 0.5,
              borderTop: `1px solid ${theme.palette.divider}`,
              borderBottom: `1px solid ${theme.palette.divider}`,
              fontWeight: 600,
              fontSize: isMobile ? '0.8125rem' : '0.875rem',
              backgroundColor: theme.palette.background.paper
            }}
          >
            {item.quantity}
          </Typography>
          <motion.div whileTap={{ scale: 0.95 }}>
            <IconButton
              size="small"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              sx={{
                p: 0.5,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '0 6px 6px 0',
                backgroundColor: theme.palette.background.paper
              }}
            >
              <Add fontSize="small" />
            </IconButton>
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  )
}


export default function CartDrawer() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    closeCart,
    isCartOpen
  } = useCart()
  const { checkout, loading } = useCheckout();
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [isHoveringCheckout, setIsHoveringCheckout] = useState(false)
  const { user } = useUser()
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()
  const discountAmount = cart.reduce((sum, item) => {
    return sum + (item.discountPrice ? (item.price - item.discountPrice) * item.quantity : 0)
  }, 0)
  const handleCheckout = async () => {
    try {
      if (!user) {
        router.push('/sign-in');
        return;
      }

      const lineItems = cart.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.productName,
            images: [item.productImage[0]],
            metadata: { productId: item._id },
          },
          unit_amount: (item.discountPrice || item.price) * 100,
        },
        quantity: item.quantity,
      }));

      const primaryEmail = user.emailAddresses[0]?.emailAddress;

      if (!primaryEmail) {
        throw new Error("Please add an email address to your account");
      }

      const { sessionId, error } = await checkout({
        items: lineItems,
        customerEmail: primaryEmail,
      });

      if (error) {
        throw new Error(error);
      }

      router.push(`/checkout/${sessionId}`);
    } catch (err) {
      toast.error(err.message || "Checkout failed");
      console.error('Checkout error:', err);
    }
  };
  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: alpha(theme.palette.common.black, 0.4),
              zIndex: 1300,
              backdropFilter: 'blur(3px)',
            }}
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 400,
              mass: 0.5
            }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100vh',
              width: '100%',
              maxWidth: isMobile ? '100%' : 400,
              zIndex: 1400,
              overflow: 'hidden'
            }}
          >
            <Box sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'background.paper',
              boxShadow: 24,
              position: 'relative',
            }}>
              {/* Header with gradient */}
              <Box sx={{
                background: theme.palette.mode === 'dark'
                  ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.7)} 0%, ${theme.palette.background.default} 100%)`
                  : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.15)} 0%, ${theme.palette.background.paper} 100%)`,
                p: isMobile ? 2 : 2.5,
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Decorative elements */}
                <Box sx={{
                  position: 'absolute',
                  top: -30,
                  right: -30,
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                }} />

                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <motion.div
                      animate={{ rotate: isHoveringCheckout ? -5 : 0 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      <ShoppingCart sx={{
                        fontSize: isMobile ? 24 : 26,
                        color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main
                      }} />
                    </motion.div>
                    <Typography variant="h6" sx={{
                      fontWeight: 700,
                      fontSize: isMobile ? '1.1rem' : '1.2rem',
                      letterSpacing: 0.5,
                      background: theme.palette.mode === 'dark'
                        ? `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`
                        : `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      YOUR CART
                    </Typography>
                  </Box>
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <IconButton
                      onClick={closeCart}
                      size={isMobile ? "small" : "medium"}
                      sx={{
                        bgcolor: alpha(theme.palette.error.main, 0.1),
                        '&:hover': {
                          bgcolor: alpha(theme.palette.error.main, 0.15),
                        }
                      }}
                    >
                      <Close fontSize={isMobile ? "small" : "medium"} />
                    </IconButton>
                  </motion.div>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
                  <Chip
                    label={`${totalItems} ${totalItems === 1 ? 'ITEM' : 'ITEMS'}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.65rem',
                      height: 22,
                    }}
                  />
                  {discountAmount > 0 && (
                    <Chip
                      label={`SAVED ₹${discountAmount.toLocaleString()}`}
                      size="small"
                      color="success"
                      icon={<Discount sx={{ fontSize: '12px !important' }} />}
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.65rem',
                        height: 22,
                        '& .MuiChip-icon': {
                          marginLeft: '4px'
                        }
                      }}
                    />
                  )}
                </Box>
              </Box>

              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                >
                  <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1.5,
                    textAlign: 'center',
                    p: 3,
                  }}>
                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <ShoppingCart sx={{
                        fontSize: isMobile ? 64 : 72,
                        color: 'text.disabled',
                        opacity: 0.3
                      }} />
                    </motion.div>
                    <Typography variant="h6" sx={{
                      fontWeight: 600,
                      color: 'text.secondary',
                      fontSize: isMobile ? '1.1rem' : '1.25rem'
                    }}>
                      Your cart is empty
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                      maxWidth: 300,
                      fontSize: isMobile ? '0.8rem' : '0.875rem'
                    }}>
                      Looks like you have not added anything to your cart yet
                    </Typography>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        variant="outlined"
                        onClick={closeCart}
                        size={isMobile ? "small" : "medium"}
                        sx={{
                          mt: 2,
                          borderRadius: 6,
                          px: 3,
                          textTransform: 'none',
                          fontWeight: 600,
                          fontSize: isMobile ? '0.8rem' : '0.875rem',
                          borderWidth: 1.5,
                          '&:hover': {
                            borderWidth: 1.5
                          }
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
                    p: isMobile ? 1.5 : 2,
                    pt: 1,
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

                  <Box sx={{
                    p: isMobile ? 1.5 : 2,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    background: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.05 : 0.02)
                  }}>
                    <Box sx={{ mb: 1.5 }}>
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 0.5
                      }}>
                        <Typography variant="body2" sx={{ fontSize: isMobile ? '0.8125rem' : '0.875rem' }}>
                          Subtotal:
                        </Typography>
                        <Typography variant="body2" sx={{
                          fontWeight: 600,
                          fontSize: isMobile ? '0.8125rem' : '0.875rem'
                        }}>
                          ₹{totalPrice.toLocaleString()}
                        </Typography>
                      </Box>
                      {discountAmount > 0 && (
                        <Box sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mb: 0.5
                        }}>
                          <Typography variant="body2" sx={{ fontSize: isMobile ? '0.8125rem' : '0.875rem' }}>
                            Discount:
                          </Typography>
                          <Typography variant="body2" color="success.main" sx={{
                            fontWeight: 600,
                            fontSize: isMobile ? '0.8125rem' : '0.875rem'
                          }}>
                            -₹{discountAmount.toLocaleString()}
                          </Typography>
                        </Box>
                      )}
                      <Divider sx={{ my: 1 }} />
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}>
                        <Typography variant="subtitle1" sx={{
                          fontWeight: 700,
                          fontSize: isMobile ? '0.9375rem' : '1rem'
                        }}>
                          Total:
                        </Typography>
                        <Typography variant="subtitle1" sx={{
                          fontWeight: 800,
                          fontSize: isMobile ? '0.9375rem' : '1rem'
                        }}>
                          ₹{(totalPrice).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1
                    }}>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onHoverStart={() => setIsHoveringCheckout(true)}
                        onHoverEnd={() => setIsHoveringCheckout(false)}
                      >
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={handleCheckout}
                          disabled={loading}
                          size={isMobile ? "medium" : "large"}
                          endIcon={
                            <motion.div
                              animate={{ x: isHoveringCheckout ? 3 : 0 }}
                              transition={{ type: 'spring', stiffness: 500 }}
                            >
                              <ArrowForward fontSize={isMobile ? "small" : "medium"} />
                            </motion.div>
                          }
                          sx={{
                            py: isMobile ? 0.75 : 1,
                            borderRadius: 6,
                            fontWeight: 700,
                            fontSize: isMobile ? '0.8125rem' : '0.875rem',
                            background: theme.palette.mode === 'dark'
                              ? `linear-gradient(45deg, ${alpha(theme.palette.primary.dark, 0.9)} 0%, ${alpha(theme.palette.secondary.dark, 0.9)} 100%)`
                              : `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.9)} 0%, ${alpha(theme.palette.secondary.main, 0.9)} 100%)`,
                            boxShadow: theme.shadows[2],
                            '&:hover': {
                              boxShadow: theme.shadows[4],
                            }
                          }}
                        >
                          {loading ? "Processing..." : "Checkout Now"}
                        </Button>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <Button
                          fullWidth
                          variant="outlined"
                          onClick={closeCart}
                          size={isMobile ? "medium" : "large"}
                          sx={{
                            py: isMobile ? 0.625 : 0.875,
                            borderRadius: 6,
                            fontWeight: 600,
                            fontSize: isMobile ? '0.8125rem' : '0.875rem',
                            borderWidth: 1.5,
                            '&:hover': {
                              borderWidth: 1.5
                            }
                          }}
                        >
                          Continue Shopping
                        </Button>
                      </motion.div>
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}