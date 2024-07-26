import Farmacy from "./Farmacy/Farmacy";
import Footer from "./Footer/Footer";
import HeroSection from "./HeroSection/HeroSection";
import Navbar from "./Navbar/Navbar";


export default function Index() {
  return (
    <div className="lg:px-80">
        <Navbar/>
        <Farmacy/>
        <Footer/>
    </div>
  )
}
