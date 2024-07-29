import Count from "../../Components/Count/Count";
import Advertise from "./Advertise/Advertise";
import Farmacy from "./Farmacy/Farmacy";
import { Footer } from "./Footer/Footer";
import HeroSection from "./HeroSection/HeroSection";
import Medicines from "./Medicines/Medicines";
import Navbar from "./Navbar/Navbar";


export default function Index() {
  return (
    <div className="lg:px-80">
        <Navbar/>
        <HeroSection/>
        <Count/>
        <Medicines/>
        <Advertise/>
        <Farmacy/>
        <Footer/>
    </div>
  )
}
