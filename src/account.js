import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideMenu from "./SideMenu/index";
import AppHeader from "./AppHeader/index";
import { TextField, InputAdornment, IconButton, Button } from "@material-ui/core";

function Accounts() {
  const { id } = useParams(); 
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    console.log("Fetching accounts for farm ID:", id);
    const fetchAccounts = async () => {
      try {
        const response = await fetch(`http://192.168.195.216:3000/Compte-by-proprietaire/${id}`);
        const data = await response.json();
        console.log("Accounts data:", data);
        setAccounts(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des comptes :", error);
      }
    };

    fetchAccounts();
  }, [id]);

  const handleCreateCompte = async (compteId) => {
    try {
      const response = await fetch(`http://192.168.195.216:3000/deplacer-compte/${compteId}`, {
        method: 'POST',
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        // Refresh the list of accounts after a successful move
        setAccounts(accounts.filter(account => account._id !== compteId));
      } else {
        console.error('Failed to move account:', result.message);
      }
    } catch (error) {
      console.error('Error moving account:', error);
    }
  };

  return (
    <div className="App1">
      <AppHeader/>
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <br/>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h1>&nbsp;&nbsp;&nbsp;&nbsp;Nouveau ouvrier</h1>
          <table className="tablC" width="1000px" style={{marginTop:100}}>
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
              {accounts.map((user) => (
                <tr key={user._id}>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{user.nom}</td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{user.prenom}</td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{user.email}</td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{user.Num_tel}</td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{user.cin}</td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    <Button variant="contained" color="primary" onClick={() => handleCreateCompte(user._id)}>
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
