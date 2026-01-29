import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='bg-black'>
      <div className="navbar flex flex-wrap justify-between items-center px-4 py-2">
      <div className="flex-1 water-text text-center relative lg:left-[-20rem]">
      <a href="/">
          <h2 className="font-bold sm:text-lg md:text-2xl text-white">MediPick</h2>
          <h2 className="font-bold sm:text-lg md:text-2xl text-white">MediPick</h2>
       </a>
        </div>
        <div className="montserrat-alternates-thin Mina hidden md:flex lg:pr-56 lg:pt-2">
          <ul className="flex space-x-6 mt-4">
            <li>
              <a className="text-[#ffffff] hover:underline hover:underline-offset-4 font-mono pt-4" href="#">
                যুক্ত হই
              </a>
            </li>
            <li>
              <a className="text-[#ffffff] hover:underline hover:underline-offset-4 font-mono pt-4" href="/health-tips">
              স্বাস্থ্য টিপস
              </a>
            </li>
            <li>
              <a className="text-[#ffffff] hover:underline hover:underline-offset-4 font-mono pt-4" href="/doctor-advise">
                ফার্মেসি লিস্ট
              </a>
            </li>
            <li>
              <a className="text-[#ffffff] hover:underline hover:underline-offset-4 font-mono pt-4" href="/doctor-advise">
                রাইডার লিস্ট
              </a>
            </li>

            <li>
              <a className=" text-[#ffffff] hover:underline hover:underline-offset-4 font-mono pt-4" href="login/role">
                Login
              </a>
            </li>
            <li>
             <Link to="register/role"> <Button className='bg-white text-black'>Signup</Button></Link>
             
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
        <div className=" Mina md:hidden flex flex-col space-y-2 px-4 py-2">
          <a className="text-[#ffffff] hover:underline hover:underline-offset-4 font-mono" href="#" onClick={toggleMenu}>
            যুক্ত হই
          </a>
          <a className="text-[#ffffff] hover:underline hover:underline-offset-4 font-mono" href="health-tips" onClick={toggleMenu}>
            স্বাস্থ্য টিপস
          </a>
          <a className="text-[#ffffff] hover:underline hover:underline-offset-4 font-mono" href="/doctor-advise" onClick={toggleMenu}>
            ফার্মেসি লিস্ট
          </a>
          <a className="text-[#ffffff] hover:underline hover:underline-offset-4 font-mono" href="/doctor-advise" onClick={toggleMenu}>
            রাইডার লিস্ট
          </a>
          <a className="text-[#ffffff] hover:underline hover:underline-offset-4 font-mono" href="login/role" onClick={toggleMenu}>
            Login
          </a>
          <Link to="register/role"> <Button className='bg-white text-black'>Signup</Button></Link>

        </div>
      )}
    </div>
  );
}
