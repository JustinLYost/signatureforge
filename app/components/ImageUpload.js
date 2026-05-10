'use client'
import { useRef } from 'react'
 
const SHAPES = [
  { id: 'circle',  label: 'Circle' },
  { id: 'rounded', label: 'Rounded' },
  { id: 'square',  label: 'Square' },
]
 
export default function ImageUpload({
  value, onChange, shape, onShapeChange, showShapePicker = false
}) {
  const inputRef = useRef(null)
 
  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
 
    // Validate size (2MB max)


    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be under 2MB')
      return
    }

    // Convert to base64
    const reader = new FileReader()
    reader.onload = (ev) => onChange(ev.target.result)
    reader.readAsDataURL(file)
  }
 
  const borderRadius = shape === 'circle' ? '50%'
    : shape === 'rounded' ? '8px' : '0px'
 
  return (
    <div className='space-y-2'>
      <div className='flex items-center gap-3'>
 
        {/* Preview or placeholder */}
        {value ? (
          <div className='relative flex-shrink-0'>
            <img
              src={value}
              alt='Preview'
              style={{ borderRadius }}
              className='w-14 h-14 object-cover border border-gray-200'
            />
            <button
              onClick={() => onChange('')}
              className='absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500
                         text-white rounded-full text-xs flex items-center
                         justify-center hover:bg-red-600 transition-colors'
            >
              ×
            </button>
          </div>
        ) : (
          <div
            onClick={() => inputRef.current?.click()}
            className='w-14 h-14 border-2 border-dashed border-gray-300

                       rounded-lg flex items-center justify-center
                       cursor-pointer hover:border-blue-400 transition-colors
                       flex-shrink-0'
          >
            <svg className='w-5 h-5 text-gray-300' fill='none'
                 stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5}
                    d='M12 4v16m8-8H4' />
            </svg>
          </div>
        )}
 
        <div className='flex-1'>
          <button
            onClick={() => inputRef.current?.click()}
            className='w-full py-2 px-3 text-xs font-medium border border-gray-200
                       rounded-lg hover:bg-gray-50 transition-colors text-gray-600'
          >
            {value ? 'Change image' : 'Upload image'}
          </button>
          <p className='text-xs text-gray-400 mt-1'>PNG or JPG, max 2MB</p>
        </div>
      </div>
 
      {/* Shape picker — only for profile photo */}
      {showShapePicker && value && (
        <div className='flex gap-2'>
          {SHAPES.map(s => (
            <button
              key={s.id}
              onClick={() => onShapeChange(s.id)}
              className={`flex-1 py-1.5 text-xs rounded-lg border transition-all
                ${shape === s.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
            >

              {s.label}
            </button>
          ))}
        </div>
      )}
 
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type='file'
        accept='image/png,image/jpeg'
        onChange={handleFile}
        className='hidden'
      />
    </div>
  )
}

