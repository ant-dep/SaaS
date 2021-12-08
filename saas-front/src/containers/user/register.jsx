import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import RegisterImg from "../../assets/img/Register.png";
import { saveUser } from "../../api/user";

const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  if (
    password !== "" &&
    confirmPassword !== "" &&
    password !== confirmPassword
  ) {
    setError("Passwords do not match");
  }

  const onSubmitForm = () => {
    setError(false);
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setError("Please fill out all fields");
    } else if (password === confirmPassword) {
      const data = {
        firstName,
        lastName,
        email,
        password,
      };
      saveUser(data)
        .then((response) => {
          if (response.status !== 200) {
            setError(error);
          } else {
            setRedirect(true);
          }
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  return (
    <div>
      {redirect && <Navigate to="/login" />}
      <h1 className="c-g title2">
        Welcome to <span className="santa-monica">Commer</span>
        <span className="bel-air">Saas</span> <span>!</span>
      </h1>
      {error !== null ? (
        <p className="errorMsg">{error}</p>
      ) : (
        <h1 className="c-g title2">
          Welcome to <span className="santa-monica">Commer</span>
          <span className="bel-air">Saas</span> <span>!</span>
        </h1>
      )}
      <div className="log-container bgc-santa-monica">
        <div className="log-nav-container">
          <div className="bgc-bel-air log-link">
            <Link to="/login">Login :</Link>
          </div>
          <div className="bgc-santa-monica log-link">
            <Link to="/register">Register :</Link>
          </div>
        </div>
        <div>
          <div className="log-container-form">
            {/*FORMULAIRE DU TURFU*/}
            {error !== null && <p className="errorMsg">{error}</p>}
            <form
              className="form-trl"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmitForm();
              }}
            >
              <label>Prénom</label>
              <input
                type="text"
                name="firstName"
                onChange={(e) => {
                  setFirstName(e.currentTarget.value);
                }}
              />
              <label>Nom</label>
              <input
                type="text"
                name="lastName"
                onChange={(e) => {
                  setLastName(e.currentTarget.value);
                }}
              />
              <label>Email</label>
              <input
                type="text"
                name="email"
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
              />
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
              />
              <input
                type="password"
                name="confirmPassword"
                onChange={(e) => {
                  setConfirmPassword(e.currentTarget.value);
                }}
              />
              <input
                className="button-form bgc-bel-air"
                type="submit"
                value="Go"
              />
            </form>
          </div>
          <div className="log-container-img">
            <img
              className="log-img"
              src={RegisterImg}
              style={{ marginTop: 100 }}
              alt="Register"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
