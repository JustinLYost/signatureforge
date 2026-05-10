import { NextResponse } from 'next/server'
import Stripe from 'stripe'
 
const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY)
 
// Price IDs — create these in your Stripe dashboard first
const PRICES = {
  individual: 'price_1TVLz7IGRzB3Vb3xCH4DKuXo',  // $14 one-time
  team3:      'price_1TVM0YIGRzB3Vb3xYY12PR4T',  // $39 one-time
  business10: 'price_1TVM1kIGRzB3Vb3xbtTFs7hf',  // $69 one-time
}
 
export async function POST(request) {
  try {
    const { sig, tier = 'individual' } = await request.json()
 
    // Store sig data in metadata (Stripe limit: 500 chars per key)
    // For large signature objects, store in your DB and pass an ID instead
    const sigJson = JSON.stringify(sig)
 
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{ price: PRICES[tier], quantity: 1 }],

      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      metadata: {
        // Store compressed sig data as metadata
        // If sig is too large, store in Vercel KV or similar and pass a key
        sigData: sigJson.length < 450 ? sigJson : 'LARGE',
        tier,
      },
    })
 
    // If sig is too large for metadata, save it server-side
    if (sigJson.length >= 450) {
      // Save to a temporary store keyed by session ID
      // See Section 5.8 for the edit token storage system
      await saveTempSig(session.id, sig)
    }
 
    return NextResponse.json({ url: session.url })
 
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
 
// Temporary storage using a JSON file (fine for low volume)
// Replace with Vercel KV or Upstash Redis for higher volume
async function saveTempSig(sessionId, sig) {
  const fs = await import('fs/promises')
  const path = await import('path')
  const file = path.join(process.cwd(), 'tmp', 'sigs.json')
  let store = {}
  try { store = JSON.parse(await fs.readFile(file, 'utf8')) } catch {}
  store[sessionId] = sig
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, JSON.stringify(store))
}

