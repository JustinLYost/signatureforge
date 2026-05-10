'use client'
import { getFullName, getFontStack, getBorderRadius, getActiveSocials, SocialIcons, CTAButton, Disclaimer } from '@/lib/templateHelpers'
 
export default function HandwrittenTemplate({ sig }) {
  const { jobTitle, company, email, phone, website,
    photoUrl, logoUrl, primaryColor, secondaryColor, textColor, font,
    social, cta, disclaimer, photoShape } = sig
  const name = getFullName(sig)
  const fontStack = getFontStack(sig)
  const br = getBorderRadius(photoShape)
  const activeSocials = getActiveSocials(social)
 
  return (
    <div style={{ fontFamily: fontStack, maxWidth: '520px' }}>
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        {photoUrl && <img src={photoUrl} alt={name}
          style={{ width: '60px', height: '60px', borderRadius: br, objectFit: 'cover', flexShrink: 0 }} />}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '17px', fontWeight: '700', color: secondaryColor }}>{name}</div>
          <div style={{ fontSize: '12px', color: primaryColor, fontWeight: '600', marginTop: '2px' }}>
            {jobTitle}{company ? ` • ${company}` : ''}
          </div>
 
          {/* Decorative wave divider using SVG */}
          <div style={{ margin: '8px 0', lineHeight: 0 }}>
            <svg width='120' height='8' viewBox='0 0 120 8'
                 style={{ display: 'block' }}>
              <path d='M0,4 C10,0 20,8 30,4 C40,0 50,8 60,4 C70,0 80,8 90,4 C100,0 110,8 120,4'
                    fill='none' stroke={primaryColor} strokeWidth='1.5'
                    strokeLinecap='round' />
            </svg>
          </div>

          <div style={{ fontSize: '11px', color: textColor, lineHeight: 1.9 }}>
            {email && <><a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{email}</a></>}
            {phone && <span style={{ color: '#9CA3AF' }}> &nbsp;|&nbsp; {phone}</span>}
            {website && (<><br /><a href={website} style={{ color: primaryColor, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a></>)}
          </div>
          {activeSocials.length > 0 && <SocialIcons socials={activeSocials} color={primaryColor} />}
          <CTAButton cta={cta} primaryColor={primaryColor} />
          {logoUrl && <img src={logoUrl} alt={company}
            style={{ height: '28px', objectFit: 'contain', marginTop: '8px', display: 'block' }} />}
          <Disclaimer text={disclaimer} />
        </div>
      </div>
    </div>
  )
}

