import AlternatingTreatmentSteps from '@/app/components/treatments/AlternatingTreatmentSteps'
import EarlyInterventionSection from '@/app/components/treatments/EarlyInterventionSection'
import FAQSection from '@/app/components/treatments/FAQSection'
import TreatmentDetailSection from '@/app/components/treatments/TreatmentDetailSection'
import React from 'react'

export default function page() {
  return (
    <div>
      <TreatmentDetailSection></TreatmentDetailSection>
      <AlternatingTreatmentSteps></AlternatingTreatmentSteps>
      <EarlyInterventionSection></EarlyInterventionSection>
      <FAQSection></FAQSection>
    </div>
  )
}
