import React from 'react';
import bgimg from '../assets/bg.jpg';
import Loginbody from './Loginbody';
function Login() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgimg})`, 
        backgroundSize: 'cover',         
        backgroundPosition: 'center',     
        minHeight: '100vh',               
        display: 'flex',
        flexDirection: 'column',
      }} 
    >
    <main style={{ flex: 1 }}>
        <Loginbody/>
    </main>
    </div>
    
  );
}

export default Login;
