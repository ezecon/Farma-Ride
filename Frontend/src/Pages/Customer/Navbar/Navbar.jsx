
import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

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
                <a className="text-Black hover:underline hover:underline-offset-4" href="/medicine">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDxXRE1HkZbxzU9b2T_6nNfjIJ8xtA5ecGZQ&s"
                  className='w-10 pr-4'
                  alt="" />
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