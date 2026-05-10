'use client'
import { getFullName, getFontStack, getBorderRadius } from '@/lib/templateHelpers'
 
export default function CompactTemplate({ sig }) {
  const { jobTitle, company, email, phone, website,
    photoUrl, primaryColor, secondaryColor, textColor, font,
    cta, disclaimer, photoShape } = sig
  const name = getFullName(sig)
  const fontStack = getFontStack(sig)
  const br = getBorderRadius(photoShape)
 
  return (
    <div style={{ fontFamily: fontStack, maxWidth: '520px',
                  borderTop: `2px solid ${primaryColor}`, paddingTop: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {photoUrl && <img src={photoUrl} alt={name}
          style={{ width: '36px', height: '36px', borderRadius: br, objectFit: 'cover', flexShrink: 0 }} />}
 
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px',
                      fontSize: '11px', color: textColor }}>
          <strong style={{ color: secondaryColor, fontSize: '13px' }}>{name}</strong>
          {(jobTitle || company) && <span style={{ color: '#D1D5DB' }}>|</span>}

          {jobTitle && <span style={{ color: primaryColor, fontWeight: '600' }}>{jobTitle}</span>}
          {company && <span>{company}</span>}
          {email && <>
            <span style={{ color: '#D1D5DB' }}>|</span>
            <a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{email}</a>
          </>}
          {phone && <>
            <span style={{ color: '#D1D5DB' }}>|</span>
            <span>{phone}</span>
          </>}
          {website && <>
            <span style={{ color: '#D1D5DB' }}>|</span>
            <a href={website} style={{ color: primaryColor, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a>
          </>}
          {cta.mode !== 'none' && cta.text && <>
            <span style={{ color: '#D1D5DB' }}>|</span>
            <a href={cta.url || '#'} style={{ color: primaryColor, fontWeight: '600', textDecoration: 'none' }}>{cta.text}</a>
          </>}
        </div>
      </div>
      {disclaimer && <div style={{ fontSize: '9px', color: '#9CA3AF', marginTop: '6px' }}>{disclaimer}</div>}
    </div>
  )
}

