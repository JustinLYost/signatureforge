'use client'
import { getFullName, getFontStack, getActiveSocials, SocialIcons, CTAButton, Disclaimer } from '@/lib/templateHelpers'
 
export default function ElegantTemplate({ sig }) {
  const { jobTitle, company, email, phone, mobile, website, address,
    photoUrl, logoUrl, primaryColor, secondaryColor, textColor, font,
    social, cta, disclaimer, photoShape } = sig
  const name = getFullName(sig)

  const fontStack = getFontStack(sig)
  const activeSocials = getActiveSocials(social)
  const br = sig.photoShape === 'circle' ? '50%' : sig.photoShape === 'rounded' ? '8px' : '0px'
 
  return (
    <div style={{ fontFamily: fontStack, maxWidth: '480px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '12px' }}>
        {photoUrl && (
          <img src={photoUrl} alt={name}
               style={{ width: '60px', height: '60px', borderRadius: br,
                        objectFit: 'cover', flexShrink: 0 }} />
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '17px', fontWeight: '300', letterSpacing: '0.04em',
                        color: secondaryColor, lineHeight: 1.2 }}>
            {name}
          </div>
          <div style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: primaryColor, fontWeight: '500', marginTop: '4px' }}>
            {jobTitle}{company ? ` — ${company}` : ''}
          </div>
        </div>
        {logoUrl && <img src={logoUrl} alt={company}
          style={{ height: '36px', objectFit: 'contain', flexShrink: 0, opacity: 0.85 }} />}
      </div>
 
      {/* Thin elegant rule */}
      <div style={{ height: '1px', backgroundColor: primaryColor, opacity: 0.25, marginBottom: '10px' }} />
 
      <div style={{ fontSize: '11px', color: textColor, lineHeight: 2, letterSpacing: '0.01em' }}>
        {email && <><a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{email}</a><br /></>}
        {phone && <><span>{phone}</span>{mobile ? <span style={{ color: '#D1D5DB' }}> &nbsp;|&nbsp; </span> : null}</>}
        {mobile && <span>{mobile}</span>}
        {(phone || mobile) && <br />}
        {website && <><a href={website} style={{ color: primaryColor, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a><br /></>}
        {address && <span style={{ color: '#9CA3AF' }}>{address}</span>}
      </div>
 
      {activeSocials.length > 0 && <SocialIcons socials={activeSocials} color={primaryColor} />}
      <CTAButton cta={cta} primaryColor={primaryColor} />
      <Disclaimer text={disclaimer} />
    </div>
  )
}

