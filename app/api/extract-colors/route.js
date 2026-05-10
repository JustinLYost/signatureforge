import { NextResponse } from 'next/server'

// Extract hex colors from CSS text
function extractColorsFromCSS(cssText) {
  const hexPattern = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\b/g
  const rgbPattern = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g
  
  const colors = new Map()

  // Extract hex colors
  let match
  while ((match = hexPattern.exec(cssText)) !== null) {
    const hex = match[0].toLowerCase()
    // Skip near-white and near-black and grays
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    const isGray = Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && Math.abs(r - b) < 20
    const isWhite = r > 240 && g > 240 && b > 240
    const isBlack = r < 8 && g < 8 && b < 8
    if (!isGray && !isWhite && !isBlack) {
      colors.set(hex, (colors.get(hex) || 0) + 1)
    }
  }

  // Extract rgb colors and convert to hex
  while ((match = rgbPattern.exec(cssText)) !== null) {
    const r = parseInt(match[1])
    const g = parseInt(match[2])
    const b = parseInt(match[3])
    const isGray = Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && Math.abs(r - b) < 20
    const isWhite = r > 240 && g > 240 && b > 240
    const isBlack = r < 8 && g < 8 && b < 8
    if (!isGray && !isWhite && !isBlack) {
      const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
      colors.set(hex, (colors.get(hex) || 0) + 1)
    }
  }

  // Sort by frequency
  return Array.from(colors.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([hex]) => hex)
}

export async function POST(request) {
  try {
    const { websiteUrl } = await request.json()

    if (!websiteUrl) {
      return NextResponse.json({ error: 'Website URL required' }, { status: 400 })
    }

    // Fetch the HTML of the website
    const htmlRes = await fetch(websiteUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      signal: AbortSignal.timeout(8000),
    })

    if (!htmlRes.ok) {
      throw new Error('Could not fetch website')
    }

    const html = await htmlRes.text()
    let allColors = []

    // Extract inline styles and style tags from HTML
    const styleTagPattern = /<style[^>]*>([\s\S]*?)<\/style>/gi
    let styleMatch
    while ((styleMatch = styleTagPattern.exec(html)) !== null) {
      const colors = extractColorsFromCSS(styleMatch[1])
      allColors.push(...colors)
    }

    // Also extract colors directly from HTML (inline styles)
    const inlineColors = extractColorsFromCSS(html)
    allColors.push(...inlineColors)

    // Find CSS file links and fetch the main one
    const cssLinkPattern = /href=["']([^"']*\.css[^"']*)['"]/gi
    const cssLinks = []
    let linkMatch
    while ((linkMatch = cssLinkPattern.exec(html)) !== null) {
      cssLinks.push(linkMatch[1])
    }

    // Fetch up to 2 CSS files
    const baseUrl = new URL(websiteUrl)
    for (const link of cssLinks.slice(0, 2)) {
      try {
        const cssUrl = link.startsWith('http') ? link : `${baseUrl.origin}${link.startsWith('/') ? '' : '/'}${link}`
        const cssRes = await fetch(cssUrl, {
          signal: AbortSignal.timeout(5000),
        })
        if (cssRes.ok) {
          const cssText = await cssRes.text()
          const colors = extractColorsFromCSS(cssText)
          allColors.push(...colors)
        }
      } catch {
        // Skip failed CSS files
      }
    }

    // Deduplicate and get top colors
    const colorCounts = new Map()
    allColors.forEach(color => {
      colorCounts.set(color, (colorCounts.get(color) || 0) + 1)
    })

    const topColors = Array.from(colorCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([hex]) => hex)
      .slice(0, 5)

    if (topColors.length === 0) {
      return NextResponse.json({
        error: 'Could not extract colors from this site. Enter them manually.'
      }, { status: 404 })
    }

   // Filter out colors too similar to primary
    const primary = topColors[0]
    const filteredSecondary = topColors.slice(1).find(hex => {
      const r1 = parseInt(primary.slice(1, 3), 16)
      const g1 = parseInt(primary.slice(3, 5), 16)
      const b1 = parseInt(primary.slice(5, 7), 16)
      const r2 = parseInt(hex.slice(1, 3), 16)
      const g2 = parseInt(hex.slice(3, 5), 16)
      const b2 = parseInt(hex.slice(5, 7), 16)
      const diff = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2)
      return diff > 60
    }) || '#1A2E4A'

    return NextResponse.json({
      success: true,
      primary: topColors[0],
      secondary: filteredSecondary,
      palette: topColors,
    })

  } catch (error) {
    console.error('Color extraction error:', error)
    return NextResponse.json(
      { error: 'Color extraction failed. Enter your brand colors manually.' },
      { status: 500 }
    )
  }
}