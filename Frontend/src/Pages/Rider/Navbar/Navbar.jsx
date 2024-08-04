
import { Avatar, Badge,  Menu, MenuHandler, MenuItem, MenuList, Tooltip } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdNotifications  } from "react-icons/io";
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useToken } from '../../../Components/Hook/useToken';
import { LineWave } from 'react-loader-spinner';

export default function Navbar() {
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if(!token){
        removeToken();
        navigate('/login');
      }
      try {
        const response = await axios.post('https://farma-ride-server.vercel.app/api/verifyToken', { token });

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
        const response = await axios.get(`https://farma-ride-server.vercel.app/api/users/${userID}`);
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

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <div className='bg-[#ffffff] rounded-lg border border-[#d8d8d8] shadow-xl mb-2'>
      <div className="flex  justify-between  px-10 py-2">
          <div className="flex-1 water-text py-2">
              <a href="/rider">
                  <h1 className="font-bold sm:text-lg md:text-xl text-white">FARMA-RIDE</h1>
                  <h1 className="font-bold sm:text-lg md:text-xl text-white">FARMA-RIDE</h1>
              </a>
            </div>
          <div className="">
            <ul className="flex space-x-6 pt-2">

              <li>
                <div className="flex items-center gap-x-1 ">
                      <Menu>
                            <MenuHandler>
                            <Avatar 
                                  src={userInfo?.photo}
                                    alt="avatar"
                                    withBorder={true}
                                    color='green'
                                    className="p-0.5"
                                  />
                            </MenuHandler>
                            <MenuList>
                              <Link to="/profile"><MenuItem className='font-mono'>Profile</MenuItem></Link>
                              <Link to="/rider/dashboard"><MenuItem className='font-mono'>Dashboard</MenuItem></Link>
                              <MenuItem onClick={handleLogout} className='font-mono'>Logout</MenuItem>
                            </MenuList>  
                    </Menu>
                </div>
              </li>
            </ul>
          </div>
      </div>

    </div>
  );
}
