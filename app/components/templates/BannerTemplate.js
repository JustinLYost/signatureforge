'use client'
import { getFullName, getFontStack, getBorderRadius, getActiveSocials, SocialIcons, CTAButton, Disclaimer } from '@/lib/templateHelpers'
 
export default function BannerTemplate({ sig }) {
  const { jobTitle, company, email, phone, website,
    photoUrl, logoUrl, primaryColor, secondaryColor, textColor, font,
    social, cta, disclaimer, photoShape } = sig
  const name = getFullName(sig)
  const fontStack = getFontStack(sig)
  const br = getBorderRadius(photoShape)
  const activeSocials = getActiveSocials(social)
 
  return (
    <div style={{ fontFamily: fontStack, maxWidth: '520px', overflow: 'hidden', borderRadius: '6px' }}>
      {/* Full banner */}
      <div style={{ backgroundColor: primaryColor, padding: '16px 18px', display: 'flex',
                    justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {photoUrl && <img src={photoUrl} alt={name}
            style={{ width: '52px', height: '52px', borderRadius: br, objectFit: 'cover',
                     border: '2px solid rgba(255,255,255,0.5)', flexShrink: 0 }} />}
          <div>
            <div style={{ fontSize: '19px', fontWeight: '800', color: '#fff', lineHeight: 1.1 }}>{name}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', marginTop: '3px',
                          fontWeight: '500', letterSpacing: '0.04em' }}>
              {jobTitle}{company ? ` • ${company}` : ''}
            </div>
          </div>
        </div>
        {logoUrl && <img src={logoUrl} alt={company}
          style={{ height: '36px', objectFit: 'contain', opacity: 0.85, flexShrink: 0 }} />}
      </div>
 
      {/* Bottom info row */}
      <div style={{ backgroundColor: secondaryColor, padding: '10px 18px',

                    display: 'flex', flexWrap: 'wrap', gap: '12px',
                    alignItems: 'center' }}>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, flex: 1 }}>
          {email && <><a href={`mailto:${email}`} style={{ color: '#93C5FD', textDecoration: 'none' }}>{email}</a></>}
          {phone && <span style={{ color: 'rgba(255,255,255,0.5)' }}> &nbsp;|&nbsp; </span>}
          {phone && <span>{phone}</span>}
          {website && (<><br /><a href={website} style={{ color: '#93C5FD', textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a></>)}
        </div>
        {activeSocials.length > 0 && (
          <div style={{ display: 'flex', gap: '5px' }}>

            {activeSocials.map(([key, url]) => (
              <a key={key} href={url}
                 style={{ width: '22px', height: '22px', backgroundColor: 'rgba(255,255,255,0.15)',
                          borderRadius: '4px', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', textDecoration: 'none' }}>
                <span style={{ color: '#fff', fontSize: '9px', fontWeight: '700' }}>{key[0].toUpperCase()}</span>
              </a>
            ))}
          </div>
        )}
        {cta.mode !== 'none' && cta.text && (
          <a href={cta.url || '#'}
             style={{ padding: '5px 12px', backgroundColor: 'rgba(255,255,255,0.15)',
                      color: '#fff', fontSize: '11px', fontWeight: '600',
                      textDecoration: 'none', borderRadius: '5px',
                      border: '1px solid rgba(255,255,255,0.3)' }}>
            {cta.text}
          </a>
        )}
      </div>
      <Disclaimer text={disclaimer} />
    </div>
  )
}

