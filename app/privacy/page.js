import PageLayout from '../components/PageLayout'
 
export const metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <PageLayout title='Privacy Policy' subtitle='Last updated: May 2026'>
      <div className='prose prose-gray max-w-none space-y-6 text-gray-600'>
 
        <p>SignatureForge (&quot;we&quot;, &quot;us&quot;) operates signature-forge.com.
        This policy explains what data we collect and how we use it.</p>
 
        <h2 className='text-lg font-bold text-gray-900'>Data we collect</h2>
        <ul className='space-y-2'>
          <li><strong>Payment information:</strong> Processed by Stripe.
          We never see or store your card number.</li>
          <li><strong>Email address:</strong> Collected by Stripe at checkout
          for receipt delivery only.</li>
          <li><strong>Signature content:</strong> Name, job title, company, photo,
          and other fields you enter. Stored temporarily (30 days) to enable
          edit links, then deleted.</li>
          <li><strong>LinkedIn data:</strong> If you use LinkedIn import, we fetch
          your public profile data via API. We do not store it after your session.
          </li>
          <li><strong>Usage data:</strong> Anonymous analytics via Plausible.
          No cookies. No personal data. GDPR-compliant by default.</li>
        </ul>
 
        <h2 className='text-lg font-bold text-gray-900'>Third-party services</h2>
        <ul className='space-y-2'>
          <li><strong>Stripe</strong> — payment processing (stripe.com/privacy)</li>
          <li><strong>Apify</strong> — LinkedIn data fetching (apify.com/privacy)</li>
          <li><strong>Browserless</strong> — website screenshots for color extraction</li>

          <li><strong>Anthropic</strong> — AI CTA generation (anthropic.com/privacy)</li>
          <li><strong>Plausible</strong> — privacy-first analytics (plausible.io/privacy)</li>
          <li><strong>Vercel</strong> — hosting (vercel.com/legal/privacy-policy)</li>
        </ul>
 
        <h2 className='text-lg font-bold text-gray-900'>Your rights</h2>
        <p>You may request deletion of any data we hold about you by emailing
        hello@signature-forge.com. We will respond within 5 business days.</p>
 
        <h2 className='text-lg font-bold text-gray-900'>Contact</h2>
        <p>Questions about this policy: <a href='mailto:hello@signature-forge.com'
           className='text-blue-600 hover:underline'>hello@signature-forge.com</a></p>
      </div>
    </PageLayout>
  )
}

