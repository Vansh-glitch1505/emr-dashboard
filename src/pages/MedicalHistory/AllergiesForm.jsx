import React, { useState } from 'react';
import './MedicalHistory.css';

export default function AllergiesForm({ closeForm }) {
  const [formData, setFormData] = useState({
    allergyType: '',
    substance: '',
    severity: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    console.log('Added Allergy:', formData);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Allergies</h2>
        <button className="close-btn" onClick={closeForm}>
          X
        </button>
      </div>

      <div className="form-body">
        <div className="form-group">
          <label>Allergies Type</label>
          <select name="allergyType" value={formData.allergyType} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Penicillin">Penicillin</option>
            <option value="Latex">Latex</option>
            <option value="Pollen">Pollen</option>
          </select>
        </div>

        <div className="form-group">
          <label>Allergic Substance</label>
          <select name="substance" value={formData.substance} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Food">Food</option>
            <option value="Medication">Medication</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Severity</label>
          <select name="severity" value={formData.severity} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
          </select>
        </div>

        <div className="button-row">
          <button className="blue-btn" onClick={handleAdd}>Add</button>
        </div>
      </div>

      <div className="form-footer">
        <button className="cancel-btn" onClick={closeForm}>Cancel</button>
        <button className="blue-btn">Save</button>
      </div>
    </div>
  );
}
