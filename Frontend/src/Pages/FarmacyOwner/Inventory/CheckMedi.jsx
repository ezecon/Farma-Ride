import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineWave } from 'react-loader-spinner';

export default function CheckMedi() {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/medicines/${id}`);
        if (response.status === 200) {
          setMedicine(response.data);
        }
      } catch (err) {
        console.error('Error fetching medicine details:', err);
      }
    };

    fetchMedicine();
  }, [id]);

  if (!medicine) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <LineWave
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="line-wave-loading"
            wrapperStyle={{}}
            wrapperClass=""
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center px-10 py-20 bg-black min-h-screen">
      <div className=" bg-white lg:w-1/2 border border-[#dbdada] pl-5  shadow-lg rounded-lg flex flex-col justify-center items-center py-10">
        {medicine.filename && (
            <img 
              src={`http://localhost:5000/uploads/${medicine.filename}`} 
              alt={medicine.medicineName}
              className="p-5 mt-10 shadow rounded-lg"
            />
          )}
        <p className="pt-5 font-bold text-center lg:text-left text-2xl text-gray-800 montserrat-alternates-regular">{medicine.medicineName}</p>
        <p className="mt-4 text-sm text-gray-700">{medicine.description}</p>
        <p className="mt-4 text-sm font-semibold text-[goldenrod]">Price: <span className="text-crimson">৳{medicine.price}</span></p>
        {/*<p className="mt-4 text-lg text-gray-700">Status: {if(medicine.status==="Available") ? <span className='text-green-600'>{medicine.status}</span> : <span className='text-red-600'>{medicine.status}</span> }</p>*/}
      </div>
    </div>
  );
}
