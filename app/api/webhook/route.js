import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { saveSignature } from '@/lib/editTokens'

export const dynamic = 'force-dynamic' 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
 
// CRITICAL: disable body parsing for webhooks


 
export async function POST(request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')
 
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
 
    // Retrieve the signature data
    let sig
    if (session.metadata.sigData && session.metadata.sigData !== 'LARGE') {
      sig = JSON.parse(session.metadata.sigData)
    } else {
      // Load from temp storage if too large for metadata
      sig = await loadTempSig(session.id)
    }
 
    if (sig) {
      // Save with a 30-day edit token
      await saveSignature(session.id, sig)
    }
  }
 
  return NextResponse.json({ received: true })
}
 
async function loadTempSig(sessionId) {
  const fs = await import('fs/promises')
  const path = await import('path')
  const file = path.join(process.cwd(), 'tmp', 'sigs.json')
  try {
    const store = JSON.parse(await fs.readFile(file, 'utf8'))
    return store[sessionId] || null
  } catch { return null }
}

