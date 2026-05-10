import { NextResponse } from 'next/server'

const PRICES = {
  individual: 'price_xxxxxxxxxxxx',
  team3:      'price_xxxxxxxxxxxx',
  business10: 'price_xxxxxxxxxxxx',
}

export async function POST(request) {
  try {
    const { sig, tier = 'individual' } = await request.json()

    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const sigJson = JSON.stringify(sig)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{ price: PRICES[tier], quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/builder`,
      metadata: {
        sigData: sigJson.length < 450 ? sigJson : 'LARGE',
        tier,
      },
    })

    if (sigJson.length >= 450) {
      await saveTempSig(session.id, sig)
    }

    return NextResponse.json({ url: session.url })

  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}

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