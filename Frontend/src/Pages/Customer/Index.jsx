import Count from "../../Components/Count/Count";
import Advertise from "./Advertise/Advertise";
import Farmacy from "./Farmacy/Farmacy";
import Near from "./Farmacy/Near";
import { Footer } from "./Footer/Footer";
import HeroSection from "./HeroSection/HeroSection";
import Medicines from "./Medicines/Medicines";


export default function Index() {
  return (
    <div>
        <HeroSection/>
        <Count/>
        <Medicines/>
        <Near/>
        <Advertise/>
        <Farmacy/>
        <Footer/>
    </div>
  )
}
