import React, { useState, useEffect } from "react";
import { ReactAgenda, ReactAgendaCtrl, guid, Modal } from "react-agenda";
import moment from "moment";
import "react-agenda/build/styles.css";
import "react-datetime/css/react-datetime.css";
import { useDispatch, useSelector } from "react-redux";
import { setRdv, selectRdv } from "../slices/rdvSlice";
import { selectUser } from "../slices/userSlice";
import { saveRdv, deleteRdv, updateRdv, getAllRdv } from "../api/rdv";
require("moment/locale/fr.js");

let colors = {
  "color-1": "rgba(102, 195, 131 , 1)",
  "color-2": "rgba(242, 177, 52, 1)",
  "color-3": "rgba(235, 85, 59, 1)",
};

let now = new Date();

// let test = [
//   {
//     id: guid(),
//     name: "Meeting , dev staff!",
//     startDateTime: new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate(),
//       10,
//       0
//     ),
//     endDateTime: new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate(),
//       12,
//       0
//     ),
//     classes: "color-1",
//   },
//   {
//     id: guid(),
//     name: "Working lunch , Holly",
//     startDateTime: new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate() + 1,
//       11,
//       0
//     ),
//     endDateTime: new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate() + 1,
//       13,
//       0
//     ),
//     classes: "color-2 color-3",
//   },
// ];
const Agenda = () => {
  const dispatch = useDispatch();
  // const rdv = useSelector(selectRdv);
  const user = useSelector(selectUser);

  const [items, setItems] = useState([]); //nos rdv
  const [selected, setSelected] = useState([]); //le rdv selectionné
  const [cellHeight, setCellHeight] = useState(30); //hauteur de la cellule
  const [showModal, setShowModal] = useState(false); //montre la popup
  const [locale, setLocale] = useState("fr"); //heures au format locale français
  const [rowsPerHour, setRowsPerHour] = useState(2); //nombre de case par heure
  const [numberOfDays, setNumberOfDays] = useState(4); //nombre de jour qu'on affiche
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    // Counter the Read Only mode of the useSelector that restricts to update any object
    // so we call again the Rdv from API and store them locally in the state Items
    getAllRdv(user.infos.id)
      .then((res) => {
        let rdv = res.data;
        rdv.map((item) => {
          item.startDateTime = new Date(item.startDateTime);
          item.endDateTime = new Date(item.endDateTime);
        });
        setItems(rdv);
        console.log(items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //lorque je suis en train de selectionner des cellules
  const handleCellSelection = (item) => {
    console.log("handleCellSelection", item);
  };

  //lorsque la cellule est selectionnée on récupèree les horraires de début et fin
  const handleRangeSelection = (item) => {
    console.log("handleRangeSelection", item);
    setSelected(item);
    setShowModal(true); //on fait apparaitre la popup
  };

  //lorsque l'on sélectionne l'évenement qu'on veut modifier
  const handleItemEdit = (item, newItem) => {
    console.log("handleItemEdit", item);
    console.log("handleItemEdit", newItem);
    //mise à jour de la state selected et showModal
    setSelected([item]);
    setShowModal(true);
  };

  const handleItemRemove = (items, deleteItem) => {
    console.log("handleItemRemove", items);
    console.log("handleItemRemove", deleteItem);
    //appel de la fonction pour supprimer les rdv dans notre api
    deleteRdv(deleteItem._id).then((response) => {
      //si le status de la rep est 200
      if (response.status === 200) {
        setItems(items);
      }
    });
  };

  //lorsque j'ai envoyé le formulaire d'ajout d'event (popup)
  const addNewEvent = (items, newItem) => {
    console.log("addNewEvent", items);
    console.log("addNewEvent", newItem);

    //création d'un objet data pour le nouveau rdv
    const data = {
      name: newItem.name,
      startDateTime: moment(newItem.startDateTime).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      endDateTime: moment(newItem.endDateTime).format("YYYY-MM-DD HH:mm:ss"),
      classes: newItem.classes,
      user_id: user.infos.id,
      _id: newItem._id, //id généré par l'agenda
    };
    //on sauvegarde le rdv
    saveRdv(data).then((response) => {
      console.log(response);
      if (response.status === 200) {
        //on met à jour la liste d'item
        setItems(items);
      }
      //on demande la fermeture de la popup
      setShowModal(false);
    });
  };

  //lorsque j'ai envoyé le formulaire de modification d'event (popup)
  const editEvent = (item, newItem) => {
    console.log("editEvent", item);
    console.log("editEvent", newItem);
    //création d'un objet data pour le rdv modifié
    let data = {
      name: newItem.name,
      startDateTime:
        newItem.startDateTime.getFullYear() +
        "-" +
        (newItem.startDateTime.getMonth() + 1) +
        "-" +
        newItem.startDateTime.getDate() +
        " " +
        newItem.startDateTime.getHours() +
        ":" +
        newItem.startDateTime.getMinutes(),
      endDateTime:
        newItem.endDateTime.getFullYear() +
        "-" +
        (newItem.endDateTime.getMonth() + 1) +
        "-" +
        newItem.endDateTime.getDate() +
        " " +
        newItem.endDateTime.getHours() +
        ":" +
        newItem.endDateTime.getMinutes(),
      classes: newItem.classes,
    };

    //on moddifie le rdv
    updateRdv(data, newItem._id).then((res) => {
      console.log(res);
      if (res.status === 200) {
        dispatch(setRdv(items));
      }
    });
    //on demande la fermeture de la popup
    setShowModal(false);
  };

  return (
    <div>
      <h2>Page agenda</h2>
      {showModal && (
        <Modal clickOutside={() => setShowModal(false)}>
          <div className="modal-content">
            <ReactAgendaCtrl
              items={items}
              itemColors={colors}
              selectedCells={selected}
              Addnew={addNewEvent}
              edit={editEvent}
            />
          </div>
        </Modal>
      )}
      <ReactAgenda
        minDate={now}
        maxDate={new Date(now.getFullYear(), now.getMonth() + 3)}
        disablePrevButton={false}
        startDate={startDate}
        cellHeight={cellHeight}
        startAtTime={8}
        endAtTime={20}
        locale={locale}
        items={items}
        numberOfDays={numberOfDays}
        rowsPerHour={rowsPerHour}
        itemColors={colors}
        autoScale={false}
        fixedHeader={true}
        onItemEdit={handleItemEdit}
        onItemRemove={handleItemRemove}
        onCellSelect={handleCellSelection}
        onRangeSelection={handleRangeSelection}
      />
    </div>
  );
};

export default Agenda;
