import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Chart } from "react-google-charts";
import moment from "moment";
import { selectFollow } from "../slices/followSlice";
import { selectProspect } from "../slices/prospectSlice";

let result = [
  ["date", "rdv", "call"],
  ["2021-12-1", 1, 12],
  ["2021-12-1", 2, 15],
  ["2021-12-3", 1, 23],
  ["2021-12-5", 4, 2],
];

let result2 = [
  ["date", "prospects"],
  ["2021-12-1", 1],
  ["2021-12-1", 2],
  ["2021-12-3", 1],
  ["2021-12-5", 8],
];

const Stat = (props) => {
  const follows = useSelector(selectFollow);
  const prospects = useSelector(selectProspect);

  const [follow, setFollow] = useState(result);
  const [prospect, setProspect] = useState(result2);

  useEffect(() => {
    //on crée un tableau dans lequel on stockera les suivis
    let clearFollows = [];
    //on boucle notre liste de suivis des clients (state du store)
    for (let i = 0; i < follows.length; i++) {
      //on enregistre au fut et à mesure les suivis corrspondant aux dates actuelles et on match si il n'est pas déjà enregistré
      let index = clearFollows.findIndex(
        (f) =>
          moment(f.date).format("YYYY-MM-DD") ==
          moment(follows[i].callDateTime).format("YYYY-MM-DD")
      );
      //si un suivi dans le store correspond à un call
      if (follows[i].type === "call") {
        //si on a trouvé un index correspondant à ce rdv dans les index déjà présents de clearFollow
        if (index !== -1) {
          //on ajoute +1 dans les call
          clearFollows[index].call += 1;
        } else {
          //sinon on ajoute un nouvel index pour cette date et on initialise call à 1
          clearFollows.push({
            date: moment(follows[i].callDateTime).format("YYYY-MM-DD"),
            call: 1,
            rdv: 0,
          });
        }
      } else {
        //sinon si le type est rdv et qu'on en trouve un ds similaire dans les index déjà présents
        if (index !== -1) {
          //on ajoute juste 1 au rdv de cet index
          clearFollows[index].rdv += 1;
        } else {
          //sinon on ajoute un nouvel index pour cette date et on initialise rdv à 1
          clearFollows.push({
            date: moment(follows[i].callDateTime).format("YYYY MM DD"),
            rdv: 1,
            call: 0,
          });
        }
      }
    }
    //on crée une nouvelle liste de suivis (qu'on va injecter dans notre graphique)
    let newFollow = [["date", "rdv", "call"]];
    //on fait une boucle de clearFollows qui va ajouté un par un nos suivis de ces dates dans newFollow
    clearFollows.map((followToClear) => {
      let tab = [
        moment(followToClear.date).format("DD-MM-YYYY"),
        followToClear.rdv,
        followToClear.call,
      ];
      newFollow.push(tab);
    });
    //on met à jour notre state Follows avec les nouvelles valeurs.
    setFollow(newFollow);
  }, [follows]);

  /*------------------------------------------------------------------------*/
  /*------------------------------------------------------------------------*/
  /*------------------------------------------------------------------------*/

  useEffect(() => {
    //on crée un tableau dans lequel on stockera les clients
    let clearProspects = [];
    //on boucle notre liste des clients (state du store)
    for (let i = 0; i < prospects.length; i++) {
      //on enregistre au fut et à mesure les clients corrspondant aux dates actuelles et on match si il n'est pas déjà enregistré
      let index = clearProspects.findIndex(
        (p) =>
          moment(p.date).format("YYYY-MM-DD") ==
          moment(prospects[i].creationTimestamp).format("YYYY-MM-DD")
      );
      //si il existe déjà
      if (index !== -1) {
        //on rajoute juste 1 de quantité
        clearProspects[index].quantity += 1;
      } else {
        //sinon il n'existe pas on crée un nouvel index avec cette date et on initialise la quantité à 1
        clearProspects.push({
          date: moment(prospects[i].creationTimestamp).format("YYYY MM DD"),
          quantity: 1,
        });
      }
    }
    //on crée une nouvelle liste de clients (qu'on va injecter dans notre graphique)
    let newProspects = [["date", "prospects"]];
    //on fait une boucle de clearProspect qui va ajouté un par un nos clients de ces dates dans newProspect
    clearProspects.map((prospectToClear) => {
      let tab = [
        moment(prospectToClear.date).format("DD-MM-YYYY"),
        prospectToClear.quantity,
      ];
      newProspects.push(tab);
    });
    //on met à jour notre state prospect avec les nouvelles valeurs
    setProspect(newProspects);
  }, [prospects]);

  return (
    <div>
      <h2>Statistiques</h2>
      <Chart
        width={"800px"}
        height={"600px"}
        chartType="AreaChart"
        loader={<div>Loading Chart</div>}
        data={follow}
        options={{
          title: "Statistique Rdv et appels",
          hAxis: { title: "Date", titleTextStyle: { color: "#333" } },
          vAxis: { minValue: 0 },
          // For the legend to fit, we make the chart area smaller
          chartArea: { width: "50%", height: "70%" },
          // lineWidth: 25
        }}
        // For tests
        rootProps={{ "data-testid": "1" }}
      />
      <Chart
        width={"800px"}
        height={"600px"}
        chartType="AreaChart"
        loader={<div>Loading Chart</div>}
        data={prospect}
        options={{
          title: "Statistique prospects",
          hAxis: { title: "Date", titleTextStyle: { color: "#333" } },
          vAxis: { minValue: 0 },
          // For the legend to fit, we make the chart area smaller
          chartArea: { width: "50%", height: "70%" },
          // lineWidth: 25
        }}
        // For tests
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
};

export default Stat;
