import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";

export default function MedicineCard({ data }) {
  const { _id, medicineName, price, filename } = data;
  const navigate = useNavigate();
  const [itemDetails, setItemDetails] = useState({});

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/medicines/${_id}`);
        if (response.status === 200) {
          setItemDetails(response.data);
        } else {
          console.log("Failed to get item details:", response.data);
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    getItem();
  }, [_id]);

  const handleNavigate = (id) => {
    navigate(`/farmacy-owner/check-medicine/${id}`);
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/medicines/${id}`);
      if (response.status === 200) {
        window.location.reload(); 
      }
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };
  return (
    <div className="border rounded-lg">
      {filename && (
        <img 
          src={`http://localhost:5000/uploads/${filename}`} 
          alt={medicineName}
          className="w-[300px] h-[280px] object-cover cursor-pointer"
          onClick={() => handleNavigate(_id)}
        />
      )}
      <div className="p-2">
        <p className="text-lg font-semibold text-gray-800 montserrat-alternates-regular">{medicineName}</p>
        <p className="text-sm font-bold text-[goldenrod]">৳{price}</p>
        <div className="my-2 flex justify-between">
          <button
            className="bg-black text-white px-4 py-2 rounded cursor-pointer"
            onClick={() => handleNavigate(_id)}
          >
            View Details
          </button>
          <MdDeleteForever className="text-red-700 text-5xl" onClick={() => handleDelete(_id)}/>
    </div>
      </div>
    </div>
  );
}
