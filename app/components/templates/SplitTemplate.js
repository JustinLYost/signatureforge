'use client'
import { getFullName, getFontStack, getBorderRadius, getActiveSocials, CTAButton, Disclaimer } from '@/lib/templateHelpers'
 
export default function SplitTemplate({ sig }) {
  const { jobTitle, company, email, phone, website,
    photoUrl, logoUrl, primaryColor, secondaryColor, textColor, font,
    social, cta, disclaimer, photoShape } = sig
  const name = getFullName(sig)
  const fontStack = getFontStack(sig)
  const br = getBorderRadius(photoShape)
  const activeSocials = getActiveSocials(social)
 
  return (
    <div style={{ fontFamily: fontStack, maxWidth: '520px' }}>
      <div style={{ height: '3px', backgroundColor: primaryColor, marginBottom: '12px' }} />
      <div style={{ display: 'flex', gap: '0' }}>
 
        {/* LEFT column: identity */}
        <div style={{ flex: 1, paddingRight: '14px',

                      borderRight: `1px solid #E5E7EB` }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
            {photoUrl && <img src={photoUrl} alt={name}
              style={{ width: '48px', height: '48px', borderRadius: br, objectFit: 'cover', flexShrink: 0 }} />}
            <div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: secondaryColor }}>{name}</div>
              <div style={{ fontSize: '11px', color: primaryColor, fontWeight: '600', marginTop: '1px' }}>{jobTitle}</div>
              {company && <div style={{ fontSize: '11px', color: textColor }}>{company}</div>}
            </div>
          </div>
          <div style={{ fontSize: '11px', color: textColor, lineHeight: 1.9 }}>
            {email && <div><a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{email}</a></div>}
            {phone && <div>{phone}</div>}
            {website && <div><a href={website} style={{ color: primaryColor, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a></div>}
          </div>
        </div>
 
        {/* RIGHT column: social + logo + CTA */}
        <div style={{ flex: 1, paddingLeft: '14px', display: 'flex', flexDirection: 'column',
                      justifyContent: 'space-between' }}>
          {logoUrl && <img src={logoUrl} alt={company}
            style={{ height: '32px', objectFit: 'contain', marginBottom: '8px' }} />}
          {activeSocials.length > 0 && (
            <div>
              <div style={{ fontSize: '9px', color: '#9CA3AF', textTransform: 'uppercase',
                            letterSpacing: '0.08em', marginBottom: '4px' }}>Connect</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {activeSocials.map(([key, url]) => (
                  <a key={key} href={url}
                     style={{ padding: '3px 7px', backgroundColor: `${primaryColor}15`,
                              borderRadius: '4px', color: primaryColor, fontSize: '10px',
                              fontWeight: '600', textDecoration: 'none' }}>
                    {key}
                  </a>
                ))}
              </div>
            </div>
          )}
          <CTAButton cta={cta} primaryColor={primaryColor} />
        </div>
      </div>
      <Disclaimer text={disclaimer} />
    </div>
  )
}

