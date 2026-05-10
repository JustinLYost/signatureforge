import { Suspense } from 'react'
import Builder from '../components/Builder'

export const metadata = {
  title: 'Build Your Signature — SignatureForge',
  description: 'Create your professional email signature in 60 seconds.',
}

export default function BuilderPage() {
  return (
    <main className='builder-page'>
      <nav style={{
        height: '56px',
        borderBottom: '1px solid #E5E7EB',
        backgroundColor: '#fff',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <a href='/' style={{
          fontSize: '18px',
          fontWeight: '800',
          color: '#1A2E4A',
          textDecoration: 'none',
          letterSpacing: '-0.02em',
        }}>
          SignatureForge
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '13px' }}>
          <a href='/faq' style={{ color: '#6B7280', textDecoration: 'none' }}>FAQ</a>
          <a href='/contact' style={{ color: '#6B7280', textDecoration: 'none' }}>Help</a>
          <span style={{
            backgroundColor: '#EFF6FF',
            color: '#2563EB',
            fontSize: '12px',
            fontWeight: '600',
            padding: '4px 10px',
            borderRadius: '20px',
          }}>
            $14 one-time · no subscription
          </span>
        </div>
      </nav>
      <div style={{ height: 'calc(100dvh - 56px)' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Builder />
        </Suspense>
      </div>
    </main>
  )
}