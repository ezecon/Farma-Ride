
import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

export default function Navbar() {


  return (
    <div className='bg-[#ffffff] rounded-lg border border-black shadow-lg'>
      <div className="navbar flex  justify-between px-4 py-2">
          <div className="flex-1 water-text py-4">
              <h1 className="font-bold sm:text-lg md:text-2xl text-white">FARMA-RIDE</h1>
              <h1 className="font-bold sm:text-lg md:text-2xl text-white">FARMA-RIDE</h1>
            </div>
          <div className="hidden md:flex  lg:pt-2">
            <ul className="flex space-x-6 pt-2">
              <li>
                <a className="text-[#000000] hover:underline hover:underline-offset-4 font-mono" href="/medicine">
                  Buy Now
                </a>
              </li>
              <li>
                <div className="flex items-center gap-x-1">
                      <Menu>
                            <MenuHandler>
                            <img
                                  src='https://avatars.githubusercontent.com/u/92664558?v=4'
                                    alt="avatar"
                                    className="rounded-full w-10 border border-red-500"
                                  />
                            </MenuHandler>
                            <MenuList>
                              <Link to="/profile"><MenuItem>Profile</MenuItem></Link>
                              <Link to="/dashboard"><MenuItem>Dashboard</MenuItem></Link>
                              <MenuItem>Logout</MenuItem>
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
