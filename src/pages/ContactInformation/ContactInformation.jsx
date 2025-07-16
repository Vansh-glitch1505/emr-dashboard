import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./ContactInformation.css";

const ContactInformation = () => {
  const { updatePreviewData } = useOutletContext();
  const navigate = useNavigate(); // ✅ moved here

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
            <input type="text" name="mobilePhone" placeholder="Mobile/Cell Phone" value={formData.mobilePhone} onChange={handleChange} />
            <input type="text" name="homePhone" placeholder="Home Phone No." value={formData.homePhone} onChange={handleChange} />
            <input type="text" name="workPhone" placeholder="Work Phone No." value={formData.workPhone} onChange={handleChange} />
            <input type="email" name="email" placeholder="E-mail Address" value={formData.email} onChange={handleChange} />
          </div>
        </div>
      </fieldset>

      <fieldset className="contact-section">
        <legend className="section-title">Emergency Contact Information</legend>
        <div className="form-row">
          <input type="text" name="emergencyFirstName" placeholder="First Name" value={formData.emergencyFirstName} onChange={handleChange} />
          <input type="text" name="emergencyMiddleName" placeholder="Middle Name" value={formData.emergencyMiddleName} onChange={handleChange} />
          <input type="text" name="emergencyLastName" placeholder="Last Name" value={formData.emergencyLastName} onChange={handleChange} />
        </div>
        <div className="form-row">
          <input type="text" name="emergencyRelationship" placeholder="Relationship to Patient" value={formData.emergencyRelationship} onChange={handleChange} />
          <input type="text" name="emergencyPhone" placeholder="Emergency Contact No." value={formData.emergencyPhone} onChange={handleChange} />
          <input type="email" name="emergencyEmail" placeholder="Emergency Email Address" value={formData.emergencyEmail} onChange={handleChange} />
        </div>
      </fieldset>

      <div className="form-actions">
        <button className="save-btn">Save</button>
        <button className="next-btn" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default ContactInformation;
