import React, { useState } from 'react';
import './MedicalHistory.css';
import ConditionForm from './ConditionForm';
import SurgeriesForm from './SurgeriesForm';
import AllergiesForm from './AllergiesForm';
import ImmunizationForm from './ImmunizationForm';
import LabReportsForm from './LabReportsForm';
import DiagnosticReportsForm from './DiagnosticReportsForm';

export default function MedicalHistory() {
  const [activeForm, setActiveForm] = useState(null);
  const [showFullPreview, setShowFullPreview] = useState(false);
  
  // Store all saved data from different forms
  const [allMedicalData, setAllMedicalData] = useState({
    conditions: [],
    surgeries: [],
    allergies: [],
    immunizations: [],
    labReports: [],
    diagnosticReports: []
  });

  // Function to update medical data when forms are saved
  const updateMedicalData = (category, data) => {
    setAllMedicalData(prev => ({
      ...prev,
      [category]: Array.isArray(data) ? data : [data]
    }));
  };

  const handleShowFullPreview = () => {
    setShowFullPreview(true);
    setActiveForm(null); // Close any open forms
  };

  const handleClosePreview = () => {
    setShowFullPreview(false);
  };

  // Full Preview Component
  if (showFullPreview) {
    return (
      <div className="medical-history-container">
        <header className="fixed-header">
          <h1 className="header-title">Medical History Preview</h1>
        </header>
        
        <div className="preview-full-container">
          <div className="preview-header">
            <h2>Medical History</h2>
            <button className="close-btn" onClick={handleClosePreview}>×</button>
          </div>

          <div className="preview-sections">
            {/* Conditions Section */}
            {allMedicalData.conditions.length > 0 && (
              <div className="preview-section">
                <div className="section-header">Conditions</div>
                <div className="section-content">
                  {allMedicalData.conditions.map((condition, index) => (
                    <div key={index} className="data-item">
                      <strong>Condition:</strong> {condition.condition}<br/>
                      <strong>Diagnosis Date:</strong> {condition.diagnosisDate}<br/>
                      <strong>Treating Physician:</strong> {condition.physician}<br/>
                      <strong>Current Status:</strong> {condition.status}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Surgeries Section */}
            {allMedicalData.surgeries.length > 0 && (
              <div className="preview-section">
                <div className="section-header">Surgeries</div>
                <div className="section-content">
                  {allMedicalData.surgeries.map((surgery, index) => (
                    <div key={index} className="data-item">
                      <strong>Surgery Type:</strong> {surgery.surgeryType}<br/>
                      <strong>Date:</strong> {surgery.surgeryDate}<br/>
                      <strong>Surgeon Name:</strong> {surgery.surgeonName}<br/>
                      <strong>Post Operative Notes:</strong> {surgery.postOpNotes}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Allergies Section */}
            {allMedicalData.allergies.length > 0 && (
              <div className="preview-section">
                <div className="section-header">Allergies</div>
                <div className="section-content">
                  {allMedicalData.allergies.map((allergy, index) => (
                    <div key={index} className="data-item">
                      <strong>Allergy Type:</strong> {allergy.allergyType}<br/>
                      <strong>Allergic Substance:</strong> {allergy.substance}<br/>
                      <strong>Severity:</strong> {allergy.severity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Immunizations Section */}
            {allMedicalData.immunizations.length > 0 && (
              <div className="preview-section">
                <div className="section-header">Immunizations</div>
                <div className="section-content">
                  {allMedicalData.immunizations.map((immunization, index) => (
                    <div key={index} className="data-item">
                      <strong>Vaccine Name:</strong> {immunization.vaccineName}<br/>
                      <strong>Date Administered:</strong> {immunization.dateAdministered}<br/>
                      <strong>Adverse Reactions:</strong> {immunization.reactions}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Show message if no data */}
            {Object.values(allMedicalData).every(arr => arr.length === 0) && (
              <div className="no-data-message">
                <p>No medical history data has been entered yet.</p>
                <p>Please fill out the forms to see your medical history preview.</p>
              </div>
            )}
          </div>

          <div className="preview-footer">
            <button className="btn btn-primary" onClick={handleClosePreview}>
              Continue Editing
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="medical-history-container">
      <header className="fixed-header">
        <h1 className="header-title"></h1>
      </header>
      
      <div className="left-panel">
        <h2>Medical History</h2>
        <button 
          className={activeForm === 'condition' ? 'active' : ''}
          onClick={() => setActiveForm('condition')}
        >
          Conditions
        </button>
        <button 
          className={activeForm === 'surgeries' ? 'active' : ''}
          onClick={() => setActiveForm('surgeries')}
        >
          Surgeries
        </button>
        <button 
          className={activeForm === 'allergies' ? 'active' : ''}
          onClick={() => setActiveForm('allergies')}
        >
          Allergies
        </button>
        <button 
          className={activeForm === 'immunization' ? 'active' : ''}
          onClick={() => setActiveForm('immunization')}
        >
          Immunizations
        </button>
        <button 
          className={activeForm === 'labReports' ? 'active' : ''}
          onClick={() => setActiveForm('labReports')}
        >
          Lab Reports
        </button>
        <button 
          className={activeForm === 'diagnosticReports' ? 'active' : ''}
          onClick={() => setActiveForm('diagnosticReports')}
        >
          Diagnostic Reports
        </button>
      </div>

      {/* Done button - positioned in bottom right */}
      <div className="done-button-container">
        <button className="done-btn" onClick={handleShowFullPreview}>
          Done
        </button>
      </div>

      {activeForm === 'condition' && (
        <div className="right-panel">
          <ConditionForm 
            closeForm={() => setActiveForm(null)}
            onSave={(data) => updateMedicalData('conditions', data)}
          />
        </div>
      )}

      {activeForm === 'surgeries' && (
        <div className="right-panel">
          <SurgeriesForm 
            closeForm={() => setActiveForm(null)}
            onSave={(data) => updateMedicalData('surgeries', data)}
          />
        </div>
      )}

      {activeForm === 'allergies' && (
        <div className="right-panel">
          <AllergiesForm 
            closeForm={() => setActiveForm(null)}
            onSave={(data) => updateMedicalData('allergies', data)}
          />
        </div>
      )}

      {activeForm === 'immunization' && (
        <div className="right-panel">
          <ImmunizationForm 
            closeForm={() => setActiveForm(null)}
            onSave={(data) => updateMedicalData('immunizations', data)}
          />
        </div>
      )}

      {activeForm === 'labReports' && (
        <div className="right-panel">
          <LabReportsForm 
            closeForm={() => setActiveForm(null)}
            onSave={(data) => updateMedicalData('labReports', data)}
          />
        </div>
      )}

      {activeForm === 'diagnosticReports' && (
        <div className="right-panel">
          <DiagnosticReportsForm 
            closeForm={() => setActiveForm(null)}
            onSave={(data) => updateMedicalData('diagnosticReports', data)}
          />
        </div>
      )}
    </div>
  );
}