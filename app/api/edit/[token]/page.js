import { NextResponse } from 'next/server'
import { getSignature, updateSignature } from '@/lib/editTokens'

export async function GET(request, context) {
  try {
    const { token } = await context.params
    const result = await getSignature(token)
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 404 })
    }
    return NextResponse.json({ sig: result.sig, expiresAt: result.expiresAt })
  } catch (error) {
    console.error('Edit GET error:', error)
    return NextResponse.json({ error: 'Load failed' }, { status: 500 })
  }
}

export async function PATCH(request, context) {
  try {
    const { token } = await context.params
    const { sig } = await request.json()
    if (!sig) {
      return NextResponse.json({ error: 'No signature data provided' }, { status: 400 })
    }
    const check = await getSignature(token)
    if (check.error) {
      return NextResponse.json({ error: check.error }, { status: 403 })
    }
    const success = await updateSignature(token, sig)
    if (!success) {
      return NextResponse.json({ error: 'Update failed' }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Edit PATCH error:', error)
    return NextResponse.json({ error: 'Save failed' }, { status: 500 })
  }
}