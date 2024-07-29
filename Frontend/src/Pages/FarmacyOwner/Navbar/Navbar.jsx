
import { Avatar, Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBriefcaseMedical } from "react-icons/fa";
import { IoMdNotifications  } from "react-icons/io";
import { useEffect, useState } from 'react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useToken } from '../../../Components/Hook/useToken';

export default function Navbar() {
  let [isOpen, setIsOpen] = useState(false)
  const [medicineName, setMedicineName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');
  const [file, setFile] = useState(null);
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      if(!token){
        removeToken();
        navigate('/login');
      }
      try {
        const response = await axios.post('http://localhost:5000/api/verifyToken', { token });

        if (response.status === 200 && response.data.valid) {
          setUserID(response.data.decoded.id);
          console.log(response.data.decoded.id)
          console.log(userID)

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
    if (!userID) return;

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userID}`);
        if (response.status === 200) {
          setUserInfo(response.data);
        } else {
          console.log(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserInfo();
  }, [userID]);

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('medicineName', medicineName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('status', status);
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/medicines/add-medicine', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data); 
      toast.success("Medicine Added")
    } catch (err) {
      console.error('Error adding medicine:', err);
      toast.error("Medicine Not Added. Something wents wrong.")
    }
  };

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <div className='bg-[#ffffff] rounded-lg border border-black shadow-lg'>
      <div className="flex  justify-between  px-10 py-2">
          <div className="flex-1 water-text py-2">
              <a href="/farmacy-owner">
                  <h1 className="font-bold sm:text-lg md:text-xl text-white">FARMA-RIDE</h1>
                  <h1 className="font-bold sm:text-lg md:text-xl text-white">FARMA-RIDE</h1>
              </a>
            </div>
          <div className="">
            <ul className="flex space-x-6 pt-2">
              <li onClick={() => setIsOpen(true)} >

                    <FaBriefcaseMedical className='pr-4 text-4xl'/>

              </li>
              <li>
                <a className="text-Black" href="/notifactions">
                    <IoMdNotifications  className='pr-3 text-4xl'/>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-x-1 ">
                      <Menu>
                            <MenuHandler>
                            <Avatar 
                                  src={`http://localhost:5000/uploads/${userInfo?.photo}`}
                                    alt="avatar"
                                    withBorder={true}
                                    color='green'
                                    className="p-0.5"
                                  />
                            </MenuHandler>
                            <MenuList>
                              <Link to="/profile"><MenuItem className='font-mono'>Profile</MenuItem></Link>
                              <Link to="/dashboard"><MenuItem className='font-mono'>Dashboard</MenuItem></Link>
                              <MenuItem onClick={handleLogout} className='font-mono'>Logout</MenuItem>
                            </MenuList>  
                    </Menu>
                </div>
              </li>
            </ul>
          </div>
      </div>
      <div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        transition
        className="rounded-lg fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <DialogPanel className="max-w-lg space-y-4 bg-white p-12">
          <DialogTitle className=" text-center text-xl font-bold font-mono">Add Medicine</DialogTitle>
          <Description className="text-center montserrat-alternates-thin text-sm">You can add your new medicines here</Description>
          <div className="flex gap-4">
            <form className='flex flex-col justify-center items-center font-mono' onSubmit={handleAdd}>
              <input
                className='p-4 my-4 border border-[#dbdbdb] rounded-lg'
                type="text"
                placeholder='Medicine Name'
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                required
              />
              <input
                className='p-4 my-4 border border-[#dbdbdb] rounded-lg'
                type="text"
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <input
                className='p-4 my-4 border border-[#dbdbdb] rounded-lg'
                type="text"
                placeholder='Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <select
                className='px-14 py-4 my-4 border text-[#dbdbdb] border-[#dbdbdb] rounded-lg'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="#">Select Status</option>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
              <input
                className='p-4 my-4 text-[#dbdbdb] border border-[#dbdbdb] rounded-lg'
                type="file"
                accept='.jpg, .png'
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
              <Button onClick={()=> setIsOpen(false)} className='bg-black text-white py-2 px-4 rounded-lg' type="submit">Add</Button>
            </form>
          </div>
        </DialogPanel>
      </Dialog>
      </div>
    </div>
  );
}
