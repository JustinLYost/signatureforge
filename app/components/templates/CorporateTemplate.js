'use client'
 
export default function CorporateTemplate({ sig }) {
  const {
    firstName, lastName, jobTitle, company,
    email, phone, mobile, website, address,
    photoUrl, logoUrl,
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
 
        {/* Left: photo + info */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {photoUrl && (
            <img src={photoUrl} alt={name}
                 style={{ width: '60px', height: '60px', borderRadius, objectFit: 'cover', flexShrink: 0 }} />
          )}
          <div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: secondaryColor }}>{name}</div>

            <div style={{ fontSize: '12px', color: primaryColor, fontWeight: '600', marginTop: '2px' }}>{jobTitle}</div>
            {company && <div style={{ fontSize: '11px', color: textColor, marginTop: '1px' }}>{company}</div>}
          </div>
        </div>
 
        {/* Right: logo */}
        {logoUrl && (
          <img src={logoUrl} alt={company}
               style={{ height: '44px', maxWidth: '120px', objectFit: 'contain', flexShrink: 0 }} />
        )}
      </div>
 
      {/* Full-width divider */}
      <div style={{ height: '1px', backgroundColor: primaryColor, opacity: 0.3, margin: '10px 0' }} />
 
      {/* Contact grid */}
      <div style={{ fontSize: '11px', color: textColor, lineHeight: 2 }}>
        <div>
          {email && <>
            <strong style={{ color: secondaryColor }}>E: </strong>
            <a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{email}</a>
          </>}
          {phone && <>
            <span style={{ color: '#D1D5DB' }}> &nbsp;|&nbsp; </span>
            <strong style={{ color: secondaryColor }}>T: </strong>{phone}
          </>}
          {mobile && <>
            <span style={{ color: '#D1D5DB' }}> &nbsp;|&nbsp; </span>
            <strong style={{ color: secondaryColor }}>M: </strong>{mobile}
          </>}
        </div>

        {website && <div><strong style={{ color: secondaryColor }}>W: </strong><a href={website} style={{ color: primaryColor, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a></div>}
        {address && <div><strong style={{ color: secondaryColor }}>A: </strong>{address}</div>}
      </div>
 
      {activeSocials.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
          {activeSocials.map(([key, url]) => (
            <a key={key} href={url}
               style={{ width: '20px', height: '20px', backgroundColor: primaryColor,
                        borderRadius: '3px', display: 'inline-flex',
                        alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              <span style={{ color: '#fff', fontSize: '9px', fontWeight: '700' }}>{key[0].toUpperCase()}</span>
            </a>
          ))}
        </div>
      )}
 
      {cta.mode !== 'none' && cta.text && (
        <div style={{ marginTop: '10px' }}>
          <a href={cta.url || '#'}
             style={{ padding: '6px 14px', backgroundColor: primaryColor, color: '#fff',
                      fontSize: '11px', fontWeight: '600', textDecoration: 'none', borderRadius: '4px', display: 'inline-block' }}>
            {cta.text}
          </a>
        </div>
      )}
 
      {disclaimer && (

        <div style={{ fontSize: '9px', color: '#9CA3AF', lineHeight: 1.4, marginTop: '10px', borderTop: '1px solid #F3F4F6', paddingTop: '8px' }}>{disclaimer}</div>
      )}
    </div>
  )
}

