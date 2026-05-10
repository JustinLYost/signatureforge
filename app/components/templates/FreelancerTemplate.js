'use client'
import { getFullName, getFontStack, getBorderRadius, getActiveSocials, CTAButton, Disclaimer } from '@/lib/templateHelpers'

export default function FreelancerTemplate({ sig }) {
  const { jobTitle, company, email, phone, website,
    photoUrl, primaryColor, secondaryColor, textColor, font,
    social, cta, disclaimer, photoShape } = sig
  const name = getFullName(sig)
  const fontStack = getFontStack(sig)
  const br = getBorderRadius(photoShape)
  const activeSocials = getActiveSocials(social)

  return (
    <div style={{ fontFamily: fontStack, maxWidth: '520px' }}>
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>

        {photoUrl && (
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <img src={photoUrl} alt={name}
                 style={{ width: '64px', height: '64px', borderRadius: br, objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '2px', right: '2px',
                          width: '12px', height: '12px', backgroundColor: '#22C55E',
                          borderRadius: '50%', border: '2px solid #fff' }} />
          </div>
        )}

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '16px', fontWeight: '700', color: secondaryColor }}>{name}</div>
          <div style={{ fontSize: '12px', color: primaryColor, fontWeight: '600', marginTop: '2px' }}>
            {jobTitle}{company ? ` \u2022 ${company}` : ''}
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px',
                        marginTop: '6px', padding: '3px 9px',
                        backgroundColor: '#F0FDF4', border: '1px solid #86EFAC',
                        borderRadius: '20px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22C55E' }} />
            <span style={{ fontSize: '10px', color: '#16A34A', fontWeight: '600' }}>Available for projects</span>
          </div>

          <div style={{ fontSize: '11px', color: textColor, lineHeight: 1.9, marginTop: '8px' }}>
            {email && <><a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{email}</a><br /></>}
            {website && <a href={website} style={{ color: primaryColor, textDecoration: 'none', fontWeight: '600' }}>
              {website.replace(/^https?:\/\//, '')}</a>}
          </div>

          {activeSocials.length > 0 && (
            <div style={{ display: 'flex', gap: '5px', marginTop: '8px' }}>
              {activeSocials.map(([key, url]) => (
                <a key={key} href={url}
                   style={{ padding: '3px 8px', backgroundColor: `${primaryColor}15`,
                            borderRadius: '4px', color: primaryColor,
                            fontSize: '10px', fontWeight: '600', textDecoration: 'none' }}>
                  {key}
                </a>
              ))}
            </div>
          )}
          <CTAButton cta={cta} primaryColor={primaryColor} />
          <Disclaimer text={disclaimer} />
        </div>
      </div>
    </div>
  )
}