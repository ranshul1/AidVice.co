import React from 'react';
import Aidpagebody from './Aidpagebody';
import Navbar from './Navbar';

function Aidpage() {
  return (
    <div>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Aidpagebody />
      </main>
    </div>
  );
}

export default Aidpage;