import PageLayout from '../components/PageLayout'
 
export const metadata = { title: 'Refund Policy' }
 
export default function RefundsPage() {
  return (
    <PageLayout title='Refund Policy' subtitle='30-day money-back guarantee'>
      <div className='prose prose-gray max-w-none space-y-6 text-gray-600'>
 
        <div className='bg-green-50 border border-green-100 rounded-xl p-6'>
          <h2 className='text-lg font-bold text-green-800 mb-2'>
            30-day money-back guarantee
          </h2>
          <p className='text-green-700'>
            If you are not satisfied with SignatureForge for any reason,
            email us within 30 days of purchase for a full refund. No questions asked.

          </p>
        </div>
 
        <h2 className='text-lg font-bold text-gray-900'>How to request a refund</h2>
        <ol className='space-y-2'>
          <li>Email <a href='mailto:hello@signature-forge.com'
             className='text-blue-600 hover:underline'>hello@signature-forge.com</a>
             with your order confirmation email or Stripe receipt.</li>
          <li>Include &quot;Refund Request&quot; in the subject line.</li>
          <li>We will process your refund within 5 business days.</li>
          <li>Stripe typically returns funds to your card within 3-10 business days.</li>
        </ol>
 
        <h2 className='text-lg font-bold text-gray-900'>Eligibility</h2>
        <p>Refund requests must be submitted within 30 days of the purchase date.
        Requests after 30 days will be considered on a case-by-case basis.</p>
      </div>
    </PageLayout>
  )
}

