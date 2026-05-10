import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { linkedinUrl } = await request.json()

    if (!linkedinUrl || !linkedinUrl.includes('linkedin.com/in/')) {
      return NextResponse.json(
        { error: 'Please enter a valid LinkedIn profile URL' },
        { status: 400 }
      )
    }

    const res = await fetch(
      `https://fresh-linkedin-profile-data-api.p.rapidapi.com/api/profile?username=${encodeURIComponent(linkedinUrl)}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': process.env.RAPIDAPI_KEY,
          'x-rapidapi-host': 'fresh-linkedin-profile-data-api.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await res.json()

    // Log the full response so we can see the field names
    console.log('RapidAPI full response:', JSON.stringify(data, null, 2))

    if (!data || data.error) {
      return NextResponse.json(
        { error: 'Could not fetch profile.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, profile: {}, raw: data })

  } catch (error) {
    console.error('LinkedIn import error:', error)
    return NextResponse.json(
      { error: 'Import failed.' },
      { status: 500 }
    )
  }
}