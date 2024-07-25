
import Business from "../Business/Business";
import GetApp from "../GetApp/GetApp";
import HeroSection from "../HeroSection/HeroSection";
import Navbar from "../Navbar/Navbar";

export default function Main() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Business />
      <GetApp/>
    </div>
  );
}
