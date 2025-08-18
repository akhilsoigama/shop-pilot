'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Box, Typography, CircularProgress, Button, Alert } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { loadStripe } from '@stripe/stripe-js'
import { toast } from 'sonner'

export default function CheckoutPage() {
  const theme = useTheme()
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')

  const sessionId = params?.sessionId
  console.log(sessionId, 'Session ID from params')
  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      setErrorMessage('Invalid checkout session')
      toast.error('Missing session ID')
      router.push('/')
      return
    }

    const paymentStatus = searchParams.get('payment_status')
    if (paymentStatus === 'success') {
      toast.success('Payment completed successfully!')
      router.replace('/yourOrder')
    } else if (paymentStatus === 'failed') {
      setStatus('error')
      setErrorMessage('Payment failed. Please try again.')
      toast.error('Payment failed')
    }
  }, [sessionId, searchParams, router])

  useEffect(() => {
    if (!sessionId) return

    const redirectToStripe = async () => {
      try {
        setStatus('loading')
        
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
        if (!stripe) {
          throw new Error('Payment system failed to initialize')
        }

        setStatus('redirecting')
        
        const { error } = await stripe.redirectToCheckout({ 
          sessionId: sessionId 
        })

        if (error) {
          throw error
        }
      } catch (err) {
        console.error('Stripe redirect error:', err)
        setStatus('error')
        setErrorMessage(
          err.message || 'Failed to process payment. Please try again.'
        )
        toast.error('Payment processing failed')
      }
    }

    if (status === 'loading') {
      redirectToStripe()
    }
  }, [sessionId, status])

  const handleRetry = () => {
    if (sessionId) {
      setStatus('loading')
      setErrorMessage('')
    } else {
      router.push('/')
    }
  }

  if (!sessionId) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        textAlign: 'center',
        p: 3
      }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Invalid checkout session
        </Alert>
        <Button 
          variant="contained"
          href="/"
          sx={{ borderRadius: 2, px: 4 }}
        >
          Back to Home
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      textAlign: 'center',
      p: 3,
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      {status === 'error' ? (
        <>
          <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
            {errorMessage}
          </Alert>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="contained"
              onClick={handleRetry}
              sx={{ borderRadius: 2, px: 4 }}
              disabled={!sessionId}
            >
              Try Again
            </Button>
            <Button 
              variant="outlined" 
              href="/"
              sx={{ borderRadius: 2, px: 4 }}
            >
              Back to Home
            </Button>
          </Box>
        </>
      ) : (
        <>
          <CircularProgress 
            size={60} 
            sx={{ mb: 3 }} 
            color={status === 'redirecting' ? 'success' : 'primary'}
          />
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            {status === 'redirecting' 
              ? 'Redirecting to Secure Payment...' 
              : 'Preparing Your Checkout...'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {status === 'redirecting'
              ? 'You will be redirected to our secure payment processor.'
              : 'Please wait while we prepare your payment details.'}
          </Typography>
          <Button 
            variant="outlined" 
            href="/"
            sx={{ borderRadius: 2, px: 4 }}
          >
            Cancel and Return to Cart
          </Button>
        </>
      )}
    </Box>
  )
}