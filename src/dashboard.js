import React, { useEffect, useState } from "react";
import "./App.css";
import AppHeader from "./AppHeader/index";
import SideMenu from "./SideMenu/index";
import { Card, CardContent, Grid, Typography, makeStyles } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import PetsIcon from "@material-ui/icons/Pets";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import BusinessIcon from "@material-ui/icons/Business";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  card: {
    minWidth: 275,
    margin: theme.spacing(2),
  },
  icon: {
    fontSize: 40,
    color: "#8baf9e",
    marginRight: theme.spacing(2),
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  count: {
    fontSize: 24,
    fontWeight: "bold",
  },
}));

function Dash() {
  const classes = useStyles();
  const [animalCount, setAnimalCount] = useState(0);
  const [employerCount, setEmployerCount] = useState(0);
  const [veterinaireCount, setVeterinaireCount] = useState(0);
  const [fermeCount, setFermeCount] = useState(0);

  useEffect(() => {
    fetchAnimalCount();
    fetchUserCounts();
  }, []);

  async function fetchAnimalCount() {
    try {
      const response = await fetch("http://192.168.244.216:3000/total-animals");
      const data = await response.json();
      setAnimalCount(data.totalAnimals);
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre d'animaux :", error);
    }
  }

  async function fetchUserCounts() {
    try {
      const response = await fetch("http://192.168.244.216:3000/total-users");
      const data = await response.json();
      setEmployerCount(data.totalEmployeurs);
      setVeterinaireCount(data.totalVeterinaires);
      setFermeCount(data.totalFermes);
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre d'utilisateurs :", error);
    }
  }

  return (
    <div className="ommm">
      <div className="App1">
        <AppHeader />
        <div className="SideMenuAndPageContent">
          <SideMenu />
          <div className={classes.root}>
            <h2  style={{marginLeft:30}}><u>Informations</u></h2>
          <br/><br/>
            <Grid container spacing={4}>
              {/* First Row */}<br/>
              <Grid item xs={8} sm={4}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container alignItems="center">
                      <PetsIcon className={classes.icon} />&nbsp;&nbsp;&nbsp;&nbsp;
                      <div>
                        <Typography className={classes.title} color="textSecondary">
                          Total Animals
                        </Typography>
                        <Typography className={classes.count}>
                          {animalCount}
                        </Typography>
                      </div>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container alignItems="center">
                      <PeopleIcon className={classes.icon} />&nbsp;&nbsp;&nbsp;&nbsp;
                      <div>
                        <Typography className={classes.title} color="textSecondary">
                          Total Employers
                        </Typography>
                        <Typography className={classes.count}>
                          {employerCount}
                        </Typography>
                      </div>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              {/* Second Row */}
              <Grid item xs={8} sm={4}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container alignItems="center">
                      <LocalHospitalIcon className={classes.icon} />&nbsp;&nbsp;&nbsp;&nbsp;
                      <div>
                        <Typography className={classes.title} color="textSecondary">
                          Total Veterinarians
                        </Typography>
                        <Typography className={classes.count}>
                          {veterinaireCount}
                        </Typography>
                      </div>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={8} sm={4}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container alignItems="center">
                      <BusinessIcon className={classes.icon} />&nbsp;&nbsp;&nbsp;&nbsp;
                      <div>
                        <Typography className={classes.title} color="textSecondary">
                          Total Farms
                        </Typography>
                        <Typography className={classes.count}>
                          {fermeCount}
                        </Typography>
                      </div>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash;
