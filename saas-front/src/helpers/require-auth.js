import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { config } from "../config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../slices/userSlice";
import { setFollow } from "../slices/followSlice";
import { setRdv } from "../slices/rdvSlice";
import { setProspect } from "../slices/prospectSlice";
import { getAllRdv } from "../api/rdv";
import { getAllFollow } from "../api/follow";
import { getAllProspect } from "../api/prospect";

//HOC de controle des data et de la sécurité
const RequireAuth = (props) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const params = useParams();

  const Child = props.child;

  // gestion des state
  const [redirect, setRedirect] = useState(false);

  // au chargement de chaque component
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    console.log("RequireAuth useEffect", props, token);
    if (token === null && props.auth) {
      setRedirect(true);
    } else {
      if (user.isLogged === false) {
        axios
          .get(config.api_url + "/api/v1/user/checkToken", {
            headers: { "x-access-token": token },
          })
          .then((res) => {
            console.log("RequireAuth useEffect", res);
            //si la requète ajax est ok
            if (res.data.status !== 200) {
              if (props.auth) {
                window.localStorage.removeItem("token");
                setRedirect(true);
              }
            }
            //sinon
            else {
              let user = res.data.user[0];
              user.token = token;
              console.log("user", user);
              //on va connecter l'utilisateur
              dispatch(setUser(user));
              getAllRdv(user.id)
                .then((res) => {
                  console.log("all rdv", res);
                  dispatch(setRdv(res.data));
                })
                .catch((err) => {
                  console.log(err);
                });
              getAllProspect(user.id)
                .then((res) => {
                  console.log("all prospect", res);
                  dispatch(setProspect(res.data));
                })
                .catch((err) => {
                  console.log(err);
                });
              getAllFollow(user.id)
                .then((res) => {
                  console.log("all follow", res);
                  dispatch(setFollow(res.data));
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log("error checkToken", err);
          });
      }
    }
  }, []);

  if (redirect) {
    return <Navigate to="/login" />;
  }
  return <Child {...props} params={params} />;
};

export default RequireAuth;
