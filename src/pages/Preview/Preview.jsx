// src/pages/Preview/Preview.jsx
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './Preview.css';

export default function Preview() {
  const { patientData, contactData } = useOutletContext();

  return (
    <div className="preview-container">
      <h2>Review Your Info</h2>

      {patientData && (
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
          <p><strong>DOB:</strong> {patientData.dob}</p>
          <p><strong>Gender:</strong> {patientData.gender}</p>
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
          <p><strong>Blood Group:</strong> {patientData.bloodGroup}</p>
          <p><strong>Occupation:</strong> {patientData.occupation}</p>
          <p><strong>Aadhar No.:</strong> {patientData.aadharNumber}</p>
          <p><strong>PAN No.:</strong> {patientData.panNumber}</p>
        </section>
      )}

      {contactData && (
        <section>
          <h3>Contact</h3>
          <p><strong>Mobile:</strong> {contactData.mobilePhone}</p>
          <p><strong>Home:</strong> {contactData.homePhone}</p>
          <p><strong>Work:</strong> {contactData.workPhone}</p>
          <p><strong>Email:</strong> {contactData.email}</p>
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
          <p>
            <strong>Relationship:</strong> {contactData.emergencyRelationship}
          </p>
          <p><strong>Phone:</strong> {contactData.emergencyPhone}</p>
          <p><strong>Email:</strong> {contactData.emergencyEmail}</p>
        </section>
      )}

      {!(patientData.firstName || contactData.mobilePhone) && (
        <p>No data yet. Fill in the forms to preview.</p>
      )}
    </div>
  );
}
