import React, { useState } from 'react';
import './MedicalHistory.css';

export default function ImmunizationForm({ closeForm, onSave }) {
  const [vaccineName, setVaccineName] = useState('');
  const [dateAdministered, setDateAdministered] = useState('');
  const [reactions, setReactions] = useState('');

  const [immunizationList, setImmunizationList] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [savedData, setSavedData] = useState(null);

  const vaccineOptions = [
    "Influenza (Flu) Vaccine",
    "Measles, Mumps, and Rubella (MMR) Vaccine",
    "Varicella (Chickenpox) Vaccine",
    "Hepatitis B Vaccine",
    "Hepatitis A Vaccine",
    "Human Papillomavirus (HPV) Vaccine",
    "Tetanus, Diphtheria, and Pertussis (Tdap) Vaccine",
    "Pneumococcal Vaccine",
    "Meningococcal Vaccine",
    "Haemophilus influenzae type b (Hib) Vaccine",
    "Rotavirus Vaccine",
    "Polio Vaccine",
    "Shingles (Herpes Zoster) Vaccine",
    "COVID-19 Vaccine",
    "Typhoid Vaccine",
    "Rabies Vaccine",
    "Yellow Fever Vaccine",
    "Japanese Encephalitis Vaccine",
    "Cholera Vaccine",
    "Anthrax Vaccine"
  ];

  const handleAdd = () => {
    if (vaccineName || dateAdministered || reactions) {
      const newImmunization = {
        id: Date.now(),
        vaccineName,
        dateAdministered,
        reactions
      };
      
      setImmunizationList(prev => [...prev, newImmunization]);
      setVaccineName('');
      setDateAdministered('');
      setReactions('');
    }
  };

  const handleSave = async () => {
    try {
      const patientId = localStorage.getItem('currentPatientId');
      
      if (!patientId) {
        alert("Please complete Patient Demographics first");
        return;
      }

      let finalList = [...immunizationList];
      if (vaccineName || dateAdministered || reactions) {
        finalList.push({ 
          id: Date.now(), 
          vaccineName, 
          dateAdministered, 
          reactions 
        });
      }

      const response = await fetch('http://localhost:5000/api/medical-history/immunizations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: patientId,
          immunizations: finalList
        })
      });

      if (response.ok) {
        const result = await response.json();
        setSavedData(finalList);
        setShowPreview(true);
        if (onSave) onSave(finalList);
        alert("Immunizations saved successfully!");
        console.log("Saved immunizations:", result);
      } else {
        const errorData = await response.json();
        alert(`Failed to save immunizations: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error saving immunizations:", error);
      alert("Error saving immunizations.");
    }
  };

  const handleEdit = () => setShowPreview(false);

  const removeImmunization = (id) => {
    setImmunizationList(prev => prev.filter(item => item.id !== id));
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
                  <li><strong>Date Administered:</strong> {formatDate(immunization.dateAdministered)}</li>
                  <li><strong>Adverse Reactions:</strong> {immunization.reactions || 'None reported'}</li>
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

      {immunizationList.length > 0 && (
        <div className="added-immunizations">
          <h3>Added Immunizations:</h3>
          {immunizationList.map((immunization) => (
            <div key={immunization.id} className="immunization-item">
              <div className="immunization-details">
                <strong>{immunization.vaccineName}</strong> - {formatDate(immunization.dateAdministered)}
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
        <select 
          value={vaccineName} 
          onChange={(e) => setVaccineName(e.target.value)}
        >
          <option value="">Select Vaccine</option>
          {vaccineOptions.map(vaccine => (
            <option key={vaccine} value={vaccine}>{vaccine}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Date Administered</label>
        <input
          type="date"
          value={dateAdministered}
          onChange={(e) => setDateAdministered(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Adverse Reactions</label>
        <input
          type="text"
          value={reactions}
          onChange={(e) => setReactions(e.target.value)}
          placeholder="e.g. None, Mild soreness, Fever"
        />
      </div>

      <div className="button-group-right">
        <button type="button" onClick={handleAdd}>Add</button>
        <button type="submit" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}
