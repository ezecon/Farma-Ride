import Farmacy from "./TopUsers/TopUsers";
import Footer from "./Footer/Footer";
import HeroSection from "./HeroSection/HeroSection";
import Navbar from "./Navbar/Navbar";


export default function Index_Rider() {
  return (
    <div className="lg:px-80">
        <Navbar/>
        <HeroSection/>
        <Farmacy/>
        <Footer/>
    </div>
  )
}
