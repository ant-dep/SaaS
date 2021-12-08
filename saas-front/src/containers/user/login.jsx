import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import LoginImg from "../../assets/img/Login.png";
import { loginUser } from "../../api/user";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";

const Login = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (email !== "" && password !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const onSubmitForm = () => {
    let data = {
      email: email,
      password: password,
    };
    loginUser(data)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          dispatch(setUser(res.user));
          localStorage.setItem("token", res.token);
          setRedirect(true);
        } else {
          console.log(res);
          setError(res.msg);
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <div>
      {redirect && <Navigate to="/" />}
      {error !== null ? (
        <p className="errorMsg">{error}</p>
      ) : (
        <h1 className="c-g title2">
          Welcome to <span className="santa-monica">Commer</span>
          <span className="bel-air">Saas</span> <span>!</span>
        </h1>
      )}
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
          <div className="log-container-form">
            {/*ICI FORMULAIRE DU TURFU*/}
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
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
              />
              <input
                className="button-form bgc-santa-monica"
                type="submit"
                value="Login"
                disabled={disabled}
              />
            </form>

            <div className="fgt-psw">
              <Link to="/forgot">
                <span>Mot de passe oublié ?</span>
              </Link>
            </div>
          </div>
          <div className="log-container-img">
            <img className="log-img" src={LoginImg} alt="login_image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
