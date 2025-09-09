import React, { useState } from 'react';
import "./MedicalHistory.css";

// ⬇️ Added onSave to props
export default function ImmunizationForm({ closeForm, onSave }) {
  const [vaccineName, setVaccineName] = useState('');
  const [dateAdministered, setDateAdministered] = useState('');
  const [reactions, setReactions] = useState('');
  
  const [immunizationList, setImmunizationList] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [savedData, setSavedData] = useState(null);

  const handleAdd = () => {
    if (vaccineName || dateAdministered || reactions) {
      const newImmunization = {
        id: Date.now(),
        vaccineName,
        dateAdministered,
        reactions
      };
      
      setImmunizationList(prev => [...prev, newImmunization]);
      
      // Clear form after adding
      setVaccineName('');
      setDateAdministered('');
      setReactions('');
    }
  };

  const handleSave = () => {
    let finalList = [...immunizationList];

    // If there's current form data, add it before saving
    if (vaccineName || dateAdministered || reactions) {
      const newItem = {
        id: Date.now(),
        vaccineName,
        dateAdministered,
        reactions
      };
      finalList.push(newItem);
    }

    setSavedData(finalList);
    setShowPreview(true);

    // ⬇️ NEW: Pass data to parent
    if (onSave) {
      onSave(finalList);
    }

    console.log("Saved immunizations:", finalList);
  };

  const handleEdit = () => {
    setShowPreview(false);
  };

  const removeImmunization = (id) => {
    setImmunizationList(prev => prev.filter(item => item.id !== id));
  };

  if (showPreview) {
    return (
      <div className="right-panel">
        <div className="form-header">
          <h2 className="form-title">Immunizations Preview</h2>
          <button className="close-btn" onClick={closeForm}>×</button>
        </div>

        <div className="preview-container">
          {savedData && savedData.length > 0 ? (
            savedData.map((immunization, index) => (
              <div key={immunization.id} className="immunization-preview-item">
                <h4>Immunization {index + 1}</h4>
                <ul className="preview-list">
                  <li><strong>Vaccine Name:</strong> {immunization.vaccineName}</li>
                  <li><strong>Date Administered:</strong> {immunization.dateAdministered}</li>
                  <li><strong>Adverse Reactions:</strong> {immunization.reactions}</li>
                </ul>
              </div>
            ))
          ) : (
            <p>No immunizations added.</p>
          )}
        </div>

        <div className="button-group-right">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={closeForm}>Done</button>
        </div>
      </div>
    );
  }

  return (
    <div className="right-panel">
      <div className="form-header">
        <h2 className="form-title">Immunizations</h2>
        <button className="close-btn" onClick={closeForm}>×</button>
      </div>

      {/* Show added immunizations list */}
      {immunizationList.length > 0 && (
        <div className="added-immunizations">
          <h3>Added Immunizations:</h3>
          {immunizationList.map((immunization, index) => (
            <div key={immunization.id} className="immunization-item">
              <div className="immunization-details">
                <strong>{immunization.vaccineName}</strong> - {immunization.dateAdministered}
                {immunization.reactions && (
                  <span className="reaction-note"> (Reactions: {immunization.reactions})</span>
                )}
              </div>
              <button 
                className="remove-btn" 
                onClick={() => removeImmunization(immunization.id)}
                title="Remove immunization"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="form-group">
        <label>Vaccine Name</label>
        <input
          type="text"
          value={vaccineName}
          onChange={(e) => setVaccineName(e.target.value)}
          placeholder="e.g. Influenza (Flu) Vaccine"
        />
      </div>

      <div className="form-group">
        <label>Date Administered</label>
        <input
          type="date"
          value={dateAdministered}
          onChange={(e) => setDateAdministered(e.target.value)}
          placeholder="e.g. October 2, 2022"
        />
      </div>

      <div className="form-group">
        <label>Adverse Reactions</label>
        <input
          type="text"
          value={reactions}
          onChange={(e) => setReactions(e.target.value)}
          placeholder="e.g. NA"
        />
      </div>

      <div className="button-group-right">
        <button type="button" onClick={handleAdd}>Add</button>
        <button type="submit" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}
