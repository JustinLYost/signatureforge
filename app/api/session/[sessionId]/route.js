import { NextResponse } from 'next/server'
import { getSignatureBySession } from '@/lib/editTokens'

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

    const result = await getSignatureBySession(sessionId)

    if (!result) {
      return NextResponse.json(
        { error: 'Signature data not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      sig: result.sig,
      editToken: result.token,
    })

  } catch (error) {
    console.error('Session lookup error:', error)
    return NextResponse.json({ error: 'Lookup failed' }, { status: 500 })
  }
}