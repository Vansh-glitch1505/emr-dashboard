import React, { useState } from 'react';
import './MedicalHistory.css';

export default function AllergiesForm({ closeForm }) {
  const [formData, setFormData] = useState({
    allergyType: '',
    substance: '',
    severity: '',
  });

  const [addedAllergies, setAddedAllergies] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [savedData, setSavedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (formData.allergyType && formData.substance && formData.severity) {
      setAddedAllergies((prev) => [...prev, { ...formData }]);
      // Reset form after adding
      setFormData({
        allergyType: '',
        substance: '',
        severity: '',
      });
      console.log('Added Allergy:', formData);
    }
  };

  const handleRemove = (index) => {
    setAddedAllergies((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // Save the data and show preview
    setSavedData([...addedAllergies]);
    setShowPreview(true);
  };

  const handleEdit = () => {
    setShowPreview(false);
  };

  // Preview view after Save is clicked
  if (showPreview && savedData) {
    return (
      <div className="form-container">
        <div className="form-header">
          <h2>Allergies Preview</h2>
          <button className="close-btn" onClick={closeForm}>
            X
          </button>
        </div>
        
        <div className="preview-container">
          <table className="allergies-table">
            <thead>
              <tr>
                <th>Allergy Type</th>
                <th>Allergic Substance</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              {savedData.map((allergy, index) => (
                <tr key={index}>
                  <td>{allergy.allergyType}</td>
                  <td>{allergy.substance}</td>
                  <td>{allergy.severity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="button-group-right">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={closeForm}>Done</button>
        </div>
      </div>
    );
  }

  // Form view
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

        {/* Show added allergies before saving */}
        {addedAllergies.length > 0 && (
          <div className="allergies-preview">
            <table className="allergies-table">
              <thead>
                <tr>
                  <th>Allergy Type</th>
                  <th>Allergic Substance</th>
                  <th>Severity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {addedAllergies.map((allergy, index) => (
                  <tr key={index}>
                    <td>{allergy.allergyType}</td>
                    <td>{allergy.substance}</td>
                    <td>{allergy.severity}</td>
                    <td>
                      <button 
                        className="remove-btn" 
                        onClick={() => handleRemove(index)}
                        title="Remove allergy"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="form-footer">
        <button className="cancel-btn" onClick={closeForm}>Cancel</button>
        <button className="blue-btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}