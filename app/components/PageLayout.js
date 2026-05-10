// components/PageLayout.js
import Link from 'next/link'
 
export default function PageLayout({ title, subtitle, children }) {

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Nav */}
      <nav className='bg-white border-b border-gray-200 px-6 py-4'>
        <div className='max-w-4xl mx-auto flex items-center justify-between'>
          <Link href='/' className='text-xl font-bold text-[#1A2E4A]'>
            SignatureForge
          </Link>
          <div className='flex items-center gap-6 text-sm text-gray-500'>
            <Link href='/faq' className='hover:text-gray-700'>FAQ</Link>
            <Link href='/about' className='hover:text-gray-700'>About</Link>
            <Link href='/'
              className='px-4 py-2 bg-blue-600 text-white rounded-lg
                         font-medium hover:bg-blue-700 transition-colors'>
              Build my signature
            </Link>
          </div>
        </div>
      </nav>
 
      {/* Page header */}
      <div className='bg-white border-b border-gray-200 px-6 py-10'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-3xl font-bold text-gray-900'>{title}</h1>
          {subtitle && <p className='text-gray-500 mt-2'>{subtitle}</p>}
        </div>
      </div>
 
      {/* Content */}
      <main className='max-w-4xl mx-auto px-6 py-10'>
        {children}
      </main>
 
      {/* Footer */}

      <footer className='border-t border-gray-200 bg-white mt-20 px-6 py-8'>
        <div className='max-w-4xl mx-auto flex flex-col md:flex-row
                        items-center justify-between gap-4'>
          <span className='text-sm font-bold text-gray-700'>SignatureForge</span>
          <div className='flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400'>
            <Link href='/privacy' className='hover:text-gray-600'>Privacy</Link>
            <Link href='/terms' className='hover:text-gray-600'>Terms</Link>
            <Link href='/refunds' className='hover:text-gray-600'>Refunds</Link>
            <Link href='/contact' className='hover:text-gray-600'>Contact</Link>
            <Link href='/about' className='hover:text-gray-600'>About</Link>
            <Link href='/faq' className='hover:text-gray-600'>FAQ</Link>
          </div>
          <p className='text-xs text-gray-400'>
            &copy; {new Date().getFullYear()} SignatureForge. Veteran-owned.
          </p>
        </div>
      </footer>
    </div>
  )
}

