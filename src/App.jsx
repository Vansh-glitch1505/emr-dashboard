import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import PatientDemographics from './pages/PatientDemographics/PatientDemographics';
import ContactInformation from './pages/ContactInformation/ContactInformation';
import InsuranceInformation from "./pages/InsuranceInformation/InsuranceInformation";
import Ailments from "./pages/Ailments/Ailments";
import Assessment from './pages/Assessment/Assessment';
import Vitals from './pages/Vitals/Vitals';
import MedicationHistory from './pages/MedicationHistory/MedicationHistory';
import Allergies from './pages/Allergies/Allergies';
import FamilyHistory from './pages/FamilyHistory/FamilyHistory';
import SocialHistory from './pages/SocialHistory/SocialHistory';
import Preview from './pages/Preview/Preview';
import Consent from './pages/Consent/Consent';
import MedicalHistory from './pages/MedicalHistory/MedicalHistory';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<PatientDemographics />} />
        <Route path="patient-demographics" element={<PatientDemographics />} />
        <Route path="contact-information" element={<ContactInformation />} />
        <Route path="insurance-information" element={<InsuranceInformation />} />
        <Route path="ailments" element={<Ailments />} />
        <Route path="assessment" element={<Assessment />} />
        <Route path="medical-history" element={<MedicalHistory />} />
        <Route path="medicationhistory" element={<MedicationHistory />} />
        <Route path="vitals" element={<Vitals />} />
        <Route path="allergies" element={<Allergies />} />
        <Route path="family-history" element={<FamilyHistory />} />
        <Route path="social-history" element={<SocialHistory />} />
        <Route path="preview" element={<Preview />} />
        <Route path="consent" element={<Consent />} />
        
      </Route>
    </Routes>
  );
}

export default App;