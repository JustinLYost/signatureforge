'use client'
import { getFullName, getFontStack, getActiveSocials, SocialIcons, CTAButton, Disclaimer } from '@/lib/templateHelpers'
 
export default function MonogramTemplate({ sig }) {
  const { jobTitle, company, email, phone, website,
    photoUrl, logoUrl, primaryColor, secondaryColor, textColor, font,
    social, cta, disclaimer } = sig
  const name = getFullName(sig)
  const fontStack = getFontStack(sig)
  const activeSocials = getActiveSocials(social)
  const initials = [sig.firstName?.[0], sig.lastName?.[0]].filter(Boolean).join('').toUpperCase() || 'SF'
 
  return (
    <div style={{ fontFamily: fontStack, maxWidth: '520px' }}>
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
 
        {/* Monogram circle — shows over photo if photo exists */}
        {photoUrl ? (
          <img src={photoUrl} alt={name}
               style={{ width: '66px', height: '66px', borderRadius: '50%',
                        objectFit: 'cover', flexShrink: 0 }} />
        ) : (
          <div style={{ width: '66px', height: '66px', borderRadius: '50%',
                        backgroundColor: primaryColor, display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0 }}>
            <span style={{ fontSize: '22px', fontWeight: '800', color: '#fff',
                           letterSpacing: '-0.02em' }}>{initials}</span>
          </div>
        )}
 
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '17px', fontWeight: '700', color: secondaryColor }}>{name}</div>
              <div style={{ fontSize: '12px', color: primaryColor, fontWeight: '600', marginTop: '2px' }}>
                {jobTitle}{company ? ` • ${company}` : ''}
              </div>
            </div>
            {logoUrl && <img src={logoUrl} alt={company}
              style={{ height: '32px', objectFit: 'contain', flexShrink: 0 }} />}
          </div>
 
          <div style={{ height: '1px', backgroundColor: `${primaryColor}30`, margin: '8px 0' }} />

          <div style={{ fontSize: '11px', color: textColor, lineHeight: 1.9 }}>
            {email && <><a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{email}</a></>}
            {phone && <span style={{ color: '#9CA3AF' }}> &nbsp;|&nbsp; {phone}</span>}
            {website && (<><br /><a href={website} style={{ color: primaryColor, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a></>)}
          </div>
          {activeSocials.length > 0 && <SocialIcons socials={activeSocials} color={primaryColor} />}
          <CTAButton cta={cta} primaryColor={primaryColor} />
          <Disclaimer text={disclaimer} />
        </div>
      </div>
    </div>
  )
}

