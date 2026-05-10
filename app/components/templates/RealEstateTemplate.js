'use client'
import { getFullName, getFontStack, getActiveSocials, SocialIcons, CTAButton, Disclaimer } from '@/lib/templateHelpers'
 
export default function RealEstateTemplate({ sig }) {
  const { jobTitle, company, email, phone, mobile, website,
    photoUrl, logoUrl, primaryColor, secondaryColor, textColor, font,
    social, cta, disclaimer } = sig
  const name = getFullName(sig)
  const fontStack = getFontStack(sig)
  const activeSocials = getActiveSocials(social)
 
  return (
    <div style={{ fontFamily: fontStack, maxWidth: '520px', display: 'flex', gap: '0' }}>
 
      {/* Left: large photo */}
      <div style={{ flexShrink: 0, marginRight: '14px' }}>
        {photoUrl ? (
          <img src={photoUrl} alt={name}
               style={{ width: '80px', height: '100px', objectFit: 'cover',
                        borderRadius: '6px', display: 'block' }} />
        ) : (
          <div style={{ width: '80px', height: '100px', backgroundColor: '#F3F4F6',
                        borderRadius: '6px', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: '28px' }}>
            {(sig.firstName?.[0] || 'A').toUpperCase()}
          </div>
        )}
      </div>
 
      {/* Right: info */}
      <div style={{ flex: 1 }}>
        {logoUrl && <img src={logoUrl} alt={company}
          style={{ height: '28px', objectFit: 'contain', display: 'block', marginBottom: '6px' }} />}
        <div style={{ fontSize: '17px', fontWeight: '800', color: secondaryColor }}>{name}</div>
        <div style={{ fontSize: '11px', color: primaryColor, fontWeight: '600',
                      textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px' }}>
          {jobTitle}
        </div>

        <div style={{ height: '2px', background: `linear-gradient(to right, ${primaryColor}, transparent)`,
                      margin: '8px 0' }} />
        <div style={{ fontSize: '11px', color: textColor, lineHeight: 1.9 }}>
          {phone && (
  <div>
    📞 {phone}
    {mobile && <span style={{ color: '#9CA3AF' }}> | M: {mobile}</span>}
  </div>
)}
          {email && <div><a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{email}</a></div>}
          {website && <div><a href={website} style={{ color: primaryColor, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a></div>}
        </div>
        {activeSocials.length > 0 && <SocialIcons socials={activeSocials} color={primaryColor} />}
        <CTAButton cta={cta} primaryColor={primaryColor} />
        <Disclaimer text={disclaimer} />
      </div>
    </div>
  )
}

