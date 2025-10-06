import React, { useState } from 'react';
import './MedicalHistory.css';

export default function LabReportsForm({ closeForm, onSave }) {
  const [file, setFile] = useState(null);
  const [comments, setComments] = useState('');
  const [reportList, setReportList] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [savedData, setSavedData] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert('File size should not exceed 10MB');
        e.target.value = '';
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleAdd = () => {
    if (file || comments) {
      const newReport = {
        id: Date.now(),
        file: file,
        fileName: file ? file.name : 'No file selected',
        fileSize: file ? (file.size / 1024).toFixed(2) + ' KB' : '',
        comments: comments
      };
      setReportList(prev => [...prev, newReport]);
      setFile(null);
      setComments('');
      // Clear file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
    } else {
      alert('Please select a file or add comments');
    }
  };

  const handleSave = async () => {
    try {
      const patientId = localStorage.getItem('currentPatientId');
      
      if (!patientId) {
        alert("Please complete Patient Demographics first");
        return;
      }

      // Check if there's any data to save
      let finalList = [...reportList];
      if (file || comments) {
        finalList.push({
          id: Date.now(),
          file: file,
          fileName: file ? file.name : 'No file selected',
          fileSize: file ? (file.size / 1024).toFixed(2) + ' KB' : '',
          comments: comments
        });
      }

      if (finalList.length === 0) {
        alert('Please add at least one lab report');
        return;
      }

      // Upload each file
      const uploadedReports = [];
      for (const report of finalList) {
        if (report.file) {
          const formData = new FormData();
          formData.append('file', report.file);
          formData.append('patient_id', patientId);
          formData.append('comments', report.comments || '');

          const response = await fetch('http://localhost:5000/api/medical-history/lab-reports', {
            method: 'POST',
            body: formData
          });

          if (response.ok) {
            const result = await response.json();
            uploadedReports.push({ 
              ...report, 
              file_id: result.data.file_id 
            });
          } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to upload lab report');
          }
        }
      }

      setSavedData(uploadedReports);
      setShowPreview(true);
      if (onSave) onSave(uploadedReports);
      alert("Lab reports saved successfully!");
      console.log("Saved lab reports:", uploadedReports);
    } catch (error) {
      console.error("Error saving lab reports:", error);
      alert(`Error saving lab reports: ${error.message}`);
    }
  };

  const handleEdit = () => setShowPreview(false);

  const removeReport = (id) => {
    setReportList(prev => prev.filter(item => item.id !== id));
  };

  if (showPreview) {
    return (
      <div className="right-panel">
        <div className="form-header">
          <h2 className="form-title">Lab Reports Preview</h2>
          <button className="close-btn" onClick={closeForm}>×</button>
        </div>

        <div className="preview-container">
          {savedData && savedData.length > 0 ? (
            savedData.map((report, index) => (
              <div key={report.id} className="immunization-preview-item">
                <h4>Lab Report {index + 1}</h4>
                <ul className="preview-list">
                  <li><strong>File:</strong> {report.fileName}</li>
                  {report.fileSize && <li><strong>Size:</strong> {report.fileSize}</li>}
                  <li><strong>Comments:</strong> {report.comments || 'None'}</li>
                </ul>
              </div>
            ))
          ) : (
            <p>No lab reports added.</p>
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
        <h2 className="form-title">Lab Reports</h2>
        <button className="close-btn" onClick={closeForm}>×</button>
      </div>

      {reportList.length > 0 && (
        <div className="added-immunizations">
          <h3>Added Lab Reports:</h3>
          {reportList.map((report) => (
            <div key={report.id} className="immunization-item">
              <div className="immunization-details">
                <strong>{report.fileName}</strong>
                {report.fileSize && <span className="reaction-note"> ({report.fileSize})</span>}
                {report.comments && (
                  <div className="reaction-note">Comments: {report.comments}</div>
                )}
              </div>
              <button 
                className="remove-btn" 
                onClick={() => removeReport(report.id)}
                title="Remove report"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="form-group">
        <label>Upload Lab Report</label>
        <input 
          type="file" 
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        />
        {file && (
          <div className="file-info">
            <small>Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)</small>
          </div>
        )}
      </div>

      <div className="form-group">
        <label>Comments</label>
        <textarea
          rows="6"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Enter comments about the lab report (e.g., test results, findings, doctor's notes)"
        />
      </div>

      <div className="button-group-right">
        <button type="button" onClick={handleAdd}>Add</button>
        <button type="submit" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}