'use client'
import { useState } from 'react'
 
export default function LinkedInImport({ onUpdate }) {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')
 
  const handleImport = async () => {
    if (!url.trim()) return
    setStatus('loading')
    setErrorMsg('')
 
    try {
      const res = await fetch('/api/linkedin-import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkedinUrl: url }),
      })
      const data = await res.json()
 
      if (data.error) {
        setStatus('error')
        setErrorMsg(data.error)
        return
      }
 
      // Merge imported profile into signature state
      onUpdate({
        firstName: data.profile.firstName || '',
        lastName: data.profile.lastName || '',

        jobTitle: data.profile.jobTitle || '',
        company: data.profile.company || '',
        photoUrl: data.profile.photoUrl || '',
        social: { linkedin: url },
      })
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('Import failed. Fill in your details manually.')
    }
  }
 
  return (
    <div>
      <div className='flex items-center gap-1.5 mb-2'>
        {/* LinkedIn icon */}
        <svg className='w-4 h-4 text-[#0A66C2]' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853
            0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9
            1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337
            7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063
            1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064
            2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0
            .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24
            23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
        </svg>
        <span className='text-xs font-semibold text-gray-700'>
          Import from LinkedIn
        </span>
        <span className='text-xs text-blue-600 font-medium ml-auto'>
          Auto-fills your details
        </span>
      </div>
 
      <div className='flex gap-2'>
        <input
          type='url'
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder='https://linkedin.com/in/yourname'
          disabled={status === 'loading'}
          className='flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     disabled:opacity-50 placeholder:text-gray-300'
        />

        <button
          onClick={handleImport}
          disabled={!url.trim() || status === 'loading'}
          className='px-3 py-2 bg-[#0A66C2] hover:bg-[#0958a8]
                     disabled:opacity-40 text-white text-xs font-medium
                     rounded-lg transition-colors whitespace-nowrap'
        >
          {status === 'loading' ? 'Importing...' : 'Import'}

        </button>
      </div>
 
      {status === 'success' && (
        <p className='text-xs text-green-600 mt-1.5'>
          ✓ Profile imported. Review and edit below.
        </p>
      )}
      {status === 'error' && (
        <p className='text-xs text-red-500 mt-1.5'>{errorMsg}</p>
      )}
    </div>
  )
}

