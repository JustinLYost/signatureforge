'use client'
export default function MinimalTemplate({ sig }) {
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
      {/* Accent bar */}
      <div style={{ height: '3px', backgroundColor: primaryColor, marginBottom: '12px' }} />
 
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
 
        {/* Photo */}
        {photoUrl && (
          <img
            src={photoUrl}
            alt={name}
            style={{
              width: '64px', height: '64px',
              borderRadius, objectFit: 'cover',
              flexShrink: 0,
            }}
          />
        )}
 

        {/* Info */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '16px', fontWeight: '700',
            color: secondaryColor, lineHeight: 1.2,
          }}>
            {name}
          </div>
          <div style={{
            fontSize: '12px', color: primaryColor,
            fontWeight: '600', marginTop: '2px',
          }}>
            {jobTitle}{company ? ` • ${company}` : ''}
          </div>
 
          <div style={{
            fontSize: '11px', color: textColor,
            lineHeight: 1.8, marginTop: '8px',
          }}>
            {email && (
              <a href={`mailto:${email}`}
                 style={{ color: primaryColor, textDecoration: 'none' }}>
                {email}
              </a>
            )}
            {phone && <span style={{ color: '#9CA3AF' }}> &nbsp;|&nbsp; {phone}</span>}
            {website && (
              <>
                <br />
                <a href={website}
                   style={{ color: primaryColor, textDecoration: 'none' }}>
                  {website.replace(/^https?:\/\//, '')}
                </a>
              </>
            )}

  </div>
            {/* Social icons */}
          {activeSocials.length > 0 && (
            <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
              {activeSocials.map(([key, url]) => (
                <a key={key} href={url}
                   style={{ display: 'inline-block' }}>
                  <div style={{
                    width: '20px', height: '20px',
                    backgroundColor: primaryColor,
                    borderRadius: '4px',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{ color: '#fff', fontSize: '9px', fontWeight: '700' }}>
                      {key[0].toUpperCase()}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
 
          {/* CTA */}
          {cta.mode !== 'none' && cta.text && (
            <div style={{ marginTop: '10px' }}>
              <a
                href={cta.url || '#'}
                style={{
                  display: 'inline-block',
                  padding: '7px 14px',
                  backgroundColor: primaryColor,
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: '600',
                  textDecoration: 'none',

                  borderRadius: '6px',
                }}
              >
                {cta.text}
              </a>
            </div>
          )}
 
          {/* Disclaimer */}
          {disclaimer && (
            <div style={{
              fontSize: '9px', color: '#9CA3AF',
              lineHeight: 1.4, marginTop: '10px',
              maxWidth: '420px',
            }}>
              {disclaimer}
            </div>
          )}
        </div>
 
        {/* Logo */}
        {logoUrl && (
          <img
            src={logoUrl}
            alt={company}
            style={{
              height: '36px', maxWidth: '100px',
              objectFit: 'contain', flexShrink: 0,
            }}
          />
        )}
 
      </div>
    </div>
  )
}

