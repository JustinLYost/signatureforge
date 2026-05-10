import Link from 'next/link'

export const metadata = {
  title: 'SignatureForge — AI Email Signature Generator | $14 One-Time',
  description:
    'Create a professional email signature in 60 seconds. LinkedIn auto-import, ' +
    'brand color extraction, Outlook-safe HTML. $14 one-time — no subscription ever.',
}

export default function LandingPage() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#111827', overflowX: 'hidden' }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #E5E7EB',
        padding: '0 32px', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px', fontWeight: '800', color: '#1A2E4A', letterSpacing: '-0.02em' }}>
            SignatureForge
          </span>
          <span style={{
            fontSize: '11px', fontWeight: '600', color: '#2563EB',
            backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '20px',
          }}>
            AI-Powered
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <a href='/faq' style={{ fontSize: '14px', color: '#6B7280', textDecoration: 'none', fontWeight: '500' }}>FAQ</a>
          <a href='/about' style={{ fontSize: '14px', color: '#6B7280', textDecoration: 'none', fontWeight: '500' }}>About</a>
          <a href='/blog' style={{ fontSize: '14px', color: '#6B7280', textDecoration: 'none', fontWeight: '500' }}>Blog</a>
          <Link href='/builder' style={{
            backgroundColor: '#2563EB', color: '#fff',
            padding: '9px 20px', borderRadius: '8px',
            fontSize: '14px', fontWeight: '600', textDecoration: 'none',
          }}>
            Build my signature →
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(135deg, #1A2E4A 0%, #2563EB 100%)',
        padding: '100px 32px 80px',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          backgroundColor: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '20px', padding: '6px 14px', marginBottom: '28px',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4ADE80', display: 'inline-block' }} />
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
            Veteran-owned · One-time price · No subscription ever
          </span>
        </div>

        <h1 style={{
          fontSize: '54px', fontWeight: '900', color: '#fff',
          lineHeight: 1.1, letterSpacing: '-0.03em',
          maxWidth: '720px', margin: '0 auto 20px',
        }}>
          Professional email signatures in 60 seconds
        </h1>
        <p style={{
          fontSize: '20px', color: 'rgba(255,255,255,0.8)',
          maxWidth: '560px', margin: '0 auto 40px', lineHeight: 1.6,
        }}>
          LinkedIn auto-import. Brand color extraction. Outlook-safe HTML.
          Pay once — use forever.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href='/builder' style={{
            backgroundColor: '#fff', color: '#1A2E4A',
            padding: '16px 36px', borderRadius: '10px',
            fontSize: '16px', fontWeight: '800', textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
            display: 'inline-block',
          }}>
            Build my signature — $14 →
          </Link>
          <a href='#features' style={{
            backgroundColor: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff', padding: '16px 28px', borderRadius: '10px',
            fontSize: '16px', fontWeight: '600', textDecoration: 'none',
            display: 'inline-block',
          }}>
            See how it works
          </a>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'center', gap: '48px',
          marginTop: '64px', flexWrap: 'wrap',
        }}>
          {[
            { value: '$14', label: 'One-time price' },
            { value: '60s', label: 'To build your signature' },
            { value: '28', label: 'Templates included' },
            { value: '3', label: 'AI features' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: '900', color: '#fff', lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '6px', fontWeight: '500' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEM STRIP ── */}
      <section style={{
        backgroundColor: '#FEF3C7', padding: '20px 32px', textAlign: 'center',
        borderBottom: '1px solid #FDE68A',
      }}>
        <p style={{ fontSize: '15px', color: '#92400E', fontWeight: '500', margin: 0 }}>
          😤 Most signature tools charge a monthly fee for something you set up once.
          Others output HTML that immediately breaks in Outlook.
          <strong> We fixed both problems.</strong>
        </p>
      </section>

      {/* ── FEATURES ── */}
      <section id='features' style={{ padding: '96px 32px', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '13px', fontWeight: '700', color: '#2563EB', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
              AI Features
            </p>
            <h2 style={{ fontSize: '40px', fontWeight: '900', color: '#1A2E4A', letterSpacing: '-0.02em', lineHeight: 1.2, margin: '0 auto', maxWidth: '600px' }}>
              Three things no other tool does
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              {
                icon: '🔗',
                title: 'LinkedIn Auto-Import',
                desc: 'Paste your LinkedIn URL and we pull your name, title, company, and photo automatically. Your form fills in under 10 seconds.',
                color: '#EFF6FF',
                border: '#BFDBFE',
              },
              {
                icon: '🎨',
                title: 'Brand Color Extraction',
                desc: 'Paste your company website URL and we screenshot it, analyze the dominant colors, and apply them to your signature automatically.',
                color: '#F0FDF4',
                border: '#BBF7D0',
              },
              {
                icon: '✨',
                title: 'Smart CTA Generator',
                desc: 'Enter your job title and AI writes three targeted call-to-action options tailored to your role. A Sales Manager gets "Book a 15-min call." A designer gets "View my portfolio."',
                color: '#FDF4FF',
                border: '#E9D5FF',
              },
            ].map((f, i) => (
              <div key={i} style={{
                backgroundColor: f.color,
                border: `1px solid ${f.border}`,
                borderRadius: '16px', padding: '32px',
              }}>
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{f.icon}</div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1A2E4A', marginBottom: '12px', lineHeight: 1.3 }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.7, margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUTLOOK CALLOUT ── */}
      <section style={{ backgroundColor: '#1A2E4A', padding: '80px 32px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '64px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <p style={{ fontSize: '13px', fontWeight: '700', color: '#60A5FA', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
              The #1 Complaint
            </p>
            <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#fff', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '20px' }}>
              Your signature actually works in Outlook
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '24px' }}>
              Outlook uses Microsoft Word's rendering engine — not a browser. That's why most signatures break. We generate a completely separate table-based HTML version that's tested against Outlook 2016, 2019, 2021, and 365 desktop.
            </p>
            <p style={{ fontSize: '14px', color: '#4ADE80', fontWeight: '600' }}>
              ✓ Gmail · ✓ Outlook 2016/2019/2021/365 · ✓ Apple Mail · ✓ Thunderbird
            </p>
          </div>
          <div style={{ flex: 1, minWidth: '280px' }}>
            {[
              { tool: 'Typical subscription tools', outlook: false, price: '$100+/yr' },
              { tool: 'Free generator tools', outlook: false, price: 'Free' },
              { tool: 'SignatureForge', outlook: true, price: '$14 once' },
            ].map((row, i) => (
              <div key={i} style={{
                backgroundColor: i === 2 ? 'rgba(37,99,235,0.3)' : 'rgba(255,255,255,0.05)',
                border: i === 2 ? '1px solid rgba(37,99,235,0.5)' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px', padding: '16px 20px', marginBottom: '10px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontSize: '15px', fontWeight: '600', color: i === 2 ? '#fff' : 'rgba(255,255,255,0.7)' }}>
                  {row.tool}
                </span>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: row.outlook ? '#4ADE80' : '#F87171', fontWeight: '600' }}>
                    {row.outlook ? '✓ Outlook-safe' : '✗ Breaks in Outlook'}
                  </span>
                  <span style={{ fontSize: '13px', color: i === 2 ? '#60A5FA' : 'rgba(255,255,255,0.5)', fontWeight: '600' }}>
                    {row.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '96px 32px', backgroundColor: '#F9FAFB' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', fontWeight: '700', color: '#2563EB', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
            How It Works
          </p>
          <h2 style={{ fontSize: '40px', fontWeight: '900', color: '#1A2E4A', letterSpacing: '-0.02em', marginBottom: '56px' }}>
            Done in three steps
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
            {[
              { step: '01', title: 'Paste your LinkedIn URL', desc: 'We auto-import your name, title, company, and photo. Or fill in manually — takes 60 seconds.' },
              { step: '02', title: 'Pick a template & colors', desc: 'Choose from 28 professional templates. Paste your website URL to auto-extract your brand colors.' },
              { step: '03', title: 'Pay once, download forever', desc: 'One $14 payment. Get Gmail HTML, Outlook HTML, and PNG. A 30-day edit link is included.' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#2563EB', letterSpacing: '0.1em', marginBottom: '12px' }}>
                  {s.step}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1A2E4A', marginBottom: '10px', lineHeight: 1.3 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.7, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding: '96px 32px', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', fontWeight: '700', color: '#2563EB', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Pricing
          </p>
          <h2 style={{ fontSize: '40px', fontWeight: '900', color: '#1A2E4A', letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Simple. Honest. One-time.
          </h2>
          <p style={{ fontSize: '17px', color: '#6B7280', marginBottom: '56px' }}>
            No subscriptions. No accounts required. No watermarks.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
            {[
              {
                name: 'Individual',
                price: '$14',
                desc: 'One professional signature',
                features: ['All 28 templates', 'All 3 AI features', 'Gmail + Outlook HTML', 'PNG download', '30-day edit link'],
                cta: 'Get started',
                highlight: true,
              },
              {
                name: 'Team 3-Pack',
                price: '$39',
                desc: '3 signatures for your team',
                features: ['Everything in Individual', '3 separate signatures', 'Mix and match templates', '30-day edit links', 'Priority support'],
                cta: 'Get 3-pack',
                highlight: false,
              },
              {
                name: 'Business 10-Pack',
                price: '$69',
                desc: '10 signatures for your org',
                features: ['Everything in Team', '10 separate signatures', 'Bulk generation', '30-day edit links', 'Priority support'],
                cta: 'Get 10-pack',
                highlight: false,
              },
            ].map((plan, i) => (
              <div key={i} style={{
                border: plan.highlight ? '2px solid #2563EB' : '1px solid #E5E7EB',
                borderRadius: '16px', padding: '32px',
                backgroundColor: plan.highlight ? '#EFF6FF' : '#fff',
                position: 'relative',
              }}>
                {plan.highlight && (
                  <div style={{
                    position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                    backgroundColor: '#2563EB', color: '#fff',
                    fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px',
                    whiteSpace: 'nowrap',
                  }}>
                    MOST POPULAR
                  </div>
                )}
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#1A2E4A', marginBottom: '4px' }}>{plan.name}</div>
                <div style={{ fontSize: '40px', fontWeight: '900', color: '#1A2E4A', lineHeight: 1, marginBottom: '4px' }}>{plan.price}</div>
                <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '24px' }}>{plan.desc}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', textAlign: 'left' }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ fontSize: '14px', color: '#374151', padding: '5px 0', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#2563EB', flexShrink: 0, fontWeight: '700' }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href='/builder' style={{
                  display: 'block', textAlign: 'center',
                  backgroundColor: plan.highlight ? '#2563EB' : '#1A2E4A',
                  color: '#fff', padding: '12px', borderRadius: '8px',
                  fontSize: '14px', fontWeight: '700', textDecoration: 'none',
                }}>
                  {plan.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SNIPPET ── */}
      <section style={{ padding: '80px 32px', backgroundColor: '#F9FAFB' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#1A2E4A', marginBottom: '40px', textAlign: 'center', letterSpacing: '-0.02em' }}>
            Common questions
          </h2>
          {[
            { q: 'Does this really work in Outlook?', a: 'Yes. We generate a separate table-based HTML file tested against Outlook 2016, 2019, 2021, and 365 desktop. No other free tool does this correctly.' },
            { q: 'Is it really a one-time payment?', a: 'Yes. $14, once. No subscription, no account required, no watermark. You pay, you get your files, done.' },
            { q: 'Do I need to create an account?', a: 'No account needed to build or purchase. After payment you receive a 30-day edit link to return and adjust your signature.' },
            { q: "What if I'm not happy with it?", a: "30-day money-back guarantee. Email hello@signature-forge.com and we'll refund you in full, no questions asked." },
          ].map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid #E5E7EB', padding: '24px 0' }}>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1A2E4A', marginBottom: '8px' }}>
                {item.q}
              </h3>
              <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.7, margin: 0 }}>
                {item.a}
              </p>
            </div>
          ))}
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <a href='/faq' style={{ fontSize: '14px', color: '#2563EB', fontWeight: '600', textDecoration: 'none' }}>
              View all FAQs →
            </a>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        background: 'linear-gradient(135deg, #1A2E4A 0%, #2563EB 100%)',
        padding: '96px 32px', textAlign: 'center',
      }}>
        <h2 style={{ fontSize: '44px', fontWeight: '900', color: '#fff', letterSpacing: '-0.02em', marginBottom: '16px', lineHeight: 1.2 }}>
          Ready to look more professional?
        </h2>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.75)', marginBottom: '40px' }}>
          Build your signature in 60 seconds. $14, once, forever.
        </p>
        <Link href='/builder' style={{
          backgroundColor: '#fff', color: '#1A2E4A',
          padding: '18px 40px', borderRadius: '10px',
          fontSize: '17px', fontWeight: '800', textDecoration: 'none',
          display: 'inline-block',
          boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
        }}>
          Build my signature — $14 →
        </Link>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '16px' }}>
          30-day money-back guarantee · No account required · Veteran-owned
        </p>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        backgroundColor: '#111827', padding: '40px 32px',
        display: 'flex', flexWrap: 'wrap', gap: '16px',
        alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '15px', fontWeight: '800', color: '#fff' }}>SignatureForge</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
          {[
            ['Privacy', '/privacy'], ['Terms', '/terms'],
            ['Refunds', '/refunds'], ['Contact', '/contact'],
            ['About', '/about'], ['FAQ', '/faq'], ['Blog', '/blog'],
          ].map(([label, href]) => (
            <a key={label} href={href} style={{ fontSize: '13px', color: '#9CA3AF', textDecoration: 'none', fontWeight: '500' }}>
              {label}
            </a>
          ))}
        </div>
        <p style={{ fontSize: '13px', color: '#4B5563', margin: 0 }}>
          © {new Date().getFullYear()} SignatureForge. Veteran-owned.
        </p>
      </footer>

    </div>
  )
}