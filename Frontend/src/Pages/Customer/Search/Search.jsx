
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Medicines/Card";
import { useToken } from "../../../Components/Hook/useToken";
import { useNavigate } from "react-router-dom";

const INPUT_CLASSES = "w-full px-4 py-3 rounded-full bg-white text-black border";

export default function Search() {
  const [data, setData] = useState([]);
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [ownerIDs, setOwnerIDs] = useState([]); // Changed to an array
  const [userInfo, setUserInfo] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        removeToken();
        navigate('/login');
        return;
      }
      try {
        const response = await axios.post('http://localhost:5000/api/verifyToken', { token });
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
          const response = await axios.get(`http://localhost:5000/api/users/${userID}`);
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
        const response = await axios.get('http://localhost:5000/api/users/farmacy');
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
        const response = await axios.get('http://localhost:5000/api/medicines');
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
    <div>
                <div className="min-h-screen bg-white text-black flex flex-col items-center">
                    <div className={`flex flex-col items-center justify-center w-full lg:px-36 mt-8 lg:mt-0`}>
                        <div className="w-full text-center  montserrat-alternates-thin my-36 p-4">
                            <h1 className="text-4xl font-bold mb-4">Order medicne from anywhere with FarmaRider</h1>
                            <p className="text-lg mb-8">Request a order, hop in, and get.</p>
                            <div className="space-y-4">
                                <div className="relative">
                                <input type="text" placeholder="Search Medicine" className={INPUT_CLASSES} value={search}  onChange={(e) => setSearch(e.target.value)}/>
                                    <IoSearch className="absolute right-4 top-1/2 transform -translate-y-1/2"/>
                                </div>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-5">
                        {data
                        .filter((item) => {
                        return search.toLowerCase() === ''
                            ? item
                            : item.medicineName.toLowerCase().includes(search);
                        })
                        .map((item, index) => (
                        <Card key={index} data={item} />
                        ))}
                        {
                          data===null && <>
                          <p className="montserrat-alternates-light text-center">Empty!</p>
                          </>
                        }
                    </div>
                    </div>
                </div>
    </div>
  )
}
