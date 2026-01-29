import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../../../Components/Hook/useToken";

export default function Medicines() {
  const [data, setData] = useState([]);
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);

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
    const fetchMedicines = async () => {
      try {
        const response = await axios.get('https://farma-ride-server.vercel.app/api/medicines');
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
      {data!==null && <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.slice(0, 8).map((item, index) => (
          <Card key={index} data={item} />
        ))}
      </div>
      <div className="flex justify-center my-6 py-10">
        <Link to="/customer/all-medicine-view"><Button>See More</Button></Link>
      </div></>}
      {
        data===null && <>
        <p className="montserrat-alternates-light">Empty!</p>
        </>
      }
    </div>
  );
}
