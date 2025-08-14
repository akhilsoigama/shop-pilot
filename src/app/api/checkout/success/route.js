import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
})

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Session ID is required'
    }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer']
    })

    if (!session || session.payment_status !== 'paid') {
      throw new Error('Payment not completed')
    }

    return new Response(JSON.stringify({
      success: true,
      order: {
        id: session.id,
        amount_total: session.amount_total,
        customer_details: session.customer_details,
        shipping_details: session.shipping_details,
        line_items: session.line_items
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    console.error('Payment verification error:', err)
    return new Response(JSON.stringify({
      success: false,
      error: err.message || 'Failed to verify payment'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}