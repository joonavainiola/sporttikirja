import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

//kaikkialla sovelluksessa näkyvissä oleva Menu-komponentti
function Menu() {
    return(
      <div className="menu">
        <div className="menu__buttons">
          <Link to="/">
            <div className="menu__button">
              <i className="fas fa-home"></i>
            </div>
          </Link>
          <Link to="/suoritukset">
            <div className="menu__button">
              <i className="fas fa-stream"></i>
            </div>
          </Link>
          <Link to="/tilastot">
            <div className="menu__button">
              <i className="fas fa-chart-line"></i>
            </div>
          </Link>
          <Link to="/lisaa">
            <div className="menu__button">
              <i className="fas fa-plus-circle"></i>
            </div>
          </Link>
          <Link to="/profiili">
            <div className="menu__button">
              <i className="fas fa-user"></i>
            </div>
          </Link>
        </div>
      </div>
    );
}

export default Menu;