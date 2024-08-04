import axios from "axios";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import Card from "./Card";

const INPUT_CLASSES = "w-full px-4 py-3 rounded-full bg-zinc-800 text-black placeholder-zinc-400 focus:outline-none";

export default function HeroSection() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get('https://farma-ride-server.vercel.app/api/medicines');
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (err) {
        console.error('Error fetching medicines:', err);
      }
    };

    fetchMedicines();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full lg:px-36 mt-8 lg:mt-16">
        <div className="w-full lg:w-1/2 text-center lg:text-left lg:max-w-md lg:pl-24 sm:px-4 montserrat-alternates-thin">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Order medicine from anywhere with FarmaRider</h1>
          <p className="text-base md:text-lg mb-8">Request an order, hop in, and get.</p>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Medicine"
                className={INPUT_CLASSES}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <IoSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white" />
            </div>
            <button className="w-full bg-white text-black px-4 py-3 rounded-full font-bold">Buy</button>
          </div>
        </div>
        {/* Image shown on lg and md screens */}
        <div className="hidden md:block lg:block w-full lg:w-1/2 mt-8 lg:mt-0 lg:ml-16 lg:pr-24">
          <img src="https://medlineplus.gov/images/Medicines_share.jpg" alt="Illustration" className="w-full rounded-lg shadow-lg" />
        </div>
        {/* Image shown on sm screens */}
        <div className="block md:hidden lg:hidden w-full mt-8">
        {!search &&  <img src="https://medlineplus.gov/images/Medicines_share.jpg" alt="Illustration" className="w-full rounded-lg shadow-lg" />}
        </div>
      </div>
      <div className="my-10">
        {search && (
          <div>
            <h1 className="montserrat-alternates-semibold text-center text-2xl py-5">Medicines</h1>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-5">
              {data
                .filter((item) =>
                  item.medicineName.toLowerCase().includes(search.toLowerCase())
                )
                .map((item, index) => (
                  <Card key={index} data={item} />
                ))}
              {data.length === 0 && (
                <p className="montserrat-alternates-light text-center">Empty!</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
