// src/pages/Consent/Consent.jsx
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './Consent.css';

export default function Consent() {
  const { patientData, contactData } = useOutletContext();

  const fullName = [patientData.firstName, patientData.middleName, patientData.lastName]
    .filter(Boolean)
    .join(' ');

  const fullAddress = [
    patientData.address1,
    patientData.address2,
    patientData.city,
    patientData.postalCode,
    patientData.state,
    patientData.country
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="consent-container">
      <h2 className="form-title">Consent Form</h2>

      <div className="consent-header">
        <p><strong>Name:</strong> {fullName} &nbsp;&nbsp;&nbsp;&nbsp; <strong>Date of Birth:</strong> {patientData.dob}</p>
        <p><strong>Address:</strong> <u>{fullAddress}</u></p>
        <p><strong>Contact no:</strong> <u>{contactData.mobilePhone}</u> &nbsp;&nbsp;&nbsp;&nbsp; <strong>E-mail:</strong> {contactData.email}</p>
      </div>

      <div className="consent-body">
        <p>
          I, <strong>{fullName || "[Patient's Name]"}</strong>, hereby give my consent to
          <strong> SSPD</strong> to use electronic medical record (EMR) systems for the
          management of my health information. I understand and agree to the following terms:
        </p>

        <ol>
          <li>
            <strong>Purpose of EMR:</strong> I understand that the purpose of using EMR systems is to efficiently manage and store my medical information, including but not limited to medical history, diagnoses, treatment plans, medications, and test results.
          </li>
          <li>
            <strong>Confidentiality:</strong> I acknowledge that my health information stored in the EMR will be treated with the utmost confidentiality and will only be accessed by authorized healthcare professionals involved in my care.
          </li>
        </ol>
      </div>
    </div>
  );
}
