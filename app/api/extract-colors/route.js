import { NextResponse } from 'next/server'

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
          options: { fullPage: false, type: 'jpeg', quality: 80 },
          viewport: { width: 1280, height: 800 },
        }),
      }
    )

    if (!screenshotRes.ok) {
      throw new Error('Screenshot failed')
    }

    const imageBuffer = Buffer.from(await screenshotRes.arrayBuffer())

    // Dynamically import node-vibrant (v4 requires this)
    const { Vibrant } = await import('node-vibrant/node')
    const palette = await Vibrant.from(imageBuffer).getPalette()

    const colors = []
    const swatches = ['Vibrant', 'DarkVibrant', 'Muted', 'DarkMuted', 'LightVibrant']

    swatches.forEach(name => {
      if (palette[name]) {
        const hex = palette[name].hex
        if (hex !== '#ffffff' && hex !== '#000000') {
          colors.push({ name, hex, population: palette[name].population })
        }
      }
    })

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