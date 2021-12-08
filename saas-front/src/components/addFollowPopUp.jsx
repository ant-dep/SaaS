import React, { useState } from "react";
import moment from "moment";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { saveFollow } from "../api/follow";
import { getAllFollow } from "../api/follow";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import { setFollow } from "../slices/followSlice";

const AddFollowPopUp = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [date, setDate] = useState(moment());
  const [type, setType] = useState("call");
  const [description, setDescription] = useState("");

  const onSubmitForm = () => {
    //on stock dans une variable la date dedmandé formaté avec la librairie moment
    let formDate =
      moment(date).format("yyyy-M-D") + " " + moment(date).format("HH:mm:ss");
    //on crée un objet data avec les propriétés qu'on va sauvegarder dans le back
    let data = {
      prospect_id: props.prospects_id,
      user_id: user.infos.id,
      callDateTime: formDate,
      description: description,
      type: type,
    };
    //sauvegarde vers le back (api)
    saveFollow(data)
      .then((res) => {
        //si la réponse est 200
        if (res.status === 200) {
          //on récupère les suivis dans le back
          getAllFollow(user.infos.id).then((res) => {
            //on recharge les suivis dans le store
            dispatch(setFollow(res.follows));
          });
          //on ferme la popup
          props.onClickclose();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="popup">
      <div
        className="close"
        onClick={(e) => {
          props.onClickclose();
        }}
      >
        X
      </div>
      <h2>ajouter un suivi</h2>
      {/*formulaire*/}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitForm();
        }}
      >
        <Datetime
          value={date}
          onChange={(value) => {
            console.log(value);
            setDate(value);
          }}
        />
        <select
          value={type}
          onChange={(e) => {
            setType(e.currentTarget.value);
          }}
        >
          <option>call</option>
          <option>rdv</option>
        </select>
        <textarea
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
        ></textarea>
        <input type="submit" value="ajouter" />
      </form>
    </div>
  );
};

export default AddFollowPopUp;
