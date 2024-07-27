
import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { FaBriefcaseMedical } from "react-icons/fa";
import { IoMdNotifications  } from "react-icons/io";

export default function Navbar() {


  return (
    <div className='bg-[#ffffff] rounded-lg border border-black shadow-lg'>
      <div className="flex  justify-between px-4 py-2">
          <div className="flex-1 water-text py-2">
              <h1 className="font-bold sm:text-lg md:text-xl text-white">FARMA-RIDE</h1>
              <h1 className="font-bold sm:text-lg md:text-xl text-white">FARMA-RIDE</h1>
            </div>
          <div className="">
            <ul className="flex space-x-6 pt-2">
              <li>
                <a className="text-Black" href="/farmacy-owner/inventory">
                    <FaBriefcaseMedical className='pr-4 text-4xl'/>
                </a>
              </li>
              <li>
                <a className="text-Black" href="/notifactions">
                    <IoMdNotifications  className='pr-4 text-4xl'/>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-x-1 ">
                      <Menu>
                            <MenuHandler>
                            <img
                                  src='https://avatars.githubusercontent.com/u/92664558?v=4'
                                    alt="avatar"
                                    className="rounded-full w-10 border border-red-500"
                                  />
                            </MenuHandler>
                            <MenuList>
                              <Link to="/profile"><MenuItem className='font-mono'>Profile</MenuItem></Link>
                              <Link to="/dashboard"><MenuItem className='font-mono'>Dashboard</MenuItem></Link>
                              <MenuItem className='font-mono'>Logout</MenuItem>
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
