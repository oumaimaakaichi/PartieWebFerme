import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import SideMenu from "./SideMenu/index";
import AppHeader from "./AppHeader/index";
Chart.register(...registerables);

const FarmStatistics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.195.216:3000/statistics");
        const result = await response.json();
        console.log("result", result);
        setData(result);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des statistiques :",
          error
        );
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: data.map((item) => `${item.nom} ${item.prenom}`),
    datasets: [
      {
        label: "Number of Employers",
        data: data.map((item) => item.numEmployeurs),
        backgroundColor: "rgba(75,192,192,0.4)",
      },
      {
        label: "Number of Animals",
        data: data.map((item) => item.numAnimaux),
        backgroundColor: "rgba(153,102,255,0.4)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="App1">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <div>
          <br />
          <br />
          <Bar
            data={chartData}
            options={options}
            style={{ width: "1000px", height: "500px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default FarmStatistics;
