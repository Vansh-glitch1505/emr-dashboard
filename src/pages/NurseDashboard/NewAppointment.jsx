import React, { useState } from 'react';
import './NewAppointment.css';
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const NewAppointment = () => {
  const navigate = useNavigate();

  const handleDone = () => {
    navigate("/table-dashboard");
  };

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    contactInfo: '',
    date: '',
    time: '',
    appointmentType: 'Follow up',
    reason: 'Regular',
    urgencyDropdown: 'No',
    doctor: 'Dr. Smith',
    comments: ''
  });

  const allPatients = [
    { id: 1, first_name: 'Sarah', last_name: 'Johnson' },
    { id: 2, first_name: 'Michael', last_name: 'Chen' },
    { id: 3, first_name: 'Emma', last_name: 'Rodriguez' },
    { id: 4, first_name: 'David', last_name: 'Williams' },
    { id: 5, first_name: 'Sophia', last_name: 'Brown' },
    { id: 6, first_name: 'James', last_name: 'Smith' },
  ];

  const handleAddPatient = () => {
    navigate('/dashboard/patient-demographics');
  };

  const filteredPatients = allPatients.filter(patient =>
    `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setFormData({
      ...formData,
      name: `${patient.first_name} ${patient.last_name}`
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="medapp-container">
      {/* Header */}
      <div className="medapp-header">
        <h2 className="medapp-title">New Appointment Form</h2>
      </div>

      <div className="medapp-main-content">
        {/* Left Panel - Patient Search */}
        <div className="medapp-left-panel">
          
          {/* Add New Patient button here */}
          <div className="medapp-add-patient-container">
            <Link to="/nurse-dashboard" className="nv-logo">
              <img src={logo} alt="Logo" className="nv-logo-image" />
            </Link>
            <button className="medapp-add-patient-btn" onClick={handleAddPatient} >+Add New Patient</button>
          </div>

          <div className="medapp-search-container">
            <input
              type="text"
              placeholder="Search Patient"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="medapp-search-input"
            />
            <button className="medapp-search-btn">🔍</button>
          </div>
          
          <div className="medapp-patient-list">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className={`medapp-patient-item ${selectedPatient?.id === patient.id ? 'medapp-selected' : ''}`}
                onClick={() => handlePatientSelect(patient)}
              >
                <div className="medapp-patient-avatar"></div>
                <span className="medapp-patient-name">
                  {patient.first_name} {patient.last_name}
                </span>
                <span className="medapp-arrow">›</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Appointment Form */}
        <div className="medapp-right-panel">
          <div className="medapp-form-section">
            <h3 className="medapp-section-title">Patient Information</h3>
            
            <div className="medapp-form-row">
              <div className="medapp-form-group">
                <label className="medapp-label">First Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="medapp-input"
                  placeholder=""
                />
              </div>
              <div className="medapp-form-group">
                <label className="medapp-label">Middle Name</label>
                <input
                  type="text"
                  className="medapp-input"
                  placeholder=""
                />
              </div>
              <div className="medapp-form-group">
                <label className="medapp-label">Last Name</label>
                <input
                  type="text"
                  className="medapp-input"
                  placeholder=""
                />
              </div>
            </div>

            <div className="medapp-form-row">
              <div className="medapp-form-group">
                <label className="medapp-label">Age</label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="medapp-input medapp-age-input"
                  placeholder=""
                />
              </div>
              <div className="medapp-form-group medapp-contact-group">
                <label className="medapp-label">Contact Information</label>
                <input
                  type="text"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleInputChange}
                  className="medapp-input medapp-contact-input"
                  placeholder=""
                />
              </div>
            </div>
          </div>

          <div className="medapp-form-section">
            <h3 className="medapp-section-title">Appointment Details</h3>
            
            <div className="medapp-form-row">
              <div className="medapp-form-group">
                <label className="medapp-label">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="medapp-input"
                />
              </div>
              <div className="medapp-form-group">
                <label className="medapp-label">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="medapp-input"
                  placeholder=""
                />
              </div>
            </div>

            <div className="medapp-form-row">
              <div className="medapp-form-group">
                <label className="medapp-label">Appointment Type</label>
                <select
                  name="appointmentType"
                  value={formData.appointmentType}
                  onChange={handleInputChange}
                  className="medapp-select"
                >
                  <option>Follow up</option>
                  <option>New Patient</option>
                  <option>Consultation</option>
                  <option>Emergency</option>
                </select>
              </div>
              <div className="medapp-form-group">
                <label className="medapp-label">Reason for Appointment</label>
                <select
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="medapp-select"
                >
                  <option>Regular</option>
                  <option>Urgent</option>
                  <option>Emergency</option>
                  <option>Routine Check</option>
                </select>
              </div>
            </div>

            <div className="medapp-form-row">
              <div className="medapp-form-group">
                <label className="medapp-label">Urgency</label>
                <select
                  name="urgencyDropdown"
                  value={formData.urgencyDropdown}
                  onChange={handleInputChange}
                  className="medapp-select"
                >
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
              <div className="medapp-form-group">
                <label className="medapp-label">Doctor</label>
                <select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleInputChange}
                  className="medapp-select"
                >
                  <option>Dr. Ram Shah</option>
                  <option>Dr. Rohan Sharma</option>
                  <option>Dr. Sanjay Williams</option>
                  <option>Dr. Ajay Patil</option>
                </select>
              </div>
            </div>

            <div className="medapp-form-group medapp-comments-group">
              <label className="medapp-label">Notes</label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                className="medapp-textarea"
                rows="4"
                placeholder=""
              />
            </div>
          </div>

          <div className="medapp-form-actions">
            <button className="medapp-done-btn" onClick={handleDone} >Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAppointment;
