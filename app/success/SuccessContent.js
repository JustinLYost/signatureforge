'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import OutputPanel from '../components/OutputPanel'

export default function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [state, setState] = useState('loading')
  const [outputs, setOutputs] = useState(null)
  const [editToken, setEditToken] = useState(null)

  useEffect(() => {
    console.log('Session ID from URL:', sessionId)

    if (!sessionId) {
      setState('error')
      return
    }

    const load = async () => {
      try {
        console.log('Fetching session data...')

        const res = await fetch('/api/session/lookup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })

        console.log('Response status:', res.status)
        const data = await res.json()
        console.log('Response data keys:', Object.keys(data))

        if (!data.sig) {
          console.error('No sig in response:', data)
          throw new Error('No signature data')
        }

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
        console.error('Load error:', err)
        setState('error')
      }
    }

    load()
  }, [sessionId])

  if (state === 'loading') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '32px', height: '32px', border: '4px solid #2563EB',
            borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 16px',
            animation: 'spin 1s linear infinite' }} />
          <p style={{ color: '#6B7280' }}>Generating your signature...</p>
        </div>
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px', padding: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>
            Something went wrong
          </h1>
          <p style={{ color: '#6B7280', marginBottom: '24px', lineHeight: 1.6 }}>
            Your payment was processed but we had trouble loading your signature.
            Email us at hello@signatureforge.com with your order ID and we will
            get it sorted immediately.
          </p>
          <p style={{ fontSize: '13px', color: '#9CA3AF' }}>Session ID: {sessionId}</p>
        </div>
      </div>
    )
  }

  return <OutputPanel outputs={outputs} editToken={editToken} />
}