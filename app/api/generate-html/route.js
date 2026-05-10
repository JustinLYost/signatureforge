import { NextResponse } from 'next/server'
import { generateGmailHTML, generateOutlookHTML } from '@/lib/htmlGenerators'
 
export async function POST(request) {
  try {
    const { sig } = await request.json()
    const gmailHTML = generateGmailHTML(sig)
    const outlookHTML = generateOutlookHTML(sig)
    return NextResponse.json({ success: true, gmailHTML, outlookHTML })
  } catch (error) {
    console.error('HTML generation error:', error)
    return NextResponse.json({ error: 'HTML generation failed' }, { status: 500 })
  }
}

