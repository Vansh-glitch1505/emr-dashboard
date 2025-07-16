import React, { useState } from 'react';
import './MedicalHistory.css';

export default function ConditionForm({ closeForm }) {
  const [formData, setFormData] = useState({
    condition: '',
    diagnosisDate: '',
    physician: '',
    status: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="condition-form">
      <div className="form-header">
        <h3>Conditions</h3>
        <button onClick={closeForm} className="close-btn">X</button>
      </div>

      <label>Comments</label>
      <div className="comments-box">
        <ul>
          <li>Condition: <input type="text" name="condition" value={formData.condition} onChange={handleChange} /></li>
          <li>Diagnosis Date: <input type="date" name="diagnosisDate" value={formData.diagnosisDate} onChange={handleChange} /></li>
          <li>Treating Physician: <input type="text" name="physician" value={formData.physician} onChange={handleChange} /></li>
          <li>Current Status: <input type="text" name="status" value={formData.status} onChange={handleChange} /></li>
        </ul>
      </div>

      <div className="form-actions">
        <button onClick={closeForm}>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  );
}
