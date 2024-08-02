import { useEffect, useState } from "react";
import { useToken } from "../../../Components/Hook/useToken";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Requests() {
  const [data, setData] = useState([]);
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [medi, setMedi] = useState([]);

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
    const fetchData = async () => {
      if (!userID) return;
      try {
        const response = await axios.get(`https://farma-ride-server.vercel.app/api/purchases/user/${userID}`);
        if (response.status === 200) {
          setData(response.data);
        } else {
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }

      try {
        const mediResponse = await axios.get('https://farma-ride-server.vercel.app/api/medicines');
        if (mediResponse.status === 200) {
          setMedi(mediResponse.data);
        } else {
          console.log(mediResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userID]);

  // Group products by their owners
  const groupedByOwner = data.reduce((acc, purchase) => {
    const owner = purchase.sellerIds;
    if (!acc[owner]) {
      acc[owner] = [];
    }
    acc[owner].push(purchase);
    return acc;
  }, {});

  return (
    <div>
      <h1 className="py-5 text-2xl text-center text-[goldenrod] font-bold montserrat-alternates-black-italic">REQUESTS</h1>
      <div>
        {Object.keys(groupedByOwner).map((owner) => (
          <div key={owner} className="mb-5">
            <h2 className="text-xl font-bold">Owner: {owner}</h2>
            {groupedByOwner[owner].map((purchase) => (
              <div key={purchase._id} className="shadow-lg rounded-lg flex flex-col justify-center items-center mb-3">
                <p className="text-black">Date: {new Date(purchase.date).toLocaleDateString()}</p>
                <p>Items: {purchase.productIds.map(productId => (
                  <span key={productId} className="block">
                    {medi.find(medicine => medicine._id === productId)?.medicineName || 'Unknown'}
                  </span>
                ))}
                </p>
                <p>Total: {purchase.price.reduce((acc, curr) => acc + curr, 0)}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
