'use client'
import { useState } from 'react'
 
export default function CTASection({ cta, sig, onUpdate }) {
  const [aiOptions, setAiOptions] = useState([])
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState(null)
 
  // Generate AI CTA suggestions
  const generateCTAs = async () => {
    if (!sig.jobTitle) {
      setAiError('Enter your job title first so AI can tailor the suggestions.')
      return
    }
    setAiLoading(true)
    setAiError(null)
    try {
      const res = await fetch('/api/generate-cta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: sig.jobTitle,
          company: sig.company,
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setAiOptions(data.options)

    } catch (err) {
      setAiError('Could not generate suggestions. Try again or enter your own.')
    } finally {
      setAiLoading(false)
    }
  }
 
  // Apply a selected AI option
  const applyAiOption = (option) => {
    onUpdate({ cta: { mode: 'ai', text: option.text, url: '' } })
  }
 
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <label className='text-sm font-semibold text-gray-700'>
          Call to Action
          <span className='ml-2 text-xs font-normal text-gray-400'>(optional)</span>
        </label>
      </div>
 
      {/* MODE SELECTOR — Three tabs */}
      <div className='grid grid-cols-3 gap-1 p-1 bg-gray-100 rounded-lg'>
        {[
          { id: 'none', label: 'No CTA' },
          { id: 'custom', label: 'My Own' },
          { id: 'ai', label: 'AI Suggest' },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onUpdate({ cta: { ...cta, mode: id } })}
            className={`py-1.5 text-xs font-medium rounded-md transition-all
              ${cta.mode === id
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'}`}
          >
            {label}
          </button>
        ))}
      </div>
 
      {/* MODE: NONE — show friendly message */}
      {cta.mode === 'none' && (
        <p className='text-xs text-gray-400 italic px-1'>
          No CTA will be added to your signature.
          Select &apos;My Own&apos; or &apos;AI Suggest&apos; to add one.
        </p>
      )}
 
      {/* MODE: CUSTOM — user enters their own */}
      {cta.mode === 'custom' && (
        <div className='space-y-3'>
          <div>
            <label className='text-xs font-medium text-gray-600 block mb-1'>

              Button Text
            </label>
            <input
              type='text'
              value={cta.text}
              onChange={e => onUpdate({ cta: { ...cta, text: e.target.value } })}
              placeholder='e.g. Book a free call'
              maxLength={50}
              className='w-full px-3 py-2 text-sm border border-gray-200 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div>
            <label className='text-xs font-medium text-gray-600 block mb-1'>
              Link URL
            </label>
            <input
              type='url'
              value={cta.url}
              onChange={e => onUpdate({ cta: { ...cta, url: e.target.value } })}
              placeholder='https://calendly.com/yourname'
              className='w-full px-3 py-2 text-sm border border-gray-200 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>
      )}
 
      {/* MODE: AI — generate and pick suggestions */}
      {cta.mode === 'ai' && (
        <div className='space-y-3'>
          <button
            onClick={generateCTAs}
            disabled={aiLoading}
            className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50
                       text-white text-sm font-medium rounded-lg transition-colors'
          >
            {aiLoading ? 'Generating...' : aiOptions.length > 0 ? 'Regenerate' : 'Generate CTA Ideas'}
          </button>
 
          {aiError && (
            <p className='text-xs text-red-500 px-1'>{aiError}</p>
          )}
 
          {/* AI Option Cards */}
          {aiOptions.length > 0 && (
            <div className='space-y-2'>
              <p className='text-xs text-gray-400 px-1'>Click one to apply it:</p>
              {aiOptions.map((option, i) => (
                <button
                  key={i}
                  onClick={() => applyAiOption(option)}
                  className={`w-full text-left p-3 rounded-lg border text-sm

                    transition-all hover:border-blue-400 hover:bg-blue-50
                    ${cta.text === option.text
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-700'}`}
                >
                  <span className='font-medium block'>{option.text}</span>
                  <span className='text-xs text-gray-400 mt-0.5 block'>
                    {option.placeholder}
                  </span>
                </button>
              ))}
            </div>
          )}
 
          {/* URL input once an option is selected */}
          {cta.text && (
            <div>
              <label className='text-xs font-medium text-gray-600 block mb-1'>
                Your Link URL
              </label>
              <input
                type='url'
                value={cta.url}
                onChange={e => onUpdate({ cta: { ...cta, url: e.target.value } })}
                placeholder='https://calendly.com/yourname'
                className='w-full px-3 py-2 text-sm border border-gray-200 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

