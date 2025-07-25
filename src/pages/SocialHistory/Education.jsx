import React, { useState } from "react";
import "./Education.css";

const Education = () => {
  const [formData, setFormData] = useState({
    highestEducation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, highestEducation: e.target.value });
  };

  return (
    <div className="education-panel">
      <div className="panel-header">
        <h3>Education</h3>
        <button className="close-btn">X</button>
      </div>

      <div className="form-group">
        <label>Highest Level of Education</label>
        <select
          name="highestEducation"
          value={formData.highestEducation}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="High School">High School</option>
          <option value="Diploma">Diploma</option>
          <option value="Bachelor's">Bachelor's</option>
          <option value="BMS">BMS</option>
          <option value="Master's">Master's</option>
          <option value="PhD">PhD</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="education-buttons">
        <button>Add</button>
        <button>Cancel</button>
        <button className="save-btn">Save</button>
      </div>
    </div>
  );
};

export default Education;
