'use client'
import { useState } from 'react'
import PageLayout from '../components/PageLayout'

const FAQS = [
  {
    q: 'Does this work in Outlook?',
    a: 'Yes. We generate a completely separate Outlook-safe HTML file using table-based layout with inline styles only. This is tested against Outlook 2016, 2019, 2021, and 365 desktop. Most free tools skip this — it is one of the main reasons we built SignatureForge.'
  },
  {
    q: 'Is this really a one-time payment?',
    a: 'Yes. $14, once. No monthly subscription, no account required, no watermark. You pay, you get your signature files, done.'
  },
  {
    q: 'Do I need an account to use this?',
    a: 'No account required to generate or purchase. After payment you receive a 30-day edit link that lets you return and adjust your signature without logging in.'
  },
  {
    q: 'What email clients does this support?',
    a: 'Gmail web, Gmail mobile (iOS and Android), Apple Mail, Outlook 2016, 2019, 2021, and 365 desktop, Outlook Web App (OWA), Thunderbird, and Yahoo Mail. We provide specific installation instructions for each.'
  },
  {
    q: 'How does the LinkedIn import work?',
    a: 'Paste your public LinkedIn profile URL and we fetch your name, job title, company, and profile photo automatically via API. This fills in your form in under 10 seconds. We do not store your LinkedIn data.'
  },
  {
    q: 'What is the brand color extraction?',
    a: 'Paste your company website URL and we take a screenshot, analyze the dominant colors, and apply them to your signature automatically. You can accept, adjust, or override any color.'

  },
  {
    q: 'What is the Smart CTA feature?',
    a: 'After entering your job title, click Generate CTA Ideas and AI will suggest three call-to-action options tailored to your role. A Sales Manager might get Book a 15-min call. A Designer might get View my portfolio. You pick one, enter your link, and it appears as a button in your signature.'
  },
  {
    q: 'Do I have to add a CTA?',
    a: 'No. The CTA is completely optional. The default is no CTA. You can also enter your own without using the AI suggestions.'
  },
  {
    q: 'Can I edit my signature after purchase?',
    a: 'Yes. After purchase you receive a 30-day edit link. Return to that URL at any time within 30 days to update your details, change colors, or switch templates.'
  },
  {
    q: 'Is this affiliated with LinkedIn or Microsoft?',
    a: 'No. SignatureForge is an independent tool and is not affiliated with, endorsed by, or connected to LinkedIn, Microsoft, or any other company.'
  },
  {
    q: 'What if I am not happy with my signature?',
    a: 'We offer a 30-day money-back guarantee. Email hello@signature-forge.com and we will refund you in full, no questions asked.'
  },
]
 
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className='border border-gray-200 rounded-xl overflow-hidden'>
      <button
        onClick={() => setOpen(o => !o)}
        className='w-full flex items-center justify-between px-5 py-4
                   text-left hover:bg-gray-50 transition-colors'
      >
        <span className='font-medium text-gray-800 pr-4'>{q}</span>
        <span className={`text-gray-400 transition-transform flex-shrink-0
          ${open ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>
      {open && (
        <div className='px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t
                        border-gray-100 pt-4'>
          {a}
        </div>
      )}
    </div>
  )
}
 
export default function FAQPage() {
  return (
    <PageLayout
      title='Frequently Asked Questions'
      subtitle='Everything you need to know about SignatureForge'
    >
      <div className='space-y-3 max-w-2xl'>
        {FAQS.map((item, i) => <FAQItem key={i} {...item} />)}
      </div>
      <div className='mt-10 p-6 bg-blue-50 rounded-xl border border-blue-100 max-w-2xl'>
        <p className='text-blue-800 text-sm'>
          Didn&apos;t find your answer?{' '}

          <a href='/contact' className='font-semibold hover:underline'>
            Contact us
          </a>{' '}
          and we will respond within one business day.
        </p>
      </div>
    </PageLayout>
  )
}


