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

    if (!res.ok) {
      throw new Error(`RapidAPI error: ${res.status}`)
    }

    const data = await res.json()

    if (!data || data.error) {
      return NextResponse.json(
        { error: 'Could not fetch profile. Make sure the URL is public.' },
        { status: 404 }
      )
    }

    const result = {
      firstName: data.first_name || data.firstName || '',
      lastName: data.last_name || data.lastName || '',
      jobTitle: data.headline || data.title || '',
      company: data.company || data.current_company?.name || '',
      photoUrl: data.profile_image_url || data.photo || data.avatar || '',
      social: {
        linkedin: linkedinUrl,
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