import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { useToken } from "../../../Components/Hook/useToken";
import { useNavigate } from "react-router-dom";

export default function All() {
  const [data, setData] = useState([]);
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [ownerIDs, setOwnerIDs] = useState([]); // Changed to an array
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        removeToken();
        navigate('/login');
        return;
      }
      try {
        const response = await axios.post('https://farma-ride-server.vercel.app/api/verifyToken', { token });
        if (response.status === 200 && response.data.valid) {
          setUserID(response.data.decoded.id);
        } else {
          removeToken();
          navigate('/login');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        removeToken();
        navigate('/login');
      }
    };

    verifyToken();
  }, [token, navigate, removeToken]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userID) {
        try {
          const response = await axios.get(`https://farma-ride-server.vercel.app/api/users/${userID}`);
          if (response.status === 200) {
            setUserInfo(response.data);
          } else {
            console.log(response.data);
          }
        } catch (err) {
          console.error('Error fetching user info:', err);
        }
      }
    };

    fetchUserInfo();
  }, [userID]);

  useEffect(() => {
    const OwnerFetch = async () => {
      try {
        const response = await axios.get('https://farma-ride-server.vercel.app/api/users/farmacy');
        if (response.status === 200) {
          console.log('Data fetched:', response.data); // Log fetched data
          
          // Assuming `userInfo` contains the `upazilas` field
          const filteredData = response.data.filter(item => userInfo && item.upazilas === userInfo.upazilas);
          const ownerIDs = filteredData.map(item => item._id); // Extract owner IDs
          
          console.log('Filtered data:', filteredData); // Log filtered data
          setOwnerIDs(ownerIDs);
        } else {
          console.log("404 - Not Found");
        }
      } catch (err) {
        console.log('Error:', err);
      }
    };

    if (userInfo) {
      OwnerFetch();
    }
  }, [userInfo]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get('https://farma-ride-server.vercel.app/api/medicines');
        if (response.status === 200) {
          // Filter medicines where the owner is in the ownerIDs array
          const filteredMedicines = response.data.filter(medicine => ownerIDs.includes(medicine.owner));
          setData(filteredMedicines);
        }
      } catch (err) {
        console.error('Error fetching medicines:', err);
      }
    };

    if (ownerIDs.length > 0) {
      fetchMedicines();
    }
  }, [ownerIDs]);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="montserrat-alternates-extrabold text-center text-2xl text-[goldenrod] mb-6">
        MEDICINES
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <Card key={index} data={item} />
        ))}
        
      </div>
      {
        data===null && <>
        <p className="montserrat-alternates-light text-center">Empty!</p>
        </>
      }
    </div>
  );
}
