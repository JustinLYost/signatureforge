'use client'
import { getFullName, getFontStack, getActiveSocials, CTAButton, Disclaimer } from '@/lib/templateHelpers'
 
export default function TechTemplate({ sig }) {
  const { jobTitle, company, email, phone, website,
    photoUrl, primaryColor, textColor, font, social, cta, disclaimer, photoShape } = sig
  const name = getFullName(sig)
  const fontStack = getFontStack(sig)
  const activeSocials = getActiveSocials(social)
  const br = photoShape === 'circle' ? '50%' : photoShape === 'rounded' ? '8px' : '4px'
 
  return (
    <div style={{ fontFamily: fontStack, maxWidth: '520px',
                  backgroundColor: '#0F172A', borderRadius: '8px',
                  padding: '16px', border: `1px solid ${primaryColor}33` }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        {photoUrl && (
          <img src={photoUrl} alt={name}
               style={{ width: '56px', height: '56px', borderRadius: br,
                        objectFit: 'cover', border: `2px solid ${primaryColor}`,
                        flexShrink: 0 }} />
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#F1F5F9', lineHeight: 1.2 }}>{name}</div>
          <div style={{ fontSize: '12px', color: primaryColor, fontWeight: '600', marginTop: '3px' }}>
            {jobTitle}{company ? ` @ ${company}` : ''}
          </div>
 
          {/* Terminal-style contact */}
          <div style={{ fontSize: '11px', fontFamily: 'Courier New, monospace',
                        color: '#94A3B8', lineHeight: 1.9, marginTop: '8px' }}>
            {email && <div><span style={{ color: primaryColor }}>email: </span>
              <a href={`mailto:${email}`} style={{ color: '#CBD5E1', textDecoration: 'none' }}>{email}</a></div>}
            {website && <div><span style={{ color: primaryColor }}>web:   </span>
              <a href={website} style={{ color: '#CBD5E1', textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a></div>}
            {phone && <div><span style={{ color: primaryColor }}>tel:   </span><span style={{ color: '#CBD5E1' }}>{phone}</span></div>}
          </div>
 
          {/* Social icons in tech theme */}
          {activeSocials.length > 0 && (
            <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
              {activeSocials.map(([key, url]) => (
                <a key={key} href={url}
                   style={{ padding: '3px 8px', border: `1px solid ${primaryColor}`,
                            borderRadius: '4px', color: primaryColor,
                            fontSize: '9px', fontFamily: 'Courier New, monospace',
                            textDecoration: 'none', fontWeight: '600' }}>
                  {key}

                </a>
              ))}
            </div>
          )}
 
          {cta.mode !== 'none' && cta.text && (
            <div style={{ marginTop: '10px' }}>
              <a href={cta.url || '#'}
                 style={{ padding: '6px 14px', border: `1px solid ${primaryColor}`,
                          color: primaryColor, fontSize: '11px',
                          fontFamily: 'Courier New, monospace', fontWeight: '600',
                          textDecoration: 'none', borderRadius: '4px',
                          display: 'inline-block' }}>
                &gt; {cta.text}
              </a>
            </div>
          )}
          <Disclaimer text={disclaimer} />
        </div>
      </div>
    </div>
  )
}

