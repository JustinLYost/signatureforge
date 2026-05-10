import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { jobTitle, company } = await request.json()

    if (!jobTitle) {
      return NextResponse.json({ error: 'Job title required' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    console.log('API key present:', !!apiKey)
    console.log('API key prefix:', apiKey?.slice(0, 15))

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 300,
        system: `You generate email signature CTAs. Respond with ONLY valid JSON, no markdown.
Return exactly: [{"text":"under 6 words","placeholder":"what URL to use"},{"text":"under 6 words","placeholder":"what URL to use"},{"text":"under 6 words","placeholder":"what URL to use"}]`,
        messages: [{
          role: 'user',
          content: `Job title: ${jobTitle}${company ? ', Company: ' + company : ''}. Generate 3 distinct CTAs.`
        }]
      })
    })

    const data = await response.json()
    console.log('Anthropic response status:', response.status)

    if (!response.ok) {
      console.error('Anthropic error:', data)
      throw new Error(data.error?.message || 'Anthropic API failed')
    }

    const responseText = data.content[0].text.trim()

    let options
    try {
      options = JSON.parse(responseText)
    } catch {
      options = [
        { text: 'Book a free call', placeholder: 'Your Calendly link' },
        { text: 'View our work', placeholder: 'Your portfolio URL' },
        { text: 'Get in touch', placeholder: 'Your contact page' },
      ]
    }

    return NextResponse.json({ success: true, options })

  } catch (error) {
    console.error('CTA generation error:', error)
    return NextResponse.json(
      { error: 'Could not generate suggestions. Try again or enter your own.' },
      { status: 500 }
    )
  }
}