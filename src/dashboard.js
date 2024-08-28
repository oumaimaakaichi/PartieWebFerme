import React, { useEffect, useState } from "react";
import "./App.css";
import AppHeader from "./AppHeader/index";
import SideMenu from "./SideMenu/index";
import { Card, CardContent, Grid, Typography, makeStyles } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import PetsIcon from "@material-ui/icons/Pets";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import BusinessIcon from "@material-ui/icons/Business";
import { Bar } from "react-chartjs-2"; 

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  card: {
    minWidth: 255,
    margin: theme.spacing(3),
  },
  icon: {
    fontSize: 40,
    color: "#8baf9e",
    marginRight: theme.spacing(2),
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
  },
  count: {
    fontSize: 24,
    fontWeight: "bold",
  },
  chartContainer: {
    marginTop: theme.spacing(4),
    height:400,
    width:1000
  },
}));

function Dash() {
  const classes = useStyles();
  const [animalCount, setAnimalCount] = useState(0);
  const [employerCount, setEmployerCount] = useState(0);
  const [veterinaireCount, setVeterinaireCount] = useState(0);
  const [fermeCount, setFermeCount] = useState(0);
  const [animalDataByYear, setAnimalDataByYear] = useState([]);

  useEffect(() => {
    fetchAnimalCount();
    fetchUserCounts();
    fetchAnimalDataByYear(); 
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

  async function fetchAnimalDataByYear() {
    try {
      const response = await fetch("http://192.168.244.216:3000/animals-by-year");
      const data = await response.json();
      setAnimalDataByYear(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données des animaux par année :", error);
    }
  }

  
  const chartData = {
    labels: animalDataByYear.map(item => item.year),
    datasets: [
      {
        label: "Nombre d'Animaux",
        data: animalDataByYear.map(item => item.totalAnimals),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="ommm">
      <div className="App1">
        <AppHeader />
        <div className="SideMenuAndPageContent">
          <SideMenu />
          <div className={classes.root}>
            <h2 ><u>Informations</u></h2>
            <br /><br />
            <Grid container spacing={4}>
              {/* First Row */}<br />
              <Grid item xs={12} sm={3}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container alignItems="center">
                      <PetsIcon className={classes.icon} />
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
              <Grid item xs={12} sm={3}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container alignItems="center">
                      <PeopleIcon className={classes.icon} />
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
              <Grid item xs={12} sm={3}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container alignItems="center">
                      <LocalHospitalIcon className={classes.icon} />
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
              <Grid item xs={12} sm={3}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container alignItems="center">
                      <BusinessIcon className={classes.icon} />
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
        
            <div className={classes.chartContainer}>
              <h3><u>Nombre d'Animaux par Année</u></h3>
              <br/>
              <Bar data={chartData} style={{marginLeft:140}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash;
