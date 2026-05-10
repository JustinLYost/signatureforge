'use client'
import { getFullName, getFontStack, getBorderRadius, getActiveSocials, CTAButton, Disclaimer } from '@/lib/templateHelpers'
 
export default function StackedTemplate({ sig }) {
  const { jobTitle, company, email, phone, website,
    photoUrl, logoUrl, primaryColor, secondaryColor, textColor, font,
    social, cta, disclaimer, photoShape } = sig
  const name = getFullName(sig)
  const fontStack = getFontStack(sig)
  const br = getBorderRadius(photoShape)
  const activeSocials = getActiveSocials(social)
 
  return (
    <div style={{ fontFamily: fontStack, maxWidth: '400px', textAlign: 'center' }}>
      <div style={{ height: '3px', backgroundColor: primaryColor, marginBottom: '14px' }} />
 
      {photoUrl && (
        <img src={photoUrl} alt={name}
             style={{ width: '68px', height: '68px', borderRadius: br,
                      objectFit: 'cover', margin: '0 auto 10px', display: 'block' }} />
      )}
 
      <div style={{ fontSize: '18px', fontWeight: '700', color: secondaryColor }}>{name}</div>
      <div style={{ fontSize: '12px', color: primaryColor, fontWeight: '600',
                    marginTop: '3px', letterSpacing: '0.03em' }}>
        {jobTitle}{company ? ` • ${company}` : ''}
      </div>
 
      {/* Centered dot divider */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', margin: '10px 0' }}>
        {[0,1,2].map(i => <div key={i} style={{ width: '4px', height: '4px',
          borderRadius: '50%', backgroundColor: i === 1 ? primaryColor : '#D1D5DB' }} />)}
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
               style={{ width: '22px', height: '22px', backgroundColor: primaryColor,
                        borderRadius: '50%', display: 'flex', alignItems: 'center',

                        justifyContent: 'center', textDecoration: 'none' }}>
              <span style={{ color: '#fff', fontSize: '9px', fontWeight: '700' }}>{key[0].toUpperCase()}</span>
            </a>
          ))}
        </div>
      )}
 
      <CTAButton cta={cta} primaryColor={primaryColor} />
      {logoUrl && <img src={logoUrl} alt={company}
        style={{ height: '28px', objectFit: 'contain', margin: '10px auto 0', display: 'block' }} />}
      <Disclaimer text={disclaimer} />
    </div>
  )
}

