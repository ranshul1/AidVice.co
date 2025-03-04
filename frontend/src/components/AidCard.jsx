import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useLocation } from 'react-router-dom';
import img from '../assets/a.png';

const AidCard = () => {
  const location = useLocation();
  const { user } = location.state || {}; // Ensure the data is being passed correctly

  const [qrValue, setQrValue] = useState('');

  // Format helper functions
  const formatPhoneNumber = (phone) => phone || "Not Available";
  const formatDate = (date) => date ? new Date(date).toLocaleDateString() : "Not Available";
  const formatArray = (arr, key) =>
    arr && arr.length > 0 ? arr.map(item => item[key]).join(", ") : "Not Available";
  const formatEmergencyContact = (contacts) =>
    contacts && contacts.length > 0
      ? contacts.map(contact => `${contact.emergencycontactname}: ${contact.emergencycontactphn}`).join(", ")
      : "Not Available";

  // Prepare QR data
  useEffect(() => {
    if (user) {
      const qrData = {
        fullname: user.fullname || "Not Available",
        dob: user.dob || "Not Available",
        email: user.email || "Not Available",
        phnumber: user.phnumber || "Not Available",
        fathername: user.fathername || "Not Available",
        mothername: user.mothername || "Not Available",
        address: user.address || "Not Available",
        occupation: user.occupation || "Not Available",
        bloodgrp: user.bloodgrp || "Not Available",
        disease: user.disease ? user.disease.join(", ") : "Not Available",
        allergy: user.allergy ? user.allergy.join(", ") : "Not Available",
        surgery: user.surgery ? user.surgery.join(", ") : "Not Available",
        socialhistory: user.socialhistory
          ? user.socialhistory.map((history) => JSON.stringify(history)).join(", ")
          : "Not Available",
        emergencycontact: user.emergencycontact
          ? user.emergencycontact
              .map(contact => `${contact.emergencycontactname || "Unknown"}: ${contact.emergencycontactphn || "Unknown"}`)
              .join(", ")
          : "Not Available",
      };
  
      setQrValue(JSON.stringify(qrData));
    }
  }, [user]);
  
  // Handle missing user data
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex flex-col items-center justify-center p-8">
        <div className="text-rose-500 text-sm">
          No user data available
        </div>
      </div>
    );
  }

  // Download PDF functionality remains unchanged
  const downloadPDF = () => {
    const aidCard = document.getElementById('aidCard');
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [85.6, 53.98] });

    html2canvas(aidCard, { scale: 5 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      pdf.addImage(imgData, 'JPEG', 0, 0, 85.6, 53.98);
      pdf.save(`${user?.fullname}_Emergency_Card.pdf`);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex flex-col items-center justify-center p-8">
      <div className="text-gray-600 text-sm mb-8">AidCard Preview</div>
      <div className="w-[85.6mm] h-[53.98mm] mb-8 relative" id="aidCard">
        <div className="absolute w-full h-full bg-gradient-to-br from-white to-pink-50 rounded-lg p-5 shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="bg-pink-50 text-rose-500 text-sm px-2 py-1 rounded uppercase tracking-wider font-semibold">
              AidCard
            </span>
            <img src={img} className='max-h-12'></img>
          </div>
          <div className="flex justify-between items-end flex-1">
            <div>
              <div className="text-base font-semibold text-gray-800 mb-2">{user.fullname}</div>
              <div className="text-xs text-gray-600">{formatPhoneNumber(user.phnumber)}</div>
              <div className="text-xs text-gray-600">{user.email}</div>
            </div>
            <div>
              {qrValue && <QRCode value={qrValue} size={52} level="M" />}
              <div className="text-[10px] text-gray-600 ">Scan for details</div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-row space-x-20 mt-6'>
        <button
          onClick={downloadPDF}
          className="bg-rose-500 hover:bg-rose-600 text-white px-7 py-3 rounded-lg text-sm font-medium"
        >
          Download Card
        </button>
        <a href='/aidpage'>
          <button className="bg-rose-500 hover:bg-rose-600 text-white px-7 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            Go to Aidpage
          </button>
        </a>
      </div>
    </div>
  );
};

export default AidCard;
