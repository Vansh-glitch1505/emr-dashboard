import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from 'react-router-dom';
import "./Vitals.css";
import axios from 'axios';

const Vitals = () => {
  const navigate = useNavigate();
  const { vitalsData: contextVitals, updatePreviewData, patientId } = useOutletContext();
  
  const [formData, setFormData] = useState({
    patient_id: patientId,
    systolic: "",
    diastolic: "",
    pulse: "",
    respiratory: "",
    temperature: "",
    tempUnit: "Celsius",
    height: "",
    heightUnit: "feet",
    weight: "",
    bmi: "",
    spo2: "",
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    comments: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    // Calculate BMI when height or weight changes
    if (formData.height && formData.weight) {
      const heightInMeters = formData.heightUnit === "feet" 
        ? parseFloat(formData.height) * 0.3048 
        : parseFloat(formData.height) * 0.0254;
      
      const weightInKg = parseFloat(formData.weight);
      
      if (heightInMeters > 0 && weightInKg > 0) {
        const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
        setFormData(prev => ({ ...prev, bmi: bmiValue }));
      }
    }
  }, [formData.height, formData.weight, formData.heightUnit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Basic validation
    if (name === "systolic" || name === "diastolic" || name === "pulse" || 
        name === "respiratory" || name === "spo2") {
      if (value && isNaN(value)) return;
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    
    if (formData.systolic && (formData.systolic < 50 || formData.systolic > 250)) {
      newErrors.systolic = "Invalid systolic value";
    }
    
    if (formData.diastolic && (formData.diastolic < 30 || formData.diastolic > 150)) {
      newErrors.diastolic = "Invalid diastolic value";
    }
    
    if (formData.pulse && (formData.pulse < 30 || formData.pulse > 200)) {
      newErrors.pulse = "Invalid pulse rate";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePreview = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowPreview(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      // Prepare data for API
      const vitalsData = {
        patient_id: patientId,
        date: formData.date,
        time: formData.time,
        systolic: formData.systolic || null,
        diastolic: formData.diastolic || null,
        pulse: formData.pulse || null,
        respiratory: formData.respiratory || null,
        temperature: formData.temperature || null,
        temp_unit: formData.tempUnit,
        height: formData.height || null,
        height_unit: formData.heightUnit,
        weight: formData.weight || null,
        bmi: formData.bmi || null,
        spo2: formData.spo2 || null,
        comments: formData.comments || null
      };

      // Use fetch instead of axios for consistency with your other components
      const response = await fetch('http://localhost:5000/api/vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vitalsData)
      });

      const data = await response.json();

      if (data.success) {
        updatePreviewData(formData, 'vitals');
        setIsSubmitted(true);
        setShowPreview(false);
      } else {
        setErrorMessage(data.message || 'Failed to save vitals. Please try again.');
      }
    } catch (error) {
      console.error('Error saving vitals:', error);
      setErrorMessage('Failed to save vitals. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    navigate('/dashboard/allergies');
  };

  const handleNewEntry = () => {
    setFormData({
      patient_id: patientId,
      systolic: "",
      diastolic: "",
      pulse: "",
      respiratory: "",
      temperature: "",
      tempUnit: "Celsius",
      height: "",
      heightUnit: "feet",
      weight: "",
      bmi: "",
      spo2: "",
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      comments: "",
    });
    setIsSubmitted(false);
    setShowPreview(false);
  };

  const handleBackToEdit = () => {
    setShowPreview(false);
  };

  const renderPreview = () => {
    return (
      <div className="preview-container">
        <h3 className="preview-title">Preview Vitals Data</h3>
        
        <div className="preview-section">
          <h4>Date & Time</h4>
          <div className="preview-row">
            <span className="preview-label">Date:</span>
            <span className="preview-value">{formData.date}</span>
          </div>
          <div className="preview-row">
            <span className="preview-label">Time:</span>
            <span className="preview-value">{formData.time}</span>
          </div>
        </div>

        <div className="preview-section">
          <h4>Vital Signs</h4>
          {formData.systolic && (
            <div className="preview-row">
              <span className="preview-label">Systolic BP:</span>
              <span className="preview-value">{formData.systolic} mmHg</span>
            </div>
          )}
          {formData.diastolic && (
            <div className="preview-row">
              <span className="preview-label">Diastolic BP:</span>
              <span className="preview-value">{formData.diastolic} mmHg</span>
            </div>
          )}
          {formData.pulse && (
            <div className="preview-row">
              <span className="preview-label">Pulse Rate:</span>
              <span className="preview-value">{formData.pulse} BPM</span>
            </div>
          )}
          {formData.respiratory && (
            <div className="preview-row">
              <span className="preview-label">Respiratory Rate:</span>
              <span className="preview-value">{formData.respiratory} BPM</span>
            </div>
          )}
          {formData.temperature && (
            <div className="preview-row">
              <span className="preview-label">Temperature:</span>
              <span className="preview-value">{formData.temperature}°{formData.tempUnit === "Celsius" ? "C" : "F"}</span>
            </div>
          )}
          {formData.spo2 && (
            <div className="preview-row">
              <span className="preview-label">SpO₂:</span>
              <span className="preview-value">{formData.spo2}%</span>
            </div>
          )}
        </div>

        <div className="preview-section">
          <h4>Anthropometrics</h4>
          {formData.height && (
            <div className="preview-row">
              <span className="preview-label">Height:</span>
              <span className="preview-value">{formData.height} {formData.heightUnit}</span>
            </div>
          )}
          {formData.weight && (
            <div className="preview-row">
              <span className="preview-label">Weight:</span>
              <span className="preview-value">{formData.weight} kg</span>
            </div>
          )}
          {formData.bmi && (
            <div className="preview-row">
              <span className="preview-label">BMI:</span>
              <span className="preview-value">{formData.bmi} kg/m²</span>
            </div>
          )}
        </div>

        {formData.comments && (
          <div className="preview-section">
            <h4>Additional Notes</h4>
            <div className="preview-row">
              <span className="preview-label">Comments:</span>
              <span className="preview-value">{formData.comments}</span>
            </div>
          </div>
        )}

        <div className="preview-actions">
          <button type="button" className="back-btn" onClick={handleBackToEdit}>
            Back to Edit
          </button>
          <div className="preview-main-actions">
            <button 
              type="button" 
              className="save-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Vitals'}
            </button>
            <button type="button" className="next-btn" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="vitals-container">
      <header className="fixed-header">
        <h1 className="header-title"></h1>
      </header>
      <h2 className="vitals-title">Patient Vitals</h2>
      
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      {isSubmitted ? (
        <div className="success-message">
          <h3>Vitals recorded successfully!</h3>
          <div className="form-actions">
            <button className="save-btn" onClick={handleNewEntry}>
              Record New Vitals
            </button>
            <button className="next-btn" onClick={handleNext}>
              Continue to Next Section
            </button>
          </div>
        </div>
      ) : showPreview ? (
        renderPreview()
      ) : (
        <form onSubmit={handlePreview}>
          <fieldset className="vitals-section">
            <legend className="section-title">Date & Time</legend>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="date">Date*</label>
                <input 
                  type="date" 
                  id="date" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleChange}
                  className={errors.date ? "error" : ""}
                />
                {errors.date && <span className="error-text">{errors.date}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="time">Time*</label>
                <input 
                  type="time" 
                  id="time" 
                  name="time" 
                  value={formData.time} 
                  onChange={handleChange}
                  className={errors.time ? "error" : ""}
                />
                {errors.time && <span className="error-text">{errors.time}</span>}
              </div>
            </div>
          </fieldset>

          <fieldset className="vitals-section">
            <legend className="section-title">Vital Signs</legend>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="systolic">Systolic BP</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    id="systolic" 
                    name="systolic" 
                    placeholder="120"
                    value={formData.systolic} 
                    onChange={handleChange}
                    className={errors.systolic ? "error" : ""}
                  />
                  <span className="unit">mmHg</span>
                </div>
                {errors.systolic && <span className="error-text">{errors.systolic}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="diastolic">Diastolic BP</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    id="diastolic" 
                    name="diastolic" 
                    placeholder="80"
                    value={formData.diastolic} 
                    onChange={handleChange}
                    className={errors.diastolic ? "error" : ""}
                  />
                  <span className="unit">mmHg</span>
                </div>
                {errors.diastolic && <span className="error-text">{errors.diastolic}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="pulse">Pulse Rate</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    id="pulse" 
                    name="pulse" 
                    placeholder="72"
                    value={formData.pulse} 
                    onChange={handleChange}
                    className={errors.pulse ? "error" : ""}
                  />
                  <span className="unit">BPM</span>
                </div>
                {errors.pulse && <span className="error-text">{errors.pulse}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="respiratory">Respiratory Rate</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    id="respiratory" 
                    name="respiratory" 
                    placeholder="16"
                    value={formData.respiratory} 
                    onChange={handleChange}
                  />
                  <span className="unit">BPM</span>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="temperature">Temperature</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    id="temperature" 
                    name="temperature" 
                    placeholder={formData.tempUnit === "Celsius" ? "37.0" : "98.6"}
                    value={formData.temperature} 
                    onChange={handleChange}
                    step="0.1"
                  />
                  <div className="unit-toggle">
                    <button 
                      type="button"
                      className={formData.tempUnit === "Celsius" ? "selected" : ""}
                      onClick={() => setFormData({ ...formData, tempUnit: "Celsius" })}
                    >
                      °C
                    </button>
                    <button 
                      type="button"
                      className={formData.tempUnit === "Fahrenheit" ? "selected" : ""}
                      onClick={() => setFormData({ ...formData, tempUnit: "Fahrenheit" })}
                    >
                      °F
                    </button>
                  </div>
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="spo2">SpO₂</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    id="spo2" 
                    name="spo2" 
                    placeholder="98"
                    value={formData.spo2} 
                    onChange={handleChange}
                    min="70"
                    max="100"
                  />
                  <span className="unit">%</span>
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="vitals-section">
            <legend className="section-title">Anthropometrics</legend>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="height">Height</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    id="height" 
                    name="height" 
                    placeholder={formData.heightUnit === "feet" ? "5.8" : "70"}
                    value={formData.height} 
                    onChange={handleChange}
                    step="0.1"
                  />
                  <div className="unit-toggle">
                    <button 
                      type="button"
                      className={formData.heightUnit === "feet" ? "selected" : ""}
                      onClick={() => setFormData({ ...formData, heightUnit: "feet" })}
                    >
                      ft
                    </button>
                    <button 
                      type="button"
                      className={formData.heightUnit === "inches" ? "selected" : ""}
                      onClick={() => setFormData({ ...formData, heightUnit: "inches" })}
                    >
                      in
                    </button>
                  </div>
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="weight">Weight</label>
                <div className="input-with-unit">
                  <input 
                    type="number" 
                    id="weight" 
                    name="weight" 
                    placeholder="70"
                    value={formData.weight} 
                    onChange={handleChange}
                    step="0.1"
                  />
                  <span className="unit">kg</span>
                </div>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="bmi">BMI</label>
              <div className="input-with-unit">
                <input 
                  type="text" 
                  id="bmi" 
                  name="bmi" 
                  value={formData.bmi} 
                  readOnly
                />
                <span className="unit">kg/m²</span>
              </div>
            </div>
          </fieldset>

          <fieldset className="vitals-section">
            <legend className="section-title">Additional Notes</legend>
            <div className="input-group full-width">
              <label htmlFor="comments">Comments</label>
              <textarea 
                id="comments" 
                name="comments" 
                placeholder="Enter any additional comments or observations..."
                value={formData.comments} 
                onChange={handleChange}
                rows="4"
              />
            </div>
          </fieldset>

          <div className="form-actions">
            <button 
              type="submit" 
              className="preview-btn"
              disabled={isLoading}
            >
              Preview
            </button>
            <button type="button" className="skip-btn" onClick={handleNext}>
              Next
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Vitals;