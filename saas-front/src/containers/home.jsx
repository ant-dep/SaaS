import React, { useState, useEffect } from "react";
import Teamwork from "../assets/img/Teamwork.png";

const Home = () => {
  return (
    <div>
      <h1 className="c-g title2">
        Welcome to <span className="santa-monica">Commer</span>
        <span className="bel-air">Saas</span> <span>!</span>
      </h1>
      <p>L'outil qui vous permet d'augmenter vos capacités commerciales !</p>
      <div className="log-container-img">
        <img className="log-img" src={Teamwork} alt="Teamwork_image" />
      </div>
    </div>
  );
};

export default Home;
