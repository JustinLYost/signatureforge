'use client'
import { useState } from 'react'

export default function ColorExtractor({ primaryColor, secondaryColor, onUpdate }) {
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [status, setStatus] = useState('idle')
  const [palette, setPalette] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  const extractColors = async () => {
    if (!websiteUrl.trim()) return
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/extract-colors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ websiteUrl }),
      })
      const data = await res.json()

      if (data.error) {
        setStatus('error')
        setErrorMsg(data.error)
        return
      }

      onUpdate({
        primaryColor: data.primary,
        secondaryColor: data.secondary,
      })
      setPalette(data.palette || [])
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('Could not extract colors. Enter them manually below.')
    }
  }

  return (
    <div className='space-y-4'>

      {/* Website URL extractor */}
      <div>
        <label className='text-xs font-medium text-gray-600 block mb-1.5'>
          Extract from your website
          <span className='text-gray-400 font-normal ml-1'>(optional)</span>
        </label>
        <div className='flex gap-2'>
          <input
            type='url'
            value={websiteUrl}
            onChange={e => setWebsiteUrl(e.target.value)}
            placeholder='https://yourcompany.com'
            className='flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       placeholder:text-gray-300'
          />
          <button
            onClick={extractColors}
            disabled={!websiteUrl.trim() || status === 'loading'}
            className='px-3 py-2 bg-teal-600 hover:bg-teal-700
                       disabled:opacity-40 text-white text-xs font-medium
                       rounded-lg transition-colors whitespace-nowrap'
          >
            {status === 'loading' ? 'Scanning...' : 'Extract'}
          </button>
        </div>

        {/* Extracted palette swatches */}
        {palette.length > 0 && (
          <div className='mt-2'>
            <p className='text-xs text-gray-400 mb-1.5'>
              Extracted colors — click to apply:
            </p>
            <div className='flex gap-1.5'>
              {palette.map((hex, i) => (
                <button
                  key={i}
                  onClick={() => onUpdate({ primaryColor: hex })}
                  title={`Set ${hex} as primary`}
                  style={{ backgroundColor: hex }}
                  className='w-7 h-7 rounded-lg border-2 border-white
                             shadow-sm hover:scale-110 transition-transform'
                />
              ))}
            </div>
            <p className='text-xs text-gray-400 mt-1'>
              Click a swatch to use as primary color
            </p>
          </div>
        )}

        {status === 'error' && (
          <p className='text-xs text-red-500 mt-1.5'>{errorMsg}</p>
        )}
        {status === 'success' && (
          <p className='text-xs text-green-600 mt-1.5'>
            ✓ Colors applied. Adjust below if needed.
          </p>
        )}
      </div>

      {/* Manual color pickers */}
      <div className='grid grid-cols-2 gap-3'>
        <div>
          <label className='text-xs font-medium text-gray-600 block mb-1.5'>
            Primary Color
          </label>
          <div className='flex items-center gap-2'>
            <input
              type='color'
              value={primaryColor}
              onChange={e => onUpdate({ primaryColor: e.target.value })}
              className='w-9 h-9 rounded-lg cursor-pointer border border-gray-200'
            />
            <input
              type='text'
              value={primaryColor}
              onChange={e => onUpdate({ primaryColor: e.target.value })}
              placeholder='#2563EB'
              className='flex-1 px-2 py-1.5 text-xs border border-gray-200
                         rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>
        <div>
          <label className='text-xs font-medium text-gray-600 block mb-1.5'>
            Secondary Color
          </label>
          <div className='flex items-center gap-2'>
            <input
              type='color'
              value={secondaryColor}
              onChange={e => onUpdate({ secondaryColor: e.target.value })}
              className='w-9 h-9 rounded-lg cursor-pointer border border-gray-200'
            />
            <input
              type='text'
              value={secondaryColor}
              onChange={e => onUpdate({ secondaryColor: e.target.value })}
              placeholder='#1A2E4A'
              className='flex-1 px-2 py-1.5 text-xs border border-gray-200
                         rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>
      </div>

    </div>
  )
}