import React, { useState } from "react";
import "./TableDashboard.css";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const patients = [
    { name: "Amelia Adams", dob: "01/01/1990", sex: "Female", age: 34, status: "Active" },
    { name: "Ava Armstrong", dob: "02/01/1990", sex: "Female", age: 34, status: "Active" },
    { name: "Bella Brooks", dob: "03/01/1990", sex: "Female", age: 34, status: "Active" },
    { name: "Chloe Carter", dob: "04/01/1990", sex: "Male", age: 34, status: "Active" },
    { name: "Daniel Davis", dob: "05/01/1990", sex: "Male", age: 34, status: "Active" },
    { name: "Emily Edwards", dob: "06/01/1990", sex: "Female", age: 34, status: "Active" },
    { name: "Gavin Green", dob: "07/01/1990", sex: "Male", age: 34, status: "Active" },
    { name: "Leo Lawson", dob: "08/01/1990", sex: "Male", age: 34, status: "Active" },
    { name: "Zoey Zephyr", dob: "09/01/1990", sex: "Male", age: 34, status: "Active" },
  ];

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pdb-container">
      {/* Header */}
      <div className="pdb-header-bar">
        <h2 className="pdb-title">Patient Dashboard</h2>
      </div>

      {/* Search & Filter */}
      <div className="pdb-search-section">
        <input
          type="text"
          className="pdb-search-input"
          placeholder="Search Patient"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="pdb-search-btn">🔍</button>
      </div>

      {/* Table */}
      <table className="pdb-table">
        <thead>
          <tr>
            <th>NAME</th>
            <th>DOB</th>
            <th>SEX</th>
            <th>AGE</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((p, idx) => (
            <tr key={idx}>
              <td>{p.name}</td>
              <td>{p.dob}</td>
              <td>{p.sex}</td>
              <td>{p.age}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
