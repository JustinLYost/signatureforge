import { NextResponse } from 'next/server'

const PRICES = {
  individual: 'price_1TVLz7IGRzB3Vb3xCH4DKuXo',
  team3:      'price_1TVM0YIGRzB3Vb3xYY12PR4T',
  business10: 'price_1TVM1kIGRzB3Vb3xbtTFs7hf',
}

export async function POST(request) {
  try {
    const { sig, tier = 'individual' } = await request.json()

    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    // Store sig in metadata — Stripe allows up to 500 chars per key
    // We split across multiple metadata keys if needed
    const sigJson = JSON.stringify(sig)
    const chunkSize = 490
    const chunks = {}
    const totalChunks = Math.ceil(sigJson.length / chunkSize)
    
    for (let i = 0; i < totalChunks; i++) {
      chunks[`sig_${i}`] = sigJson.slice(i * chunkSize, (i + 1) * chunkSize)
    }
    chunks['sig_total'] = String(totalChunks)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{ price: PRICES[tier], quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/builder`,
      metadata: chunks,
    })

    return NextResponse.json({ url: session.url })

  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}