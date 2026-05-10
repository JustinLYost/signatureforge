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

    // Initialize Apify client at request time, not module level
    const { ApifyClient } = await import('apify-client')
    const client = new ApifyClient({ token: process.env.APIFY_API_TOKEN })

    const run = await client.actor('curious_coder/linkedin-profile-scraper').call({
  profileUrls: [linkedinUrl],
  proxyConfiguration: { useApifyProxy: true },
})

    const { items } = await client.dataset(run.defaultDatasetId).listItems()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Could not fetch profile. Make sure the URL is public.' },
        { status: 404 }
      )
    }

    const profile = items[0]

    const result = {
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      jobTitle: profile.headline || '',
      company: profile.positions?.[0]?.companyName || '',
      photoUrl: profile.profilePicture || '',
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