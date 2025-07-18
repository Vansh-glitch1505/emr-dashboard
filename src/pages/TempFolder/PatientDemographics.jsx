import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import "./PatientDemographics.css";

const PatientDemographics = () => {
  const { updatePreviewData } = useOutletContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    gender: '',
    address1: '',
    address2: '',
    city: '',
    postalCode: '',
    district: '',
    state: '',
    country: '',
    bloodGroup: '',
    occupation: '',
    aadharNumber: '',
    panNumber: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.address1) newErrors.address1 = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.country) newErrors.country = 'Country is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    updatePreviewData(updatedData, 'patient');
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate('/dashboard/contact-information');
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      // Save logic here
      console.log('Form data saved:', formData);
    }
  };

  return (
    <div className="patient-demographics-container">
      <h2>Patient Demographics</h2>

      <fieldset className="section">
        <legend>Patient Information</legend>
        <div className="form-row">
          <label>Name</label>
          <div className="input-group">
            <input 
              type="text" 
              name="firstName" 
              placeholder="First Name" 
              value={formData.firstName} 
              onChange={handleChange} 
              className={errors.firstName ? 'error' : ''}
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>
          <input type="text" name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleChange} />
          <div className="input-group">
            <input 
              type="text" 
              name="lastName" 
              placeholder="Last Name" 
              value={formData.lastName} 
              onChange={handleChange} 
              className={errors.lastName ? 'error' : ''}
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
        </div>
        <div className="form-row">
          <div className="input-group">
            <label>Date of Birth</label>
            <input 
              type="date" 
              name="dob" 
              value={formData.dob} 
              onChange={handleChange} 
              className={errors.dob ? 'error' : ''}
            />
            {errors.dob && <span className="error-message">{errors.dob}</span>}
          </div>
          <div className="input-group">
            <label>Gender</label>
            <select 
              name="gender" 
              value={formData.gender} 
              onChange={handleChange}
              className={errors.gender ? 'error' : ''}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>
        </div>
        <div className="photo-section">
          <div className="photo-placeholder"></div>
          <button className="upload-btn">Upload Photo</button>
        </div>
      </fieldset>

      <fieldset className="section">
        <legend>Address Information</legend>
        <div className="input-group">
          <input 
            type="text" 
            name="address1" 
            placeholder="Address Line 1" 
            value={formData.address1} 
            onChange={handleChange}
            className={errors.address1 ? 'error' : ''}
          />
          {errors.address1 && <span className="error-message">{errors.address1}</span>}
        </div>
        <input type="text" name="address2" placeholder="Address Line 2" value={formData.address2} onChange={handleChange} />
        <div className="form-row">
          <div className="input-group">
            <input 
              type="text" 
              name="city" 
              placeholder="City" 
              value={formData.city} 
              onChange={handleChange}
              className={errors.city ? 'error' : ''}
            />
            {errors.city && <span className="error-message">{errors.city}</span>}
          </div>
          <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} />
          <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} />
        </div>
        <div className="form-row">
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
          <div className="input-group">
            <input 
              type="text" 
              name="country" 
              placeholder="Country" 
              value={formData.country} 
              onChange={handleChange}
              className={errors.country ? 'error' : ''}
            />
            {errors.country && <span className="error-message">{errors.country}</span>}
          </div>
        </div>
      </fieldset>

      <fieldset className="section">
        <legend>Other Information</legend>
        <div className="form-row">
          <input type="text" name="bloodGroup" placeholder="Blood Group" value={formData.bloodGroup} onChange={handleChange} />
          <input type="text" name="occupation" placeholder="Occupation" value={formData.occupation} onChange={handleChange} />
        </div>
        <div className="form-row">
          <input type="text" name="aadharNumber" placeholder="Aadhar Card No." value={formData.aadharNumber} onChange={handleChange} />
          <input type="text" name="panNumber" placeholder="PAN Card No." value={formData.panNumber} onChange={handleChange} />
        </div>
      </fieldset>

      <div className="form-actions">
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="next-btn" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default PatientDemographics;