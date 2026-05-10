import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { linkedinUrl } = await request.json()

    if (!linkedinUrl) {
      return NextResponse.json(
        { error: 'Please enter a LinkedIn profile URL or username' },
        { status: 400 }
      )
    }

    // Extract username whether they paste full URL or just the username
    let username = linkedinUrl.trim()
    if (username.includes('linkedin.com/in/')) {
      username = username.split('linkedin.com/in/')[1].replace(/\//g, '').trim()
    }

    if (!username) {
      return NextResponse.json(
        { error: 'Could not extract username from URL' },
        { status: 400 }
      )
    }

    const res = await fetch(
      `https://fresh-linkedin-profile-data-api.p.rapidapi.com/api/profile?username=${encodeURIComponent(username)}`,
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
    console.log('RapidAPI response:', JSON.stringify(data, null, 2))

    if (!data?.success || !data?.data) {
      return NextResponse.json(
        { error: 'Could not fetch profile. Make sure the URL is public.' },
        { status: 404 }
      )
    }

    const p = data.data

    // Split fullName into first and last
    const nameParts = (p.fullName || '').split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    const result = {
      firstName,
      lastName,
      jobTitle: p.headline || '',
      company: p.positions?.[0]?.companyName || '',
      photoUrl: p.profilePicture || '',
      social: {
        linkedin: p.profileUrl || linkedinUrl,
      }
    }

    return NextResponse.json({ success: true, profile: result })

  } catch (error) {
    console.error('LinkedIn import error:', error)
    return NextResponse.json(
      { error: 'Import failed. Please fill in your details manually.' },
      { status: 500 }
    )
  }
}