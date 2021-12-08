import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router";
import { deleteProspect, getAllProspect } from "../../api/prospect";
import AddFollowPopUp from "../../components/addFollowPopUp";
import EditFollowPopUp from "../../components/editFollowPopUp";
import moment from "moment";
import "moment/locale/fr";
import { useDispatch, useSelector } from "react-redux";
import { selectProspect, setProspect } from "../../slices/prospectSlice";
import { selectFollow } from "../../slices/followSlice";
import { selectUser } from "../../slices/userSlice";
moment.locale("fr");

const DetailProspect = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const prospects = useSelector(selectProspect);
  const follows = useSelector(selectFollow);

  const [index, setIndex] = useState(null);
  const [selectedFollow, setSelectedFollow] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [showAddPopUp, setShowAddPopUp] = useState(false);
  const [showEditPopUp, setShowEditPopUp] = useState(false);

  // const prospectSelected = prospects.findIndex(
  //   (person) => person.id === parseInt(params.id)
  // );
  // console.log("index", prospectSelected);
  // setIndex(prospectSelected);

  useEffect(() => {
    const indexProspect = prospects.findIndex(
      (prospect) => prospect.id === parseInt(params.id)
    );
    if (indexProspect !== -1) {
      setIndex(indexProspect);
    }
  }, [prospects]);

  return (
    <div className="detail-prospect">
      {redirect && <Navigate to="/prospect" />}
      {index !== null && (
        <div>
          {/*gestion des popups*/}
          {showAddPopUp && (
            <AddFollowPopUp
              prospects_id={prospects[index].id}
              onClickclose={(e) => {
                setShowAddPopUp(false);
              }}
            />
          )}
          {showEditPopUp && (
            <EditFollowPopUp
              prospects_id={prospects[index].id}
              selectedFollow={selectedFollow}
              onClickclose={(e) => {
                setShowEditPopUp(false);
              }}
            />
          )}
          <h2>
            {`${prospects[index].firstName} ${prospects[index].lastName}`}
          </h2>
          <span>{prospects[index].status}</span>
          <div className="detail-prospects-buttons">
            {/*bouttons de suppression et de modification*/}
            <div
              className="delete"
              onClick={(e) => {
                if (
                  window.confirm(
                    "Attention, vous êtes sur le point de supprimer un prospect, êtes vous sur de continuer"
                  )
                ) {
                  deleteProspect(params.id).then((res) => {
                    if (res.status === 200) {
                      setRedirect(true);
                      getAllProspect(user.infos.id).then((res) => {
                        dispatch(setProspect(res.prospects));
                      });
                    }
                  });
                }
              }}
            >
              Supprimer
            </div>
            <div className="update">
              <Link to={"/prospect/edit/" + params.id}>Modifier</Link>
            </div>
          </div>

          {/*affichage des détails du prospect + boutton d'ajout d'un suivi*/}
          <p>
            {prospects[index].company} : {prospects[index].address}{" "}
            {prospects[index].zip} {prospects[index].city}
          </p>
          <p>tel : {prospects[index].phone}</p>
          <p>email : {prospects[index].email}</p>
          <p>Description : {prospects[index].description}</p>
          <div
            className="new"
            onClick={() => {
              setShowAddPopUp(true);
            }}
          >
            Ajouter un suivi
          </div>
          {/*Boucle qui affiche tous le suivis de ce client dans un boutton qui affichera la popup d'édition*/}
          {follows.length > 0 && (
            <ul className="prospect-list">
              {follows.map((follow) => {
                return (
                  <li
                    key={follow.id}
                    onClick={(e) => {
                      setSelectedFollow(follow);
                      setShowEditPopUp(true);
                    }}
                  >
                    {follow.type} ({moment(follow.callDateTime).format("L")}{" "}
                    {moment(follow.callDateTime).format("LTS")})
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailProspect;
