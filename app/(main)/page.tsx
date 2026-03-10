import ContactInfo from "../components/home-page/ContactInfo";
import ContactSection from "../components/home-page/ContactSection";
import InvisalignSection from "../components/home-page/InvisalignSection";
import OrthodonticServices from "../components/home-page/OrthodonticServices";
import TrustedBrands from "../components/home-page/TrustedBrands";
import WhyChooseUs from "../components/home-page/WhyChooseUs";

export default function Home() {
  return (
    <div className="">
      <OrthodonticServices></OrthodonticServices>
     <InvisalignSection></InvisalignSection>
     <WhyChooseUs></WhyChooseUs>
     <ContactSection></ContactSection>
     <ContactInfo></ContactInfo>
     <TrustedBrands></TrustedBrands>
    </div>
  );
}
