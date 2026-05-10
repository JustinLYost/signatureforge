'use client'
 
const PLATFORMS = [
  { key: 'linkedin',  label: 'LinkedIn',  placeholder: 'https://linkedin.com/in/yourname' },
  { key: 'twitter',   label: 'X / Twitter', placeholder: 'https://x.com/yourhandle' },
  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/yourhandle' },
  { key: 'facebook',  label: 'Facebook',  placeholder: 'https://facebook.com/yourpage' },

  { key: 'youtube',   label: 'YouTube',   placeholder: 'https://youtube.com/c/yourchannel' },
  { key: 'github',    label: 'GitHub',    placeholder: 'https://github.com/yourusername' },
  { key: 'tiktok',    label: 'TikTok',    placeholder: 'https://tiktok.com/@yourhandle' },
]
 
export default function SocialLinks({ social, onChange }) {
  return (
    <div className='space-y-2.5'>
      {PLATFORMS.map(({ key, label, placeholder }) => (
        <div key={key}>
          <label className='text-xs font-medium text-gray-600 block mb-1'>
            {label}
            {social[key] && (
              <span className='ml-1.5 text-green-600 font-normal'>✓ Active</span>
            )}
          </label>
          <input
            type='url'
            value={social[key] || ''}
            onChange={e => onChange(key)(e.target.value)}
            placeholder={placeholder}
            className='w-full px-3 py-2 text-xs border border-gray-200 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       placeholder:text-gray-300'
          />
        </div>
      ))}
      <p className='text-xs text-gray-400'>
        Only platforms with a URL will show icons in your signature.
      </p>
    </div>
  )
}

