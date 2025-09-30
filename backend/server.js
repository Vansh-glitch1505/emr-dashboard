// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import patientDemographicsRoutes from "./routes/patientDemographics.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for uploaded images)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/patient-demographics', patientDemographicsRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: "EMR Server is running",
    endpoints: {
      patientDemographics: "/api/patient-demographics"
    }
  });
});

// Start server and connect to DB
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
      console.log('Available routes:');
      console.log(`  POST   /api/patient-demographics`);
      console.log(`  GET    /api/patient-demographics`);
      console.log(`  GET    /api/patient-demographics/:id`);
      console.log(`  PUT    /api/patient-demographics/:id`);
      console.log(`  DELETE /api/patient-demographics/:id`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB, server not started:', err);
    process.exit(1);
  });