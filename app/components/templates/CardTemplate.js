'use client'
import { getFullName, getFontStack, getBorderRadius, getActiveSocials, SocialIcons, CTAButton, Disclaimer } from '@/lib/templateHelpers'
 
export default function CardTemplate({ sig }) {
  const { jobTitle, company, email, phone, website,
    photoUrl, logoUrl, primaryColor, secondaryColor, textColor, font,
    social, cta, disclaimer, photoShape } = sig
  const name = getFullName(sig)
  const fontStack = getFontStack(sig)
  const br = getBorderRadius(photoShape)
  const activeSocials = getActiveSocials(social)
 
  return (
    <div style={{ fontFamily: fontStack, maxWidth: '460px',
                  border: `1px solid ${primaryColor}40`,
                  borderRadius: '10px', overflow: 'hidden',
                  boxShadow: `0 2px 8px ${primaryColor}15` }}>
 
      {/* Card top accent */}
      <div style={{ height: '4px', backgroundColor: primaryColor }} />
 
      <div style={{ padding: '14px 16px' }}>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          {photoUrl && <img src={photoUrl} alt={name}
            style={{ width: '58px', height: '58px', borderRadius: br,
                     objectFit: 'cover', flexShrink: 0 }} />}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '16px', fontWeight: '700', color: secondaryColor }}>{name}</div>
            <div style={{ fontSize: '12px', color: primaryColor, fontWeight: '600', marginTop: '2px' }}>
              {jobTitle}{company ? ` • ${company}` : ''}
            </div>
          </div>
          {logoUrl && <img src={logoUrl} alt={company}
            style={{ height: '32px', objectFit: 'contain', flexShrink: 0 }} />}
        </div>
 
        <div style={{ height: '1px', backgroundColor: '#F3F4F6', margin: '10px 0' }} />
 
        <div style={{ fontSize: '11px', color: textColor, lineHeight: 1.9 }}>
          {email && <div><a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{email}</a></div>}
          {phone && <div>{phone}</div>}
          {website && <div><a href={website} style={{ color: primaryColor, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a></div>}
        </div>
 
        {activeSocials.length > 0 && <SocialIcons socials={activeSocials} color={primaryColor} />}
        <CTAButton cta={cta} primaryColor={primaryColor} />
        <Disclaimer text={disclaimer} />
      </div>
    </div>
  )
}

