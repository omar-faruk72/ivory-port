import React from 'react'
import ContactHero from '../../components/contact/ContactHero'
import ContactFormSection from '../../components/contact/ContactFormSection'
import ContactMap from '../../components/contact/ContactMap'

export default function page() {
  return (
    <div>
      <ContactHero></ContactHero>
      <ContactFormSection></ContactFormSection>
      <ContactMap></ContactMap>
    </div>
  )
}
