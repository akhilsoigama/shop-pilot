import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16'
})

export async function POST(request) {
    try {
        const { items, customerEmail } = await request.json()

        // Validate input
        if (!items || !Array.isArray(items) || items.length === 0) {
            return Response.json(
                { error: 'Invalid items data' },
                { status: 400 }
            )
        }

        if (!customerEmail || typeof customerEmail !== 'string' || !/^\S+@\S+\.\S+$/.test(customerEmail)) {
            return Response.json(
                { error: 'Valid customer email is required' },
                { status: 400 }
            )
        }

        // Prepare line items with strict rounding
        const lineItems = items.map(item => {
            // Validate required fields
            if (!item.price_data || !item.price_data.product_data || !item.price_data.currency) {
                throw new Error('Invalid item structure')
            }

            // Convert price to integer paise and ensure it's a whole number
            const unit_amount = Math.round(Number(item.price_data.unit_amount))
            
            if (isNaN(unit_amount)) {
                throw new Error('Invalid price amount')
            }

            const productData = {
                name: item.price_data.product_data.name || 'Product',
                ...(item.price_data.product_data.description && {
                    description: item.price_data.product_data.description
                }),
                images: item.price_data.product_data.images || [],
                metadata: item.price_data.product_data.metadata || {}
            };

            return {
                price_data: {
                    currency: item.price_data.currency.toLowerCase() || 'inr',
                    product_data: productData,
                    unit_amount: unit_amount, // Using the rounded value
                },
                quantity: item.quantity || 1,
            }
        })

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart?canceled=true`,
            customer_email: customerEmail,
            shipping_address_collection: {
                allowed_countries: ['IN', 'US', 'GB']
            },
            metadata: {
                order_reference: `ORDER-${Date.now()}`,
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'inr',
                        },
                        display_name: 'Free shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 5,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 7,
                            },
                        },
                    },
                },
            ],
        })

        return Response.json({
            success: true,
            sessionId: session.id,
            url: session.url
        })

    } catch (err) {
        console.error('Stripe error:', err)
        return Response.json(
            {
                success: false,
                error: err.message || 'Failed to create checkout session',
                ...(err.type && { errorType: err.type }),
                ...(err.code && { errorCode: err.code })
            },
            { status: err.statusCode || 500 }
        )
    }
}