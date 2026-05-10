'use client'
import { getFullName, getFontStack, getBorderRadius, getActiveSocials, CTAButton, Disclaimer } from '@/lib/templateHelpers'
 
export default function CenteredTemplate({ sig }) {
  const { jobTitle, company, email, phone, website,
    photoUrl, logoUrl, primaryColor, secondaryColor, textColor, font,

    social, cta, disclaimer, photoShape } = sig
  const name = getFullName(sig)
  const fontStack = getFontStack(sig)
  const br = getBorderRadius(photoShape)
  const activeSocials = getActiveSocials(social)
 
  return (
    <div style={{ fontFamily: fontStack, maxWidth: '440px', textAlign: 'center' }}>
      {photoUrl && <img src={photoUrl} alt={name}
        style={{ width: '64px', height: '64px', borderRadius: br, objectFit: 'cover',
                 display: 'block', margin: '0 auto 10px' }} />}
 
      <div style={{ fontSize: '20px', fontWeight: '300', letterSpacing: '0.05em',
                    color: secondaryColor, lineHeight: 1.2 }}>{name}</div>
 
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
                    gap: '8px', margin: '6px 0' }}>
        <div style={{ height: '1px', flex: 1, backgroundColor: primaryColor, opacity: 0.3 }} />
        <div style={{ fontSize: '11px', color: primaryColor, fontWeight: '600',
                      letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {jobTitle}{company ? ` • ${company}` : ''}
        </div>
        <div style={{ height: '1px', flex: 1, backgroundColor: primaryColor, opacity: 0.3 }} />
      </div>
 
      <div style={{ fontSize: '11px', color: textColor, lineHeight: 2 }}>
        {email && <div><a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{email}</a></div>}
        {phone && <div>{phone}</div>}
        {website && <div><a href={website} style={{ color: primaryColor, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a></div>}
      </div>
 
      {activeSocials.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '8px' }}>
          {activeSocials.map(([key, url]) => (
            <a key={key} href={url}
               style={{ width: '20px', height: '20px', backgroundColor: primaryColor,
                        borderRadius: '50%', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', textDecoration: 'none' }}>
              <span style={{ color: '#fff', fontSize: '8px', fontWeight: '700' }}>{key[0].toUpperCase()}</span>
            </a>
          ))}
        </div>
      )}
 
      {logoUrl && <img src={logoUrl} alt={company}
        style={{ height: '28px', objectFit: 'contain', display: 'block', margin: '10px auto 0' }} />}
      <CTAButton cta={cta} primaryColor={primaryColor} />
      <Disclaimer text={disclaimer} />
    </div>
  )
}

