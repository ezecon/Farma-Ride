import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { useParams } from "react-router-dom";

export default function Single() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [count, setCount] = useState(0);
  const [showDescription, setShowDescription] = useState(false);

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
      if (prevCount + value < 0) {
        return 0;
      }
      return prevCount + value;
    });
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="flex flex-col lg:flex-row p-5 gap-">
      <div className="lg:w-1/2 h-auto flex justify-center lg:justify-start mb-5 lg:mb-0">
        <img className="w-full m-10  rounded-lg" src={`http://localhost:5000/uploads/${data.filename}`} alt={data.medicineName} />
      </div>
      <div className="lg:w-1/2 w-full h-autoborder border-[#afafaf] rounded-lg p-5 shadow-lg">
        <p className="text-sm text-center italic font-thin text-[#09b626]">{data.status}</p>
        <p className="text-lg text-black montserrat-alternates-extrabold">{data.medicineName}</p>
        <p className="text-sm font-bold text-[goldenrod]">৳{data.price}</p>
        <p className="border shadow p-2 my-2 bg-blue-gray-100 font-bold flex items-center justify-center">
          <span className="mx-4 cursor-pointer" onClick={() => handleCount(-1)}>-</span>
         <span className="bg-white px-4 rounded"> {count}</span>
          <span className="mx-4 cursor-pointer" onClick={() => handleCount(1)}>+</span>
        </p>
        <Button className="flex items-center justify-center gap-2 my-2 w-full">
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
