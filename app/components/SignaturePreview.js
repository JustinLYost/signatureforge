'use client'
import MinimalTemplate    from './templates/MinimalTemplate'
import ExecutiveTemplate  from './templates/ExecutiveTemplate'
import ModernTemplate     from './templates/ModernTemplate'
import CorporateTemplate  from './templates/CorporateTemplate'
import CreativeTemplate   from './templates/CreativeTemplate'
import ElegantTemplate    from './templates/ElegantTemplate'
import TechTemplate       from './templates/TechTemplate'
import FreelancerTemplate from './templates/FreelancerTemplate'
import HealthcareTemplate from './templates/HealthcareTemplate'
import LegalTemplate      from './templates/LegalTemplate'
import RealEstateTemplate from './templates/RealEstateTemplate'
import ConsultantTemplate from './templates/ConsultantTemplate'
import AcademicTemplate   from './templates/AcademicTemplate'
import BoldTemplate       from './templates/BoldTemplate'
import StackedTemplate    from './templates/StackedTemplate'
import GradientTemplate   from './templates/GradientTemplate'
import CompactTemplate    from './templates/CompactTemplate'
import SplitTemplate      from './templates/SplitTemplate'
import BannerTemplate     from './templates/BannerTemplate'
import CardTemplate       from './templates/CardTemplate'
import CenteredTemplate   from './templates/CenteredTemplate'
import MonogramTemplate   from './templates/MonogramTemplate'
import DarkTemplate       from './templates/DarkTemplate'
import RetroTemplate      from './templates/RetroTemplate'
import FinanceTemplate    from './templates/FinanceTemplate'
import AgencyTemplate     from './templates/AgencyTemplate'
import SocialFirstTemplate from './templates/SocialFirstTemplate'
import HandwrittenTemplate from './templates/HandwrittenTemplate'

const TEMPLATES = {
  minimal:     MinimalTemplate,
  executive:   ExecutiveTemplate,
  modern:      ModernTemplate,
  corporate:   CorporateTemplate,
  creative:    CreativeTemplate,
  elegant:     ElegantTemplate,
  tech:        TechTemplate,
  freelancer:  FreelancerTemplate,
  healthcare:  HealthcareTemplate,
  legal:       LegalTemplate,
  realestate:  RealEstateTemplate,
  consultant:  ConsultantTemplate,
  academic:    AcademicTemplate,
  bold:        BoldTemplate,
  stacked:     StackedTemplate,
  gradient:    GradientTemplate,
  compact:     CompactTemplate,
  split:       SplitTemplate,
  banner:      BannerTemplate,
  card:        CardTemplate,
  centered:    CenteredTemplate,
  monogram:    MonogramTemplate,
  dark:        DarkTemplate,
  retro:       RetroTemplate,
  finance:     FinanceTemplate,
  agency:      AgencyTemplate,
  socialfirst: SocialFirstTemplate,
  handwritten: HandwrittenTemplate,
}

export default function SignaturePreview({ sig, mode }) {
  const TemplateComponent = TEMPLATES[sig.template] || MinimalTemplate

  const hasContent = sig.firstName || sig.lastName || sig.jobTitle

  return (
    <div className={`mx-auto transition-all duration-300 ${
      mode === 'mobile' ? 'max-w-sm' : 'max-w-2xl'
    }`}>

      {/* Simulated email chrome */}
      <div className='bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden'>

        {/* Fake email header */}
        <div className='bg-gray-50 border-b border-gray-200 px-5 py-3'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center
                            justify-center text-blue-600 text-xs font-bold'>
              {sig.firstName?.[0] || 'J'}{sig.lastName?.[0] || 'S'}
            </div>
            <div>
              <p className='text-xs font-medium text-gray-700'>
                {sig.firstName || 'Jane'} {sig.lastName || 'Smith'}
              </p>
              <p className='text-xs text-gray-400'>to: you@yourcompany.com</p>
            </div>
          </div>
        </div>

        {/* Fake email body */}
        <div className='px-5 py-4'>
          <p className='text-sm text-gray-600 mb-6'>
            Hi there, following up on our conversation earlier...
          </p>

          <div className='border-t border-gray-100 pt-4'>
            {hasContent ? (
              <TemplateComponent sig={sig} />
            ) : (
              <div className='py-8 text-center text-gray-300 text-sm'>
                Start filling in your details to see a preview
              </div>
            )}
          </div>
        </div>
      </div>

      <p className='text-center text-xs text-gray-400 mt-3'>
        Preview only &mdash; final output is pixel-perfect HTML
      </p>
    </div>
  )
}