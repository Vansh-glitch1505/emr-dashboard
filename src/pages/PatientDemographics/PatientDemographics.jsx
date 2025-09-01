import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./PatientDemographics.css";

const PatientDemographics = () => {
  const { updatePreviewData } = useOutletContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    address1: "",
    address2: "",
    city: "",
    postalCode: "",
    district: "",
    state: "",
    country: "",
    bloodGroup: "",
    occupation: "",
    aadharNumber: "",
    panNumber: ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.dob.trim()) newErrors.dob = "Date of birth is required";
    if (!formData.gender.trim()) newErrors.gender = "Gender is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    navigate('/dashboard/contact-information');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/api/patient-demographics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: 1, // Replace with actual logged-in user id
            ...formData
          })
        });

        if (response.ok) {
          alert("Patient demographics saved successfully!");
          updatePreviewData(formData, "patient");

          setFormData({
            firstName: "",
            middleName: "",
            lastName: "",
            dob: "",
            gender: "",
            address1: "",
            address2: "",
            city: "",
            postalCode: "",
            district: "",
            state: "",
            country: "",
            bloodGroup: "",
            occupation: "",
            aadharNumber: "",
            panNumber: ""
          });
        } else {
          alert("Failed to save patient demographics");
        }
      } catch (error) {
        console.error("Error saving data:", error);
        alert("Error saving data.");
      }
    }
  };

  return (
    <div>
      {/* Fixed Header */}
      <header className="fixed-header">
        <h1 className="header-title"></h1>
      </header>

      {/* Page Content */}
      <div className="patient-demographics-container">
        <h2 className="patient-header">Patient Demographics</h2>

        <form>
          {/* --- Personal Information --- */}
          <fieldset className="section">
            <legend>Personal Information</legend>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="input-group">
                <label htmlFor="middleName">Middle Name</label>
                <input
                  id="middleName"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  id="dob"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                {errors.dob && <span className="error-message">{errors.dob}</span>}
              </div>

              <div className="input-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <span className="error-message">{errors.gender}</span>}
              </div>
            </div>
          </fieldset>

          {/* --- Contact Information --- */}
          <fieldset className="section">
            <legend>Contact Information</legend>
            <div className="form-row">
              <div className="input-group full-width">
                <label htmlFor="address1">Address Line 1</label>
                <input
                  id="address1"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group full-width">
                <label htmlFor="address2">Address Line 2</label>
                <input
                  id="address2"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="district">District</label>
                <input
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="state">State</label>
                <input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="country">Country</label>
                <input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          {/* --- Other Details --- */}
          <fieldset className="section">
            <legend>Other Details</legend>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="bloodGroup">Blood Group</label>
                <input
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="occupation">Occupation</label>
                <input
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="aadharNumber">Aadhar Number</label>
                <input
                  id="aadharNumber"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="panNumber">PAN Number</label>
                <input
                  id="panNumber"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          <div className="form-actions">
            <button type="button" className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button type="button" className="next-btn" onClick={handleNext}>
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientDemographics;