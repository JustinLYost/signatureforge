import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    const { sessionId } = params

    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session || session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not confirmed' },
        { status: 403 }
      )
    }

    // Reconstruct sig directly from Stripe metadata chunks
    const metadata = session.metadata
    const totalChunks = parseInt(metadata?.sig_total || '0')

    if (totalChunks === 0) {
      return NextResponse.json(
        { error: 'Signature data not found' },
        { status: 404 }
      )
    }

    let sigJson = ''
    for (let i = 0; i < totalChunks; i++) {
      sigJson += metadata[`sig_${i}`] || ''
    }

    const sig = JSON.parse(sigJson)

    // Generate a simple edit token based on session ID
    const editToken = Buffer.from(sessionId).toString('base64url')

    return NextResponse.json({ sig, editToken })

  } catch (error) {
    console.error('Session lookup error:', error)
    return NextResponse.json({ error: 'Lookup failed' }, { status: 500 })
  }
}