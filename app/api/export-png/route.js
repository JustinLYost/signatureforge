import { NextResponse } from 'next/server'
import { generateGmailHTML } from '@/lib/htmlGenerators'
 
export async function POST(request) {
  try {
    const { sig } = await request.json()
    const html = generateGmailHTML(sig)
 
    // Use Browserless to render and screenshot the HTML
    const res = await fetch(
      `https://chrome.browserless.io/screenshot?token=${process.env.BROWSERLESS_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html,
          options: {
            type: 'png',
            fullPage: true,
          },
          viewport: { width: 600, height: 200, deviceScaleFactor: 2 },
        }),

      }
    )
 
    if (!res.ok) throw new Error('Screenshot failed')
 
    const buffer = await res.arrayBuffer()
 
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename=signature.png',
      }
    })
 
  } catch (error) {
    console.error('PNG export error:', error)
    return NextResponse.json({ error: 'PNG generation failed' }, { status: 500 })
  }
}

