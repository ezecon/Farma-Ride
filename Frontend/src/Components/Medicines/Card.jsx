import { TiShoppingCart } from "react-icons/ti";
import { CgDetailsMore } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "../Hook/useToken";
export default function PhotoCard({ data }) {
  const {_id, filename, owner, medicineName, price}=data;
  const navigate = useNavigate();
  const { token, removeToken } = useToken();
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        removeToken();
        navigate('/login');
      }
      try {
        const response = await axios.post('https://farma-ride-server.vercel.app/api/verifyToken', { token });

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

  const handleNavigate =(id)=>{
    navigate(`/customer/single-medicine-view/${id}`)
  }
  const handleAddToCart = async () => {
    try {
      const response = await axios.post('https://farma-ride-server.vercel.app/api/carts/add-cart', {
        buyerId: userID,
        ownerId: owner,
        productId: _id,
        medicineName:medicineName,
        quantity: 1,
        price: price ,
        singlePrice: price
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
    <div className="relative w-72 h-96 overflow-hidden rounded-lg shadow-lg group">
      {/* Image */}
      <img
        src={filename} 
        alt={medicineName}
        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gray-800 bg-opacity-75 text-white transition-transform duration-300 ease-in-out transform translate-y-full group-hover:translate-y-0">
        <div className="p-4">
        <p className="text-lg font-semibold text-white montserrat-alternates-regular">{medicineName}</p>
        <p className="text-sm font-bold text-[goldenrod]">৳{price}</p>
      </div>
      <div>
      <div className="flex justify-between ">
              <CgDetailsMore className="float-left pl-4 pb-5 text-6xl text-[goldenrod] cursor-pointer" onClick={()=>handleNavigate(_id)}/>
             <TiShoppingCart className="float-right pr-5 pb-5 text-6xl text-[goldenrod] cursor-pointer"onClick={handleAddToCart}/>
      </div>
      </div>
      </div>
    </div>
  );
}
