import axios from "axios";
import { useEffect, useState } from "react";
import MapCard from "../MapCard/MapCard";

export default function Farmacy() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const mapFetch = async () => {
      try {
        const response = await axios.get('https://farma-ride-server.vercel.app/api/users/farmacy');
        if (response.status === 200) {
          console.log('Data fetched:', response.data); // Log fetched data
          setData(response.data);
        } else {
          console.log("404 - Not Found");
        }
      } catch (err) {
        console.log('Error:', err);
      }
    };
    mapFetch();
  }, []);

  return (
    <div>
      <h1 className="font-mono font-bold text-3xl text-center p-10">Farmacy Near You?</h1>
      <div className="flex justify-center">
        <MapCard users={data} />
      </div>
    </div>
  );
}
