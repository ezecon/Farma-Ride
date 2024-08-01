import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import { useToken } from "../../../Components/Hook/useToken";
import { useNavigate } from "react-router-dom";

export default function Near() {
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
      <h1 className="montserrat-alternates-extrabold font-bold text-3xl text-center p-10 text-[goldenrod]">
        Farmacy Near You?
      </h1>
      <div className="flex justify-center flex-wrap gap-4">
        {data
          .filter(item => user && item.upazilas === user.upazilas)
          .map((item) => (
            <Card key={item._id} data={item} /> // Assuming each item has a unique `_id`
          ))}
      </div>
    </div>
  );
}
