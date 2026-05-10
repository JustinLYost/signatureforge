'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import OutputPanel from '../components/OutputPanel'
 
export default function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [state, setState] = useState('loading') // loading | ready | error
  const [outputs, setOutputs] = useState(null)
  const [editToken, setEditToken] = useState(null)
 
  useEffect(() => {
    if (!sessionId) { setState('error'); return }
 
    const load = async () => {
      try {
        // Fetch session data from our API
        const res = await fetch(`/api/session/${sessionId}`)
        const data = await res.json()
 
        if (!data.sig) throw new Error('No signature data')
 
        // Generate all output formats
        const htmlRes = await fetch('/api/generate-html', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sig: data.sig }),
        })
        const { gmailHTML, outlookHTML } = await htmlRes.json()
 
        setOutputs({ sig: data.sig, gmailHTML, outlookHTML })
        setEditToken(data.editToken)
        setState('ready')
      } catch (err) {
        console.error(err)
        setState('error')
      }
    }
 
    load()
  }, [sessionId])
 
  if (state === 'loading') {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-center'>
          <div className='animate-spin w-8 h-8 border-4 border-blue-600

                        border-t-transparent rounded-full mx-auto mb-4' />
          <p className='text-gray-600'>Generating your signature...</p>
        </div>
      </div>
    )
  }
 
  if (state === 'error') {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-center max-w-md'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>Something went wrong</h1>
          <p className='text-gray-600 mb-6'>
            Your payment was processed but we had trouble loading your signature.
            Email us at hello@signature-forge.com with your order ID and we will
            get it sorted immediately.
          </p>
          <p className='text-sm text-gray-400'>Session ID: {sessionId}</p>
        </div>
      </div>
    )
  }
 
  return <OutputPanel outputs={outputs} editToken={editToken} />
}

