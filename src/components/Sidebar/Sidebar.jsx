import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 style={{ color: "black" }}>Patient Dashboard</h2>
      <nav>
        <ul>
          <li>
            <NavLink 
              to="/dashboard/patient-demographics"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Patient Demographics
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/contact-information"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Contact Information
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/insurance-information"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Insurance Information
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/ailments"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Ailments
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/assessment"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Assessment
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/medical-history"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Medical History
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/medicationhistory"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              MedicationHistory
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/vitals"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Vitals
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/allergies"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Allergies
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/family-history"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              FamilyHistory
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/dashboard/social-history"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Social History
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/preview"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Preview
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/consent"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Consent
            </NavLink>
          </li>
          
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;