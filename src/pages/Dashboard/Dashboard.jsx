import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Dashboard.css';

export default function Dashboard() {
  const [patientData, setPatientData] = useState({});
  const [contactData, setContactData] = useState({});
  const [insuranceData, setInsuranceData] = useState({});
  const [ailmentsData, setAilmentsData] = useState([]);
  const [assessmentData, setAssessmentData] = useState({});
  const [vitalsData, setVitalsData] = useState([]);

  const updatePreviewData = (newData, section) => {
    switch (section) {
      case 'patient':
        setPatientData(newData);
        break;
      case 'contact':
        setContactData(newData);
        break;
      case 'insurance':
        setInsuranceData(newData);
        break;
      case 'ailments':
        setAilmentsData(prev => [...prev, newData]);
        break;
      case 'assessment':
        setAssessmentData(newData);
        break;
      case 'vitals':
        setVitalsData(prev => [...prev, newData]);
        break;
      default:
        console.warn(`Unknown section: ${section}`);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content">
        <Outlet context={{ 
          patientData, 
          contactData, 
          insuranceData, 
          ailmentsData,
          assessmentData,
          vitalsData,
          updatePreviewData 
        }} />
      </div>
    </div>
  );
}