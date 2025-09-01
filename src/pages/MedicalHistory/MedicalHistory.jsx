import React, { useState } from 'react';
import './MedicalHistory.css';
import ConditionForm from './ConditionForm';
import SurgeriesForm from './SurgeriesForm';
import AllergiesForm from './AllergiesForm';
import ImmunizationForm from './ImmunizationForm';
import LabReportsForm from './LabReportsForm';
import DiagnosticReportsForm from './DiagnosticReportsForm';

export default function MedicalHistory() {
  const [activeForm, setActiveForm] = useState(null); // "condition", "surgeries", etc.

  return (
    <div className="medical-history-container">
      <header className="fixed-header">
        <h1 className="header-title"></h1>
      </header>
      <div className="left-panel">
        <h2>Medical History</h2>
        <button onClick={() => setActiveForm('condition')}>Conditions</button>
        <button onClick={() => setActiveForm('surgeries')}>Surgeries</button>
        <button onClick={() => setActiveForm('allergies')}>Allergies</button>
        <button onClick={() => setActiveForm('immunization')}>Immunizations</button>
        <button onClick={() => setActiveForm('labReports')}>Lab Reports</button>
        <button onClick={() => setActiveForm('diagnosticReports')}>Diagnostic Reports</button>
      </div>

      {activeForm === 'condition' && (
        <div className="right-panel">
          <ConditionForm closeForm={() => setActiveForm(null)} />
        </div>
      )}

      {activeForm === 'surgeries' && (
        <div className="right-panel">
          <SurgeriesForm closeForm={() => setActiveForm(null)} />
        </div>
      )}

      {activeForm === 'allergies' && (
        <div className="right-panel">
          <AllergiesForm closeForm={() => setActiveForm(null)} />
        </div>
      )}
      {activeForm === 'immunization' && (
        <div className="right-panel">
          <ImmunizationForm closeForm={() => setActiveForm(null)} />
        </div>
      )}
      {activeForm === 'labReports' && (
        <div className="right-panel">
          <LabReportsForm closeForm={() => setActiveForm(null)} />
        </div>
      )}
      {activeForm === 'diagnosticReports' && (
        <div className="right-panel">
          <DiagnosticReportsForm closeForm={() => setActiveForm(null)} />
        </div>
      )}
      {/* Similarly add for allergies, immunizations, etc. when you have those components */}
    </div>
  );
}
