import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

const Header = (props) => {
  const user = useSelector(selectUser);

  return (
    <ul className="trl-header">
      {user.isLogged && (
        <div>
          <Link to="/">Accueil</Link>
          <Link to="/agenda">Mon agenda</Link>
          <Link to="/prospect/all">Mon suivi client</Link>
          <Link to="/stats">Mes statistiques</Link>
          <Link to="/logout">
            <FontAwesomeIcon icon={faSignOutAlt} />
          </Link>
        </div>
      )}
    </ul>
  );
};

export default Header;
