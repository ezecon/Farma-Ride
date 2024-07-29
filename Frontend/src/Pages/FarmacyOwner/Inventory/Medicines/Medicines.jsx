import axios from "axios";
import { useEffect, useState } from "react";
import MedicineCard from "./MedicineCard";

export default function Medicines() {
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
    <div className="my-10">
      <h1 className="animated-text text-center p-10 font-bold montserrat-alternates-black text-3xl">Your Inventory</h1>
      <div className="px-5 mb-5">
        <input
          type="text"
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 px-5">
        {data
        .filter((item) => {
          return search.toLowerCase() === ''
            ? item
            : item.medicineName.toLowerCase().includes(search);
        })
        .map((item, index) => (
          <MedicineCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
}
