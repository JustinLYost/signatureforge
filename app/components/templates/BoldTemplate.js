'use client'
import { getFullName, getFontStack, getBorderRadius, getActiveSocials, SocialIcons, CTAButton, Disclaimer } from '@/lib/templateHelpers'
 
export default function BoldTemplate({ sig }) {

  const { jobTitle, company, email, phone, website,
    photoUrl, logoUrl, primaryColor, secondaryColor, textColor, font,
    social, cta, disclaimer, photoShape } = sig
  const name = getFullName(sig)
  const fontStack = getFontStack(sig)
  const br = getBorderRadius(photoShape)
  const activeSocials = getActiveSocials(social)
 
  return (
    <div style={{ fontFamily: fontStack, maxWidth: '520px' }}>
      {/* Oversized name bar */}
      <div style={{ backgroundColor: secondaryColor, padding: '12px 16px', marginBottom: '0' }}>
        <div style={{ fontSize: '22px', fontWeight: '900', color: '#fff',
                      letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          {name}
        </div>
        <div style={{ fontSize: '11px', color: primaryColor, fontWeight: '700',
                      marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {jobTitle}{company ? ` — ${company}` : ''}
        </div>
      </div>
 
      {/* Info strip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '10px 16px', backgroundColor: `${secondaryColor}10`,
                    borderBottom: `3px solid ${primaryColor}` }}>
        {photoUrl && <img src={photoUrl} alt={name}
          style={{ width: '40px', height: '40px', borderRadius: br,
                   objectFit: 'cover', flexShrink: 0 }} />}
        <div style={{ flex: 1, fontSize: '11px', color: textColor, lineHeight: 1.8 }}>
          {email && <a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{email}</a>}
          {phone && <span style={{ color: '#9CA3AF' }}> &nbsp;|&nbsp; {phone}</span>}
          {website && (<><br /><a href={website} style={{ color: primaryColor, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a></>)}
        </div>
        {logoUrl && <img src={logoUrl} alt={company}
          style={{ height: '32px', objectFit: 'contain', flexShrink: 0 }} />}
      </div>
 
      {(activeSocials.length > 0 || (cta.mode !== 'none' && cta.text)) && (
        <div style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SocialIcons socials={activeSocials} color={primaryColor} />
          <CTAButton cta={cta} primaryColor={primaryColor} />
        </div>
      )}
      <Disclaimer text={disclaimer} />
    </div>
  )
}

