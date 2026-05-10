'use client'

export default function LinkedInImport() {
  return (
    <div style={{
      padding: '10px 12px',
      backgroundColor: '#F8FAFC',
      border: '1px solid #E2E8F0',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
    }}>
      <span style={{ fontSize: '18px', flexShrink: 0 }}>⚡</span>
      <div>
        <p style={{ fontSize: '12px', fontWeight: '700', color: '#1A2E4A', margin: '0 0 2px' }}>
          Quick tip
        </p>
        <p style={{ fontSize: '11px', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>
          Fill in your details below — most users are done in under 60 seconds.
          LinkedIn auto-import is coming in a future update.
        </p>
      </div>
    </div>
  )
}