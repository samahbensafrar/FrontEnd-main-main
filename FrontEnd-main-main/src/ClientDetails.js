import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import historiqueData from "./data/historique.json";
import "./index.css";

const ClientDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [client, setClient] = useState(null); 
  const [etat, setEtat] = useState("non traiter");
  const [total_amount, setTotal_amount] = useState("");
  const [observation, setObservation] = useState("");

  useEffect(() => {

    axios.get(`http://127.0.0.1:8000/api/clients/${id}/`)  
      .then((response) => {
        setClient(response.data); 
        setEtat(response.data.etat); 
        setTotal_amount(response.data.total_amount); 
      })
      .catch((error) => {
        console.error("Error fetching client data:", error);
      });
  }, [id]);

  const handleSave = () => {
    const updatedClient = {
      client_id: client.client_id,
      name: client.name,
      surname: client.surname,
      phone_number: client.phone_number,
      client_type: client.client_type,
      region: client.region,
      address: client.address,
      total_amount: parseFloat(total_amount),  
      etat: etat,  
      observation: observation,
      employee: client.employee,  
    };
  
    axios.put(`http://127.0.0.1:8000/api/clients/${id}/`, updatedClient)
      .then((response) => {
        console.log("Saved Client Details:", response.data);
        alert("Changes saved!");
      })
      .catch((error) => {
        console.error("Error saving client:", error);
        if (error.response) {
          console.error("Server response:", error.response.data);
        }
      });
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  if (!client) {
    return <p>Client not found.</p>;
  }

  return (
    <div>
      <Navbar />
      <Sidebar />
      <h1 className="title">Client Details</h1>
      <div className="big-container">
        <div className="container">
          <div className="row">
            <div className="form-group">
              <label htmlFor="name">Nom:</label>
              <input type="text" id="name" value={client.name} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="id">ID:</label>
              <input type="text" id="id" value={client.client_id} readOnly />
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              <label htmlFor="surname">Prenom:</label>
              <input type="text" id="surname" value={client.surname} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="address">Adresse:</label>
              <input type="text" id="address" value={client.address} readOnly />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label htmlFor="region">Region:</label>
              <input type="text" id="region" value={client.region} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="phone_number">Num Tel:</label>
              <input type="text" id="phone_number" value={client.phone_number} readOnly />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label htmlFor="client_type">Type:</label>
              <input type="text" id="client_type" value={client.client_type} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="total_amount">Total:</label>
              <input type="text" id="total" value={total_amount} onChange={(e) => setTotal_amount(e.target.value)} />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label htmlFor="etat">Etat:</label>
              <select id="etat" value={etat} onChange={(e) => setEtat(e.target.value)}>
              <option value="Payment Réglé">Payment Réglé</option>
                <option value="Non Traité">Non Traité</option>
                <option value="Avocat">Avocat</option>
                <option value="Huissier">Huissier</option>
                <option value="Juridique">Juridique</option>
                <option value="Décédé">Décédé</option>


              </select>
            </div>
            <div className="form-group">
              <label htmlFor="observation">Observation:</label>
              <textarea id="observation" cols="50" rows="4" value={observation} onChange={(e) => setObservation(e.target.value)}></textarea>
            </div>
          </div>

          <button
            className="imprimer-btn"
            disabled={![ "Juridique"].includes(etat)}>
            Imprimer
          </button>
          <div className="buttons">
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={handleCancel}>Annuler</button>
          </div>
          
        </div>
        <div className="historique">
          <h2 className="historique-title">Historique:</h2>
          <ul className="historique-list">
            {historiqueData.map((item) => (
              <li key={item.id}>
                <strong>{item.date}</strong> - {item.action} 
              </li>
            ))}
          </ul>
      </div>
      </div>
    </div>
  );
};

export default ClientDetails;


