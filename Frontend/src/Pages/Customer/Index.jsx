import Count from "../../Components/Count/Count";
import Farmacy from "./Farmacy/Farmacy";
import Near from "./Farmacy/Near";
import { Footer } from "./Footer/Footer";
import HeroSection from "./HeroSection/HeroSection";
import Medicines from "./Medicines/Medicines";
import Riders from "./Riders/Riders";


export default function Index() {
  return (
    <div>
        <HeroSection/>
        <Count/>
        <Medicines/>
        <Near/>
        <Riders/>
        <Farmacy/>
        <Footer/>
    </div>
  )
}
