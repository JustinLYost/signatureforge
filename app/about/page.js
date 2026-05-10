import PageLayout from '../components/PageLayout'
 
export const metadata = {
  title: 'About SignatureForge',
  description: 'Veteran-built AI email signature generator. One-time price, no subscription.',

}
 
export default function AboutPage() {
  return (
    <PageLayout
      title='About SignatureForge'
      subtitle='Built by a veteran out of genuine frustration'
    >
      <div className='prose prose-gray max-w-none space-y-6'>
        <div className='bg-blue-50 rounded-xl p-6 border border-blue-100'>
          <p className='text-blue-800 text-base leading-relaxed'>
            SignatureForge was built because every existing email signature
            tool either charged a monthly subscription for something you
            set up once, or output HTML that immediately broke in Outlook.
            We fixed both problems.
          </p>
        </div>
 
        <h2 className='text-xl font-bold text-gray-900'>What we built</h2>
        <p className='text-gray-600 leading-relaxed'>
          SignatureForge is an AI-powered email signature generator that
          produces professional, fully branded signatures in under 60 seconds.
          Paste your LinkedIn URL and we import your name, title, company,
          and photo automatically. Paste your website URL and we extract your
          brand colors. Tell us your job title and AI writes three targeted
          CTA options tailored to your role.
        </p>
 
        <h2 className='text-xl font-bold text-gray-900'>
          What makes it different
        </h2>
        <ul className='space-y-3 text-gray-600'>
          <li className='flex gap-3'>
            <span className='text-blue-600 font-bold flex-shrink-0'>01</span>

            <span><strong>One-time price.</strong> $14, once. No monthly bill.
            No subscription. No watermark.</span>
          </li>
          <li className='flex gap-3'>
            <span className='text-blue-600 font-bold flex-shrink-0'>02</span>
            <span><strong>Outlook-safe output.</strong> We generate a completely
            separate table-based HTML version that actually works in Outlook 2016,
            2019, 2021, and 365. No other free tool does this correctly.</span>
          </li>
          <li className='flex gap-3'>
            <span className='text-blue-600 font-bold flex-shrink-0'>03</span>
            <span><strong>AI features that save real time.</strong> LinkedIn import,
            brand color extraction, and smart CTA generation. Two URL pastes and
            you're done.</span>
          </li>
        </ul>
 
        <h2 className='text-xl font-bold text-gray-900'>About the founder</h2>
        <p className='text-gray-600 leading-relaxed'>
          SignatureForge is a veteran-owned business.
          Questions? Email us at{' '}
          <a href='mailto:hello@signature-forge.com'
             className='text-blue-600 hover:underline'>
            hello@signature-forge.com
          </a>
          . We respond within one business day.
        </p>
      </div>
    </PageLayout>
  )
}

