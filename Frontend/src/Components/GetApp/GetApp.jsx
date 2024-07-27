import { FaGooglePlay, FaLongArrowAltRight } from "react-icons/fa";
import { IoLogoAppleAppstore } from "react-icons/io5";

export default function GetApp() {
  return (
    <div className="bg-[#f0f0f0] py-8">
      <h1 className="text-center text-2xl sm:text-3xl font-mono font-extrabold">It’s easier in the apps</h1>
      <div className="flex flex-col md:flex-row p-8 md:p-24 gap-10">
        <div className="flex w-full md:w-1/2 border border-black rounded-lg p-6 md:p-10 gap-4 bg-white">
          <FaGooglePlay className="text-6xl md:text-8xl p-2" />
          <div>
            <h1 className="font-mono text-xl md:text-2xl font-bold">Get the app from Google Play</h1>
            <a href="https://play.google.com">
              <p className="font-mono flex items-center">Tap to go <FaLongArrowAltRight className="pl-2 md:pl-3 text-2xl md:text-3xl" /> </p>
            </a>
          </div>
        </div>
        <div className="flex w-full md:w-1/2 border border-black rounded-lg p-6 md:p-10 gap-4 bg-white">
          <IoLogoAppleAppstore className="text-6xl md:text-8xl p-2" />
          <div>
            <h1 className="font-mono text-xl md:text-2xl font-bold">Get the app from the Apple Store</h1>
            <a href="https://www.apple.com/store">
              <p className="font-mono flex items-center">Tap to go <FaLongArrowAltRight className="pl-2 md:pl-3 text-2xl md:text-3xl" /> </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
                  