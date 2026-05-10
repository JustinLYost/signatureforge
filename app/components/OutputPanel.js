'use client'
import { useState } from 'react'
 
export default function OutputPanel({ outputs, editToken }) {
  const [tab, setTab] = useState('gmail')
  const [copied, setCopied] = useState(null)
 
  const copyToClipboard = async (text, key) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2500)
  }
 
  const downloadPNG = async () => {
    const res = await fetch('/api/export-png', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sig: outputs.sig }),
    })

    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'signature.png'
    a.click()
    URL.revokeObjectURL(url)
  }
 
  const editUrl = editToken
    ? `${process.env.NEXT_PUBLIC_APP_URL}/edit/${editToken}`
    : null
 
  return (
    <div className='max-w-3xl mx-auto py-12 px-6'>
      <div className='text-center mb-10'>
        <div className='text-4xl mb-3'>✅</div>
        <h1 className='text-3xl font-bold text-gray-900'>Your signature is ready!</h1>
        <p className='text-gray-500 mt-2'>
          Choose your email client below and follow the install instructions.
        </p>
      </div>
 
      {/* Tab navigation */}
      <div className='flex gap-1 p-1 bg-gray-100 rounded-xl mb-6'>
        {[
          { id: 'gmail', label: 'Gmail' },
          { id: 'outlook', label: 'Outlook' },
          { id: 'png', label: 'Image (PNG)' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all
              ${tab === t.id
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
 
      {/* GMAIL TAB */}
      {tab === 'gmail' && (
        <div className='space-y-4'>
          <div className='bg-white rounded-xl border border-gray-200 p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='font-semibold text-gray-800'>Gmail HTML</h2>
              <button
                onClick={() => copyToClipboard(outputs.gmailHTML, 'gmail')}
                className='px-4 py-1.5 bg-blue-600 hover:bg-blue-700
                           text-white text-sm font-medium rounded-lg transition-colors'
              >
                {copied === 'gmail' ? 'Copied!' : 'Copy HTML'}

              </button>
            </div>
            <pre className='text-xs bg-gray-50 rounded-lg p-4 overflow-x-auto
                          text-gray-600 max-h-48 overflow-y-auto'>
              {outputs.gmailHTML}
            </pre>
          </div>
 
          {/* Gmail install steps */}
          <div className='bg-blue-50 rounded-xl p-6'>
            <h3 className='font-semibold text-blue-900 mb-3'>
              How to install in Gmail
            </h3>
            <ol className='space-y-2 text-sm text-blue-800'>
              <li>1. Click <strong>Copy HTML</strong> above</li>
              <li>2. Open Gmail and go to <strong>Settings → See all settings</strong></li>
              <li>3. Scroll to the <strong>Signature</strong> section</li>
              <li>4. Click <strong>Create new signature</strong> or edit an existing one</li>
              <li>5. In the signature editor, click the <strong>&lt;/&gt;</strong> icon to switch to HTML mode</li>
              <li>6. Paste your copied HTML and click <strong>Save</strong></li>
            </ol>
          </div>
        </div>
      )}
 
      {/* OUTLOOK TAB */}
      {tab === 'outlook' && (
        <div className='space-y-4'>
          <div className='bg-white rounded-xl border border-gray-200 p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='font-semibold text-gray-800'>Outlook HTML</h2>
              <button
                onClick={() => copyToClipboard(outputs.outlookHTML, 'outlook')}
                className='px-4 py-1.5 bg-blue-600 hover:bg-blue-700
                           text-white text-sm font-medium rounded-lg transition-colors'
              >
                {copied === 'outlook' ? 'Copied!' : 'Copy HTML'}
              </button>
            </div>
            <pre className='text-xs bg-gray-50 rounded-lg p-4 overflow-x-auto
                          text-gray-600 max-h-48 overflow-y-auto'>
              {outputs.outlookHTML}
            </pre>
          </div>
 
          {/* Outlook install steps */}
          <div className='bg-blue-50 rounded-xl p-6'>
            <h3 className='font-semibold text-blue-900 mb-3'>
              How to install in Outlook (Desktop)
            </h3>
            <ol className='space-y-2 text-sm text-blue-800'>

              <li>1. Click <strong>Copy HTML</strong> above</li>
              <li>2. Open Outlook and go to <strong>File → Options → Mail → Signatures</strong></li>
              <li>3. Click <strong>New</strong> to create a signature</li>
              <li>4. In the editor, click the <strong>HTML</strong> source button</li>
              <li>5. Paste your copied HTML and click <strong>OK</strong></li>
              <li>6. Set as default for new messages and/or replies</li>
            </ol>
            <p className='text-xs text-blue-600 mt-3 italic'>
              For Outlook Web (OWA): Settings → View all → Compose and reply → Signature
            </p>
          </div>
        </div>
      )}
 
      {/* PNG TAB */}
      {tab === 'png' && (
        <div className='space-y-4'>
          <div className='bg-white rounded-xl border border-gray-200 p-6 text-center'>
            <p className='text-gray-600 mb-4 text-sm'>
              Use the image version for email clients that strip HTML,
              or anywhere you need a static image of your signature.
            </p>
            <button
              onClick={downloadPNG}
              className='px-6 py-2.5 bg-blue-600 hover:bg-blue-700
                         text-white font-medium rounded-lg transition-colors'
            >
              Download PNG
            </button>
          </div>
        </div>
      )}
 
      {/* 30-day edit link */}
      {editUrl && (
        <div className='mt-8 p-5 bg-gray-50 rounded-xl border border-gray-200'>
          <h3 className='font-semibold text-gray-800 mb-1'>
            Your 30-day edit link
          </h3>
          <p className='text-sm text-gray-500 mb-3'>
            Save this link to make changes to your signature within the next 30 days.
          </p>
          <div className='flex gap-2'>
            <input readOnly value={editUrl}
              className='flex-1 px-3 py-2 text-sm bg-white border border-gray-200
                         rounded-lg text-gray-600' />
            <button
              onClick={() => copyToClipboard(editUrl, 'editUrl')}
              className='px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white
                         text-sm font-medium rounded-lg transition-colors whitespace-nowrap'

            >
              {copied === 'editUrl' ? 'Copied!' : 'Copy link'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

