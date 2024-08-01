import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';
import { LineWave } from "react-loader-spinner";
import toast from "react-hot-toast";

export default function MedicineCard({ data }) {
  const { _id, medicineName, price, filename, description: initialDescription, status: initialStatus } = data;
  const navigate = useNavigate();
  const [itemDetails, setItemDetails] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [medicine, setMedicineName] = useState(medicineName);
  const [description, setDescription] = useState(initialDescription);
  const [priceX, setPrice] = useState(price);
  const [status, setStatus] = useState(initialStatus);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await axios.get(`https://farma-ride-server.vercel.app/api/medicines/${_id}`);
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

  const handleUpdate = async (e) => {
  e.preventDefault(); // Prevent default form submission
  
  setIsLoading(true);

  const formData = new FormData();
  formData.append('medicineName', medicine);
  formData.append('description', description);
  formData.append('price', priceX);
  formData.append('status', status);
  if (file) {
    formData.append('photo', file); // Ensure the key matches the backend
  }

  try {
    const response = await axios.put(`https://farma-ride-server.vercel.app/api/medicines/${_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    if (response.status === 200) {
      setIsOpen(false); // Close dialog
      toast.success("Updated!")
    }
  } catch (error) {
    console.error('Error updating medicine:', error);
    toast.error(error)
  }finally {
    setIsLoading(false); // End loading
  }
};
if (isLoading) {
  return (
    <div className="flex flex-col justify-center items-center">
      <LineWave
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="line-wave-loading"
        wrapperStyle={{}}
        wrapperClass=""
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
      <p className='text-[goldenrod] font-bold'>Uploading..</p>
    </div>
  );
}

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://farma-ride-server.vercel.app/api/medicines/${id}`);
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
          src={filename} 
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
              <MenuItem onClick={() => handleNavigate(_id)} className='font-mono'>View Details</MenuItem>
              <MenuItem onClick={() => handleDelete(_id)} className='font-mono'>Delete</MenuItem>
              <MenuItem onClick={() => setIsOpen(true)} className='font-mono'>Update</MenuItem>
            </MenuList>  
          </Menu>
        </div>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-black/30 p-4"
      >
        <DialogPanel className="max-w-lg bg-white p-8 rounded-lg">
          <DialogTitle className="text-center text-xl font-bold">Update Medicine</DialogTitle>
          <Description className="text-center text-sm">You can update the medicine details here</Description>
          <form className='flex flex-col space-y-4' onSubmit={handleUpdate}>
            <input
              className='p-4 border border-[#dbdbdb] rounded-lg'
              type="text"
              placeholder='Medicine Name'
              value={medicine}
              onChange={(e) => setMedicineName(e.target.value)}
              required
            />
            <input
              className='p-4 border border-[#dbdbdb] rounded-lg'
              type="text"
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              className='p-4 border border-[#dbdbdb] rounded-lg'
              type="text"
              placeholder='Price'
              value={priceX}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <select
              className='p-4 border border-[#dbdbdb] rounded-lg'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="#">Select Status</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
            <input
              className='p-4 border border-[#dbdbdb] rounded-lg'
              type="file"
              accept='.jpg, .png'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div className="flex justify-center space-x-4">
              <Button className='bg-black text-white py-2 px-4 rounded-lg' type="submit">Update</Button>
              <Button className='bg-gray-500 text-white py-2 px-4 rounded-lg' onClick={() => setIsOpen(false)}>Cancel</Button>
            </div>
          </form>
        </DialogPanel>
      </Dialog>
    </div>
  );
}
