import React, { useState } from 'react';
import './MedicalHistory.css';

// ⬇️ Added onSave to props
export default function ConditionForm({ closeForm, onSave }) { 
  const [formData, setFormData] = useState({
    condition: '',
    diagnosisDate: '',
    physician: '',
    status: '',
  });
  
  const [showPreview, setShowPreview] = useState(false);
  const [savedData, setSavedData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Save the data and show preview
    const dataToSave = { ...formData }; // ⬅️ made this a variable for reuse
    setSavedData(dataToSave);
    setShowPreview(true);

    // ⬇️ NEW: Pass data back to parent if onSave exists
    if (onSave) {
      onSave(dataToSave);
    }
  };

  const handleEdit = () => {
    setShowPreview(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (showPreview && savedData) {
    return (
      <div className="condition-form">
        <div className="form-header">
          <h3>Condition Preview</h3>
          <button onClick={closeForm} className="close-btn">X</button>
        </div>
        
        <div className="preview-container">
          <ul className="preview-list">
            <li><strong>Condition:</strong> {savedData.condition}</li>
            <li><strong>Diagnosis Date:</strong> {formatDate(savedData.diagnosisDate)}</li>
            <li><strong>Treating Physician:</strong> {savedData.physician}</li>
            <li><strong>Current Status:</strong> {savedData.status}</li>
          </ul>
        </div>

        <div className="form-actions">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={closeForm}>Done</button>
        </div>
      </div>
    );
  }

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

      <div className="button-group-right">
        <button onClick={closeForm}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}
