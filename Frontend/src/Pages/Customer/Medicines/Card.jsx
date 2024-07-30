import { TiShoppingCart } from "react-icons/ti";
import { CgDetailsMore } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
export default function PhotoCard({ data }) {
  const {_id, filename, medicineName, price}=data;
  const navigate = useNavigate();

  const handleNavigate =(id)=>{
    navigate(`/customer/single-medicine-view/${id}`)
  }
  return (
    <div className="relative w-72 h-96 overflow-hidden rounded-lg shadow-lg group">
      {/* Image */}
      <img
        src={`http://localhost:5000/uploads/${filename}`} 
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
             <TiShoppingCart className="float-right pr-5 pb-5 text-6xl text-[goldenrod] cursor-pointer"/>
      </div>
      </div>
      </div>
    </div>
  );
}
