import { useState } from "react";
import { motion } from "framer-motion";

const NAV_LINK_CLASSES = "text-white hover:text-zinc-400";
const INPUT_CLASSES = "w-full px-4 py-3 rounded-full bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none";

const Main = () => {
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <nav className="w-full flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold">FarmaRide</span>
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <a href="#" className={NAV_LINK_CLASSES}>Ride</a>
          <a href="#" className={NAV_LINK_CLASSES}>Drive</a>
          <a href="#" className={NAV_LINK_CLASSES}>Business</a>
          <a href="#" className={NAV_LINK_CLASSES}>Uber Eats</a>
          <a href="#" className={NAV_LINK_CLASSES}>About</a>
          <a href="#" className={NAV_LINK_CLASSES}>EN</a>
          <a href="#" className={NAV_LINK_CLASSES}>Help</a>
          <a href="/login-register" className={NAV_LINK_CLASSES}>Log in</a>
          <button className="bg-white text-black px-4 py-2 rounded-full">Sign up</button>
        </div>
      </nav>
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        className="lg:hidden w-full flex flex-col items-center space-y-4"
      >
        <a href="#" className={NAV_LINK_CLASSES}>Ride</a>
        <a href="#" className={NAV_LINK_CLASSES}>Drive</a>
        <a href="#" className={NAV_LINK_CLASSES}>Business</a>
        <a href="#" className={NAV_LINK_CLASSES}>Uber Eats</a>
        <a href="#" className={NAV_LINK_CLASSES}>About</a>
        <a href="#" className={NAV_LINK_CLASSES}>EN</a>
        <a href="#" className={NAV_LINK_CLASSES}>Help</a>
        <a href="/login-register" className={NAV_LINK_CLASSES}>Log in</a>
        <button className="bg-white text-black px-4 py-2 rounded-full">Sign up</button>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full px-8 py-16 lg:py-32">
        <div className="text-center lg:text-left lg:max-w-md">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Go anywhere with Uber</h1>
          <p className="text-lg mb-8">Request a ride, hop in, and go.</p>
          <div className="space-y-4">
            <div className="relative">
              <input type="text" placeholder="Enter location" className={INPUT_CLASSES} />
              <img aria-hidden="true" alt="location-arrow" src="https://openui.fly.dev/openui/24x24.svg?text=📍" className="absolute right-4 top-1/2 transform -translate-y-1/2" />
            </div>
            <div className="relative">
              <input type="text" placeholder="Enter destination" className={INPUT_CLASSES} />
              <img aria-hidden="true" alt="destination-arrow" src="https://openui.fly.dev/openui/24x24.svg?text=➡️" className="absolute right-4 top-1/2 transform -translate-y-1/2" />
            </div>
            <button className="w-full bg-white text-black px-4 py-3 rounded-full">See prices</button>
          </div>
        </div>

        <div className="mt-8 lg:mt-0 lg:ml-16">
          <img src="https://medlineplus.gov/images/Medicines_share.jpg" alt="Illustration of people getting into an Uber" className=" w-96 rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default Main;
