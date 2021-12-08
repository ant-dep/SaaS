import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { updateProspect, getAllProspect } from "../../api/prospect";
import { useDispatch, useSelector } from "react-redux";
import { setProspect, selectProspect } from "../../slices/prospectSlice";
import { selectUser } from "../../slices/userSlice";

const EditProspect = (props) => {
  const dispatch = useDispatch();
  const prospects = useSelector(selectProspect);
  const user = useSelector(selectUser);

  const params = useParams();
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
  const [status, setStatus] = useState("");

  useEffect(() => {
    //on check si l'index se trouve dans le tableau des clients dans le store (findIndex)
    const index = prospects.findIndex((e) => e.id === parseInt(params.id));
    //si un index correspond
    if (index !== -1) {
      //on met à jour nos states pour les champs de formulaire
      setFirstName(prospects[index].firstName);
      setLastName(prospects[index].lastName);
      setEmail(prospects[index].email);
      setPhone(prospects[index].phone);
      setCompany(prospects[index].company);
      setAddress(prospects[index].address);
      setCity(prospects[index].city);
      setZip(prospects[index].zip);
      setDescription(prospects[index].description);
      setStatus(prospects[index].status);
    }
  }, [prospects, params.id]);

  const onSubmitForm = () => {
    let data = {
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
    updateProspect(data, params.id)
      .then((res) => {
        if (res.status === 200) {
          getAllProspect()
            .then((res) => {
              dispatch(setProspect(res.data));
              setRedirect(true);
            })
            .catch((err) => {
              setError(err.message);
            });
        } else {
          setError(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err);
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
          value={firstName}
          onChange={(e) => {
            setFirstName(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => {
            setLastName(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="entreprise"
          value={company}
          onChange={(e) => {
            setCompany(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="adresse"
          value={address}
          onChange={(e) => {
            setAddress(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="code postal"
          value={zip}
          onChange={(e) => {
            setZip(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="ville"
          value={city}
          onChange={(e) => {
            setCity(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="téléphone"
          value={phone}
          onChange={(e) => {
            setPhone(e.currentTarget.value);
          }}
        />
        <select
          value={status}
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
          value={description}
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
        ></textarea>
        <input type="submit" value="enregistrer" />
        <Link to={`/prospect/${params.id}`}>Annuler</Link>
      </form>
    </div>
  );
};

export default EditProspect;
