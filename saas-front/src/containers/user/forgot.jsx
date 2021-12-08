import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import SecurityImg from "../../assets/img/Security.png";
import { forgotPassword } from "../../api/user";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  const onSubmitForm = () => {
    let data = {
      email: email,
    };

    forgotPassword(data)
      .then((res) => {
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  return (
    <div>
      {redirect && <Navigate to="/" />}
      <h1 className="c-g title2">
        Welcome to <span className="santa-monica">Commer</span>
        <span className="bel-air">Saas</span> <span>!</span>
      </h1>
      {error !== null && <p className="errorMsg">{error}</p>}
      <div className="log-container bgc-bel-air">
        <div className="log-nav-container">
          <div className="bgc-bel-air log-link">
            <Link to="/login">Login :</Link>
          </div>
          <div className="bgc-santa-monica log-link">
            <Link to="/register">Register :</Link>
          </div>
        </div>
        <div>
          <h3>Mot de passe oublié</h3>
          <div className="log-container-form">
            <form
              className="form-trl"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmitForm();
              }}
            >
              <label>Email</label>
              <input
                type="text"
                name="email"
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
              />
              <input
                className="button-form bgc-santa-monica light-font"
                type="submit"
                value="Envoyer un nouveau mot de passe"
              />
            </form>
          </div>
          <div className="log-container-img">
            <img className="log-img" src={SecurityImg} alt="security_image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
