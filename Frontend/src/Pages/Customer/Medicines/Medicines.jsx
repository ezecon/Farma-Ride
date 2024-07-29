import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

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
    <div className="flex flex-col justify-center items-center py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="montserrat-alternates-extrabold text-center text-2xl text-[goldenrod] mb-6">
        MEDICINES
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
        {data.slice(0, 8).map((item, index) => (
          <Card key={index} data={item} />
        ))}
      </div>
      <div className="flex justify-center my-6 py-10">
        <Link to="/customer/all-medicine-view"><Button>See More</Button></Link>
      </div>
    </div>
  );
}
