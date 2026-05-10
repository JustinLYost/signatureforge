'use client'
import { getFullName, getFontStack, getBorderRadius, CTAButton, Disclaimer } from '@/lib/templateHelpers'

export default function LegalTemplate({ sig }) {
  const { jobTitle, company, email, phone, mobile, website, address,
    photoUrl, logoUrl, primaryColor, secondaryColor, textColor, font,
    cta, disclaimer, photoShape } = sig
  const name = getFullName(sig)
  const fontStack = getFontStack(sig)
  const br = getBorderRadius(photoShape)

  return (
    <div style={{ fontFamily: fontStack, maxWidth: '520px' }}>
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        {photoUrl && (
          <img src={photoUrl} alt={name}
            style={{ width: '64px', height: '80px', borderRadius: br, objectFit: 'cover', flexShrink: 0 }} />
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '17px', fontWeight: '700', color: secondaryColor }}>{name}</div>
          {jobTitle && <div style={{ fontSize: '12px', color: primaryColor, fontWeight: '600', marginTop: '1px' }}>{jobTitle}</div>}
          {company && <div style={{ fontSize: '12px', color: secondaryColor, marginTop: '1px' }}>{company}</div>}

          <div style={{ height: '1px', backgroundColor: primaryColor, margin: '8px 0' }} />

          <table style={{ borderCollapse: 'collapse', fontSize: '11px', color: textColor }}>
            <tbody>
              {email && (
                <tr>
                  <td style={{ paddingRight: '8px', color: primaryColor, fontWeight: '600', whiteSpace: 'nowrap' }}>E:</td>
                  <td><a href={`mailto:${email}`} style={{ color: primaryColor, textDecoration: 'none' }}>{email}</a></td>
                </tr>
              )}
              {phone && (
                <tr>
                  <td style={{ paddingRight: '8px', color: primaryColor, fontWeight: '600' }}>T:</td>
                  <td>{phone}</td>
                </tr>
              )}
              {mobile && (
                <tr>
                  <td style={{ paddingRight: '8px', color: primaryColor, fontWeight: '600' }}>M:</td>
                  <td>{mobile}</td>
                </tr>
              )}
              {website && (
                <tr>
                  <td style={{ paddingRight: '8px', color: primaryColor, fontWeight: '600' }}>W:</td>
                  <td><a href={website} style={{ color: primaryColor, textDecoration: 'none' }}>{website.replace(/^https?:\/\//, '')}</a></td>
                </tr>
              )}
              {address && (
                <tr>
                  <td style={{ paddingRight: '8px', color: primaryColor, fontWeight: '600', verticalAlign: 'top' }}>A:</td>
                  <td>{address}</td>
                </tr>
              )}
            </tbody>
          </table>

          <CTAButton cta={cta} primaryColor={primaryColor} />
          <Disclaimer text={disclaimer} />
        </div>
        {logoUrl && (
          <img src={logoUrl} alt={company}
            style={{ height: '48px', objectFit: 'contain', flexShrink: 0 }} />
        )}
      </div>
    </div>
  )
}