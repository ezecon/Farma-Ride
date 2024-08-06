import { CgDetailsMore } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import Map from "./Map";

export default function Card({ data }) {
  const { _id, name, upazilas, district, latitude, longitude } = data;
  const navigate = useNavigate();

  const handleNavigate = (_id) => {
    navigate(`/customer/check-farmacy/${_id}`);
  };

  return (
    <div className="relative w-72 h-96 overflow-hidden rounded-lg shadow-lg group">
      {/* Map Component with latitude and longitude */}
      <div className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110">
            <Map latitude={latitude} longitude={longitude} />
      </div>
      

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gray-800 bg-opacity-75 text-white transition-transform duration-300 ease-in-out transform translate-y-full group-hover:translate-y-0">
        <div className="p-4 text-center">
          <p className="text-lg font-semibold text-white montserrat-alternates-regular">{name}</p>
          <p className="text-sm font-bold text-[goldenrod]">Location: {upazilas}, {district} </p>
        </div>
        <div>
          <div className="">
            <CgDetailsMore 
              className="float-right pr-5 pb-5 text-6xl text-[goldenrod] cursor-pointer" 
              onClick={() => handleNavigate(_id)} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
