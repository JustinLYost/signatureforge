// Shared helpers used by all signature templates

export const getFullName = (sig) =>
  [sig.firstName, sig.lastName].filter(Boolean).join(' ')

export const getFontStack = (sig) =>
  `${sig.font || 'Arial'}, Arial, Helvetica, sans-serif`

export const getBorderRadius = (shape) =>
  shape === 'circle' ? '50%' : shape === 'rounded' ? '8px' : '0px'

export const getActiveSocials = (social) =>
  Object.entries(social || {}).filter(([, url]) => url)

export const SocialIcons = ({ socials, color }) => (
  <div style={{ display: 'flex', gap: '5px', marginTop: '8px' }}>
    {socials.map(([key, url]) => (
      <a key={key} href={url}
         style={{ width: '18px', height: '18px', backgroundColor: color,
                  borderRadius: '3px', display: 'inline-flex',
                  alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none' }}>
        <span style={{ color: '#fff', fontSize: '8px', fontWeight: '700' }}>
          {key[0].toUpperCase()}
        </span>
      </a>
    ))}
  </div>
)

export const CTAButton = ({ cta, primaryColor }) => {
  if (!cta || cta.mode === 'none' || !cta.text) return null
  return (
    <div style={{ marginTop: '10px' }}>
      <a href={cta.url || '#'}
         style={{ display: 'inline-block', padding: '7px 14px',
                  backgroundColor: primaryColor, color: '#fff',
                  fontSize: '12px', fontWeight: '600',
                  textDecoration: 'none', borderRadius: '5px' }}>
        {cta.text}
      </a>
    </div>
  )
}

export const Disclaimer = ({ text }) => {
  if (!text) return null
  return (
    <div style={{ fontSize: '9px', color: '#9CA3AF',
                  lineHeight: 1.4, marginTop: '10px' }}>
      {text}
    </div>
  )
}