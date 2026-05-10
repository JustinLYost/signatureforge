import PageLayout from '../components/PageLayout'
 
export const metadata = { title: 'Terms of Service' }
 
export default function TermsPage() {
  return (
    <PageLayout title='Terms of Service' subtitle='Last updated: May 2026'>

      <div className='prose prose-gray max-w-none space-y-6 text-gray-600'>
 
        <p>By using SignatureForge you agree to these terms. If you do not agree,
        please do not use the service.</p>
 
        <h2 className='text-lg font-bold text-gray-900'>The service</h2>
        <p>SignatureForge provides an AI-powered email signature generation tool.
        You pay once and receive HTML and image outputs for personal and commercial use.</p>
 
        <h2 className='text-lg font-bold text-gray-900'>Acceptable use</h2>
        <ul className='space-y-2'>
          <li>You may use your generated signature for any lawful purpose.</li>
          <li>You may not use the service to impersonate another person or entity.</li>
          <li>You may not attempt to reverse-engineer, scrape, or abuse the API.</li>
          <li>You may not resell or redistribute the generated HTML as a standalone product.</li>
        </ul>
 
        <h2 className='text-lg font-bold text-gray-900'>Payment</h2>
        <p>Payments are processed by Stripe. Prices are listed in USD.
        See our <a href='/refunds' className='text-blue-600 hover:underline'>
        Refund Policy</a> for return terms.</p>
 
        <h2 className='text-lg font-bold text-gray-900'>Limitation of liability</h2>
        <p>SignatureForge is provided as-is. We are not liable for rendering
        differences between email clients, indirect damages, or losses arising
        from use of the service. Our maximum liability is limited to the amount
        you paid for the service.</p>
 
        <h2 className='text-lg font-bold text-gray-900'>Governing law</h2>
        <p>These terms are governed by the laws of the State of Wisconsin, USA.</p>

        <h2 className='text-lg font-bold text-gray-900'>Contact</h2>
        <p><a href='mailto:hello@signature-forge.com'
             className='text-blue-600 hover:underline'>hello@signature-forge.com</a></p>
      </div>
    </PageLayout>
  )
}

