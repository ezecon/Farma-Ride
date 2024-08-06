import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../Hook/useToken";

export default function Medicines({id}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(`https://farma-ride-server.vercel.app/api/medicines/owner/${id}`);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (err) {
        console.error('Error fetching medicines:', err);
      }
    };

    fetchMedicines();
  });

  return (
    <div className="flex flex-col justify-center items-center py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="montserrat-alternates-extrabold text-center text-2xl text-[goldenrod] mb-6">
        MEDICINES
      </h1>
      {data!==null && <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <Card key={index} data={item} />
        ))}
      </div>
      </>}
      {
        data===null && <>
        <p className="montserrat-alternates-light">Empty!</p>
        </>
      }
    </div>
  );
}
