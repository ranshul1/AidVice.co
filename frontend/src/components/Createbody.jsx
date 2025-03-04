import React, { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import axios from 'axios';
import toast from 'react-hot-toast'; 
import { useNavigate } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import allergiesfile from '../assets/allergies.json'
import  diseaseData  from '../assets/categorized_diseases.json'
function CreateBody() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [diseaseList, setDiseaseList] = useState([]);
  useEffect(() => {
    setDiseaseList(diseaseData);
}, []);
  const handleAllergySelect = (index, selectedAllergy) => {
    const updatedAllergies = [...formData.allergies];
    updatedAllergies[index].allergy = selectedAllergy;
    setFormData({ ...formData, allergies: updatedAllergies });
  };
  
  const [formData, setFormData] = useState({
    fullname: '',
    dob: '',
    email: '',
    phnumber: '',
    password: '',
    fathername: '',
    mothername: '',
    address: '',
    occupation: '',
    dp: '',
    bloodgrp:'',
    diseasebool: false,
    diseases: [{ disease: '', date: '' }],
    allergybool: false,
    allergies: [{ allergy: '' }],
    surgerybool: false,
    surgeries: [{ surgery: '', date: '' }],
    socialHistories: [{ history: '' }],
    emergencyContacts: [{ name: '', email: '', phone: '', relation: '' }]
  });

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle Disease Changes
  const handleDiagnosisChange = (index, e) => {
    const updatedDiseases = formData.diseases.map((diagnosis, i) => {
        if (i === index) {
            return { ...diagnosis, [e.target.name]: e.target.value };
        }
        return diagnosis;
    });
    setFormData({ ...formData, diseases: updatedDiseases });
};
const handleDiseaseSelect = (index, value) => {
  const updatedDiseases = formData.diseases.map((diagnosis, i) => {
      if (i === index) {
          return { ...diagnosis, disease: value };
      }
      return diagnosis;
  });
  setFormData({ ...formData, diseases: updatedDiseases });
};
  const handleAddDisease = () => {
    setFormData({
      ...formData,
      diseases: [...formData.diseases, { disease: '', date: '' }]
    });
  };

  const handleRemoveDisease = (index) => {
    const updatedDiagnoses = formData.diseases.filter((_, i) => i !== index);
    setFormData({ ...formData, diseases: updatedDiagnoses });
  };

  // Handle Allergy Changes
  const handleAllergyChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAllergies = [...formData.allergies];
    updatedAllergies[index][name] = value;
    setFormData({ ...formData, allergies: updatedAllergies });
  };

  const handleAddAllergy = () => {
    setFormData({
      ...formData,
      allergies: [...formData.allergies, { allergy: '' }]
    });
  };

  const handleRemoveAllergy = (index) => {
    const updatedAllergies = formData.allergies.filter((_, i) => i !== index);
    setFormData({ ...formData, allergies: updatedAllergies });
  };

  // Handle Surgery Changes
  const handleSurgeryChange = (index, e) => {
    const updatedSurgeries = [...formData.surgeries];
    updatedSurgeries[index].surgery = e.target.value;
    setFormData({ ...formData, surgeries: updatedSurgeries });
  };
  
  const handleAddSurgery = () => {
    setFormData({
      ...formData,
      surgeries: [...formData.surgeries, { surgery: '', date: '' }]
    });
  };

  const handleRemoveSurgery = (index) => {
    const updatedSurgeries = formData.surgeries.filter((_, i) => i !== index);
    setFormData({ ...formData, surgeries: updatedSurgeries });
  };

  // Handle Social History Changes
  const handleSocialHistoryChange = (index, e) => {
    const updatedSocialHistories = [...formData.socialHistories];
    updatedSocialHistories[index].history = e.target.value;
    setFormData({ ...formData, socialHistories: updatedSocialHistories });
  };

  const handleAddSocialHistory = () => {
    setFormData({
      ...formData,
      socialHistories: [...formData.socialHistories, { history: '' }]
    });
  };

  const handleRemoveSocialHistory = (index) => {
    const updatedSocialHistories = formData.socialHistories.filter((_, i) => i !== index);
    setFormData({ ...formData, socialHistories: updatedSocialHistories });
  };

  // Handle Emergency Contacts
  const handleEmergencyContactChange = (index, e) => {
    const { name, value } = e.target;
  
    // Make a copy of the emergencyContacts array
    const updatedContacts = [...formData.emergencyContacts];
  
    // Update the specific contact's field
    updatedContacts[index][name] = value;
  
    // Set the new state
    setFormData({
      ...formData,
      emergencyContacts: updatedContacts
    });
  };
  
  const handleAddEmergencyContact = () => {
    setFormData({
      ...formData,
      emergencyContacts: [...formData.emergencyContacts, { name: '', email: '', phone: '', relation: '' }]
    });
  }; 
  const handleRemoveEmergencyContact = (index) => {
    const updatedContacts = formData.emergencyContacts.filter((_, i) => i !== index);
    setFormData({ ...formData, emergencyContacts: updatedContacts });
  };
// Handle File Input for Image (dp)
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, dp: reader.result }); // Set the base64 or URL
      console.log("File loaded as base64:", reader.result); // Debugging log
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const userInfo = {
    fullname: formData.fullname,
    dob: formData.dob,
    email: formData.email,
    phnumber: formData.phnumber,
    password: formData.password,
    fathername: formData.fathername,
    mothername: formData.mothername,
    address: formData.address,
    occupation: formData.occupation,
    dp: formData.dp,
    bloodgrp: formData.bloodgrp,
    diseasebool: formData.diseasebool,
    diseases: formData.diseases,
    allergybool: formData.allergybool,
    allergies: formData.allergies,
    surgerybool: formData.surgerybool,
    surgeries: formData.surgeries,
    socialhistory: formData.socialHistories,
    emergencycontact: formData.emergencyContacts,
  };

  try {
    const response = await axios.post('http://localhost:4001/user/signup', userInfo);
    toast.success("Account Created Successfully!");
    navigate(`/aidcard/${response.data.user._id}`, { state: { user: response.data.user } });
  } catch (error) {
    console.error("Error during signup:", error);
    const errorMessage = error.response ? error.response.data.message : "An error occurred during signup. Please try again.";
    toast.error("Error: " + errorMessage);
  }
};
  

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className='font-serif flex flex-row justify-center pt-20 text-5xl bg-gradient-to-r from-red-950 via-red-400 to-rose-50 bg-clip-text text-transparent'>
        Personal Information
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20 space-y-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
          <div>
            <label htmlFor="fullname" className="block text-xl font-semibold leading-6 text-black pb-3">
              Full name
            </label>
            <input
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              type="text"
              className="block w-full rounded-md border-0 px-3.5 py-2"
            />
          </div>
          <div>
            <label htmlFor="dob" className="block text-xl font-semibold leading-6 text-black pb-3">
              D.O.B
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 px-3.5 py-2"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-xl font-semibold leading-6 text-black pb-3">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 px-3.5 py-2"
          />
        </div>

        <div>
          <label htmlFor="phnumber" className="block text-xl font-semibold leading-6 text-black pb-3">
            Phone Number
          </label>
          <div className="relative">
            <select
              id="country"
              name="country"
              className="absolute inset-y-0 left-0 flex items-center h-full rounded-md border-0 bg-none py-0 pl-4 pr-9 text-gray-400 sm:text-sm text-xl"
            >
              <option>IN</option>
              <option>US</option>
            </select>
            <input
              id="phnumber"
              name="phnumber"
              type="tel"
              value={formData.phnumber}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 px-4 py-2 pl-24"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-xl font-semibold leading-6 text-black pb-3">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 px-3.5 py-2"
          />
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
          <div>
            <label htmlFor="fathername" className="block text-xl font-semibold leading-6 text-black pb-3">
              Father Name
            </label>
            <input
              id="fathername"
              name="fathername"
              value={formData.fathername}
              onChange={handleInputChange}
              type="text"
              className="block w-full rounded-md border-0 px-3.5 py-2"
            />
          </div>
          <div>
            <label htmlFor="mothername" className="block text-xl font-semibold leading-6 text-black pb-3">
              Mother Name
            </label>
            <input
              id="mothername"
              name="mothername"
              value={formData.mothername}
              onChange={handleInputChange}
              type="text"
              className="block w-full rounded-md border-0 px-3.5 py-2"
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-xl font-semibold leading-6 text-black pb-3">
            Address
          </label>
          <input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            type="text"
            className="block w-full rounded-md border-0 px-3.5 py-2"
          />
        </div>

        <div>
          <label htmlFor="occupation" className="block text-xl font-semibold leading-6 text-black pb-3">
            Occupation
          </label>
          <input
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleInputChange}
            type="text"
            className="block w-full rounded-md border-0 px-3.5 py-2"
          />
        </div>

        {/* File Upload Section */}
        <div className="flex flex-col gap-2">
          <label className="block mb-2 text-xl text-gray-900 dark:text-black font-semibold" htmlFor="file_input pb-3">
            Upload File
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none"
            id="file_input"
            type="file"
            onChange={handleFileChange}
            //value={formData.dp}
            accept="image/*"
          />
           {/* Image Preview */}
           {formData.dp && (
            <img src={formData.dp} alt="Preview" className="mt-4 w-32 h-32 rounded-full object-cover" />
          )}
        </div>
        <div>
          <label htmlFor="bloodgrp" className="block text-xl font-semibold leading-6 text-black pb-3">
            Blood Group
          </label>
          <input
            id="bloodgrp"
            name="bloodgrp"
            value={formData.bloodgrp}
            onChange={handleInputChange}
            type="text"
            className="block w-full rounded-md border-0 px-3.5 py-2"
          />
        </div>
        {/* Medical History Section */}
        <div className="font-serif flex flex-row justify-center pt-20 text-5xl bg-gradient-to-r from-red-950 via-red-400 to-rose-50 bg-clip-text text-transparent">
                Medical History
            </div>
            


            <div className="pt-16">
                <h3 className="text-xl font-semibold">Medical History</h3>
                <div className="flex items-center pt-5">
                    <input
                        id="diseasebool"
                        name="diseasebool"
                        type="checkbox"
                        checked={formData.diseasebool}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-red-800 bg-gray-100 border-gray-300 rounded focus:ring-2"
                    />
                    <label htmlFor="diseasebool" className="ml-2 text-lg font-medium text-gray-900">
                        I have not been diagnosed with any kind of disease.
                    </label>
                </div>

                {formData.diseases.map((diagnosis, index) => (
                    <div key={index} className="grid grid-cols-1 gap-x-8 gap-y-0 sm:grid-cols-2 pt-10">
                        <div className="flex flex-col">
                            <label htmlFor={`disease-select-${index}`} className="block text-lg font-semibold leading-6 text-black pb-3">
                                Select a disease
                            </label>
                            <select
                                id={`disease-select-${index}`}
                                onChange={(e) => handleDiseaseSelect(index, e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2"
                            >
                                <option value="">Select a Disease</option>
                                {diseaseList.map((category) => (
                                    <optgroup key={category.category} label={category.category}>
                                        {category.subtypes.map((disease) => (
                                            <option key={disease} value={disease}>
                                                {disease}
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>

                           
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor={`diagnosisdate-${index}`} className="block text-lg font-semibold leading-6 text-black pb-3">
                                Date of Diagnosis
                            </label>
                            <input
                                id={`diagnosisdate-${index}`}
                                name={`date`}
                                value={diagnosis.date}
                                onChange={(e) => handleDiagnosisChange(index, e)}
                                type="date"
                                className="block w-full rounded-md border-0 px-3.5 py-2"
                            />
                        </div>

                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => handleRemoveDisease(index)}
                                className="mx-0 mt-3 inline-flex justify-center items-center text-red-600 hover:text-white hover:bg-red-600 px-5 py-2 border border-red-600 rounded-md shadow-sm transition duration-200"
                            >
                                Remove ❌
                            </button>
                        )}
                    </div>
                ))}

                <button
                    type="button"
                    className="mt-10 bg-red-800 text-white px-4 py-2 rounded-md"
                    onClick={handleAddDisease}
                >
                    Add Another Disease
                </button>
            </div>
        {/* Allergies Section */}
        <div className="pt-16">
  <h3 className="text-xl font-semibold">Known Allergies</h3>
  <div className="flex items-center pt-5">
    <input
      id="allergybool"
      name="allergybool"
      type="checkbox"
      checked={formData.allergybool}
      onChange={handleInputChange}
      className="w-4 h-4 text-red-800 bg-gray-100 border-gray-300 rounded focus:ring-2"
    />
    <label htmlFor="allergybool" className="ml-2 text-lg font-medium text-gray-900">
      I don't have any known allergy.
    </label>
  </div>

  {formData.allergies.map((allergy, index) => (
    <div key={index} className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 pt-10">
      <div className="flex flex-col">
        <label htmlFor={`allergy-${index}`} className="block text-lg font-semibold leading-6 text-black pb-3">
          Select an allergy
        </label>
        <select
          id={`allergy-select-${index}`}
          onChange={(e) => handleAllergySelect(index, e.target.value)}
          className="block w-full rounded-md border-0 px-3.5 py-2"
        >
          <option value="">Select an Allergy</option>
          {allergiesfile.map((category) => (
            <optgroup key={category.category} label={category.category}>
              {category.subtypes.map((subtype) => (
                <option key={subtype} value={subtype}>
                  {subtype}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        
      </div>

      {index > 0 && (
        <button
          type="button"
          onClick={() => handleRemoveAllergy(index)}
          className="mx-0 mt-9 inline-flex justify-center items-center text-red-600 hover:text-white hover:bg-red-600 px-5 py-2 border border-red-600 rounded-md shadow-sm transition duration-200 h-10"
        >
          Remove ❌
        </button>
      )}
    </div>
  ))}

  <button
    type="button"
    className="mt-10 bg-red-800 text-white px-4 py-2 rounded-md"
    onClick={handleAddAllergy}
  >
    Add Another Allergy
  </button>
</div>


        {/* Surgery Section */}
        <div className="pt-16">
          <h3 className="text-xl font-semibold">Surgical History</h3>
          <div className="flex items-center pt-5">
            <input
              id="surgerybool"
              type="checkbox"
              name="surgerybool"
              checked={formData.surgerybool}
              onChange={handleInputChange}
              className="w-4 h-4 text-red-800 bg-gray-100 border-gray-300 rounded focus:ring-2"
            />
            <label htmlFor="surgerybool" className="ml-2 text-lg font-medium text-gray-900">
              I have not had any surgical procedure.
            </label>
          </div>

          {formData.surgeries.map((surgery, index) => (
            <div key={index} className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 pt-10">
              <div className="flex flex-col">
                <label htmlFor={`surgery-${index}`} className="block text-lg font-semibold leading-6 text-black pb-3">
                  Surgery Name
                </label>
                <input
                  id={`surgery-${index}`}
                  name={`surgery[${index}].surgery`}
                  value={surgery.surgery}
                  onChange={(e) => handleSurgeryChange(index, e)}
                  type="text"
                  className="block w-full rounded-md border-0 px-3.5 py-2  bg-white border-gray-300"
                />
              </div>

              <div className="flex flex-col">
                            <label htmlFor={`surgerydate-${index}`} className="block text-lg font-semibold leading-6 text-black pb-3">
                                Date of Surgery
                            </label>
                            <input
                                id={`surgerydate-${index}`}
                                name={`date`}
                                value={surgery.date}
                                onChange={(e) => handleSurgeryChange(index, e)}
                                type="date"
                                className="block w-full rounded-md border-0 px-3.5 py-2"
                            />
                        </div>

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSurgery(index)}
                  className="mx-0 mt-3 inline-flex justify-center items-center text-red-600 hover:text-white hover:bg-red-600 px-5 py-2 border border-red-600 rounded-md shadow-sm transition duration-200"
                >
                  Remove ❌
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="mt-10 bg-red-800 text-white px-4 py-2 rounded-md"
            onClick={handleAddSurgery}
          >
            Add Another Surgery
          </button>
        </div>

        {/* Social History Section */}
        <div className="pt-16">
          <h3 className="text-xl font-semibold">Social History</h3>

          {formData.socialHistories.map((socialHistory, index) => (
            <div key={index} className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 pt-10">
              <div className="flex flex-col">
                <label htmlFor={`socialhistory-${index}`} className="block text-lg font-semibold leading-6 text-black pb-5">
                  Social History
                </label>
                <select
                  id={`socialhistory-${index}`}
                  name={`socialhistory[${index}].history`}
                  value={socialHistory.history}
                  onChange={(e) => handleSocialHistoryChange(index, e)}
                  className="block w-full rounded-md border-0 px-3.5 py-2"
                >
                  <option value="">Select an option</option>
                  <option value="Non-Smoker">Non-Smoker</option>
                  <option value="Smoker">Smoker</option>
                  <option value="Occasional Smoker">Occasional Smoker</option>
                  <option value="Alcohol User">Alcohol User</option>
                  <option value="Non-Alcohol User">Non-Alcohol User</option>
                  <option value="Drug User">Drug User</option>
                  <option value="Non-Drug User">Non-Drug User</option>
                </select>
              </div>

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSocialHistory(index)}
                  className="mx-0 mt-3 inline-flex justify-center items-center text-red-600 hover:text-white hover:bg-red-600 px-5 py-2 border border-red-600 rounded-md shadow-sm transition duration-200"
                >
                  Remove ❌
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="mt-10 bg-red-800 text-white px-4 py-2 rounded-md"
            onClick={handleAddSocialHistory}
          >
            Add Another Social History
          </button>
        </div>

        {/* Emergency Contacts Section */}
        <div className="pt-16">
          <h3 className="text-xl font-semibold pb-8">Emergency Contact Information</h3>

          {formData.emergencyContacts.map((contact, index) => (
            <div key={index} className="space-y-4 mb-6">
              <div className="flex flex-col">
                <label htmlFor={`emergencycontactname-${index}`} className="block text-lg font-semibold leading-6 text-black pb-3">
                  Name
                </label>
                <input
                  id={`emergencycontactname-${index}`}
                  name="name"
                  value={contact.name}
                  onChange={(e) => handleEmergencyContactChange(index, e)}
                  className="block w-full rounded-md border-0 px-3.5 py-2"
                  placeholder="Enter Name"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor={`emergencycontactphone-${index}`} className="block text-lg font-semibold leading-6 text-black pb-3">
                  Phone Number
                </label>
                <input
                  id={`emergencycontactphone-${index}`}
                  name="phone"
                  value={contact.phone}
                  onChange={(e) => handleEmergencyContactChange(index, e)}
                  type="tel"
                  className="block w-full rounded-md border-0 px-3.5 py-2"
                  placeholder="Enter Phone Number"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor={`emergencycontactrelation-${index}`} className="block text-lg font-semibold leading-6 text-black pb-3">
                  Relation
                </label>
                <input
                  id={`emergencycontactrelation-${index}`}
                  name="relation"
                  value={contact.relation}
                  onChange={(e) => handleEmergencyContactChange(index, e)}
                  className="block w-full rounded-md border-0 px-3.5 py-2"
                  placeholder="Enter Relation"
                />
              </div>

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveEmergencyContact(index)}
                  className="mx-0 mt-3 inline-flex justify-center items-center text-red-600 hover:text-white hover:bg-red-600 px-5 py-2 border border-red-600 rounded-md shadow-sm transition duration-200"
                >
                  Remove ❌
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="mt-10 bg-red-800 text-white px-4 py-2 rounded-md"
            onClick={handleAddEmergencyContact}
          >
            Add Another Emergency Contact
          </button>
        </div>

        {/* Agreement Section */}
        <div className="flex gap-x-4 sm:col-span-2">
          <div className="flex h-6 items-center">
            <Switch
              checked={agreed}
              onChange={setAgreed}
              className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="sr-only">Agree to policies</span>
              <span
                aria-hidden="true"
                className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
              />
            </Switch>
          </div>
          <label className="text-sm leading-6 text-black">
            I agree to the terms and conditions.
          </label>
        </div>

        <button
          type="submit"
          className="mt-8 bg-red-800 text-white px-6 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateBody;
