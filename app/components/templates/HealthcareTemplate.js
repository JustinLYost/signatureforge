'use client'
import { getFullName, getFontStack, getBorderRadius, getActiveSocials, SocialIcons, CTAButton, Disclaimer } from '@/lib/templateHelpers'
 
export default function HealthcareTemplate({ sig }) {
  const { jobTitle, company, email, phone, mobile, website, address,
    photoUrl, logoUrl, primaryColor, secondaryColor, textColor, font,
    social, cta, disclaimer, photoShape } = sig
  const name = getFullName(sig)
  const fontStack = getFontStack(sig)
  const br = getBorderRadius(photoShape)
  const activeSocials = getActiveSocials(social)
  const green = primaryColor || '#0D9488'
 
  return (
    <div style={{ fontFamily: fontStack, maxWidth: '520px' }}>
      {/* Top green accent + logo row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    borderBottom: `2px solid ${green}`, paddingBottom: '10px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {photoUrl && <img src={photoUrl} alt={name}
            style={{ width: '56px', height: '56px', borderRadius: br, objectFit: 'cover', flexShrink: 0 }} />}
          <div>
            <div style={{ fontSize: '17px', fontWeight: '700', color: secondaryColor }}>{name}</div>
            <div style={{ fontSize: '11px', color: green, fontWeight: '600', marginTop: '2px',
                          letterSpacing: '0.02em' }}>{jobTitle}</div>
            {company && <div style={{ fontSize: '11px', color: textColor, marginTop: '1px' }}>{company}</div>}
          </div>
        </div>
        {logoUrl && <img src={logoUrl} alt={company}
          style={{ height: '40px', objectFit: 'contain', flexShrink: 0 }} />}

      </div>
 
      {/* Contact block */}
      <div style={{ fontSize: '11px', color: textColor, lineHeight: 2 }}>
        {email && <div>📧 <a href={`mailto:${email}`} style={{ color: green, textDecoration: 'none' }}>{email}</a></div>}
        {phone && <div>📞 {phone}{mobile ? <span style={{ color: '#9CA3AF' }}> &nbsp;|&nbsp; M: {mobile}</span> : null}</div>}
        {website && <div>🌐 <a href={website} style={{ color: green, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a></div>}
        {address && <div>📍 {address}</div>}
      </div>
 
      {activeSocials.length > 0 && <SocialIcons socials={activeSocials} color={green} />}
      <CTAButton cta={cta} primaryColor={green} />
      <Disclaimer text={disclaimer} />
    </div>
  )
}

