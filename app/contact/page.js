'use client'
import { useState } from 'react'
import PageLayout from '../components/PageLayout'
 
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // Simple mailto fallback — replace with Resend/Postmark API for production
    window.location.href =
      `mailto:hello@signature-forge.com?subject=Message from ${form.name}` +
      `&body=${encodeURIComponent(form.message + '\n\nFrom: ' + form.email)}`
    setStatus('sent')
  }
 
  return (
    <form onSubmit={handleSubmit} className='space-y-4 max-w-lg'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
        <input type='text' required value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className='w-full px-3 py-2 border border-gray-200 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500' />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
        <input type='email' required value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className='w-full px-3 py-2 border border-gray-200 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500' />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Message</label>
        <textarea required rows={5} value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className='w-full px-3 py-2 border border-gray-200 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none' />
      </div>
      <button type='submit' disabled={status === 'sending'}
        className='px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white
                   font-medium rounded-lg transition-colors disabled:opacity-50'>
        {status === 'sending' ? 'Sending...' : 'Send message'}
      </button>
      {status === 'sent' && (
        <p className='text-green-600 text-sm'>Message sent. We respond within 1 business day.</p>
      )}
    </form>
  )
}
 
export default function ContactPage() {
  return (
    <PageLayout title='Contact' subtitle='We respond within one business day'>
      <div className='space-y-6'>

        <div className='grid md:grid-cols-2 gap-8'>
          <div>
            <h2 className='text-lg font-semibold text-gray-800 mb-4'>Get in touch</h2>
            <ContactForm />
          </div>
          <div className='space-y-4'>
            <h2 className='text-lg font-semibold text-gray-800'>Direct email</h2>
            <a href='mailto:hello@signature-forge.com'
               className='text-blue-600 hover:underline block'>
              hello@signature-forge.com
            </a>
            <p className='text-sm text-gray-500'>
              For refund requests, include your Stripe order confirmation email.
              For technical issues, describe your email client and operating system.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

