'use client'
import { getFullName, getFontStack, getBorderRadius, getActiveSocials, CTAButton, Disclaimer } from '@/lib/templateHelpers'
 
export default function SocialFirstTemplate({ sig }) {
  const { jobTitle, company, email, phone, website,
    photoUrl, primaryColor, secondaryColor, textColor, font,
    social, cta, disclaimer, photoShape } = sig
  const name = getFullName(sig)
  const fontStack = getFontStack(sig)
  const br = getBorderRadius(photoShape)
  const activeSocials = getActiveSocials(social)
 
  const PLATFORM_COLORS = {
    linkedin: '#0A66C2', twitter: '#000000', instagram: '#E1306C',
    facebook: '#1877F2', youtube: '#FF0000', github: '#24292E',
    tiktok: '#010101',
  }
 
  return (
    <div style={{ fontFamily: fontStack, maxWidth: '520px' }}>
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        {photoUrl && <img src={photoUrl} alt={name}
          style={{ width: '62px', height: '62px', borderRadius: br, objectFit: 'cover',
                   flexShrink: 0, border: `2px solid ${primaryColor}` }} />}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '17px', fontWeight: '700', color: secondaryColor }}>{name}</div>
          <div style={{ fontSize: '12px', color: primaryColor, fontWeight: '600', marginTop: '2px' }}>
            {jobTitle}{company ? ` • ${company}` : ''}
          </div>
 
          {/* Large social buttons */}
          {activeSocials.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px', marginBottom: '8px' }}>
              {activeSocials.map(([key, url]) => (
                <a key={key} href={url}
                   style={{ display: 'flex', alignItems: 'center', gap: '5px',
                            padding: '5px 10px', borderRadius: '20px',
                            backgroundColor: PLATFORM_COLORS[key] || primaryColor,
                            textDecoration: 'none' }}>
                  <span style={{ color: '#fff', fontSize: '9px', fontWeight: '700',
                                 textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {key}
                  </span>
                </a>
              ))}
            </div>
          )}
 
          <div style={{ fontSize: '11px', color: textColor, lineHeight: 1.9 }}>

            {email && <><a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{email}</a></>}
            {website && (<><br /><a href={website} style={{ color: primaryColor, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a></>)}
          </div>
          <CTAButton cta={cta} primaryColor={primaryColor} />
          <Disclaimer text={disclaimer} />
        </div>
      </div>
    </div>
  )
}

