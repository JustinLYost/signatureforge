import PageLayout from '../components/PageLayout'
import Link from 'next/link'
 
export const metadata = {
  title: 'Blog — Email Signature Tips & Guides',
  description: 'Practical guides on email signatures, Outlook compatibility, and professional branding.',
}
 
// Add posts here as you publish them
const POSTS = [
  // Example post structure (uncomment and fill in when you publish):
  // {
  //   slug: 'why-email-signatures-break-in-outlook',
  //   title: 'Why Your Email Signature Breaks in Outlook (And How to Fix It)',
  //   date: '2026-05-15',

  //   excerpt: 'Outlook uses Word\'s rendering engine, not a browser. Here\'s what that means for your signature HTML.',
  //   readTime: '5 min read',
  // },
]
 
export default function BlogPage() {
  return (
    <PageLayout
      title='Blog'
      subtitle='Email signature tips, guides, and best practices'
    >
      {POSTS.length === 0 ? (
        <div className='text-center py-16'>
          <p className='text-gray-400 text-lg mb-2'>First post coming soon.</p>
          <p className='text-gray-400 text-sm'>
            We are writing guides on email signature best practices,
            Outlook compatibility, and professional branding.
          </p>
        </div>
      ) : (
        <div className='space-y-4 max-w-2xl'>
          {POSTS.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className='block p-6 bg-white rounded-xl border border-gray-200
                         hover:border-blue-300 hover:shadow-sm transition-all'>
              <div className='flex items-center gap-3 text-xs text-gray-400 mb-2'>
                <time>{post.date}</time>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className='text-base font-semibold text-gray-900 mb-1'>
                {post.title}
              </h2>

              <p className='text-sm text-gray-500'>{post.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
    </PageLayout>
  )
}

