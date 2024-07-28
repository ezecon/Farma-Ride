import { useState, useEffect } from "react";
import { LineWave } from "react-loader-spinner";
import Business from "../Business/Business";
import GetApp from "../GetApp/GetApp";
import HeroSection from "../HeroSection/HeroSection";
import Navbar from "../Navbar/Navbar";

export default function Main() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black">
        <LineWave
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="line-wave-loading"
          wrapperStyle={{}}
          wrapperClass=""
          firstLineColor=""
          middleLineColor=""
          lastLineColor=""
        />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <HeroSection />
      <Business />
      <GetApp />
    </div>
  );
}
