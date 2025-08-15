'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Box, Typography, Button, Chip, Divider } from '@mui/material'
import { CheckCircle, LocalShipping, Email } from '@mui/icons-material'
import { useCart } from '@/context/cartContext'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import { toast } from 'sonner'

export default function SuccessPage() {
    const theme = useTheme()
    const searchParams = useSearchParams()
    const sessionId = searchParams.get('session_id')
    const [orderDetails, setOrderDetails] = useState(null)
    const { clearCart } = useCart()

useEffect(() => {
    if (sessionId) {
        axios.get(`/api/verify-payment`, {
            params: {
                session_id: sessionId
            }
        })
        .then(response => {
            if (response.data.success) {
                setOrderDetails(response.data.order);
                clearCart();
            }
        })
        .catch(error => {
            toast.error('Error verifying payment:', error);
        });
    }
}, [sessionId, clearCart]);

    return (
        <Box sx={{
            maxWidth: 800,
            mx: 'auto',
            p: 3,
            textAlign: 'center'
        }}>
            <Box sx={{ mb: 4 }}>
                <CheckCircle sx={{
                    fontSize: 80,
                    color: theme.palette.success.main,
                    mb: 2
                }} />
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
                    Order Confirmed!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Thank you for your purchase
                </Typography>
            </Box>

            {orderDetails && (
                <Box sx={{
                    bgcolor: theme.palette.background.paper,
                    borderRadius: 2,
                    p: 3,
                    boxShadow: theme.shadows[1],
                    textAlign: 'left',
                    mb: 4
                }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                        Order Summary
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Order ID:</Typography>
                        <Typography variant="body2" fontWeight={600}>{orderDetails.id}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Date:</Typography>
                        <Typography variant="body2">{new Date(orderDetails.created * 1000).toLocaleString()}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Total:</Typography>
                        <Typography variant="body2" fontWeight={600}>₹{(orderDetails.amount_total / 100).toLocaleString()}</Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <LocalShipping fontSize="small" />
                        <Typography variant="body2">Shipping to: {orderDetails.shipping?.address?.line1}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Email fontSize="small" />
                        <Typography variant="body2">Email: {orderDetails.customer_details?.email}</Typography>
                    </Box>
                </Box>
            )}
            <Link href='/'>
                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        borderRadius: 6,
                        px: 5,
                        py: 1.5,
                        fontWeight: 600,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                    }}
                >
                    Continue Shopping
                </Button>
            </Link>
        </Box>
    )
}