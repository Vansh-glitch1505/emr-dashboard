import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./ContactInformation.css";

const ContactInformation = () => {
  const { updatePreviewData } = useOutletContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobilePhone: '',
    homePhone: '',
    workPhone: '',
    email: '',
    emergencyFirstName: '',
    emergencyMiddleName: '',
    emergencyLastName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    emergencyEmail: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    updatePreviewData(updatedData, 'contact');
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/contact-information', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 1, // replace with logged-in user's ID
          ...formData
        })
      });

      if (response.ok) {
        alert("Contact Information saved successfully!");
      } else {
        alert("Failed to save Contact Information.");
      }
    } catch (error) {
      console.error("Error saving contact information:", error);
      alert("Error saving contact information.");
    }
  };

  const handleNext = () => {
    navigate('/dashboard/insurance-information');
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Information</h2>

      <fieldset className="contact-section">
        <legend className="section-title">Contact Details</legend>
        <div className="contact-details">
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="mobilePhone">Mobile/Cell Phone</label>
              <input 
                id="mobilePhone"
                type="text" 
                name="mobilePhone" 
                value={formData.mobilePhone} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="homePhone">Home Phone No.</label>
              <input 
                id="homePhone"
                type="text" 
                name="homePhone" 
                value={formData.homePhone} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="workPhone">Work Phone No.</label>
              <input 
                id="workPhone"
                type="text" 
                name="workPhone" 
                value={formData.workPhone} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="email">E-mail Address</label>
              <input 
                id="email"
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
              />
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset className="contact-section">
        <legend className="section-title">Emergency Contact Information</legend>
        
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="emergencyFirstName">First Name</label>
            <input 
              id="emergencyFirstName"
              type="text" 
              name="emergencyFirstName" 
              value={formData.emergencyFirstName} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="emergencyMiddleName">Middle Name</label>
            <input 
              id="emergencyMiddleName"
              type="text" 
              name="emergencyMiddleName" 
              value={formData.emergencyMiddleName} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="emergencyLastName">Last Name</label>
            <input 
              id="emergencyLastName"
              type="text" 
              name="emergencyLastName" 
              value={formData.emergencyLastName} 
              onChange={handleChange} 
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="emergencyRelationship">Relationship to Patient</label>
            <input 
              id="emergencyRelationship"
              type="text" 
              name="emergencyRelationship" 
              value={formData.emergencyRelationship} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="emergencyPhone">Emergency Contact No.</label>
            <input 
              id="emergencyPhone"
              type="text" 
              name="emergencyPhone" 
              value={formData.emergencyPhone} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="emergencyEmail">Emergency Email Address</label>
            <input 
              id="emergencyEmail"
              type="email" 
              name="emergencyEmail" 
              value={formData.emergencyEmail} 
              onChange={handleChange} 
            />
          </div>
        </div>
      </fieldset>

      <div className="form-actions">
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="next-btn" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default ContactInformation;