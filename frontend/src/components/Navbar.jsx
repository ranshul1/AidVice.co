import React, { useState, useEffect } from 'react';
import largeLogo from '../assets/AidVice(6).png';
import mediumLogo from '../assets/AidVice(6).png';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [logoImage, setLogoImage] = useState(largeLogo);
  const page = window.location.pathname;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setLogoImage(mediumLogo);
      } else {
        setLogoImage(largeLogo);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className="navbar text-white flex items-center justify-between"
      style={{
        position: 'absolute',
        zIndex: 1000, // Base z-index for navbar
        width: '90%',
        maxWidth: '1352px',
        height: '93px',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '5px',
        paddingTop: '10px',
        background: 'linear-gradient(90deg, #F57D86 0%, #FBEDEB 100%)',
        opacity: '0.73',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '17px',
      }}
    >
      {/* Toggle Icon */}
      <div className="relative">
        <button
          tabIndex={0}
          role="button"
          className="btn btn-square btn-ghost dropdown-toggle"
          onClick={toggleDropdown}
          style={{ zIndex: 1100 }} // Ensures button stays above navbar elements
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="ml-5 inline-block h-7 w-7 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        {isDropdownOpen && (
          <ul
            tabIndex={0}
            className="absolute left-0 mt-10 w-40 bg-gradient-to-r from-red-400 to-rose-200 text-white rounded-lg shadow-lg"
            style={{
              zIndex: 1200, // Dropdown has the highest z-index
              position: 'absolute', // Ensures it's drawn relative to the button
              top: '100%', // Dropdown starts right below the button
            }}
          >
            <li className="p-2 hover:bg-red-800">
              <a>Scan an Aidcard</a>
            </li>
            {page !== '/nearbyhospitals' && (
  <li className="p-2 hover:bg-red-800">
    <a href="https://zg6i2z8mo2otnvrb.vercel.app/">Nearby Hospitals</a>
  </li>
)}

            {page === '/' ? (
              <li className="p-2 hover:bg-red-800">
                <a href="/about">About Us</a>
              </li>
            ) : (
              <li className="p-2 hover:bg-red-800">
                <a href="/">Home</a>
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Logo */}
      <div className="flex-1 flex justify-center">
        <a href="/">
          <img
            src={logoImage}
            alt="logo"
            className="h-full w-auto"
            style={{ maxHeight: '900px', zIndex: 100 }} // Logo has a lower z-index
          />
        </a>
      </div>

      {/* Profile Image with Dropdown */}
      <div className="relative">
        <div
          className="w-14 h-14 m-4 cursor-pointer mr-5 mb-8"
          onClick={toggleProfileDropdown}
          style={{ zIndex: 1100 }} // Ensures profile button stays above the navbar
        >
          <img
            alt="Profile"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            className="rounded-full"
          />
        </div>
        {isProfileDropdownOpen && (
          <ul
            className="absolute right-0 mt-2 w-40 bg-gradient-to-r from-red-400 to-rose-200 text-white rounded-lg shadow-lg"
            style={{
              zIndex: 1200, // Profile dropdown also has a high z-index
              position: 'absolute',
            }}
          >
            <li className="p-2 hover:bg-red-800">
              <a href="/createaccount">Create Account</a>
            </li>
            <li className="p-2 hover:bg-red-800">
              <a href="/login">Login</a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Navbar;
