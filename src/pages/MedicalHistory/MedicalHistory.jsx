import React, { useState, useRef } from 'react';
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

  // Refs to access form data from child components
  const conditionFormRef = useRef();
  const surgeriesFormRef = useRef();
  const allergiesFormRef = useRef();
  const immunizationFormRef = useRef();
  const labReportsFormRef = useRef();
  const diagnosticReportsFormRef = useRef();

  // Function to update medical data when forms are saved
  const updateMedicalData = (category, data) => {
    setAllMedicalData(prev => ({
      ...prev,
      [category]: Array.isArray(data) ? data : [data]
    }));
  };

  // Function to collect current form data from active forms
  const collectAllFormData = () => {
    const collectedData = { ...allMedicalData };
    
    // Collect data from currently active or previously opened forms
    // This will include both saved and unsaved data
    
    return collectedData;
  };

  const handleShowFullPreview = () => {
    // Collect all current data before showing preview
    const currentData = collectAllFormData();
    setAllMedicalData(currentData);
    setShowFullPreview(true);
    setActiveForm(null); // Close any open forms
  };

  const handleClosePreview = () => {
    setShowFullPreview(false);
  };

  // Enhanced ConditionForm wrapper to capture data
  const ConditionFormWrapper = () => (
    <ConditionForm 
      ref={conditionFormRef}
      closeForm={() => setActiveForm(null)}
      onSave={(data) => updateMedicalData('conditions', data)}
    />
  );

  // Enhanced SurgeriesForm wrapper to capture data
  const SurgeriesFormWrapper = () => (
    <SurgeriesForm 
      ref={surgeriesFormRef}
      closeForm={() => setActiveForm(null)}
      onSave={(data) => updateMedicalData('surgeries', data)}
    />
  );

  // Full Preview Component
  if (showFullPreview) {
    return (
      <div className="medical-history-container">
        <header className="fixed-header">
          <h1 className="header-title"></h1>
        </header>
        
        <div className="preview-full-container">
          <div className="preview-header">
            <h2>Complete Medical History</h2>
            <button className="close-btn" onClick={handleClosePreview}>×</button>
          </div>

          <div className="preview-sections">
            {/* Conditions Section */}
            <div className="preview-section">
              <div className="section-header">Conditions</div>
              <div className="section-content">
                {allMedicalData.conditions.length > 0 ? (
                  allMedicalData.conditions.map((condition, index) => (
                    <div key={index} className="data-item">
                      <strong>Condition:</strong> {condition.condition || 'Not specified'}<br/>
                      <strong>Diagnosis Date:</strong> {condition.diagnosisDate || 'Not specified'}<br/>
                      <strong>Treating Physician:</strong> {condition.physician || 'Not specified'}<br/>
                      <strong>Current Status:</strong> {condition.status || 'Not specified'}
                    </div>
                  ))
                ) : (
                  <div className="no-data-item">No conditions recorded</div>
                )}
              </div>
            </div>

            {/* Surgeries Section */}
            <div className="preview-section">
              <div className="section-header">Surgeries</div>
              <div className="section-content">
                {allMedicalData.surgeries.length > 0 ? (
                  allMedicalData.surgeries.map((surgery, index) => (
                    <div key={index} className="data-item">
                      <strong>Surgery Type:</strong> {surgery.surgeryType || 'Not specified'}<br/>
                      <strong>Date:</strong> {surgery.surgeryDate || 'Not specified'}<br/>
                      <strong>Surgeon Name:</strong> {surgery.surgeonName || 'Not specified'}<br/>
                      <strong>Post Operative Notes:</strong> {surgery.postOpNotes || 'Not specified'}
                    </div>
                  ))
                ) : (
                  <div className="no-data-item">No surgeries recorded</div>
                )}
              </div>
            </div>

            {/* Allergies Section */}
            <div className="preview-section">
              <div className="section-header">Allergies</div>
              <div className="section-content">
                {allMedicalData.allergies.length > 0 ? (
                  allMedicalData.allergies.map((allergy, index) => (
                    <div key={index} className="data-item">
                      <strong>Allergy Type:</strong> {allergy.allergyType || 'Not specified'}<br/>
                      <strong>Allergic Substance:</strong> {allergy.substance || 'Not specified'}<br/>
                      <strong>Severity:</strong> {allergy.severity || 'Not specified'}
                    </div>
                  ))
                ) : (
                  <div className="no-data-item">No allergies recorded</div>
                )}
              </div>
            </div>

            {/* Immunizations Section */}
            <div className="preview-section">
              <div className="section-header">Immunizations</div>
              <div className="section-content">
                {allMedicalData.immunizations.length > 0 ? (
                  allMedicalData.immunizations.map((immunization, index) => (
                    <div key={index} className="data-item">
                      <strong>Vaccine Name:</strong> {immunization.vaccineName || 'Not specified'}<br/>
                      <strong>Date Administered:</strong> {immunization.dateAdministered || 'Not specified'}<br/>
                      <strong>Adverse Reactions:</strong> {immunization.reactions || 'None reported'}
                    </div>
                  ))
                ) : (
                  <div className="no-data-item">No immunizations recorded</div>
                )}
              </div>
            </div>

            {/* Lab Reports Section */}
            <div className="preview-section">
              <div className="section-header">Lab Reports</div>
              <div className="section-content">
                {allMedicalData.labReports.length > 0 ? (
                  allMedicalData.labReports.map((report, index) => (
                    <div key={index} className="data-item">
                      <strong>Lab Report {index + 1}:</strong> {report.name || 'Not specified'}
                    </div>
                  ))
                ) : (
                  <div className="no-data-item">No lab reports uploaded</div>
                )}
              </div>
            </div>

            {/* Diagnostic Reports Section */}
            <div className="preview-section">
              <div className="section-header">Diagnostic Reports</div>
              <div className="section-content">
                {allMedicalData.diagnosticReports.length > 0 ? (
                  allMedicalData.diagnosticReports.map((report, index) => (
                    <div key={index} className="data-item">
                      <strong>Diagnostic Report {index + 1}:</strong> {report.name || 'Not specified'}
                    </div>
                  ))
                ) : (
                  <div className="no-data-item">No diagnostic reports uploaded</div>
                )}
              </div>
            </div>
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
        <h1 className="header-title">Medical History</h1>
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