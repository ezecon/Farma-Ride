import { FaGooglePlay, FaLongArrowAltRight  } from "react-icons/fa";
import { IoLogoAppleAppstore } from "react-icons/io5";

export default function GetApp() {
  return (
    <div className=" bg-[#f0f0f0] py-8">
        <h1 className="text-center text-3xl font-mono font-extrabold">It’s easier in the apps</h1>
        <div className="md:flex lg:flex p-24 gap-10">
            <div className=" flex w-1/2 sm:w-full border border-black rounded-lg p-10 gap-4 bg-white">
                <FaGooglePlay className="text-8xl p-2" />
                <div>
                    <h1 className="font-mono text-2xl font-bold">Get the app from the Apple Store</h1>
                    <a href="www.googleplay.com"><p className="font-mono flex">Tap to go <FaLongArrowAltRight className="pl-3 text-3xl"/> </p></a>
                </div>
            </div>
            <div className="flex w-1/2 sm:w-full border border-black rounded-lg p-10 gap-4 bg-white">
                <IoLogoAppleAppstore className="text-8xl p-2" />
                <div>
                    <h1 className="font-mono text-2xl font-bold">Get the app from the Apple Store</h1>
                    <a href="https://www.apple.com/store"><p className="font-mono flex">Tap to go <FaLongArrowAltRight className="pl-3 text-3xl"/> </p></a>
                </div>
            </div>

        </div>
    </div>
  )
}
