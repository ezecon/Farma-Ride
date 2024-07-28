import axios from "axios";
import { useEffect, useState } from "react";
import MedicineCard from "./MedicineCard";

export default function Medicines() {
  const [data, setData] = useState([]);

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
      <h1 className="animated-text text-center p-10 font-bold montserrat-alternates-black text-3xl">Your Inventory</h1>
    <div className="grid grid-cols-4 gap-3 px-5">
            {data.reverse().map((item) => (
                <MedicineCard key={item._id} data={item} />
            ))}
     </div>
    </div>
  );
}
