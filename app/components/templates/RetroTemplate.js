'use client'
import { getFullName, getFontStack, getBorderRadius, getActiveSocials, SocialIcons, CTAButton, Disclaimer } from '@/lib/templateHelpers'
 
export default function RetroTemplate({ sig }) {
  const { jobTitle, company, email, phone, website,
    photoUrl, logoUrl, primaryColor, secondaryColor, textColor, font,
    social, cta, disclaimer, photoShape } = sig
  const name = getFullName(sig)
  const fontStack = 'Georgia, Times New Roman, serif'  // Force serif for retro feel
  const br = getBorderRadius(photoShape)

  const activeSocials = getActiveSocials(social)
 
  return (
    <div style={{ fontFamily: fontStack, maxWidth: '520px' }}>
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        {photoUrl && <img src={photoUrl} alt={name}
          style={{ width: '58px', height: '58px', borderRadius: br, objectFit: 'cover',
                   filter: 'grayscale(20%)', flexShrink: 0 }} />}
        <div style={{ flex: 1 }}>
          {/* Double rule header */}
          <div style={{ borderTop: `2px solid ${primaryColor}`, borderBottom: `1px solid ${primaryColor}`,
                        padding: '5px 0', marginBottom: '8px' }}>
            <div style={{ fontSize: '18px', fontWeight: '700', color: secondaryColor,
                          letterSpacing: '0.01em', lineHeight: 1.1 }}>{name}</div>
          </div>
          <div style={{ fontSize: '11px', color: primaryColor, fontStyle: 'italic',
                        letterSpacing: '0.04em', marginBottom: '8px' }}>
            {jobTitle}{company ? ` — ${company}` : ''}
          </div>
          <div style={{ fontSize: '11px', color: textColor, lineHeight: 1.9 }}>
            {email && <><a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{email}</a></>}
            {phone && <span> &nbsp;·&nbsp; {phone}</span>}
            {website && (<><br /><a href={website} style={{ color: primaryColor, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a></>)}
          </div>
          {activeSocials.length > 0 && <SocialIcons socials={activeSocials} color={primaryColor} />}
          <CTAButton cta={cta} primaryColor={primaryColor} />
          <Disclaimer text={disclaimer} />
        </div>
        {logoUrl && <img src={logoUrl} alt={company}
          style={{ height: '36px', objectFit: 'contain', flexShrink: 0, filter: 'grayscale(20%)' }} />}
      </div>
    </div>
  )
}

