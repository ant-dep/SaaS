import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProspect } from "../slices/prospectSlice";

const Prospect = () => {
  const prospects = useSelector(selectProspect);
  console.log(prospects);

  return (
    <div>
      <Link to="/prospect/add">
        <i className="fa fa-plus-circle"></i> Ajoutez un nouveau prospect
      </Link>
      {prospects.length > 0 ? (
        <>
          <h2>Suivi clients</h2>
          <ul className="prospect-list">
            {prospects.map((prospect) => {
              return (
                <li key={prospect.id}>
                  <Link to={"/prospect/" + prospect.id}>
                    {prospect.firstName} {prospect.lastName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p>Aucun prospects enregistré</p>
      )}
    </div>
  );
};

export default Prospect;
