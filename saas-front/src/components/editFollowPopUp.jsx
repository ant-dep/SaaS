import React, { useState } from "react";
import moment from "moment";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { updateFollow, getAllFollow, deleteFollow } from "../api/follow";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import { setFollow } from "../slices/followSlice";

const EditFollowPopUp = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [date, setDate] = useState(moment(props.selectedFollow.callDateTime));
  const [type, setType] = useState(props.selectedFollow.type);
  const [description, setDescription] = useState(
    props.selectedFollow.description
  );

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
    //update vers le back (api)
    updateFollow(data, props.selectedFollow.id)
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
      <h2>modifier un suivi</h2>
      {/*FORMULAIRE DE MODIF*/}
      <form
        style={{ marginBottom: "30px" }}
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
        <input type="submit" value="modifier" />
      </form>

      <div className="detail-prospects-buttons">
        {/*boutton de suppression*/}
        <div
          className="delete"
          onClick={(e) => {
            if (
              window.confirm(
                "Attention, vous êtes sur le point de supprimer un suivi, êtes vous sûr de continuer ?"
              )
            ) {
              deleteFollow(props.selectedFollow.id).then((res) => {
                console.log(res);
                if (res.status === 200) {
                  getAllFollow(user.infos.id).then((res) => {
                    dispatch(setFollow(res.follows));
                    props.onClickclose();
                  });
                }
              });
            } else {
              console.log("t'as la trouille hein?");
            }
          }}
        >
          Supprimer
        </div>

        <div
          className="update"
          onClick={() => {
            props.onClickclose();
          }}
        >
          Retour
        </div>
      </div>
    </div>
  );
};

export default EditFollowPopUp;
