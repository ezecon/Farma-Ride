import {  FaLongArrowAltRight } from "react-icons/fa";
import { FaStethoscope } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

export default function Advertise() {
  return (
    <div className="bg-[#ffffff] py-8">
     <div className="flex flex-col md:flex-row p-8 md:p-24 gap-10">
        <div className="shadow-md flex w-full md:w-1/2 border rounded-lg p-6 md:p-10 gap-4 bg-white">
          <FaStethoscope className="text-6xl md:text-8xl p-2" />
          <div>
            <h1 className="font-mono text-xl md:text-2xl font-bold">Get Daily Health Tips</h1>
            <a href="/customer/health-tips">
              <p className="font-mono flex items-center">Tap to go <FaLongArrowAltRight className="pl-2 md:pl-3 text-2xl md:text-3xl" /> </p>
            </a>
          </div>
        </div>
        <div className="shadow-md flex w-full md:w-1/2 border  rounded-lg p-6 md:p-10 gap-4 bg-white">
          <FaUserDoctor className="text-6xl md:text-8xl p-2" />
          <div>
            <h1 className="font-mono text-xl md:text-2xl font-bold">Get Doctors Advise</h1>
            <a href="https://www.apple.com/store">
              <p className="font-mono flex items-center">Tap to go <FaLongArrowAltRight className="pl-2 md:pl-3 text-2xl md:text-3xl" /> </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
                  