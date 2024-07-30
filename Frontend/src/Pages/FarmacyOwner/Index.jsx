import Farmacy from "./Farmacy/Farmacy";
import { Footer } from "./Footer/Footer";
import HeroSection from "./HeroSection/HeroSection";
import Medicines from "./Inventory/Medicines/Medicines";


export default function Index_Owner() {
  return (
    <div className="">
        <HeroSection/>
        <Medicines/>
        <Farmacy/>
        <Footer/>
    </div>
  )
}
