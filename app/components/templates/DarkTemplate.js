'use client'
import { getFullName, getFontStack, getBorderRadius, getActiveSocials, CTAButton, Disclaimer } from '@/lib/templateHelpers'
 
export default function DarkTemplate({ sig }) {
  const { jobTitle, company, email, phone, website,
    photoUrl, logoUrl, primaryColor, textColor, font,
    social, cta, disclaimer, photoShape } = sig
  const name = getFullName(sig)
  const fontStack = getFontStack(sig)
  const br = getBorderRadius(photoShape)
  const activeSocials = getActiveSocials(social)
 
  return (
    <div style={{ fontFamily: fontStack, maxWidth: '520px',
                  backgroundColor: '#111827', borderRadius: '8px',
                  padding: '16px', borderTop: `3px solid ${primaryColor}` }}>
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        {photoUrl && <img src={photoUrl} alt={name}
          style={{ width: '60px', height: '60px', borderRadius: br, objectFit: 'cover',
                   flexShrink: 0, border: `2px solid ${primaryColor}40` }} />}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '17px', fontWeight: '700', color: '#F9FAFB', lineHeight: 1.2 }}>{name}</div>
          <div style={{ fontSize: '12px', color: primaryColor, fontWeight: '600', marginTop: '2px' }}>
            {jobTitle}{company ? ` • ${company}` : ''}
          </div>
          <div style={{ height: '1px', backgroundColor: '#374151', margin: '8px 0' }} />
          <div style={{ fontSize: '11px', color: '#9CA3AF', lineHeight: 1.9 }}>
            {email && <><a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{email}</a></>}

            {phone && <span style={{ color: '#6B7280' }}> &nbsp;|&nbsp; {phone}</span>}
            {website && (<><br /><a href={website} style={{ color: primaryColor, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a></>)}
          </div>
          {activeSocials.length > 0 && (
            <div style={{ display: 'flex', gap: '5px', marginTop: '8px' }}>
              {activeSocials.map(([key, url]) => (
                <a key={key} href={url}
                   style={{ width: '22px', height: '22px', border: `1px solid ${primaryColor}60`,
                            borderRadius: '4px', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', textDecoration: 'none' }}>
                  <span style={{ color: primaryColor, fontSize: '9px', fontWeight: '700' }}>{key[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          )}
          {cta.mode !== 'none' && cta.text && (
            <div style={{ marginTop: '10px' }}>
              <a href={cta.url || '#'}
                 style={{ padding: '7px 14px', border: `1px solid ${primaryColor}`,
                          color: primaryColor, fontSize: '12px', fontWeight: '600',
                          textDecoration: 'none', borderRadius: '5px', display: 'inline-block' }}>
                {cta.text}
              </a>
            </div>
          )}
          {disclaimer && <div style={{ fontSize: '9px', color: '#4B5563', lineHeight: 1.4, marginTop: '10px' }}>{disclaimer}</div>}
        </div>
        {logoUrl && <img src={logoUrl} alt={company}
          style={{ height: '32px', objectFit: 'contain', flexShrink: 0, opacity: 0.7 }} />}
      </div>
    </div>
  )
}

