import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewVisit.css';

const NewVisit = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    visitType: 'Regular Checkup',
    patientName: '',
    chiefComplaints: '',
    height: '',
    weight: '',
    bloodPressure: '',
    pulse: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    temperature: '',
    notes: '',
    investigationRequest: '',
    investigationResult: '',
    icdQuickest: '',
    icdFull: '',
    treatment: '',
    seenBy: 'Dr. Smith',
    sendFollowUp: '',
    followUpDate: '',
    totalCost: '',
    amountPaid: '',
    balanceAmount: ''
  });

  const patients = [
    'Amelia Adams', 'Brooke Bennett', 'Chloe Carter', 'Daniel Davis',
    'Emily Edwards', 'Finley Fisher', 'Grace Gardner', 'Henry Hughes',
    'Isabella Irwin', 'Sam John'
  ];

  const visitTypes = [
    'Regular Checkup', 'Emergency Visit', 'Follow-up', 'Consultation',
    'Physical Exam', 'Vaccination', 'Lab Results Review'
  ];

  const doctors = [
    'Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown', 'Dr. Davis'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => { if (currentStep < 3) setCurrentStep(currentStep + 1); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  const handleAddPatient = () => {
    navigate('/dashboard/patient-demographics');
  };

  const handleSubmit = (status = 'saved') => {
    console.log('Visit data:', formData, 'status:', status);
    alert(`Visit ${status === 'complete' ? 'saved and marked complete' : 'saved'}!`);
  };

  const computedBalance = useMemo(() => {
    const total = parseFloat(formData.totalCost || 0) || 0;
    const paid = parseFloat(formData.amountPaid || 0) || 0;
    const bal = total - paid;
    return Number.isNaN(bal) ? '' : bal.toFixed(2);
  }, [formData.totalCost, formData.amountPaid]);

  const displayBalance = formData.balanceAmount === '' ? computedBalance : formData.balanceAmount;

  return (
    <div className="new-visit">
      <div className="visit-header" />

      <div className="visit-layout">
        <aside className="nv-sidebar">
          <div className="nv-sidebar-header">
            <button className="add-patient-btn" onClick={handleAddPatient}>
              + Add New Patient
            </button>
          </div>

          <div className="search-box">
            <input type="text" placeholder="Search Patient" />
            <span className="search-icon">🔍</span>
          </div>

          <div className="patient-list">
            {patients.map((patient, index) => {
              const initials = patient.split(' ').map(n => n[0]).join('');
              return (
                <div
                  key={index}
                  className="patient-item"
                  onClick={() => handleInputChange('patientName', patient)}
                >
                  <div className="patient-avatar">{initials}</div>
                  <div className="patient-details">
                    <div className="patient-name">{patient}</div>
                  </div>
                  <div className="patient-arrow">›</div>
                </div>
              );
            })}
          </div>
        </aside>

        <main className="main-content">
          <h2 className="page-title">New Visit</h2>

          {/* STEP 1 */}
          {currentStep === 1 && (
            <>
              <div className="form-card">
                <div className="form-group">
                  <label>Visit Type</label>
                  <select
                    value={formData.visitType}
                    onChange={(e) => handleInputChange('visitType', e.target.value)}
                  >
                    {visitTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label>Patient Name</label>
                  <input
                    type="text"
                    value={formData.patientName}
                    onChange={(e) => handleInputChange('patientName', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Chief Complaints</label>
                  <textarea
                    value={formData.chiefComplaints}
                    onChange={(e) => handleInputChange('chiefComplaints', e.target.value)}
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <h3>Vitals</h3>
                  <div className="vitals-grid">
                    <div className="vital-item">
                      <label>Height</label>
                      <div className="input-unit">
                        <input type="text" value={formData.height} onChange={(e) => handleInputChange('height', e.target.value)} />
                        <span>ft</span>
                      </div>
                    </div>
                    <div className="vital-item">
                      <label>RR</label>
                      <div className="input-unit">
                        <input type="text" value={formData.respiratoryRate} onChange={(e) => handleInputChange('respiratoryRate', e.target.value)} />
                        <span>bpm</span>
                      </div>
                    </div>
                    <div className="vital-item">
                      <label>Weightt</label>
                      <div className="input-unit">
                        <input type="text" value={formData.weight} onChange={(e) => handleInputChange('weight', e.target.value)} />
                        <span>kg</span>
                      </div>
                    </div>
                    <div className="vital-item">
                      <label>Oxygen%</label>
                      <div className="input-unit">
                        <input type="text" value={formData.oxygenSaturation} onChange={(e) => handleInputChange('oxygenSaturation', e.target.value)} />
                        <span>%</span>
                      </div>
                    </div>
                    <div className="vital-item">
                      <label>Blood pressure</label>
                      <input type="text" value={formData.bloodPressure} onChange={(e) => handleInputChange('bloodPressure', e.target.value)} />
                    </div>
                    <div className="vital-item">
                      <label>Temperatue</label>
                      <div className="input-unit">
                        <input type="text" value={formData.temperature} onChange={(e) => handleInputChange('temperature', e.target.value)} />
                        <span>F</span>
                      </div>
                    </div>
                    <div className="vital-item">
                      <label>Pulse</label>
                      <div className="input-unit">
                        <input type="text" value={formData.pulse} onChange={(e) => handleInputChange('pulse', e.target.value)} />
                        <span>bpm</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Notes</label>
                  <textarea value={formData.notes} onChange={(e) => handleInputChange('notes', e.target.value)} rows="4" />
                </div>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div className="form-card">
              <div className="form-group">
                <label>Investigation Request</label>
                <textarea value={formData.investigationRequest} onChange={(e) => handleInputChange('investigationRequest', e.target.value)} rows="2" />
              </div>

              <div className="form-group">
                <label>Investigation Result</label>
                <textarea value={formData.investigationResult} onChange={(e) => handleInputChange('investigationResult', e.target.value)} rows="2" />
              </div>

              <div className="form-group">
                <h3>Diagnosis</h3>
                <p className="helper-text">ICD-10 Quickest</p>
                <input type="text" value={formData.icdQuickest} onChange={(e) => handleInputChange('icdQuickest', e.target.value)} />
                <p className="helper-text">Full ICD-10 List</p>
                <input type="text" value={formData.icdFull} onChange={(e) => handleInputChange('icdFull', e.target.value)} />
              </div>

              <div className="form-group">
                <label>Treatment</label>
                <textarea value={formData.treatment} onChange={(e) => handleInputChange('treatment', e.target.value)} rows="2" />
              </div>

              <div className="form-group">
                <label>Seen by</label>
                <select value={formData.seenBy} onChange={(e) => handleInputChange('seenBy', e.target.value)}>
                  {doctors.map(doctor => <option key={doctor} value={doctor}>{doctor}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div className="form-card">
              <div className="form-group">
                <label>Follow-up Appointment</label>
                <input type="date" value={formData.followUpDate} onChange={(e) => handleInputChange('followUpDate', e.target.value)} />
              </div>

              <div className="form-group">
                <label>Total Cost</label>
                <input type="number" min="0" value={formData.totalCost} onChange={(e) => handleInputChange('totalCost', e.target.value)} />
              </div>

              <div className="form-group">
                <label>Amount Paid</label>
                <input type="number" min="0" value={formData.amountPaid} onChange={(e) => handleInputChange('amountPaid', e.target.value)} />
              </div>

              <div className="form-group">
                <label>Balance Amount</label>
                <input type="text" value={displayBalance} onChange={(e) => handleInputChange('balanceAmount', e.target.value)} placeholder="Auto-calculated" />
              </div>

              <div className="form-actions-row">
                <button className="btn-save" onClick={() => handleSubmit('saved')}>Save</button>
                <button className="btn-complete" onClick={() => handleSubmit('complete')}>Save as Complete</button>
              </div>
            </div>
          )}

          <div className="form-nav">
            {currentStep > 1 && <button className="btn-outline" onClick={prevStep}>Previous</button>}
            <div className="spacer" />
            {currentStep < 3 ? <button className="btn-primary" onClick={nextStep}>Next</button> : null}
          </div>

          <div className="step-indicator">
            <div className={`step-dot ${currentStep >= 1 ? 'active' : ''}`} />
            <div className={`step-dot ${currentStep >= 2 ? 'active' : ''}`} />
            <div className={`step-dot ${currentStep >= 3 ? 'active' : ''}`} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewVisit;
