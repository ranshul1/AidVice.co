import React from 'react';
import homelogo from '../assets/homelogo2.png';
import { useNavigate } from 'react-router-dom';

function Body() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/aidpage');
  };

  return (
    <div className="relative mt-20 z-10"> {/* Use z-10 for lower priority */}
      {/* Full-screen button */}
      <div className="flex flex-col">
        <div className="pt-20 flex flex-row">
          <div className="pl-32 pt-10">
            <img src={homelogo} className="max-h-64" alt="Home Logo" />
          </div>
          <div className="pt-24 pl-72 text-red-600 font-sans">
            <h1 className="text-5xl">Facing Any Emergency?</h1>
            <h1 className="text-xl pt-4">
              We are here to help - Just click get help now for immediate assistance.
            </h1>
          </div>
        </div>
      </div>
      <button
        className="ml-48 bg-gradient-to-r from-red-600 to-red-400 rounded-2xl h-10 w-44 mt-10 text-white text-xl"
        onClick={handleRedirect}
      >
        Get Help!
      </button>
    </div>
  );
}

export default Body;
