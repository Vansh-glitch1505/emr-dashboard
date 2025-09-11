import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PatientEdit.css';

const PatientEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    dob: '',
    gender: '',
    location: '',
    allergies: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching patient data
    const allPatients = [
      { id: 1, first_name: 'Sarah', last_name: 'Johnson', phone: '+1 344-716-6844', dob: '02/10/1990', gender: 'Female', location: 'USA' },
      { id: 2, first_name: 'Michael', last_name: 'Chen', phone: '+1 555-123-4567', dob: '15/07/1985', gender: 'Male', location: 'USA' },
      { id: 3, first_name: 'Emma', last_name: 'Rodriguez', phone: '+1 555-987-6543', dob: '22/03/1992', gender: 'Female', location: 'USA' },
      { id: 4, first_name: 'David', last_name: 'Williams', phone: '+1 555-456-7890', dob: '08/11/1978', gender: 'Male', location: 'USA' },
      { id: 5, first_name: 'Sophia', last_name: 'Brown', phone: '+1 555-321-0987', dob: '14/05/1995', gender: 'Female', location: 'USA' },
      { id: 6, first_name: 'James', last_name: 'Smith', phone: '+1 555-654-3210', dob: '30/09/1982', gender: 'Male', location: 'USA' }
    ];

    const foundPatient = allPatients.find(p => p.id === parseInt(id));
    if (foundPatient) {
      foundPatient.allergies = [
        { allergen: 'Pollen', reaction: 'Sneezing, Itchy Eyes', severity: 'Mild', status: 'Active', category: 'Environmental', code: 'ALG123' },
        { allergen: 'Penicillin', reaction: 'Rash, Itching', severity: 'Moderate', status: 'Resolved', category: 'Medication', code: 'ALG456' }
      ];
      setPatient(foundPatient);
    }
    setLoading(false);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAllergyChange = (index, field, value) => {
    const updatedAllergies = [...patient.allergies];
    updatedAllergies[index] = {
      ...updatedAllergies[index],
      [field]: value
    };
    setPatient(prev => ({
      ...prev,
      allergies: updatedAllergies
    }));
  };

  const addAllergy = () => {
    setPatient(prev => ({
      ...prev,
      allergies: [...prev.allergies, {
        allergen: '',
        reaction: '',
        severity: 'Mild',
        status: 'Active',
        category: 'Environmental',
        code: ''
      }]
    }));
  };

  const removeAllergy = (index) => {
    setPatient(prev => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index)
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Here you would typically save to your backend
    console.log('Saving patient:', patient);
    // Navigate back to patient detail page
    navigate(`/patient/${id}`);
  };

  const handleCancel = () => {
    navigate(`/patient/${id}`);
  };

  if (loading) {
    return <div className="pe-loading">Loading...</div>;
  }

  if (!patient.id) {
    return <div className="pe-notfound">Patient not found</div>;
  }

  return (
    <div className="pe-container">
      <div className="pe-header">
        <h1>Edit Patient</h1>
        <div className="pe-header-actions">
          <button type="button" className="pe-cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" form="patient-edit-form" className="pe-save-btn">
            Save Changes
          </button>
        </div>
      </div>

      <form id="patient-edit-form" onSubmit={handleSave} className="pe-form">
        {/* Basic Information Card */}
        <div className="pe-card">
          <h2>Basic Information</h2>
          
          <div className="pe-form-grid">
            <div className="pe-form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={patient.first_name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="pe-form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={patient.last_name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="pe-form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={patient.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="pe-form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="text"
                id="dob"
                name="dob"
                value={patient.dob}
                onChange={handleInputChange}
                placeholder="DD/MM/YYYY"
                required
              />
            </div>

            <div className="pe-form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={patient.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="pe-form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={patient.location}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Allergies Card */}
        <div className="pe-card">
          <div className="pe-section-header">
            <h2>Allergies</h2>
            <button type="button" className="pe-add-btn" onClick={addAllergy}>
              + Add Allergy
            </button>
          </div>

          {patient.allergies.length === 0 ? (
            <p className="pe-no-allergies">No allergies recorded</p>
          ) : (
            patient.allergies.map((allergy, index) => (
              <div key={index} className="pe-allergy-card">
                <div className="pe-allergy-header">
                  <h3>Allergy {index + 1}</h3>
                  <button
                    type="button"
                    className="pe-remove-btn"
                    onClick={() => removeAllergy(index)}
                  >
                    Remove
                  </button>
                </div>

                <div className="pe-form-grid">
                  <div className="pe-form-group">
                    <label>Allergen</label>
                    <input
                      type="text"
                      value={allergy.allergen}
                      onChange={(e) => handleAllergyChange(index, 'allergen', e.target.value)}
                      required
                    />
                  </div>

                  <div className="pe-form-group">
                    <label>Reaction</label>
                    <input
                      type="text"
                      value={allergy.reaction}
                      onChange={(e) => handleAllergyChange(index, 'reaction', e.target.value)}
                      required
                    />
                  </div>

                  <div className="pe-form-group">
                    <label>Severity</label>
                    <select
                      value={allergy.severity}
                      onChange={(e) => handleAllergyChange(index, 'severity', e.target.value)}
                      required
                    >
                      <option value="Mild">Mild</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Severe">Severe</option>
                    </select>
                  </div>

                  <div className="pe-form-group">
                    <label>Status</label>
                    <select
                      value={allergy.status}
                      onChange={(e) => handleAllergyChange(index, 'status', e.target.value)}
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="pe-form-group">
                    <label>Category</label>
                    <select
                      value={allergy.category}
                      onChange={(e) => handleAllergyChange(index, 'category', e.target.value)}
                      required
                    >
                      <option value="Environmental">Environmental</option>
                      <option value="Medication">Medication</option>
                      <option value="Food">Food</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="pe-form-group">
                    <label>Allergy Code</label>
                    <input
                      type="text"
                      value={allergy.code}
                      onChange={(e) => handleAllergyChange(index, 'code', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </form>
    </div>
  );
};

export default PatientEdit;