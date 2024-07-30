import axios from "axios";
import { useEffect, useState } from "react";
import MedicineCard from "./MedicineCard";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../../../Components/Hook/useToken";

export default function Medicines() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [owner, setOwner] = useState(null);



  useEffect(() => {
    const verifyToken = async () => {
      if(!token){
        removeToken();
        navigate('/login');
      }
      try {
        const response = await axios.post('http://localhost:5000/api/verifyToken', { token });

        if (response.status === 200 && response.data.valid) {
          setUserID(response.data.decoded.id);
          setOwner(userID)
          console.log(response.data.decoded.id)
          console.log(userID)

        } else {
          console.log("Token verification failed:", response.data);
          removeToken();
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        removeToken();
      }
    };

    verifyToken();
  }, [token, navigate, removeToken]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/medicines/owner/${owner}`);
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
