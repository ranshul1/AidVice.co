import React from 'react';
import bgimage from '../assets/bg.jpg'; // Import the background image
import Navbar from './Navbar';
import Footer from './Footer';
import Body from './Body'; // 'Body' should be capitalized
import Certibody from './Certibody';
import Contactbody from './Contactbody';

function Contact() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgimage})`, // Set background image
        backgroundSize: 'cover', // Make sure it covers the entire area
        backgroundPosition: 'center', // Center the image
        minHeight: '100vh', // Full height of the viewport
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar/>
      <main style={{ flex: 1 }}>
        <Contactbody/>
      </main>
      <Footer />
    </div>
  );
}

export default Contact;
