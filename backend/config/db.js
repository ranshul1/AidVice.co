
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    const dbURI = process.env.MongoDBURI;
    if (!dbURI) {
      throw new Error('MongoDB URI is not defined in .env file');
    }

    // Connect to MongoDB without deprecated options
    await mongoose.connect(dbURI);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if connection fails
  }
};

export default connectDB;