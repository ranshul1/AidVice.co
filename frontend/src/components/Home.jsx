import React from 'react';
import bgimage from '../assets/bg.jpg'; // Import the background image
import Navbar from './Navbar';
import Footer from './Footer';
import Body from './Body'; // 'Body' should be capitalized

function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgimage})`, // Set background image
        backgroundSize: 'cover', // Make sure it covers the entire area
        backgroundPosition: 'center', // Center the image
        minHeight: '100vh', // Full height of the viewport
        display: 'flex',
        flexDirection: 'column',
        position: 'relative', // Relative positioning to make z-index effective
      }}
    >
      {/* Navbar */}
      <div style={{ position: 'relative', zIndex: 1100 }}>
        <Navbar />
      </div>

      {/* Main Content */}
      <main style={{ flex: 1, position: 'relative', zIndex: 0, margin: 40}}>
        <Body />
      </main>

      {/* Footer */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
