import React, { useEffect, useState } from "react";
import SideMenu from "./SideMenu/index";
import AppHeader from "./AppHeader/index";
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import "./index.css";
import { useNavigate } from "react-router-dom";
function Fermes() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getFermes();
  }, []);
  const navigate = useNavigate();

  const viewAccounts = (fermeId) => {
    navigate(`/accounts/${fermeId}`);
  };

  async function getFermes() {
    try {
      let result = await fetch("http://192.168.244.216:3000/AllFermes", {
        method: "GET",
      });
      result = await result.json();
      setData(result);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter(
    (ferme) =>
      ferme.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ferme.prenom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App1">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <div style={{ borderRadius: "50px" }}>
          <section className="py-1 bg-blueGray-50 pr-10 lg:pr-0">
            <div
              className="w-full xl:w-11/12 mb-12 xl:mb-0 px-4 mx-5 mt-12 mr-40 lg:mr-0"
              style={{ borderRadius: "50px" }}
            >
              <h1 className="text-3xl my-2">
                <br />
                &nbsp;&nbsp; &nbsp;&nbsp; <b>Liste des Fermes</b>
              </h1>
              <br />
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="lg:flex items-center">
                    <div className="relative w-full px-4 max-w-full flex">
                      <div className="flex gap-x-3 rounded-tr-xl rounded-br-xl border border-gray-100 p-2 item-center">
                        &nbsp;&nbsp; &nbsp;&nbsp;
                        <TextField
                          label="Search"
                          value={searchQuery}
                          onChange={handleSearchChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton>
                                  <SearchIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <table className="tablC" width="1000px">
                    <thead>
                      <tr className="head">
                     
                        <th style={{color:"white"}}>Nom</th>
                        <th style={{color:"white"}}>Prénom</th>
                        <th style={{color:"white"}}>Email</th>
                        <th style={{color:"white"}}>Téléphone</th>
                        <th style={{color:"white"}}>Cin</th>
                        <th style={{color:"white"}}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((ferme) => (
                        <tr key={ferme._id}>
                                           <td
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            {ferme.nom}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            {ferme.prenom}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            {ferme.email}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            {ferme.Num_tel}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            {ferme.cin}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => viewAccounts(ferme._id)}
                            >
                              Nouveau comptes
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Fermes;
