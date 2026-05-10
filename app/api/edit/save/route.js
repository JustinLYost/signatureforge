import { NextResponse } from 'next/server'
import { updateSignature, getSignature } from '@/lib/editTokens'

export async function POST(request) {
  try {
    const { token, sig } = await request.json()

    if (!token || !sig) {
      return NextResponse.json(
        { error: 'Token and signature data are required' },
        { status: 400 }
      )
    }

    // Verify the token is valid and not expired before saving
    const check = await getSignature(token)

    if (check.error) {
      return NextResponse.json(
        { error: check.error },
        { status: 403 }
      )
    }

    // Save the updated signature data
    const success = await updateSignature(token, sig)

    if (!success) {
      return NextResponse.json(
        { error: 'Save failed — token may be invalid' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Signature saved successfully',
    })

  } catch (error) {
    console.error('Edit save error:', error)
    return NextResponse.json(
      { error: 'Save failed' },
      { status: 500 }
    )
  }
}