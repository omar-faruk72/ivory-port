import ContactInfo from "./components/home-page/ContactInfo";
import ContactSection from "./components/home-page/ContactSection";
import InvisalignSection from "./components/home-page/InvisalignSection";
import WhyChooseUs from "./components/home-page/WhyChooseUs";

export default function Home() {
  return (
    <div className="">
     <InvisalignSection></InvisalignSection>
     <WhyChooseUs></WhyChooseUs>
     <ContactSection></ContactSection>
     <ContactInfo></ContactInfo>
    </div>
  );
}
