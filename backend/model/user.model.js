import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: String,
  dob: Date,
  email: { type: String, unique: true },
  phnumber: String,
  password: String,
  fathername: String,
  mothername: String,
  address: String,
  occupation: String,
  dp: String,
  diseasebool: Boolean,
  disease: [{
    diseasename: String,
    diagnosisdate: Date,
  }],
  allergybool: Boolean,
  allergy: [{
    allergyname: String,
  }],
  surgerybool: Boolean,
  surgery: [{
    surgeryname: String,
    surgerydate: Date,
  }],
  socialhistory: [{
    shname: String,
  }],
  emergencycontact: [{
    emergencycontactname: String,
    emergencycontactphn: String,
    emergencycontactrln: String,
  }],
  qrCode: String, // Field for storing QR Code
});

const User = mongoose.model("User", userSchema);
export default User;
