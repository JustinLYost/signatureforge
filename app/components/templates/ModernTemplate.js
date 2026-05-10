'use client'
export default function ModernTemplate({ sig }) {
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
    <div style={{ fontFamily: fontStack, maxWidth: '520px',
                  display: 'flex', gap: '0' }}>
 
      {/* Left color bar */}
      <div style={{
        width: '4px', flexShrink: 0,
        backgroundColor: primaryColor,
        borderRadius: '2px',
        marginRight: '14px',
      }} />
 
      {/* Content */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {photoUrl && (
              <img src={photoUrl} alt={name}
                   style={{ width: '58px', height: '58px', borderRadius, objectFit: 'cover', flexShrink: 0 }} />
            )}
            <div>

              <div style={{ fontSize: '17px', fontWeight: '700', color: secondaryColor }}>
                {name}
              </div>
              <div style={{ fontSize: '12px', color: primaryColor, fontWeight: '600', marginTop: '2px' }}>
                {jobTitle}
              </div>
              {company && (
                <div style={{ fontSize: '11px', color: textColor, marginTop: '1px' }}>{company}</div>
              )}
            </div>
          </div>
          {logoUrl && (
            <img src={logoUrl} alt={company}
                 style={{ height: '36px', objectFit: 'contain', flexShrink: 0 }} />
          )}
        </div>
 
        <div style={{ height: '1px', backgroundColor: '#F3F4F6', margin: '10px 0' }} />
 
        <div style={{ fontSize: '11px', color: textColor, lineHeight: 1.8 }}>
          {email && <a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{email}</a>}
          {phone && <span style={{ color: '#9CA3AF' }}> &nbsp;&middot;&nbsp; {phone}</span>}
          {website && <><br /><a href={website} style={{ color: primaryColor, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a></>}
        </div>
 
        {activeSocials.length > 0 && (
          <div style={{ marginTop: '8px', display: 'flex', gap: '6px' }}>
            {activeSocials.map(([key, url]) => (
              <a key={key} href={url}

                 style={{ width: '20px', height: '20px', backgroundColor: primaryColor,
                          borderRadius: '4px', display: 'inline-flex',
                          alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                <span style={{ color: '#fff', fontSize: '9px', fontWeight: '700' }}>{key[0].toUpperCase()}</span>
              </a>
            ))}
          </div>
        )}
 
        {cta.mode !== 'none' && cta.text && (
          <div style={{ marginTop: '10px' }}>
            <a href={cta.url || '#'}
               style={{ padding: '7px 14px', backgroundColor: primaryColor, color: '#fff',
                        fontSize: '12px', fontWeight: '600', textDecoration: 'none', borderRadius: '6px', display: 'inline-block' }}>
              {cta.text}
            </a>
          </div>
        )}
 
        {disclaimer && (
          <div style={{ fontSize: '9px', color: '#9CA3AF', lineHeight: 1.4, marginTop: '10px' }}>{disclaimer}</div>
        )}
      </div>
    </div>
  )
}

