import AlternatingTreatmentSteps from '@/app/components/treatments/AlternatingTreatmentSteps'
import EarlyInterventionSection from '@/app/components/treatments/EarlyInterventionSection'
import TreatmentDetailSection from '@/app/components/treatments/TreatmentDetailSection'
import React from 'react'

export default function page() {
  return (
    <div>
      <TreatmentDetailSection></TreatmentDetailSection>
      <AlternatingTreatmentSteps></AlternatingTreatmentSteps>
      <EarlyInterventionSection></EarlyInterventionSection>
    </div>
  )
}
