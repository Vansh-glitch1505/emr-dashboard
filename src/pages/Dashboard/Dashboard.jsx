import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Dashboard.css';

export default function Dashboard() {
  const [patientData, setPatientData] = useState({});
  const [contactData, setContactData] = useState({});

  const updatePreviewData = (newData, section) => {
    if (section === 'patient') setPatientData(newData);
    if (section === 'contact') setContactData(newData);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content">
        <Outlet context={{ patientData, contactData, updatePreviewData }} />
      </div>
    </div>
  );
}