import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideMenu from "./SideMenu/index";
import AppHeader from "./AppHeader/index";
import { TextField, InputAdornment, IconButton, Button } from "@material-ui/core";

function Accounts() {
  const { id } = useParams(); 
  const [ouvriers, setOuvriers] = useState([]);
  const [veterinaires, setVeterinaires] = useState([]);

  useEffect(() => {
   
    const fetchOuvriers = async () => {
      try {
        const response = await fetch(`http://192.168.244.216:3000/Compte-by-proprietaire/${id}`);
        const data = await response.json();
        setOuvriers(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des ouvriers :", error);
      }
    };

   
    const fetchVeterinaires = async () => {
      try {
        const response = await fetch(`http://192.168.244.216:3000/Compte-by-proprietaireV/${id}`);
        const data = await response.json();
        setVeterinaires(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des vétérinaires :", error);
      }
    };

    fetchOuvriers();
    fetchVeterinaires();
  }, [id]);

  const handleCreateCompte = async (compteId, type) => {
    const apiUrl = type === 'ouvrier'
      ? `http://192.168.244.216:3000/deplacer-compte/${compteId}`
      : `http://192.168.244.216:3000/deplacer-compteV/${compteId}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        if (type === 'ouvrier') {
          setOuvriers(ouvriers.filter(account => account._id !== compteId));
        } else {
          setVeterinaires(veterinaires.filter(account => account._id !== compteId));
        }
      } else {
        console.error('Failed to move account:', result.message);
      }
    } catch (error) {
      console.error('Error moving account:', error);
    }
  };

  return (
    <div className="App1">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <br />
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h1>&nbsp;&nbsp;&nbsp;&nbsp;Nouveau Ouvrier</h1>
          <table className="tablC" width="1000px" style={{ marginTop: 30 , marginBottom:40 }}>
            <thead>
              <tr className="head">
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Cin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ouvriers.map((user) => (
                <tr key={user._id}>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{user.nom}</td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{user.prenom}</td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{user.email}</td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{user.Num_tel}</td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{user.cin}</td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCreateCompte(user._id, 'ouvrier')}
                    >
                      Créer Compte
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h1>&nbsp;&nbsp;&nbsp;&nbsp;Nouveau Vétérinaire</h1>
          <table className="tablC" width="1000px" style={{ marginTop: 30 }}>
            <thead>
              <tr className="head">
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Cin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {veterinaires.map((user) => (
                <tr key={user._id}>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{user.nom}</td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{user.prenom}</td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{user.email}</td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{user.Num_tel}</td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{user.cin}</td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCreateCompte(user._id, 'veterinaire')}
                    >
                      Créer Compte
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Accounts;
