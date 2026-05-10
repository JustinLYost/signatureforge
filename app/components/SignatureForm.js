'use client'
import { useState } from 'react'
import LinkedInImport from './LinkedInImport'
import ColorExtractor from './ColorExtractor'
import TemplateSelector from './TemplateSelector'
import ImageUpload from './ImageUpload'
import SocialLinks from './SocialLinks'
import CTASection from './CTASection'

function Section({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className='border-b border-gray-100'>
      <button
        onClick={() => setOpen(o => !o)}
        className='w-full flex items-center justify-between px-5 py-3.5
                   text-sm font-semibold text-gray-700 hover:bg-gray-50
                   transition-colors'
      >
        <span>{title}</span>
        <span className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>
      {open && <div className='px-5 pb-4 space-y-3'>{children}</div>}
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text', optional = false }) {
  return (
    <div>
      <label className='block text-xs font-medium text-gray-600 mb-1'>
        {label}
        {optional && <span className='text-gray-400 font-normal ml-1'>(optional)</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className='w-full px-3 py-2 text-sm border border-gray-200 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   placeholder:text-gray-300'
      />
    </div>
  )
}

const TIER_OPTIONS = [
  { id: 'individual', label: '1 Signature', price: '$14' },
  { id: 'team3',      label: '3-Pack',      price: '$39' },
  { id: 'business10', label: '10-Pack',     price: '$69' },
]

export default function SignatureForm({
  sig, onUpdate, onUpdateNested, onCheckout, onSave,
  checkoutLoading, saveLoading, isEditMode,
  tier = 'individual', onTierChange
}) {
  const set = (key) => (val) => onUpdate({ [key]: val })
  const setSocial = (key) => (val) => onUpdateNested('social', { [key]: val })

  const tierPrice = TIER_OPTIONS.find(t => t.id === tier)?.price || '$14'

  return (
    <div className='flex flex-col h-full form-panel'>

      {/* Header */}
      <div className='px-5 py-4 border-b border-gray-100'>
        <h1 className='text-base font-bold text-gray-900'>Build Your Signature</h1>
        <p className='text-xs text-gray-400 mt-0.5'>
          Fill in your details — preview updates live
        </p>
      </div>

      {/* Scrollable form body */}
      <div className='flex-1 overflow-y-auto'>

        {/* LinkedIn Import */}
        <div className='px-5 py-4 border-b border-gray-100 bg-blue-50'>
          <LinkedInImport sig={sig} onUpdate={onUpdate} />
        </div>

        {/* Template Selection */}
        <Section title='Template' defaultOpen={true}>
          <TemplateSelector
            selected={sig.template}
            onSelect={val => onUpdate({ template: val })}
          />
        </Section>

        {/* Personal Info */}
        <Section title='Personal Info' defaultOpen={true}>
          <div className='grid grid-cols-2 gap-3'>
            <Field label='First Name' value={sig.firstName}
              onChange={set('firstName')} placeholder='Jane' />
            <Field label='Last Name' value={sig.lastName}
              onChange={set('lastName')} placeholder='Smith' />
          </div>
          <Field label='Job Title' value={sig.jobTitle}
            onChange={set('jobTitle')} placeholder='Marketing Director' />
          <Field label='Company' value={sig.company}
            onChange={set('company')} placeholder='Acme Corp' optional />
        </Section>

        {/* Contact */}
        <Section title='Contact Details' defaultOpen={true}>
          <Field label='Email' value={sig.email} type='email'
            onChange={set('email')} placeholder='jane@acmecorp.com' />
          <Field label='Business Phone' value={sig.phone}
            onChange={set('phone')} placeholder='+1 (555) 000-0000' optional />
          <Field label='Mobile' value={sig.mobile}
            onChange={set('mobile')} placeholder='+1 (555) 000-0001' optional />
          <Field label='Website' value={sig.website} type='url'
            onChange={set('website')} placeholder='https://acmecorp.com' optional />
          <Field label='Address' value={sig.address}
            onChange={set('address')} placeholder='123 Main St, Chicago IL' optional />
        </Section>

        {/* Photos */}
        <Section title='Photo & Logo' defaultOpen={false}>
          <div>
            <p className='text-xs font-medium text-gray-600 mb-2'>Profile Photo</p>
            <ImageUpload
              value={sig.photoUrl}
              onChange={val => onUpdate({ photoUrl: val })}
              shape={sig.photoShape}
              onShapeChange={val => onUpdate({ photoShape: val })}
              showShapePicker
            />
          </div>
          <div>
            <p className='text-xs font-medium text-gray-600 mb-2'>Company Logo</p>
            <ImageUpload
              value={sig.logoUrl}
              onChange={val => onUpdate({ logoUrl: val })}
            />
          </div>
        </Section>

        {/* Social Links */}
        <Section title='Social Links' defaultOpen={false}>
          <SocialLinks social={sig.social} onChange={setSocial} />
        </Section>

        {/* Brand Colors */}
        <Section title='Brand Colors' defaultOpen={false}>
          <ColorExtractor
            primaryColor={sig.primaryColor}
            secondaryColor={sig.secondaryColor}
            onUpdate={onUpdate}
          />
        </Section>

        {/* Font */}
        <Section title='Font' defaultOpen={false}>
          <div className='grid grid-cols-2 gap-2'>
            {['Arial', 'Georgia', 'Inter', 'Trebuchet MS'].map(f => (
              <button
                key={f}
                onClick={() => onUpdate({ font: f })}
                style={{ fontFamily: f }}
                className={`px-3 py-2 text-sm rounded-lg border transition-all
                  ${sig.font === f
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <Section title='Call to Action' defaultOpen={false}>
          <CTASection
            cta={sig.cta}
            sig={sig}
            onUpdate={onUpdate}
          />
        </Section>

        {/* Disclaimer */}
        <Section title='Disclaimer' defaultOpen={false}>
          <div>
            <label className='text-xs font-medium text-gray-600 block mb-1'>
              Legal Disclaimer
              <span className='text-gray-400 font-normal ml-1'>(optional)</span>
            </label>
            <textarea
              value={sig.disclaimer}
              onChange={e => onUpdate({ disclaimer: e.target.value })}
              placeholder='This email and any attachments are confidential...'
              rows={3}
              className='w-full px-3 py-2 text-xs border border-gray-200 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         placeholder:text-gray-300 resize-none'
            />
          </div>
        </Section>

      </div>

      {/* Sticky checkout footer */}
      <div className='flex-shrink-0 p-4 border-t border-gray-200 bg-white'>

        {/* Tier selector — only show when not in edit mode */}
        {!isEditMode && (
          <div className='grid grid-cols-3 gap-1.5 mb-3'>
            {TIER_OPTIONS.map(t => (
              <button
                key={t.id}
                onClick={() => onTierChange(t.id)}
                className={`py-2 px-1 rounded-lg border text-center transition-all
                  ${tier === t.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'}`}
              >
                <div className={`text-xs font-semibold leading-tight
                  ${tier === t.id ? 'text-blue-700' : 'text-gray-700'}`}>
                  {t.label}
                </div>
                <div className={`text-sm font-bold
                  ${tier === t.id ? 'text-blue-600' : 'text-gray-500'}`}>
                  {t.price}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Checkout or Save button */}
        {isEditMode ? (
          <button
            onClick={onSave}
            disabled={saveLoading}
            className='w-full py-3 bg-green-600 hover:bg-green-700
                       disabled:opacity-40 disabled:cursor-not-allowed
                       text-white font-semibold rounded-xl transition-colors text-sm'
          >
            {saveLoading ? 'Saving...' : 'Save Changes'}
          </button>
        ) : (
          <button
            onClick={onCheckout}
            disabled={!sig.firstName || !sig.lastName || !sig.jobTitle || checkoutLoading}
            className='w-full py-3 bg-blue-600 hover:bg-blue-700
                       disabled:opacity-40 disabled:cursor-not-allowed
                       text-white font-semibold rounded-xl transition-colors text-sm'
          >
            {checkoutLoading ? 'Redirecting...' : `Get My Signature — ${tierPrice}`}
          </button>
        )}

        <p className='text-center text-xs text-gray-400 mt-2'>
          One-time payment · No subscription · 30-day edit link included
        </p>
      </div>

    </div>
  )
}