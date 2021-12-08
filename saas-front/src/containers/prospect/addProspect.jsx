import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { saveProspect, getAllProspect } from "../../api/prospect";
import { useDispatch, useSelector } from "react-redux";
import { setProspect } from "../../slices/prospectSlice";
import { selectUser } from "../../slices/userSlice";

const AddProspect = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("prospect");

  const onSubmitForm = () => {
    setError(null);
    const prospect = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      company: company,
      address: address,
      city: city,
      zip: zip,
      description: description,
      status: status,
      user_id: user.infos.id,
    };
    saveProspect(prospect)
      .then((res) => {
        if (res.status === 200) {
          getAllProspect(user.infos.id)
            .then((res) => {
              console.log(res);
              dispatch(setProspect(res.prospects));
              setRedirect(true);
            })
            .catch((err) => {
              console.log(err);
              setError(err.message);
            });
        } else {
          console.log(res);
          setError(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  return (
    <div>
      {redirect && <Navigate to="/prospect" />}
      {error !== null ? (
        <p className="errorMsg">{error}</p>
      ) : (
        <h2>Ajout d'un prospect</h2>
      )}
      <form
        className="form-trl bgc-bel-air"
        style={{ width: "40%" }}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitForm();
        }}
      >
        <input
          type="text"
          placeholder="Prénom"
          onChange={(e) => {
            setFirstName(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="Nom"
          onChange={(e) => {
            setLastName(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="entreprise"
          onChange={(e) => {
            setCompany(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="adresse"
          onChange={(e) => {
            setAddress(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="code postal"
          onChange={(e) => {
            setZip(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="ville"
          onChange={(e) => {
            setCity(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="téléphone"
          onChange={(e) => {
            setPhone(e.currentTarget.value);
          }}
        />
        <select
          onChange={(e) => {
            setStatus(e.currentTarget.value);
          }}
        >
          <option value="prospect">prospect</option>
          <option value="attente">en attente</option>
          <option value="client">client</option>
        </select>
        <textarea
          type="text"
          placeholder="description"
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
        ></textarea>
        <input type="submit" value="enregistrer" />
      </form>
    </div>
  );
};

export default AddProspect;
