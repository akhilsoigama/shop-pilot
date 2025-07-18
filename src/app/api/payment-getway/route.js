import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
    try {
        const { items } = await req.json()
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || '/';
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items,
            mode: 'payment',
            success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${appUrl}/cancel`
        })
        return new Response(JSON.stringify({ sessionId: session.id }), {
            status: 200,
            headers: { 'Content-Typr': 'application/json' }
        })
    } catch (err) {
        return new Response(JSON.stringify({ err: err.massage }),{
            status:500,
            headers:{'Content-Type':'application/json'}
        })
    }
}
