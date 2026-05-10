import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getSignatureBySession } from '@/lib/editTokens'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function GET(request, { params }) {
  try {
    const { sessionId } = params

    // Verify the session exists and was paid
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session || session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not confirmed' },
        { status: 403 }
      )
    }

    // Look up the stored signature and edit token
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