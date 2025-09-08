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
    preferredContactMethod: [],
    emergencyContacts: [
      {
        firstName: '',
        middleName: '',
        lastName: '',
        relationship: '',
        phone: '',
        email: ''
      }
    ]
  });

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    
    if (index !== null && name.startsWith("emergency")) {
      // Handle emergency contact fields
      const fieldName = name.replace("emergency", "").charAt(0).toLowerCase() + name.replace("emergency", "").slice(1);
      const updatedContacts = [...formData.emergencyContacts];
      updatedContacts[index] = {
        ...updatedContacts[index],
        [fieldName]: value
      };
      
      const updatedData = { ...formData, emergencyContacts: updatedContacts };
      setFormData(updatedData);
      updatePreviewData(updatedData, 'contact');
    } else {
      // Handle regular fields
      const updatedData = { ...formData, [name]: value };
      setFormData(updatedData);
      updatePreviewData(updatedData, 'contact');
    }
  };

  const handleContactMethodChange = (method) => {
    const updatedMethods = formData.preferredContactMethod.includes(method)
      ? formData.preferredContactMethod.filter(m => m !== method)
      : [...formData.preferredContactMethod, method];
    
    const updatedData = { ...formData, preferredContactMethod: updatedMethods };
    setFormData(updatedData);
    updatePreviewData(updatedData, 'contact');
  };

  const addEmergencyContact = () => {
    const newContact = {
      firstName: '',
      middleName: '',
      lastName: '',
      relationship: '',
      phone: '',
      email: ''
    };
    
    const updatedData = {
      ...formData, 
      emergencyContacts: [...formData.emergencyContacts, newContact]
    };
    
    setFormData(updatedData);
    updatePreviewData(updatedData, 'contact');
  };

  const removeEmergencyContact = (index) => {
    if (formData.emergencyContacts.length <= 1) return;
    
    const updatedContacts = [...formData.emergencyContacts];
    updatedContacts.splice(index, 1);
    
    const updatedData = {
      ...formData, 
      emergencyContacts: updatedContacts
    };
    
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
      <header className="fixed-header">
        <h1 className="header-title"></h1>
      </header>
      <h2 className="contact-title">Contact Information</h2>

      <fieldset className="contact-section">
        <legend className="section-title">Contact Details</legend>
        <div className="contact-details">
          <div className="contact-info-left">
            <div className="contact-row">
              <label className="contact-label">Mobile/Cell Phone</label>
              <div className="phone-input">
                <input className="country-code" value="+91" readOnly />
                <input 
                  className="phone-number"
                  type="text" 
                  name="mobilePhone" 
                  value={formData.mobilePhone} 
                  onChange={handleChange}
                  placeholder="344-716-6844"
                />
              </div>
            </div>
            
            <div className="contact-row">
              <label className="contact-label">Home Phone No.</label>
              <div className="phone-input">
                
                <input 
                  className="phone-number"
                  type="text" 
                  name="homePhone" 
                  value={formData.homePhone} 
                  onChange={handleChange}
                  placeholder="978-960-9691"
                />
              </div>
            </div>
            
            <div className="contact-row">
              <label className="contact-label">Work Phone No.</label>
              <div className="phone-input">
                <input className="country-code" value="+91" readOnly />
                <input 
                  className="phone-number"
                  type="text" 
                  name="workPhone" 
                  value={formData.workPhone} 
                  onChange={handleChange}
                  placeholder="401-782-5419"
                />
              </div>
            </div>
            
            <div className="contact-row">
              <label className="contact-label">E-mail Address</label>
              <input 
                className="email-input"
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                placeholder="abc.emr@gmail.com"
              />
            </div>
          </div>
          
          <div className="contact-info-right">
            <div className="preferred-contact-section">
              <h4 className="preferred-title">Preferred Contact Method</h4>
              <div className="contact-methods">
                <div className="contact-method-item" onClick={() => handleContactMethodChange('phone')}>
                  <div className={`contact-method-checkbox ${formData.preferredContactMethod.includes('phone') ? 'checked' : ''}`}></div>
                  <label className="contact-method-label">Phone Call</label>
                </div>
                <div className="contact-method-item" onClick={() => handleContactMethodChange('messages')}>
                  <div className={`contact-method-checkbox ${formData.preferredContactMethod.includes('messages') ? 'checked' : ''}`}></div>
                  <label className="contact-method-label">Messages</label>
                </div>
                <div className="contact-method-item" onClick={() => handleContactMethodChange('email')}>
                  <div className={`contact-method-checkbox ${formData.preferredContactMethod.includes('email') ? 'checked' : ''}`}></div>
                  <label className="contact-method-label">Email</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset className="contact-section">
        <legend className="section-title">Emergency Contact Information</legend>
        
        {formData.emergencyContacts.map((contact, index) => (
          <div key={index} className="emergency-contact-group">
            {index > 0 && (
              <button 
                type="button" 
                className="remove-contact-btn"
                onClick={() => removeEmergencyContact(index)}
                aria-label="Remove contact"
              >
                ×
              </button>
            )}
            
            <div className="form-row">
              <div className="input-group">
                <label htmlFor={`emergencyFirstName-${index}`}>First Name</label>
                <input 
                  id={`emergencyFirstName-${index}`}
                  type="text" 
                  name="emergencyFirstName" 
                  value={contact.firstName} 
                  onChange={(e) => handleChange(e, index)} 
                />
              </div>
              
              <div className="input-group">
                <label htmlFor={`emergencyMiddleName-${index}`}>Middle Name</label>
                <input 
                  id={`emergencyMiddleName-${index}`}
                  type="text" 
                  name="emergencyMiddleName" 
                  value={contact.middleName} 
                  onChange={(e) => handleChange(e, index)} 
                />
              </div>
              
              <div className="input-group">
                <label htmlFor={`emergencyLastName-${index}`}>Last Name</label>
                <input 
                  id={`emergencyLastName-${index}`}
                  type="text" 
                  name="emergencyLastName" 
                  value={contact.lastName} 
                  onChange={(e) => handleChange(e, index)} 
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="input-group">
                <label htmlFor={`emergencyRelationship-${index}`}>Relationship to Patient</label>
                <input 
                  id={`emergencyRelationship-${index}`}
                  type="text" 
                  name="emergencyRelationship" 
                  value={contact.relationship} 
                  onChange={(e) => handleChange(e, index)} 
                />
              </div>
              <div className="input-group phone-group">
                <label htmlFor={`emergencyPhone-${index}`}>Emergency Contact No.</label>
                <div className="phone-wrapper">
                  <span className="phone-prefix">+91</span>
                  <input 
                    id={`emergencyPhone-${index}`}
                    type="tel"
                    name="emergencyPhone"
                    value={contact.phone}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Enter number"
                  />
                </div>
              </div>
              
              <div className="input-group">
                <label htmlFor={`emergencyEmail-${index}`}>Emergency Email Address</label>
                <input 
                  id={`emergencyEmail-${index}`}
                  type="email" 
                  name="emergencyEmail" 
                  value={contact.email} 
                  onChange={(e) => handleChange(e, index)} 
                />
              </div>
            </div>
          </div>
        ))}
        
        <div className="add-contact-container">
          <button type="button" className="add-contact-btn" onClick={addEmergencyContact}>
            + Add Another Emergency Contact
          </button>
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