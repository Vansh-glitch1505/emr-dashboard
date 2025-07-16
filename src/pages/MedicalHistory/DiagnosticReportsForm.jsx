import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MedicalHistory.css';

export default function DiagnosticReportsForm({ closeForm }) {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [comments, setComments] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAdd = () => {
    console.log("File:", file);
    console.log("Comments:", comments);
  };

  const handleSave = () => {
    navigate('/dashboard/medicationhistory');  // or the next section path
  };


  return (
    <div className="right-panel">
      <div className="form-header">
        <h2 className="form-title">Diagnostic Reports</h2>
        <button className="close-btn" onClick={closeForm}>×</button>
      </div>

      <div className="form-group">
        <label>Upload</label>
        <input type="file" onChange={handleFileChange} />
      </div>

      <div className="form-group">
        <label>Comments</label>
        <textarea
          rows="6"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Enter comments about the report"
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={handleAdd}>Add</button>
        <button type="submit" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}
