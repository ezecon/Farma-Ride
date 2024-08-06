import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

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
          <h2 className="font-bold sm:text-lg md:text-2xl text-white">FARMA-RIDE</h2>
          <h2 className="font-bold sm:text-lg md:text-2xl text-white">FARMA-RIDE</h2>
       </a>
        </div>
        <div className="hidden md:flex lg:pr-56 lg:pt-2">
          <ul className="flex space-x-6 pt-2">
            <li>
              <a className="text-[#ffffff] hover:underline hover:underline-offset-4 font-mono" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="text-[#ffffff] hover:underline hover:underline-offset-4 font-mono" href="/health-tips">
              Health Tips
              </a>
            </li>
            <li>
              <a className="text-[#ffffff] hover:underline hover:underline-offset-4 font-mono" href="/doctor-advise">
                Doctor Advise
              </a>
            </li>

            <li>
              <a className="text-[#ffffff] hover:underline hover:underline-offset-4 font-mono" href="login/role">
                Login
              </a>
            </li>
            <li>
              <a className="text-[#000000]  bg-white font-bold font-mono text-xl rounded-xl p-1 hover:bg-slate-800 hover:text-white" href="register/role">
                Signup
              </a>
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
          <a className="text-[#ffffff] hover:underline hover:underline-offset-4 font-mono" href="#" onClick={toggleMenu}>
            Home
          </a>
          <a className="text-[#ffffff] hover:underline hover:underline-offset-4 font-mono" href="health-tips" onClick={toggleMenu}>
          Health Tips
          </a>
          <a className="text-[#ffffff] hover:underline hover:underline-offset-4 font-mono" href="/doctor-advise" onClick={toggleMenu}>
            Doctor Advise
          </a>
          <a className="text-[#ffffff] hover:underline hover:underline-offset-4 font-mono" href="login/role" onClick={toggleMenu}>
            Login
          </a>
          <a className="text-[#000000]  bg-white font-bold font-mono text-xl rounded-xl p-1 hover:bg-slate-800 hover:text-white" href="register/role" onClick={toggleMenu}>
                Signup
              </a>

        </div>
      )}
    </div>
  );
}
