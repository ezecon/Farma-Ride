import Farmacy from "./Farmacy/Farmacy";
import Footer from "./Footer/Footer";
import HeroSection from "./HeroSection/HeroSection";
import Medicines from "./Inventory/Medicines/Medicines";
import Navbar from "./Navbar/Navbar";


export default function Index_Owner() {
  return (
    <div className="lg:px-80">
        <Navbar/>
        <HeroSection/>
        <Medicines/>
        <Farmacy/>
        <Footer/>
    </div>
  )
}
