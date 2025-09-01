import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './Preview.css';

export default function Preview() {
  const {
    patientData,
    contactData,
    insuranceData,
    ailmentsData,
    assessmentData,
    medicationHistory,
    vitalsData
  } = useOutletContext();

  const getPainLevelText = (value) => {
    const painLevels = [
      "No pain",
      "Very mild",
      "Mild",
      "Moderate",
      "Moderately severe",
      "Severe",
      "Very severe",
      "Intense",
      "Very intense",
      "Excruciating",
      "Unimaginable"
    ];
    return painLevels[parseInt(value)] || "";
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="preview-container">
      <header className="fixed-header">
        <h1 className="header-title"></h1>
       </header>
      <h2>Review Your Info</h2>

      {/* Demographics Section */}
      {patientData && Object.keys(patientData).length > 0 && (
        <section>
          <h3>Demographics</h3>
          <p>
            <strong>Name:</strong>{' '}
            {[
              patientData.firstName,
              patientData.middleName,
              patientData.lastName,
            ]
              .filter(Boolean)
              .join(' ')}
          </p>
          {patientData.dob && <p><strong>DOB:</strong> {patientData.dob}</p>}
          {patientData.gender && <p><strong>Gender:</strong> {patientData.gender}</p>}
          {patientData.address1 && (
            <p>
              <strong>Address:</strong>{' '}
              {[
                patientData.address1,
                patientData.address2,
                patientData.city,
                patientData.postalCode,
                patientData.state,
                patientData.country,
              ]
                .filter(Boolean)
                .join(', ')}
            </p>
          )}
          {patientData.bloodGroup && <p><strong>Blood Group:</strong> {patientData.bloodGroup}</p>}
          {patientData.occupation && <p><strong>Occupation:</strong> {patientData.occupation}</p>}
          {patientData.aadharNumber && <p><strong>Aadhar No.:</strong> {patientData.aadharNumber}</p>}
          {patientData.panNumber && <p><strong>PAN No.:</strong> {patientData.panNumber}</p>}
        </section>
      )}

      {/* Contact Section */}
      {contactData && Object.keys(contactData).length > 0 && (
        <section>
          <h3>Contact</h3>
          {contactData.mobilePhone && <p><strong>Mobile:</strong> {contactData.mobilePhone}</p>}
          {contactData.homePhone && <p><strong>Home:</strong> {contactData.homePhone}</p>}
          {contactData.workPhone && <p><strong>Work:</strong> {contactData.workPhone}</p>}
          {contactData.email && <p><strong>Email:</strong> {contactData.email}</p>}
          {(contactData.emergencyFirstName || contactData.emergencyLastName) && (
            <p>
              <strong>Emergency Contact:</strong>{' '}
              {[
                contactData.emergencyFirstName,
                contactData.emergencyMiddleName,
                contactData.emergencyLastName,
              ]
                .filter(Boolean)
                .join(' ')}
            </p>
          )}
          {contactData.emergencyRelationship && (
            <p><strong>Relationship:</strong> {contactData.emergencyRelationship}</p>
          )}
          {contactData.emergencyPhone && <p><strong>Phone:</strong> {contactData.emergencyPhone}</p>}
          {contactData.emergencyEmail && <p><strong>Email:</strong> {contactData.emergencyEmail}</p>}
        </section>
      )}

      {/* Insurance Section */}
      {insuranceData && Object.keys(insuranceData).length > 0 && (
        <section>
          <h3>Insurance Information</h3>
          
          <div className="insurance-section">
            <h4>Primary Insurance</h4>
            {insuranceData.primaryCompanyName && <p><strong>Insurance Company Name:</strong> {insuranceData.primaryCompanyName}</p>}
            {insuranceData.primaryPolicyNumber && <p><strong>Policy Number:</strong> {insuranceData.primaryPolicyNumber}</p>}
            {insuranceData.primaryGroupNumber && <p><strong>Group Number:</strong> {insuranceData.primaryGroupNumber}</p>}
            {insuranceData.primaryPlanType && <p><strong>Plan Type:</strong> {insuranceData.primaryPlanType}</p>}
            <p>
              <strong>Insurance Effective Dates:</strong>{' '}
              {insuranceData.primaryStartDate && insuranceData.primaryEndDate 
                ? `${formatDate(insuranceData.primaryStartDate)} - ${formatDate(insuranceData.primaryEndDate)}`
                : 'N/A'}
            </p>
          </div>

          {insuranceData.secondaryCompanyName && (
            <div className="insurance-section">
              <h4>Secondary Insurance</h4>
              {insuranceData.secondaryCompanyName && <p><strong>Insurance Company Name:</strong> {insuranceData.secondaryCompanyName}</p>}
              {insuranceData.secondaryPolicyNumber && <p><strong>Policy Number:</strong> {insuranceData.secondaryPolicyNumber}</p>}
              {insuranceData.secondaryGroupNumber && <p><strong>Group Number:</strong> {insuranceData.secondaryGroupNumber}</p>}
              {insuranceData.secondaryPlanType && <p><strong>Plan Type:</strong> {insuranceData.secondaryPlanType}</p>}
              <p>
                <strong>Insurance Effective Dates:</strong>{' '}
                {insuranceData.secondaryStartDate && insuranceData.secondaryEndDate 
                  ? `${formatDate(insuranceData.secondaryStartDate)} - ${formatDate(insuranceData.secondaryEndDate)}`
                  : 'N/A'}
              </p>
            </div>
          )}

          <div className="insurance-section">
            <h4>Contact Information</h4>
            {insuranceData.contactNumber && <p><strong>Contact Number:</strong> {insuranceData.contactNumber}</p>}
          </div>
        </section>
      )}

      {/* Ailments Section */}
      {ailmentsData?.length > 0 && (
        <section>
          <h3>Ailments</h3>
          {ailmentsData.map((ailment, index) => (
            <div key={index} className="ailment-item">
              {ailment.problemName && <h4>{ailment.problemName}</h4>}
              {ailment.description && <p><strong>Description:</strong> {ailment.description}</p>}
              {ailment.dateOfOnset && <p><strong>Date of Onset:</strong> {formatDate(ailment.dateOfOnset)}</p>}
              {ailment.status && ailment.status !== 'Select' && <p><strong>Status:</strong> {ailment.status}</p>}
              {ailment.icdCode && <p><strong>ICD Code:</strong> {ailment.icdCode}</p>}
              {ailment.severity && ailment.severity !== 'Select' && <p><strong>Severity:</strong> {ailment.severity}</p>}
              {(ailment.riskFactor || ailment.comorbidities) && (
                <p>
                  <strong>Risk Factors/Comorbidities:</strong> {[ailment.riskFactor, ailment.comorbidities].filter(Boolean).join(', ')}
                </p>
              )}
              {ailment.treatmentPlan && <p><strong>Treatment Plan:</strong> {ailment.treatmentPlan}</p>}
              {ailment.sideEffects && <p><strong>Side Effects:</strong> {ailment.sideEffects}</p>}
              {index < ailmentsData.length - 1 && <hr />}
            </div>
          ))}
        </section>
      )}

      {/* Assessment Section */}
      {assessmentData && Object.keys(assessmentData).length > 0 && (
        <section>
          <h3>Assessment</h3>
          {assessmentData.chiefComplaints && (
            <p><strong>Chief Complaints:</strong> {assessmentData.chiefComplaints}</p>
          )}
          {assessmentData.historyOfPresentIllness && (
            <p><strong>HPI:</strong> {assessmentData.historyOfPresentIllness}</p>
          )}
          {assessmentData.pastMedicalHistory && (
            <p><strong>PMH:</strong> {assessmentData.pastMedicalHistory}</p>
          )}
          {assessmentData.medicationHistory && (
            <p><strong>Medication History:</strong> {assessmentData.medicationHistory}</p>
          )}
          {assessmentData.testResults && (
            <p><strong>Tests Results:</strong> {assessmentData.testResults}</p>
          )}
          {assessmentData.remindersAlerts && (
            <p><strong>Reminders/Alerts:</strong> {assessmentData.remindersAlerts}</p>
          )}
          {assessmentData.planCare && (
            <p><strong>Plan Care:</strong> {assessmentData.planCare}</p>
          )}
        </section>
      )}

      {/* Medication History Section */}
      {medicationHistory?.length > 0 && (
        <section>
          <h3>Medication History</h3>
          
          {/* Current Medications */}
          {medicationHistory.some(med => med.status) && (
            <div className="medication-section">
              <h4>Current Medications</h4>
              {medicationHistory.filter(med => med.status).map((med, index) => (
                <div key={`current-${index}`} className="medication-item">
                  {med.problem && <p><strong>Problem:</strong> {med.problem}</p>}
                  <p><strong>Medicines:</strong> {med.medicine} {med.mg && `${med.mg}mg`}</p>
                  {med.doseTime && <p><strong>Frequency:</strong> {med.doseTime}</p>}
                  {med.timePeriod && <p><strong>Duration:</strong> {med.timePeriod}</p>}
                  {index < medicationHistory.filter(med => med.status).length - 1 && <hr />}
                </div>
              ))}
            </div>
          )}

          {/* Past Medications */}
          {medicationHistory.some(med => !med.status) && (
            <div className="medication-section">
              <h4>Past Medications</h4>
              {medicationHistory.filter(med => !med.status).map((med, index) => (
                <div key={`past-${index}`} className="medication-item">
                  {med.problem && <p><strong>Problem:</strong> {med.problem}</p>}
                  <p><strong>Medicines:</strong> {med.medicine} {med.mg && `${med.mg}mg`}</p>
                  {med.doseTime && <p><strong>Frequency:</strong> {med.doseTime}</p>}
                  {med.timePeriod && <p><strong>Duration:</strong> {med.timePeriod}</p>}
                  {index < medicationHistory.filter(med => !med.status).length - 1 && <hr />}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Vitals Section */}
      {vitalsData?.length > 0 && (
        <section>
          <h3>Vital Signs</h3>
          {vitalsData.map((vitals, index) => (
            <div key={index} className="vitals-item">
              <h4>Vitals Record {index + 1} - {vitals.date} {vitals.time}</h4>
              
              <div className="vitals-grid">
                {vitals.systolic && vitals.diastolic && (
                  <div className="vitals-card">
                    <strong>Blood Pressure:</strong> {vitals.systolic}/{vitals.diastolic} mmHg
                  </div>
                )}
                
                {vitals.pulse && (
                  <div className="vitals-card">
                    <strong>Pulse:</strong> {vitals.pulse} BPM
                  </div>
                )}
                
                {vitals.respiratory && (
                  <div className="vitals-card">
                    <strong>Respiratory Rate:</strong> {vitals.respiratory} BPM
                  </div>
                )}
                
                {vitals.temperature && (
                  <div className="vitals-card">
                    <strong>Temperature:</strong> {vitals.temperature}°{vitals.tempUnit === "Celsius" ? "C" : "F"}
                  </div>
                )}
                
                {vitals.spo2 && (
                  <div className="vitals-card">
                    <strong>SpO₂:</strong> {vitals.spo2}%
                  </div>
                )}
                
                {vitals.height && (
                  <div className="vitals-card">
                    <strong>Height:</strong> {vitals.height} {vitals.heightUnit === "feet" ? "ft" : "in"}
                  </div>
                )}
                
                {vitals.weight && (
                  <div className="vitals-card">
                    <strong>Weight:</strong> {vitals.weight} kg
                  </div>
                )}
                
                {vitals.bmi && (
                  <div className="vitals-card">
                    <strong>BMI:</strong> {vitals.bmi} kg/m²
                  </div>
                )}
                
                <div className="vitals-card">
                  <strong>Pain Level:</strong> {vitals.pain}/10 - {getPainLevelText(vitals.pain)}
                </div>
              </div>
              
              {vitals.comments && (
                <div className="vitals-comments">
                  <strong>Notes:</strong> {vitals.comments}
                </div>
              )}
              
              {index < vitalsData.length - 1 && <hr />}
            </div>
          ))}
        </section>
      )}

      {/* No Data Message */}
      {!(
        (patientData && Object.keys(patientData).length > 0) ||
        (contactData && Object.keys(contactData).length > 0) ||
        (insuranceData && Object.keys(insuranceData).length > 0) ||
        (ailmentsData?.length > 0) ||
        (assessmentData && Object.keys(assessmentData).length > 0) ||
        (medicationHistory?.length > 0) ||
        (vitalsData?.length > 0)
      ) && (
        <p>No data yet. Fill in the forms to preview.</p>
      )}
    </div>
  );
}