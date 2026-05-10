// ─────────────────────────────────────────────────────
// GMAIL HTML GENERATOR
// Uses modern HTML. Works in Gmail, Apple Mail, Thunderbird.
// ─────────────────────────────────────────────────────
export function generateGmailHTML(sig) {
  const {
    firstName, lastName, jobTitle, company,
    email, phone, mobile, website, address,
    photoUrl, logoUrl, photoShape,

    social, primaryColor, secondaryColor, textColor,
    font, cta, disclaimer, template
  } = sig
 
  const fullName = [firstName, lastName].filter(Boolean).join(' ')
  const fontStack = `${font}, Arial, Helvetica, sans-serif`
 
  // Social icon SVGs (inline for email compatibility)
  const socialIcons = {
    linkedin: `<a href='${social.linkedin}' style='text-decoration:none'>
      <img src='https://www.signatureforge.com/icons/linkedin.png'
           width='18' height='18' alt='LinkedIn' style='display:inline-block' /></a>`,
    twitter: `<a href='${social.twitter}' style='text-decoration:none'>
      <img src='https://www.signatureforge.com/icons/twitter.png'
           width='18' height='18' alt='Twitter' style='display:inline-block' /></a>`,
    // Add remaining social icons with same pattern
  }
 
  const activeSocial = Object.entries(social)
    .filter(([, url]) => url)
    .map(([key]) => socialIcons[key] || '')
    .join(' ')
 
  // CTA button — only if mode is not 'none' and text+url are set
  const ctaHTML = (cta.mode !== 'none' && cta.text && cta.url) ? `
    <div style='margin-top:10px'>
      <a href='${cta.url}'
         style='display:inline-block; padding:8px 16px;
                background-color:${primaryColor}; color:#ffffff;
                font-family:${fontStack}; font-size:13px;
                font-weight:600; text-decoration:none; border-radius:6px'>
        ${cta.text}
      </a>
    </div>` : ''
 
  // Photo element — shape controlled by border-radius
  const photoRadius = photoShape === 'circle' ? '50%'
    : photoShape === 'rounded' ? '8px' : '0px'
 
  const photoHTML = photoUrl ? `
    <img src='${photoUrl}' width='72' height='72' alt='${fullName}'
         style='display:block; border-radius:${photoRadius};
                object-fit:cover; margin-right:14px' />` : ''
 
  return `
<!DOCTYPE html>
<html>
<body style='margin:0;padding:0;background:#fff'>
<div style='font-family:${fontStack}; max-width:520px; padding:16px 0;
            border-top:3px solid ${primaryColor}'>
  <div style='display:flex; align-items:flex-start'>
    ${photoHTML}
    <div style='flex:1'>

      <div style='font-size:17px; font-weight:700;
                  color:${secondaryColor}; line-height:1.2'>
        ${fullName}
      </div>
      <div style='font-size:13px; color:${primaryColor};
                  font-weight:600; margin-top:2px'>
        ${jobTitle}${company ? ' &bull; ' + company : ''}
      </div>
      <div style='margin-top:8px; font-size:12px;
                  color:${textColor}; line-height:1.8'>
        ${email ? `<a href='mailto:${email}'
          style='color:${primaryColor};text-decoration:none'>${email}</a>` : ''}
        ${phone ? ` &nbsp;|&nbsp; ${phone}` : ''}
        ${website ? `<br><a href='${website}'
          style='color:${primaryColor};text-decoration:none'>${website}</a>` : ''}
        ${address ? `<br>${address}` : ''}
      </div>
      ${activeSocial ? `<div style='margin-top:8px'>${activeSocial}</div>` : ''}
      ${ctaHTML}
      ${disclaimer ? `<div style='margin-top:10px; font-size:10px;
        color:#9CA3AF; line-height:1.4'>${disclaimer}</div>` : ''}
    </div>
    ${logoUrl ? `<img src='${logoUrl}' height='40' alt='${company}'
      style='display:block; margin-left:14px; object-fit:contain' />` : ''}
  </div>
</div>
</body>
</html>`
}
 
 
// ─────────────────────────────────────────────────────
// OUTLOOK HTML GENERATOR
// TABLES ONLY. Inline styles ONLY. No CSS classes.
// No border-radius. No flex. No grid.
// Tested against Outlook 2016, 2019, 2021, 365 desktop.
// ─────────────────────────────────────────────────────
export function generateOutlookHTML(sig) {
  const {
    firstName, lastName, jobTitle, company,
    email, phone, mobile, website, address,
    photoUrl, logoUrl,
    social, primaryColor, secondaryColor, textColor,
    font, cta, disclaimer
  } = sig
 
  const fullName = [firstName, lastName].filter(Boolean).join(' ')
  const fontStack = `${font}, Arial, Helvetica, sans-serif`
 
  // CTA for Outlook — table-based button (border-radius removed)
  const ctaHTML = (cta.mode !== 'none' && cta.text && cta.url) ? `
    <tr>
      <td style='padding-top:10px'>
        <table cellpadding='0' cellspacing='0' border='0'>
          <tr>

            <td bgcolor='${primaryColor}'
                style='padding:8px 16px; mso-padding-alt:8px 16px'>
              <a href='${cta.url}'
                 style='font-family:${fontStack}; font-size:13px;
                        font-weight:bold; color:#ffffff;
                        text-decoration:none; display:block'>
                ${cta.text}
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>` : ''
 
  return `
<table cellpadding='0' cellspacing='0' border='0'
       style='font-family:${fontStack}; width:520px'>
  <tr>
    <td colspan='3' style='border-top:3px solid ${primaryColor};
        padding-bottom:12px; font-size:0; line-height:0'>&nbsp;</td>
  </tr>
  <tr>
    <!-- PHOTO COLUMN -->
    ${photoUrl ? `<td valign='top' style='padding-right:14px; width:72px'>
      <img src='${photoUrl}' width='72' height='72' alt='${fullName}'
           style='display:block' />
    </td>` : '<td style="width:0"></td>'}
 
    <!-- INFO COLUMN -->
    <td valign='top'>
      <table cellpadding='0' cellspacing='0' border='0' width='100%'>
        <tr>
          <td style='font-size:17px; font-weight:bold;
              color:${secondaryColor}; line-height:1.2;
              font-family:${fontStack}'>
            ${fullName}
          </td>
        </tr>
        <tr>
          <td style='font-size:13px; color:${primaryColor};
              font-weight:bold; padding-top:3px;
              font-family:${fontStack}'>
            ${jobTitle}${company ? ' &bull; ' + company : ''}
          </td>
        </tr>
        <tr>
          <td style='font-size:12px; color:${textColor};
              line-height:1.8; padding-top:8px;
              font-family:${fontStack}'>
            ${email ? `<a href='mailto:${email}'
              style='color:${primaryColor};text-decoration:none'>${email}</a>` : ''}
            ${phone ? ` &nbsp;|&nbsp; ${phone}` : ''}
            ${website ? `<br /><a href='${website}'

              style='color:${primaryColor};text-decoration:none'>${website}</a>` : ''}
            ${address ? `<br />${address}` : ''}
          </td>
        </tr>
        ${ctaHTML}
        ${disclaimer ? `<tr><td style='font-size:10px; color:#9CA3AF;
          line-height:1.4; padding-top:10px;
          font-family:${fontStack}'>${disclaimer}</td></tr>` : ''}
      </table>
    </td>
 
    <!-- LOGO COLUMN -->
    ${logoUrl ? `<td valign='top' align='right' style='padding-left:14px; width:80px'>
      <img src='${logoUrl}' height='40' alt='${company}'
           style='display:block' />
    </td>` : '<td></td>'}
  </tr>
</table>`
}

