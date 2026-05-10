'use client'
import { getFullName, getFontStack, getBorderRadius, getActiveSocials, SocialIcons, CTAButton, Disclaimer } from '@/lib/templateHelpers'
 
export default function AgencyTemplate({ sig }) {
  const { jobTitle, company, email, phone, website,
    photoUrl, logoUrl, primaryColor, secondaryColor, textColor, font,
    social, cta, disclaimer, photoShape } = sig
  const name = getFullName(sig)

  const fontStack = getFontStack(sig)
  const br = getBorderRadius(photoShape)
  const activeSocials = getActiveSocials(social)
 
  return (
    <div style={{ fontFamily: fontStack, maxWidth: '520px' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'stretch' }}>
 
        {/* Left: large logo block */}
        <div style={{ width: '90px', flexShrink: 0, backgroundColor: primaryColor,
                      borderRadius: '8px', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', padding: '12px' }}>
          {logoUrl ? (
            <img src={logoUrl} alt={company}
                 style={{ width: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
          ) : (
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#fff',
                          textAlign: 'center', letterSpacing: '-0.03em' }}>
              {(sig.firstName?.[0] || 'A').toUpperCase()}
            </div>
          )}
        </div>
 
        {/* Right: info */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '6px' }}>
            {photoUrl && <img src={photoUrl} alt={name}
              style={{ width: '40px', height: '40px', borderRadius: br, objectFit: 'cover', flexShrink: 0 }} />}
            <div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: secondaryColor }}>{name}</div>
              <div style={{ fontSize: '11px', color: primaryColor, fontWeight: '600' }}>{jobTitle}</div>
            </div>
          </div>
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
    </div>
  )
}

