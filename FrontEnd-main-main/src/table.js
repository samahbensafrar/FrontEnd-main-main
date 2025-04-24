import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { IconButton } from "@mui/material";
import axios from "axios";
import { useAuth } from "./AuthContext";  

const ROLE_TO_REGION = {
  1: null, 
  2: "Boufarik",
  3: "Mouzaia",
  4: "Larbaa",
  5: "OuladYaich",
  6: "ElWouroud",
  7: "Bougara",
  8: "Afroun",
};

const Table = ({ data }) => {
    const navigate = useNavigate();

    const normalize = (str) => str?.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const getEtatStyle = (etat) => {
        const cleanEtat = normalize(etat);
        switch (cleanEtat) {
            case "non traite":
                return { color: "red" };
            case "payment regle":
                return { color: "#4caf50" };
            default:
                return { color: "#0A2364" };
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Num Tel</th>
                    <th>État</th>
                    <th>Type</th>
                    <th>Région</th>
                    <th>Plus</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? data.map(client => (
                    <tr key={client.id}>
                        <td>{client.client_id}</td>
                        <td>{client.name}</td>
                        <td>{client.surname}</td>
                        <td>{client.phone_number}</td>
                        <td style={getEtatStyle(client.etat)}>{client.etat}</td>
                        <td>{client.client_type}</td>
                        <td>{client.region}</td>
                        <td>
                            <IconButton onClick={() => navigate(`/client/${client.id}`)} style={{ padding: "5px 10px", cursor: "pointer" }}>
                                <EditNoteIcon sx={{ color: "#233e83" }} />
                            </IconButton>
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan="8" style={{ textAlign: "center", color: "red" }}>No clients found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Table;

