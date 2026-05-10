'use client'
import { getFullName, getFontStack, CTAButton, Disclaimer } from '@/lib/templateHelpers'
 
export default function FinanceTemplate({ sig }) {
  const { jobTitle, company, email, phone, mobile, website, address,
    logoUrl, primaryColor, secondaryColor, textColor, font,
    cta, disclaimer } = sig
  const name = getFullName(sig)
  const fontStack = getFontStack(sig)
 

  return (
    <div style={{ fontFamily: fontStack, maxWidth: '520px' }}>
      {/* Name + firm row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                    borderBottom: `2px solid ${primaryColor}`, paddingBottom: '6px', marginBottom: '6px' }}>
        <div>
          <span style={{ fontSize: '15px', fontWeight: '700', color: secondaryColor }}>{name}</span>
          {jobTitle && <span style={{ fontSize: '11px', color: primaryColor, fontWeight: '600',
                                    marginLeft: '8px' }}>{jobTitle}</span>}
          {company && <span style={{ fontSize: '11px', color: textColor, marginLeft: '6px' }}>{company}</span>}
        </div>
        {logoUrl && <img src={logoUrl} alt={company}
          style={{ height: '24px', objectFit: 'contain' }} />}
      </div>
 
      {/* Dense contact row */}
      <div style={{ fontSize: '10px', color: textColor, lineHeight: 1.8,
                    display: 'flex', flexWrap: 'wrap', gap: '0 16px' }}>
        {email && <span><strong style={{ color: secondaryColor }}>E</strong> <a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{email}</a></span>}
        {phone && <span><strong style={{ color: secondaryColor }}>T</strong> {phone}</span>}
        {mobile && <span><strong style={{ color: secondaryColor }}>M</strong> {mobile}</span>}
        {website && <span><strong style={{ color: secondaryColor }}>W</strong> <a href={website} style={{ color: primaryColor, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a></span>}
      </div>
 
      {address && <div style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '2px' }}>{address}</div>}
      <CTAButton cta={cta} primaryColor={primaryColor} />
      <Disclaimer text={disclaimer} />
    </div>
  )
}

