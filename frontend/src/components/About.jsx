import React from 'react';
import Navbar from './Navbar';
import Aboutbody from './Aboutbody';
import Footer from './Footer';
import bgimg from '../assets/image22.jpg';

function About() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        height: '120vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />
      <main style={{ flex: 1 }}>
        <Aboutbody />
      </main>
      <Footer />
    </div>
  );
}

export default About;
