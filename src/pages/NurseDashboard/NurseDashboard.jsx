// NurseDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NurseDashboard.css';

const NurseDashboard = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Hardcoded all patients
    const allPatients = [
      { id: 1, first_name: 'Sarah', last_name: 'Johnson' },
      { id: 2, first_name: 'Michael', last_name: 'Chen' },
      { id: 3, first_name: 'Emma', last_name: 'Rodriguez' },
      { id: 4, first_name: 'David', last_name: 'Williams' },
      { id: 5, first_name: 'Sophia', last_name: 'Brown' },
      { id: 6, first_name: 'James', last_name: 'Smith' },
    ];
    setPatients(allPatients);

    // Hardcoded recent patients with "visitTime"
    const visits = [
      { id: 7, first_name: 'Ava', last_name: 'Taylor', visitTime: '2025-08-30T15:30:00' },
      { id: 8, first_name: 'Liam', last_name: 'Davis', visitTime: '2025-08-30T14:45:00' },
      { id: 9, first_name: 'Olivia', last_name: 'Martinez', visitTime: '2025-08-30T13:00:00' },
      { id: 10, first_name: 'Noah', last_name: 'Wilson', visitTime: '2025-08-30T12:15:00' },
    ];

    // Sort in descending order (latest first)
    const sortedVisits = visits.sort(
      (a, b) => new Date(b.visitTime) - new Date(a.visitTime)
    );

    setRecentPatients(sortedVisits);
  }, []);

  const handleAddPatient = () => {
    navigate('/dashboard/patient-demographics');
  };

  const filteredPatients = patients.filter(patient =>
    `${patient.first_name} ${patient.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="nurse-dashboard">
      <div className="dashboard-header">
        <h1>Nurse Dashboard</h1>
        <p>Welcome back! Here's today's patient overview.</p>
      </div>

      <div className="dashboard-content">
        {/* Column 1: Add patient + All Patients */}
        <div className="col patient-list">
          <div className="card">
            <div className="card-header">
              <h2>Patient Directory</h2>
              <button className="add-patient-btn" onClick={handleAddPatient}>
                + Add New Patient
              </button>
            </div>
            
            <div className="search-container">
              <input
                type="text"
                placeholder="Search patients..."
                className="search-box"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="patient-list-container">
              <h3>All Patients ({patients.length})</h3>
              <ul>
                {filteredPatients.map((patient) => (
                  <li key={patient.id} className="patient-item">
                    <div className="patient-avatar">
                      {patient.first_name.charAt(0)}
                      {patient.last_name.charAt(0)}
                    </div>
                    <div className="patient-info">
                      <span className="patient-name">
                        {patient.first_name} {patient.last_name}
                      </span>
                      <span className="patient-id">ID: {patient.id}</span>
                    </div>
                    <div className="patient-actions">
                      <button className="view-btn">View</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Column 2: Recent patients (descending order) */}
        <div className="col">
          <div className="card">
            <div className="card-header with-accent">
              <h2>New Visits</h2>
            </div>
            <div className="recent-patients">
              <h3>Recent Patients</h3>
              <ul>
                {recentPatients.length > 0 ? (
                  recentPatients.slice(0, 10).map((patient) => (
                    <li key={patient.id} className="recent-patient-item">
                      <div className="recent-patient-info">
                        <span className="patient-name">
                          {patient.first_name} {patient.last_name}
                        </span>
                        <span className="visit-time">
                          {new Date(patient.visitTime).toLocaleString()}
                        </span>
                      </div>
                      <div className="status-badge new">New</div>
                    </li>
                  ))
                ) : (
                  <li className="no-data">No recent visits</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Column 3: Upcoming appointments */}
        <div className="col">
          <div className="card">
            <div className="card-header with-accent">
              <h2>Upcoming Appointments</h2>
            </div>
            <div className="appointments">
              <h3>Today's Schedule</h3>
              <ul>
                <li className="appointment-item">
                  <div className="appointment-time">9:00 AM</div>
                  <div className="appointment-info">
                    <span className="patient-name">Sarah Johnson</span>
                    <span className="appointment-type">Follow-up</span>
                  </div>
                </li>
                <li className="appointment-item">
                  <div className="appointment-time">11:30 AM</div>
                  <div className="appointment-info">
                    <span className="patient-name">Michael Chen</span>
                    <span className="appointment-type">Consultation</span>
                  </div>
                </li>
                <li className="appointment-item">
                  <div className="appointment-time">2:15 PM</div>
                  <div className="appointment-info">
                    <span className="patient-name">Emma Rodriguez</span>
                    <span className="appointment-type">Physical Exam</span>
                  </div>
                </li>
              </ul>
              <button className="view-schedule-btn">View Full Schedule</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NurseDashboard;
