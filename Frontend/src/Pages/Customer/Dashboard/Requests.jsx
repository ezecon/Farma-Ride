import { useEffect, useState } from "react";
import { useToken } from "../../../Components/Hook/useToken";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Requests() {
  const [data, setData] = useState([]);
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [user, setUser] = useState(null);

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
            setUser(response.data);
          } else {
            console.log(response.data);
          }
        } catch (err) {
          console.error('Error fetching user info:', err);
        }
      }
    };

    if (userID) {
      fetchUserInfo();
    }
  }, [userID]);


  useEffect(()=>{
    const purchasesFetch = async ()=>{
    try{
                const response = await axios.get(`https://farma-ride-server.vercel.app/api/purchases/user/${userID}`);
                    if (response.status === 200) {
                        setData(response.data);
                    } else {
                        console.log(response.data);
                    }
            }
    catch(error){
        console.log(error);
    }
}
    if(userID) {
        purchasesFetch();
      }
  })

  
  return (
    <div>
        <h1 className=" py-5 text-2xl text-center text-[goldenrod] font-bold montserrat-alternates-black-italic">REQUESTS</h1>
        <div>
            <div className="shadow-lg rounded-lg flex flex-col justify-center items-center">
                    <p>Date: {data.date}</p>
                    <p>Owner:{}</p>
                    <p>Items:{}</p>
                    <p>Rider:{}</p>
                    <p>Total:{}</p>
            </div>
        </div>
    </div>
  )
}
