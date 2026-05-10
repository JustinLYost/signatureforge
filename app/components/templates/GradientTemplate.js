'use client'
import { getFullName, getFontStack, getBorderRadius, getActiveSocials, SocialIcons, CTAButton, Disclaimer } from '@/lib/templateHelpers'
 
export default function GradientTemplate({ sig }) {
  const { jobTitle, company, email, phone, website,
    photoUrl, logoUrl, primaryColor, secondaryColor, textColor, font,
    social, cta, disclaimer, photoShape } = sig
  const name = getFullName(sig)
  const fontStack = getFontStack(sig)
  const br = getBorderRadius(photoShape)
  const activeSocials = getActiveSocials(social)
 
  // Auto-generate a complementary gradient color
  const gradientEnd = primaryColor + '99'
 
  return (
    <div style={{ fontFamily: fontStack, maxWidth: '520px' }}>
      {/* Gradient accent */}
      <div style={{ height: '4px', background:
        `linear-gradient(90deg, ${primaryColor}, ${secondaryColor}, ${gradientEnd})`,
        marginBottom: '12px', borderRadius: '2px' }} />
 
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        {photoUrl && <img src={photoUrl} alt={name}
          style={{ width: '62px', height: '62px', borderRadius: br,
                   objectFit: 'cover', flexShrink: 0,
                   boxShadow: `0 2px 8px ${primaryColor}40` }} />}
 
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '17px', fontWeight: '700', color: secondaryColor }}>{name}</div>
          <div style={{ fontSize: '12px', fontWeight: '600', marginTop: '2px',

                        background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {jobTitle}{company ? ` • ${company}` : ''}
          </div>
          <div style={{ fontSize: '11px', color: textColor, lineHeight: 1.9, marginTop: '8px' }}>
            {email && <><a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{email}</a></>}
            {phone && <span style={{ color: '#9CA3AF' }}> &nbsp;|&nbsp; {phone}</span>}
            {website && (<><br /><a href={website} style={{ color: primaryColor, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a></>)}
          </div>
          {activeSocials.length > 0 && <SocialIcons socials={activeSocials} color={primaryColor} />}
          <CTAButton cta={cta} primaryColor={primaryColor} />
          <Disclaimer text={disclaimer} />
        </div>
        {logoUrl && <img src={logoUrl} alt={company}
          style={{ height: '36px', objectFit: 'contain', flexShrink: 0 }} />}
      </div>
    </div>
  )
}

