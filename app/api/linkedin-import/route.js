import { NextResponse } from 'next/server'
import { ApifyClient } from 'apify-client'
 
const client = new ApifyClient({ token: process.env.APIFY_API_TOKEN })
 
export async function POST(request) {
  try {
    const { linkedinUrl } = await request.json()
 
    if (!linkedinUrl || !linkedinUrl.includes('linkedin.com/in/')) {
      return NextResponse.json(
        { error: 'Please enter a valid LinkedIn profile URL' },
        { status: 400 }
      )
    }
 
    // Run the Apify LinkedIn Scraper actor
    // Actor ID: 'apify/linkedin-profile-scraper'
    const run = await client.actor('apify/linkedin-profile-scraper').call({
      profileUrls: [linkedinUrl],
    })
 
    // Fetch results from the dataset
    const { items } = await client.dataset(run.defaultDatasetId).listItems()
 
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Could not fetch profile. Make sure the URL is public.' },
        { status: 404 }
      )
    }
 
    const profile = items[0]
 
    // Extract and return only the fields we need
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

