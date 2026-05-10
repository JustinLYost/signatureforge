// app/success/page.js
import { Suspense } from 'react'
import SuccessContent from './SuccessContent'
 
export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading your signature...</div>}>

      <SuccessContent />
    </Suspense>
  )
}

