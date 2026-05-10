'use client'
import { getFullName, getFontStack, getBorderRadius, getActiveSocials, SocialIcons, CTAButton, Disclaimer } from '@/lib/templateHelpers'

const DEFAULT_METRICS = [
  { value: '10+', label: 'Years Experience' },
  { value: '100+', label: 'Clients Served' },
  { value: '98%', label: 'Satisfaction Rate' },
]

export default function ConsultantTemplate({ sig }) {
  const { jobTitle, company, email, phone, website,
    photoUrl, logoUrl, primaryColor, secondaryColor, textColor, font,
    social, cta, disclaimer, photoShape } = sig
  const name = getFullName(sig)
  const fontStack = getFontStack(sig)
  const br = getBorderRadius(photoShape)
  const activeSocials = getActiveSocials(social)
  const metrics = sig.metrics?.length ? sig.metrics : DEFAULT_METRICS

  return (
    <div style={{ fontFamily: fontStack, maxWidth: '520px' }}>
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        {photoUrl && (
          <img src={photoUrl} alt={name}
            style={{ width: '60px', height: '60px', borderRadius: br,
                     objectFit: 'cover', flexShrink: 0 }} />
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '17px', fontWeight: '700', color: secondaryColor }}>
            {name}
          </div>
          <div style={{ fontSize: '12px', color: primaryColor, fontWeight: '600', marginTop: '2px' }}>
            {jobTitle}{company ? ` \u2022 ${company}` : ''}
          </div>

          {/* Dynamic metrics strip */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px', marginBottom: '8px' }}>
            {metrics.map((m, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: '800', color: primaryColor }}>
                  {m.value}
                </div>
                <div style={{ fontSize: '9px', color: '#9CA3AF', textTransform: 'uppercase',
                              letterSpacing: '0.04em', lineHeight: 1.3 }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{ height: '1px', backgroundColor: '#E5E7EB', marginBottom: '8px' }} />

          <div style={{ fontSize: '11px', color: textColor, lineHeight: 1.9 }}>
            {email && (
              <><a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>
                {email}
              </a></>
            )}
            {phone && <span style={{ color: '#9CA3AF' }}> &nbsp;|&nbsp; {phone}</span>}
            {website && (
              <><br />
              <a href={website} style={{ color: primaryColor, textDecoration: 'none' }}>
                {website.replace(/^https?:\/\//, '')}
              </a></>
            )}
          </div>

          {activeSocials.length > 0 && <SocialIcons socials={activeSocials} color={primaryColor} />}
          <CTAButton cta={cta} primaryColor={primaryColor} />
          <Disclaimer text={disclaimer} />
        </div>

        {logoUrl && (
          <img src={logoUrl} alt={company}
            style={{ height: '36px', objectFit: 'contain', flexShrink: 0, marginTop: '4px' }} />
        )}
      </div>
    </div>
  )
}