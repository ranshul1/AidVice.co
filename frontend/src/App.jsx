import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Certification from './components/Certification';
import Contact from './components/Contact';
import Login from './components/Login';
import Createaccount from './components/Createaccount';
import Aidpage from './components/Aidpage';
import AidCard from './components/AidCard';
import Nearbyhospitals from './components/Nearbyhospitals';
import { Toaster } from 'react-hot-toast';
import SOSButton from './components/SOSButton';

function App() {
  return (
    <>
      <Toaster /> {/* Place Toaster outside of Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/certification" element={<Certification />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<Createaccount />} />
        <Route path="/aidpage" element={<Aidpage />} />
        <Route path="/aidcard" element={<AidCard />} />
        <Route path="/nearbyhospitals" element={<Nearbyhospitals />} />
        <Route path="/sosbutton" element={<SOSButton />} />
        <Route path="/aidcard/:userId" element={<AidCard />} />
      </Routes>
    </>
  );
}

export default App;
