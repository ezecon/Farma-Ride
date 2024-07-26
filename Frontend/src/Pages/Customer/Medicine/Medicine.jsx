
import { IoSearch } from "react-icons/io5";
import Navbar from "../Navbar/Navbar";

const INPUT_CLASSES = "w-full px-4 py-3 rounded-full bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none";

export default function Medicine() {
  return (
    <div className="lg:px-80">
                <Navbar/>
                <div className="min-h-screen bg-black text-white flex flex-col items-center">
                    <div className={`flex flex-col items-center justify-center w-full lg:px-36 mt-8 lg:mt-0`}>
                        
                        <div className="w-full mt-8">
                            <img src="https://medlineplus.gov/images/Medicines_share.jpg" alt="Illustration " className=" w-full rounded-lg shadow-lg" />
                        </div>
                        <div className="w-full text-center  montserrat-alternates-thin my-36 p-4">
                            <h1 className="text-4xl font-bold mb-4">Order medicne from anywhere with FarmaRider</h1>
                            <p className="text-lg mb-8">Request a order, hop in, and get.</p>
                            <div className="space-y-4">
                                <div className="relative">
                                <input type="text" placeholder="Search Medicine" className={INPUT_CLASSES} />
                                <IoSearch className="absolute right-4 top-1/2 transform -translate-y-1/2"/>
                                </div>
                                <button className="w-full bg-white text-black px-4 py-3 rounded-full font-bold">Buy</button>
                            </div>
                        </div>

                    
                    </div>
                </div>
    </div>
  )
}
