import axios from "axios";
import { useEffect, useState } from "react";

export default function TopUsers() {
  const[data, setData]=useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://farma-ride-server.vercel.app/api/users`);
        if (response.status === 200) {
          const sortedData = response.data.sort((a, b) => b.delivery - a.delivery);
          const topFiveData = sortedData.slice(0, 5);
          setData(topFiveData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 



  return (
    <div>
    <h1 className="font-mono font-bold text-3xl text-center p-10">Top Rider</h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 px-4 animated">
      {/* Render the first photo centered with reduced size */}
      {data.length > 0 && (
        <div className="col-span-1 md:col-span-4 flex flex-col justify-center items-center mb-4">
          <img
            key={data[0].id}
            src={data[0].photo}
            className="rounded-lg w-1/4"
            alt=""
          />
           <p className="text-[goldenrod] p-2 text-2xl text-center montserrat-alternates-bold">{data[0].name}</p>
        </div>
      )}
      {/* Render the remaining photos in a second row */}
      {data.slice(1).map((item) => (
        <div key={item.id} className="w-full">
          <img
            src={item.photo}
            className="rounded-lg w-full"
            alt=""
          />
          <p className="text-[goldenrod] p-2 text-2xl text-center montserrat-alternates-bold">{item.name}</p>
        </div>
      ))}
    </div>
  </div>
  
  
  );
  
}
