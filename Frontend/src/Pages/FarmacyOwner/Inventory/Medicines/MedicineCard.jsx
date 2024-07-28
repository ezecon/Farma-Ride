import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";


export default function MedicineCard({ data }) {
  const { _id, medicineName, price, filename } = data;
  const navigate = useNavigate();
  const [itemDetails, setItemDetails] = useState({});

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/medicines/${_id}`);
        if (response.status === 200) {
          setItemDetails(response.data);
        } else {
          console.log("Failed to get item details:", response.data);
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    getItem();
  }, [_id]);

  const handleNavigate = (id) => {
    navigate(`/farmacy-owner/check-medicine/${id}`);
  };
  const handleUpdate = (id) => {
    navigate(`/farmacy-owner/update-medicine/${id}`);
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/medicines/${id}`);
      if (response.status === 200) {
        window.location.reload(); 
      }
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };
  return (
    <div className="border rounded-lg">
      {filename && (
        <img 
          src={`http://localhost:5000/uploads/${filename}`} 
          alt={medicineName}
          className="w-[300px] h-[280px] object-cover cursor-pointer"
        />
      )}
      <div className="p-2">
        <p className="text-lg font-semibold text-gray-800 montserrat-alternates-regular">{medicineName}</p>
        <p className="text-sm font-bold text-[goldenrod]">৳{price}</p>
        <div className="my-2 pr-4 float-right cursor-pointer">
        <Menu>
              <MenuHandler>
                            <img
                                  src='https://cdn-icons-png.flaticon.com/512/82/82122.png'
                                    alt="avatar"
                                    className="w-5"
                                  />

              </MenuHandler>
              <MenuList>
                  <MenuItem  onClick={() => handleNavigate(_id)} className='font-mono'>View Details</MenuItem>
                  <MenuItem onClick={() => handleDelete(_id)} className='font-mono'>Delete</MenuItem>
                  <MenuItem onClick={() => handleUpdate(_id)} className='font-mono'>Update</MenuItem>
              </MenuList>  
          </Menu>
    </div>
      </div>
    </div>
  );
}
