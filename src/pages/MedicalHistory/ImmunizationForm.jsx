import React, { useState } from 'react';
import "./MedicalHistory.css";

export default function ImmunizationForm({ closeForm }) {
  const [vaccineName, setVaccineName] = useState('');
  const [dateAdministered, setDateAdministered] = useState('');
  const [reactions, setReactions] = useState('');

  const handleAdd = () => {
    // Add to list logic (optional)
    console.log("Added:", { vaccineName, dateAdministered, reactions });
  };

  const handleSave = () => {
    // Save logic here
    closeForm();
  };

  return (
    <div className="right-panel">
      <div className="form-header">
        <h2 className="form-title">Immunizations</h2>
        <button className="close-btn" onClick={closeForm}>×</button>
      </div>

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
          type="text"
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

      <div className="form-actions">
        <button type="button" onClick={handleAdd}>Add</button>
        <button type="submit" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}
