
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Medicines/Card";

const INPUT_CLASSES = "w-full px-4 py-3 rounded-full bg-white text-black border";

export default function Search() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
  
    useEffect(() => {
      const fetchMedicines = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/medicines');
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
    <div>
                <div className="min-h-screen bg-white text-black flex flex-col items-center">
                    <div className={`flex flex-col items-center justify-center w-full lg:px-36 mt-8 lg:mt-0`}>
                        <div className="w-full text-center  montserrat-alternates-thin my-36 p-4">
                            <h1 className="text-4xl font-bold mb-4">Order medicne from anywhere with FarmaRider</h1>
                            <p className="text-lg mb-8">Request a order, hop in, and get.</p>
                            <div className="space-y-4">
                                <div className="relative">
                                <input type="text" placeholder="Search Medicine" className={INPUT_CLASSES} value={search}  onChange={(e) => setSearch(e.target.value)}/>
                                    <IoSearch className="absolute right-4 top-1/2 transform -translate-y-1/2"/>
                                </div>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-5">
                        {data
                        .filter((item) => {
                        return search.toLowerCase() === ''
                            ? item
                            : item.medicineName.toLowerCase().includes(search);
                        })
                        .map((item, index) => (
                        <Card key={index} data={item} />
                        ))}
                    </div>
                    </div>
                </div>
    </div>
  )
}
