import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { jobTitle, company } = await request.json()

    if (!jobTitle) {
      return NextResponse.json({ error: 'Job title required' }, { status: 400 })
    }

    const Anthropic = (await import('@anthropic-ai/sdk')).default
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      system: `You are an expert in professional email marketing and B2B communication.
You generate email signature call-to-action button ideas.
ALWAYS respond with ONLY valid JSON — no explanation, no preamble, no markdown.
Return exactly this structure:
[
  { "text": "Button text under 6 words", "placeholder": "What URL to link to" },
  { "text": "Button text under 6 words", "placeholder": "What URL to link to" },
  { "text": "Button text under 6 words", "placeholder": "What URL to link to" }
]`,
      messages: [{
        role: 'user',
        content: `Job title: ${jobTitle}${company ? '\nCompany: ' + company : ''}

Generate 3 email signature CTAs. Make each one distinct in intent:
one for booking/scheduling, one for content/resources, one for direct action.
Tailor them specifically to this job role.`
      }]
    })

    const responseText = message.content[0].text.trim()

    let options
    try {
      options = JSON.parse(responseText)
    } catch {
      options = [
        { text: 'Book a free call', placeholder: 'Your Calendly or booking link' },
        { text: 'View our work', placeholder: 'Your portfolio or website' },
        { text: 'Get in touch', placeholder: 'Your contact page or email' },
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