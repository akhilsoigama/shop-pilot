'use client'
import { Box, Typography, IconButton, Button, Divider } from '@mui/material'
import { Close, Add, Remove, Delete } from '@mui/icons-material'
import Image from 'next/image'
import { useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { useCart } from '@/context/cartContext'

export default function CartDrawer() {
    const theme = useTheme()
    const {
        cart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        closeCart
    } = useCart()

    return (
        <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            p: 2
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
            }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Shopping Cart
                </Typography>
                <IconButton onClick={closeCart}>
                    <Close />
                </IconButton>
            </Box>

            <Divider sx={{ my: 1 }} />

            {cart.length === 0 ? (
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Typography>Your cart is empty</Typography>
                </Box>
            ) : (
                <>
                    <Box sx={{
                        flex: 1,
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': { width: '6px' },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: theme.palette.divider,
                            borderRadius: '3px'
                        }
                    }}>
                        {cart.map((item) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Box sx={{
                                    display: 'flex',
                                    gap: 2,
                                    mb: 2,
                                    p: 1,
                                    borderRadius: 1,
                                    backgroundColor: alpha(theme.palette.primary.main, 0.05)
                                }}>
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

                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}>
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
                            </motion.div>
                        ))}
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ mb: 2 }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 1
                        }}>
                            <Typography>Subtotal:</Typography>
                            <Typography sx={{ fontWeight: 600 }}>
                                ₹{getTotalPrice()}
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            Shipping and taxes calculated at checkout
                        </Typography>
                    </Box>

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mb: 1 }}
                    >
                        Checkout
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={closeCart}
                    >
                        Continue Shopping
                    </Button>
                </>
            )}
        </Box>
    )
}