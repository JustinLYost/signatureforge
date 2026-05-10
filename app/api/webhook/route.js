import { NextResponse } from 'next/server'
import { saveSignature } from '@/lib/editTokens'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  const Stripe = (await import('stripe')).default
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const metadata = session.metadata

    try {
      // Reconstruct sig from chunks
      const totalChunks = parseInt(metadata.sig_total || '0')
      let sigJson = ''
      for (let i = 0; i < totalChunks; i++) {
        sigJson += metadata[`sig_${i}`] || ''
      }

      if (sigJson) {
        const sig = JSON.parse(sigJson)
        await saveSignature(session.id, sig)
      }
    } catch (err) {
      console.error('Failed to parse sig from metadata:', err)
    }
  }

  return NextResponse.json({ received: true })
}