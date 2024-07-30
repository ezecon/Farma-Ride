import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";
import { useToken } from "../../../Components/Hook/useToken";
import toast from "react-hot-toast";

export default function Single() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [count, setCount] = useState(1);
  const [showDescription, setShowDescription] = useState(false);
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        removeToken();
        navigate('/login');
      }
      try {
        const response = await axios.post('http://localhost:5000/api/verifyToken', { token });

        if (response.status === 200 && response.data.valid) {
          setUserID(response.data.decoded.id);
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
        const response = await axios.get(`http://localhost:5000/api/medicines/${id}`);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (err) {
        console.error('Error fetching medicines:', err);
      }
    };

    fetchMedicines();
  }, [id]);

  const handleCount = (value) => {
    setCount((prevCount) => {
      if (prevCount + value < 1) {
        return 1;
      }
      return prevCount + value;
    });
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/carts/add-cart', {
        buyerId: userID,
        productId: data._id,
        medicineName:data.medicineName,
        quantity: count,
        price: data.price * count,
        singlePrice: data.price
      });
      if (response.status === 200) {
        console.log("Added to Cart");
        toast.success("Added to Cart");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-5 gap-">
      <div className="lg:w-1/2 h-auto flex justify-center lg:justify-start mb-5 lg:mb-0">
        <img className="w-full lg:w-5/6 m-5 rounded-lg" src={`http://localhost:5000/uploads/${data.filename}`} alt={data.medicineName} />
      </div>
      <div className="lg:w-1/2 w-full h-autoborder border-[#afafaf] rounded-lg p-5 shadow-lg">
        <p className="text-sm text-center italic font-thin text-[#09b626]">{data.status}</p>
        <p className="text-lg text-black montserrat-alternates-extrabold">{data.medicineName}</p>
        <p className="text-sm font-bold text-[goldenrod]">৳{data.price}</p>
        <p className="border shadow p-2 my-2 bg-blue-gray-100 font-bold flex items-center justify-center">
          <span className="mx-4 cursor-pointer" onClick={() => handleCount(-1)}>-</span>
          <span className="bg-white px-4 rounded">{count}</span>
          <span className="mx-4 cursor-pointer" onClick={() => handleCount(1)}>+</span>
        </p>
        <Button className="flex items-center justify-center gap-2 my-2 w-full" onClick={handleAddToCart}>
          Add to Cart
          <TiShoppingCart className="text-xl text-[goldenrod] cursor-pointer" />
        </Button>
        <span className="flex justify-center gap-2 my-2 text-sm underline font-bold cursor-pointer" onClick={toggleDescription}>
          {showDescription ? 'Hide Description' : 'See Description'}
        </span>
        {showDescription && (
          <div className="mt-4 p-4 border rounded-lg bg-blue-gray-50">
            <p className="text-sm">{data.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
