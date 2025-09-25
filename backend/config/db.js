// config/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "emrdb", // force mongoose to use this database
    });

    console.log(`MongoDB Connected: ${conn.connection.host}, DB: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
