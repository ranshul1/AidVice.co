import React from 'react';
import bgimg from '../assets/bg.jpg';
import Createbody from './Createbody';
import Footer from './Footer';
import Navbar from './navbar';
function Createaccount() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgimg})`, 
        backgroundSize: 'cover',         
        backgroundPosition: 'center',     
        minHeight: '100vh',               
        display: 'flex',
        flexDirection: 'column',
        height: '490vh',  // Ensure it takes up the full viewport height   // Ensure it takes up the full viewport width
      }} 
    > 
        <main style={{ flex: 1 }}>
          <Createbody/>
        </main>
      <Footer/>
    </div>
  );
}

export default Createaccount;
