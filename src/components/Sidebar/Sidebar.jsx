import React from "react";
import { NavLink } from "react-router-dom";
import {
  User,
  Phone,
  Shield,
  Heart,
  ClipboardList,
  FileText,
  Pill,
  Activity,
  AlertTriangle,
  Users,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  const navItems = [
    { icon: User, text: "Patient Demographics", path: "/dashboard/patient-demographics" },
    { icon: Phone, text: "Contact Information", path: "/dashboard/contact-information" },
    { icon: Shield, text: "Insurance Information", path: "/dashboard/insurance-information" },
    { icon: Heart, text: "Ailments", path: "/dashboard/ailments" },
    { icon: ClipboardList, text: "Assessment", path: "/dashboard/assessment" },
    { icon: FileText, text: "Medical History", path: "/dashboard/medical-history" },
    { icon: Pill, text: "Medication History", path: "/dashboard/medicationhistory" },
    { icon: Activity, text: "Vitals", path: "/dashboard/vitals" },
    { icon: AlertTriangle, text: "Allergies", path: "/dashboard/allergies" },
    { icon: Users, text: "Family History", path: "/dashboard/family-history" },
    { icon: Users, text: "Social History", path: "/dashboard/social-history" },
    { icon: FileText, text: "Preview", path: "/dashboard/preview" },
    { icon: ClipboardList, text: "Consent", path: "/dashboard/consent" },
  ];

  return (
    <div className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="logo">SSPD</div>
        <h2 className="header-title">Patient Details</h2>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink 
              key={index} 
              to={item.path} 
              className={({ isActive }) => 
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <div className="icon-box">
                <Icon size={20} />
              </div>
              <span className="nav-text">{item.text}</span>
              <div className="nav-arrow">&gt;</div>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
