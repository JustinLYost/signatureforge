'use client'
 
const TEMPLATE_GROUPS = [
  {
    group: 'Clean & Professional',
    templates: [
      { id: 'minimal',   label: 'Minimal',   desc: 'Clean, simple' },
      { id: 'executive', label: 'Executive', desc: 'Bold presence' },
      { id: 'elegant',   label: 'Elegant',   desc: 'Refined, subtle' },
      { id: 'corporate', label: 'Corporate', desc: 'Logo-forward' },
      { id: 'compact',   label: 'Compact',   desc: 'Single-line' },
      { id: 'card',      label: 'Card',      desc: 'Boxed layout' },
    ]
  },
  {
    group: 'Bold & Creative',
    templates: [
      { id: 'bold',      label: 'Bold',      desc: 'Max impact' },
      { id: 'creative',  label: 'Creative',  desc: 'Color band' },
      { id: 'banner',    label: 'Banner',    desc: 'Full banner' },
      { id: 'gradient',  label: 'Gradient',  desc: 'Gradient bar' },

      { id: 'agency',    label: 'Agency',    desc: 'Logo hero' },
      { id: 'modern',    label: 'Modern',    desc: 'Sidebar bar' },
    ]
  },
  {
    group: 'Industry',
    templates: [
      { id: 'healthcare',  label: 'Healthcare', desc: 'Trust-first' },
      { id: 'legal',       label: 'Legal',      desc: 'Formal' },
      { id: 'finance',     label: 'Finance',    desc: 'Data-dense' },
      { id: 'academic',    label: 'Academic',   desc: 'Credentials' },
      { id: 'realestate',  label: 'Real Estate',desc: 'Photo-forward' },
      { id: 'consultant',  label: 'Consultant', desc: 'Metrics' },
    ]
  },
  {
    group: 'Personal Brand',
    templates: [
      { id: 'freelancer',   label: 'Freelancer',  desc: 'Portfolio CTA' },
      { id: 'stacked',      label: 'Stacked',     desc: 'Centered' },
      { id: 'centered',     label: 'Centered',    desc: 'Symmetrical' },
      { id: 'monogram',     label: 'Monogram',    desc: 'Initial circle' },
      { id: 'socialfirst',  label: 'Social-First',desc: 'Icons hero' },
      { id: 'handwritten',  label: 'Handwritten', desc: 'Wave divider' },
    ]
  },
  {
    group: 'Specialty',
    templates: [
      { id: 'tech',    label: 'Tech',    desc: 'Dark terminal' },
      { id: 'dark',    label: 'Dark',    desc: 'Dark card' },
      { id: 'retro',   label: 'Retro',   desc: 'Vintage rules' },
      { id: 'split',   label: 'Split',   desc: 'Two columns' },
    ]
  },
]
 
export default function TemplateSelector({ selected, onSelect }) {
  return (
    <div className='space-y-4'>
      {TEMPLATE_GROUPS.map(group => (
        <div key={group.group}>
          <p className='text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2'>
            {group.group}
          </p>
          <div className='grid grid-cols-3 gap-1.5'>
            {group.templates.map(t => (
              <button key={t.id} onClick={() => onSelect(t.id)}
                className={`p-2 rounded-lg border text-left transition-all
                  ${selected === t.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'}`}
              >
                <div className={`h-6 rounded mb-1 ${selected === t.id ? 'bg-blue-200' : 'bg-gray-100'}`} />
                <p className={`text-xs font-semibold leading-tight

                  ${selected === t.id ? 'text-blue-700' : 'text-gray-700'}`}>{t.label}</p>
                <p className='text-xs text-gray-400 leading-tight'>{t.desc}</p>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

