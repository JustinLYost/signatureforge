'use client'
import { useState, useCallback } from 'react'
import SignatureForm from './SignatureForm'
import SignaturePreview from './SignaturePreview'

const defaultSignature = {
  firstName: '',
  lastName: '',
  jobTitle: '',
  company: '',
  email: '',
  phone: '',
  mobile: '',
  website: '',
  address: '',
  photoUrl: '',
  photoShape: 'circle',
  logoUrl: '',
  social: {
    linkedin: '',
    twitter: '',
    instagram: '',
    facebook: '',
    youtube: '',
    github: '',
    tiktok: '',
  },
  template: 'minimal',
  primaryColor: '#2563EB',
  secondaryColor: '#1A2E4A',
  textColor: '#374151',
  font: 'Arial',
  cta: {
    mode: 'none',
    text: '',
    url: '',
  },
  disclaimer: '',
  metrics: [
    { value: '10+', label: 'Years Experience' },
    { value: '100+', label: 'Clients Served' },
    { value: '98%', label: 'Satisfaction Rate' },
  ],
}

export default function Builder({ initialSig, editToken, onSave }) {
  const [sig, setSig] = useState(initialSig || defaultSignature)
  const [previewMode, setPreviewMode] = useState('desktop')
  const [loading, setLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [tier, setTier] = useState('individual')

  const updateSig = useCallback((updates) => {
    setSig(prev => ({ ...prev, ...updates }))
  }, [])

  const updateNested = useCallback((key, updates) => {
    setSig(prev => ({ ...prev, [key]: { ...prev[key], ...updates } }))
  }, [])

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sig, tier }),
      })
      const { url } = await res.json()
      window.location.href = url
    } catch (err) {
      console.error(err)
      alert('Checkout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!onSave) return
    setSaveLoading(true)
    try {
      await onSave(sig)
    } finally {
      setSaveLoading(false)
    }
  }

  return (
    <div className='flex h-full overflow-hidden bg-gray-50'>

      {/* LEFT PANEL */}
      <div className='w-[420px] flex-shrink-0 h-full overflow-y-auto bg-white border-r border-gray-200'>
        <SignatureForm
          sig={sig}
          onUpdate={updateSig}
          onUpdateNested={updateNested}
          onCheckout={handleCheckout}
          onSave={editToken ? handleSave : null}
          checkoutLoading={loading}
          saveLoading={saveLoading}
          isEditMode={!!editToken}
          tier={tier}
          onTierChange={setTier}
        />
      </div>

      {/* RIGHT PANEL */}
      <div className='flex-1 h-full overflow-y-auto bg-gray-100 p-8'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-lg font-semibold text-gray-700'>Live Preview</h2>
          <div className='flex gap-2'>
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                previewMode === 'desktop'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Desktop
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                previewMode === 'mobile'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Mobile
            </button>
          </div>
        </div>
        <SignaturePreview sig={sig} mode={previewMode} />
      </div>

    </div>
  )
}