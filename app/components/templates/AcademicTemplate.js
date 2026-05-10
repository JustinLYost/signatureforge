'use client'
import { getFullName, getFontStack, getBorderRadius, CTAButton, Disclaimer } from '@/lib/templateHelpers'
 
export default function AcademicTemplate({ sig }) {
  const { jobTitle, company, email, phone, website, address,
    photoUrl, logoUrl, primaryColor, secondaryColor, textColor, font,

    cta, disclaimer, photoShape } = sig
  const name = getFullName(sig)
  const fontStack = getFontStack(sig)
  const br = getBorderRadius(photoShape)
 
  return (
    <div style={{ fontFamily: fontStack, maxWidth: '520px',
                  borderLeft: `4px solid ${primaryColor}`, paddingLeft: '14px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        {photoUrl && <img src={photoUrl} alt={name}
          style={{ width: '60px', height: '60px', borderRadius: br, objectFit: 'cover', flexShrink: 0 }} />}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '16px', fontWeight: '700', color: secondaryColor }}>{name}</div>
          <div style={{ fontSize: '12px', color: primaryColor, fontWeight: '600', marginTop: '1px' }}>{jobTitle}</div>
          {company && <div style={{ fontSize: '12px', color: textColor, fontStyle: 'italic', marginTop: '1px' }}>{company}</div>}
 
          <div style={{ height: '1px', backgroundColor: '#E5E7EB', margin: '8px 0' }} />
 
          <div style={{ fontSize: '11px', color: textColor, lineHeight: 1.9 }}>
            {email && <div><span style={{ fontWeight: '600', color: secondaryColor }}>Email: </span>
              <a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{email}</a></div>}
            {phone && <div><span style={{ fontWeight: '600', color: secondaryColor }}>Office: </span>{phone}</div>}
            {website && <div><span style={{ fontWeight: '600', color: secondaryColor }}>Web: </span>
              <a href={website} style={{ color: primaryColor, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a></div>}
            {address && <div><span style={{ fontWeight: '600', color: secondaryColor }}>Address: </span>{address}</div>}
          </div>
          <CTAButton cta={cta} primaryColor={primaryColor} />
          <Disclaimer text={disclaimer} />
        </div>
        {logoUrl && <img src={logoUrl} alt={company}
          style={{ height: '44px', objectFit: 'contain', flexShrink: 0 }} />}
      </div>
    </div>
  )
}

