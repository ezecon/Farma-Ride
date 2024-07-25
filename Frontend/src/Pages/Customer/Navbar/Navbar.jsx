import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Avatar, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='bg-[#ffffff] rounded-lg border border-black shadow-lg'>
      <div className="navbar flex  justify-between items-center px-4 py-2">
          <div className="flex-1 water-text relative py-4">
              <h1 className="font-bold sm:text-lg md:text-2xl text-white">FARMA-RIDE</h1>
              <h1 className="font-bold sm:text-lg md:text-2xl text-white">FARMA-RIDE</h1>
            </div>
          <div className="hidden md:flex  lg:pt-2">
            <ul className="flex space-x-6 pt-2">
              <li>
                <a className="text-[#000000] hover:underline hover:underline-offset-4 font-mono" href="#home">
                  Home
                </a>
              </li>
              <li>
                <a className="text-[#000000] hover:underline hover:underline-offset-4 font-mono" href="#gallery">
                  Gallery
                </a>
              </li>
              <li>
                <a className="text-[#000000] hover:underline hover:underline-offset-4 font-mono" href="/players">
                  Players
                </a>
              </li>
              <li>
                <a className="text-[#000000] hover:underline hover:underline-offset-4 font-mono" href="/events">
                  Events
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
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#585858] focus:outline-none" aria-expanded={isMenuOpen}>
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden flex flex-col space-y-2 px-4 py-2">
          <a className="text-[#000000] hover:underline hover:underline-offset-4 font-mono" href="#home" onClick={toggleMenu}>
            Home
          </a>
          <a className="text-[#000000] hover:underline hover:underline-offset-4 font-mono" href="#gallery" onClick={toggleMenu}>
            Gallery
          </a>
          <a className="text-[#000000] hover:underline hover:underline-offset-4 font-mono" href="/players" onClick={toggleMenu}>
            Players
          </a>
          <a className="text-[#000000] hover:underline hover:underline-offset-4 font-mono" href="/events" onClick={toggleMenu}>
            Events
          </a>
          <a className="text-[#000000] hover:underline hover:underline-offset-4 font-mono" href="/role" onClick={toggleMenu}>
            Login
          </a>
          <a className="text-[#ffffff]  bg-black font-bold font-mono text-xl rounded-xl p-1 hover:bg-white hover:text-black" href="/role">
                Signup
              </a>

        </div>
      )}
    </div>
  );
}
