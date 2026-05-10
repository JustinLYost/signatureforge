'use client'
 
export default function ExecutiveTemplate({ sig }) {
  const {
    firstName, lastName, jobTitle, company,
    email, phone, website, photoUrl, logoUrl,
    primaryColor, secondaryColor, textColor,
    font, social, cta, disclaimer, photoShape,
  } = sig
 
  const name = [firstName, lastName].filter(Boolean).join(' ')
  const fontStack = `${font}, Arial, sans-serif`
  const borderRadius = photoShape === 'circle' ? '50%'
    : photoShape === 'rounded' ? '8px' : '0px'
  const activeSocials = Object.entries(social || {}).filter(([, url]) => url)
 
  return (
    <div style={{ fontFamily: fontStack, maxWidth: '520px' }}>
      {/* Top row: photo + name block */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
        {photoUrl && (
          <img src={photoUrl} alt={name}
               style={{ width: '56px', height: '56px', borderRadius, objectFit: 'cover', flexShrink: 0 }} />
        )}
        <div>

          <div style={{ fontSize: '20px', fontWeight: '800', color: secondaryColor, lineHeight: 1.1 }}>
            {name}
          </div>
          <div style={{ fontSize: '13px', color: primaryColor, fontWeight: '600', marginTop: '3px' }}>
            {jobTitle}{company ? ` — ${company}` : ''}
          </div>
        </div>
        {logoUrl && (
          <img src={logoUrl} alt={company}
               style={{ height: '40px', maxWidth: '100px', objectFit: 'contain', marginLeft: 'auto', flexShrink: 0 }} />
        )}
      </div>
 
      {/* Divider */}
      <div style={{ height: '2px', background: `linear-gradient(to right, ${primaryColor}, transparent)`, marginBottom: '10px' }} />
 
      {/* Contact row */}
      <div style={{ display: 'flex', gap: '20px', fontSize: '11px', color: textColor, flexWrap: 'wrap' }}>
        {email && <a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{email}</a>}
        {phone && <span>{phone}</span>}
        {website && <a href={website} style={{ color: primaryColor, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a>}
      </div>
 
      {/* Social + CTA row */}
      {(activeSocials.length > 0 || (cta.mode !== 'none' && cta.text)) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
          {activeSocials.map(([key, url]) => (
            <a key={key} href={url}
               style={{ width: '20px', height: '20px', backgroundColor: primaryColor, borderRadius: '4px',

                        display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              <span style={{ color: '#fff', fontSize: '9px', fontWeight: '700' }}>{key[0].toUpperCase()}</span>
            </a>
          ))}
          {cta.mode !== 'none' && cta.text && (
            <a href={cta.url || '#'}
               style={{ padding: '5px 12px', backgroundColor: primaryColor, color: '#fff',
                        fontSize: '11px', fontWeight: '600', textDecoration: 'none', borderRadius: '5px' }}>
              {cta.text}
            </a>
          )}
        </div>
      )}
 
      {disclaimer && (
        <div style={{ fontSize: '9px', color: '#9CA3AF', lineHeight: 1.4, marginTop: '10px' }}>{disclaimer}</div>
      )}
    </div>
  )
}

