import { NextResponse } from 'next/server'
import Vibrant from 'node-vibrant'
 
export async function POST(request) {
  try {
    const { websiteUrl } = await request.json()
 
    if (!websiteUrl) {
      return NextResponse.json({ error: 'Website URL required' }, { status: 400 })
    }
 
    // Take a screenshot using Browserless.io REST API
    const screenshotRes = await fetch(
      `https://chrome.browserless.io/screenshot?token=${process.env.BROWSERLESS_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: websiteUrl,
          options: {
            fullPage: false,
            type: 'jpeg',
            quality: 80,
          },
          viewport: { width: 1280, height: 800 },
        }),
      }
    )
 
    if (!screenshotRes.ok) {
      throw new Error('Screenshot failed')
    }
 
    // Get screenshot as buffer

    const imageBuffer = Buffer.from(await screenshotRes.arrayBuffer())
 
    // Extract color palette using node-vibrant
    const palette = await Vibrant.from(imageBuffer).getPalette()
 
    // Build color results — filter out null swatches
    const colors = []
    const swatches = ['Vibrant', 'DarkVibrant', 'Muted', 'DarkMuted', 'LightVibrant']
 
    swatches.forEach(name => {
      if (palette[name]) {
        const hex = palette[name].hex
        // Skip near-white and near-black
        if (hex !== '#ffffff' && hex !== '#000000') {
          colors.push({ name, hex, population: palette[name].population })
        }
      }
    })
 
    // Sort by population (most dominant first)
    colors.sort((a, b) => b.population - a.population)
 
    if (colors.length === 0) {
      return NextResponse.json({
        error: 'Could not extract colors from this site. Try entering colors manually.'
      }, { status: 404 })
    }
 
    return NextResponse.json({
      success: true,
      primary: colors[0]?.hex || '#2563EB',
      secondary: colors[1]?.hex || '#1A2E4A',
      palette: colors.slice(0, 5).map(c => c.hex),
    })
 
  } catch (error) {
    console.error('Color extraction error:', error)
    return NextResponse.json(
      { error: 'Color extraction failed. Enter your brand colors manually.' },
      { status: 500 }
    )
  }
}

