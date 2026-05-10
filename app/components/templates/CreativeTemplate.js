'use client'
import { getFullName, getFontStack, getBorderRadius, getActiveSocials, SocialIcons, CTAButton, Disclaimer } from '@/lib/templateHelpers'
 
export default function CreativeTemplate({ sig }) {
  const { jobTitle, company, email, phone, website, photoUrl, logoUrl,
    primaryColor, secondaryColor, textColor, font, social, cta, disclaimer, photoShape } = sig
  const name = getFullName(sig)
  const fontStack = getFontStack(sig)
  const borderRadius = getBorderRadius(photoShape)
  const activeSocials = getActiveSocials(social)
 
  return (
    <div style={{ fontFamily: fontStack, maxWidth: '520px', overflow: 'hidden', borderRadius: '8px' }}>
 
      {/* Full-width color header band */}
      <div style={{ backgroundColor: primaryColor, padding: '14px 16px',

                    display: 'flex', alignItems: 'center', gap: '12px' }}>
        {photoUrl && (
          <img src={photoUrl} alt={name}
               style={{ width: '54px', height: '54px', borderRadius,
                        border: '2px solid rgba(255,255,255,0.6)', objectFit: 'cover', flexShrink: 0 }} />
        )}
        <div>
          <div style={{ fontSize: '18px', fontWeight: '800', color: '#fff', lineHeight: 1.1 }}>{name}</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', marginTop: '2px', fontWeight: '500' }}>
            {jobTitle}{company ? ` • ${company}` : ''}
          </div>
        </div>
        {logoUrl && (
          <img src={logoUrl} alt={company}
               style={{ height: '32px', objectFit: 'contain', marginLeft: 'auto',
                        opacity: 0.9, flexShrink: 0 }} />
        )}
      </div>
 
      {/* White info strip */}
      <div style={{ padding: '12px 16px', backgroundColor: '#fff',
                    borderLeft: `3px solid ${primaryColor}` }}>
        <div style={{ fontSize: '11px', color: textColor, lineHeight: 1.9 }}>
          {email && <a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{email}</a>}
          {phone && <span style={{ color: '#9CA3AF' }}> &nbsp;&bull;&nbsp; {phone}</span>}
          {website && (<><br /><a href={website} style={{ color: primaryColor, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a></>)}
        </div>
        {activeSocials.length > 0 && <SocialIcons socials={activeSocials} color={primaryColor} />}
        <CTAButton cta={cta} primaryColor={primaryColor} />
        <Disclaimer text={disclaimer} />
      </div>
    </div>
  )
}

