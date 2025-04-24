import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams  } from "react-router-dom";
import dataList from "./data/Employees.json";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./AuthContext";
import "./index.css"; 
const ROLE_LABELS = {
  1: "Admin",
  2: "Responsable de Boufarik",
  3: "Responsable de Mouzaia",
  4: "Responsable de Larbaa",
  5: "Responsable de Oulad Yaich",
  6: "Responsable de El Wouroud",
  7: "Responsable de Bougara",
  8: "Responsable de Afroun"
};
const Profile = () => {
  const { logout, user } = useAuth();
  const { id } = useParams();
  const [employee,setEmployee]= useState() ;
  useEffect(() => {
    const fetchEmployees = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/users/by-username/${user.username}`);
          setEmployee(response.data || []);
        
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };
    fetchEmployees();
}, []);


  
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="profilecontainer">
        <h1 className="profile-title">Profile</h1>
        {employee ? (
          <div className="profile-card">
            <div className="profile-info">
              <div className="info-item">
                <span className="info-label">Nom</span>
                <span className="info-value">{employee.username}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Numéro de téléphone</span>
                <span className="info-value">{employee.phone_number}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Rôle</span>
                <span className="info-value">{ROLE_LABELS[employee.role] || "Rôle inconnu"}</span>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="profile-error">Aucun employé trouvé.</h1>
        )}
      </div>
    </>
  );
};

export default Profile;