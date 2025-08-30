// index.js
import express from 'express';
import cors from 'cors';
import patientRoutes from './routes/patients.js';
import patientDemographicsRoutes from './routes/demographics.js';
import contactRoutes from './routes/contactInformation.js';
import authRoutes from './routes/auth.js';
import insuranceRoutes from './routes/insurance.js';
import ailmentsRoutes from './routes/ailments.js';
import assessmentRoutes from './routes/assessment.js';
import medicationRoutes from "./routes/medication.js";
import vitalsRoutes from './routes/vitals.js'


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/patients', patientRoutes);
app.use('/api', patientDemographicsRoutes);
app.use('/api', contactRoutes);
app.use('/api', authRoutes);
app.use('/api', insuranceRoutes);
app.use('/api', ailmentsRoutes);
app.use('/api', assessmentRoutes); 
app.use('/api', vitalsRoutes);
//app.use('/api', medicationRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
